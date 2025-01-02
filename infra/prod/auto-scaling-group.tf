resource "aws_launch_template" "lt" {
  name          = "uerj-codeboard-lt"
  image_id      = var.ami_id
  instance_type = "t3a.micro"
  key_name      = var.key_name

  vpc_security_group_ids = [aws_security_group.instance_security_group.id]

  user_data = base64encode(file("${path.module}/user_data.sh"))

  update_default_version = true
}

resource "aws_autoscaling_group" "asg" {
  name                      = "uerj-codeboard-asg"
  min_size                  = 2
  desired_capacity          = 2
  max_size                  = 5
  health_check_type         = "ELB"
  health_check_grace_period = var.asg_cooldown_seconds
  default_cooldown          = var.asg_cooldown_seconds
  default_instance_warmup   = var.instance_warmup_seconds

  vpc_zone_identifier  = [aws_subnet.public.id]
  target_group_arns    = [aws_lb_target_group.target_group.arn]
  termination_policies = ["OldestInstance"]

  launch_template {
    id      = aws_launch_template.lt.id
    version = "$Latest"
  }

  instance_refresh {
    strategy = "Rolling"

    preferences {
      min_healthy_percentage = 50
      instance_warmup        = var.instance_warmup_seconds
    }
  }
}

resource "aws_autoscaling_policy" "scale_up" {
  name                   = "uerj-codeboard-scale-up"
  scaling_adjustment     = 1
  adjustment_type        = "ChangeInCapacity"
  cooldown               = var.asg_cooldown_seconds
  autoscaling_group_name = aws_autoscaling_group.asg.name
}

resource "aws_cloudwatch_metric_alarm" "scale_up" {
  alarm_name          = "UERJ-CODEBOARD-CPU-Utilization-Scale-Up"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 60
  statistic           = "Average"
  threshold           = 60
  alarm_description   = "This metric monitors uerj-codeboard ec2 cpu utilization and triggers a scale up event when the threshold is greater than or equal to 70% for 1 minute."
  alarm_actions       = [aws_autoscaling_policy.scale_up.arn]

  dimensions = {
    AutoScalingGroupName = aws_autoscaling_group.asg.name
  }
}

resource "aws_autoscaling_policy" "scale_down" {
  name                   = "uerj-codeboard-scale-down"
  scaling_adjustment     = -1
  adjustment_type        = "ChangeInCapacity"
  cooldown               = var.asg_cooldown_seconds
  autoscaling_group_name = aws_autoscaling_group.asg.name
}

resource "aws_cloudwatch_metric_alarm" "scale_down" {
  alarm_name          = "UERJ-CODEBOARD-CPU-Utilization-Scale-Down"
  comparison_operator = "LessThanOrEqualToThreshold"
  evaluation_periods  = 1
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 60
  statistic           = "Average"
  threshold           = 30
  alarm_description   = "This metric monitors uerj-codeboard EC2 CPU utilization and triggers a scale-down event when the threshold is less than or equal to 30% for 1 minute."
  alarm_actions       = [aws_autoscaling_policy.scale_down.arn]

  dimensions = {
    AutoScalingGroupName = aws_autoscaling_group.asg.name
  }
}
