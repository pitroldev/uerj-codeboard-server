resource "aws_security_group" "instance_security_group" {
  name_prefix = "uerj_codeboard_instance_sg_"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "uerj-codeboard-asg-sg"
  }

  egress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# vpc and subnet ids

resource "aws_lb" "alb" {
  name               = "uerj-codeboard-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.instance_security_group.id]
  subnets            = [aws_subnet.public.id, aws_subnet.private.id]

  enable_deletion_protection = false

  enable_http2                     = true
  enable_cross_zone_load_balancing = true
  idle_timeout                     = 60

  tags = {
    Name = "uerj-codeboard-alb"
  }
}

resource "aws_lb_target_group" "target_group" {
  name        = "uerj-codeboard-tg-lb"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "instance"

  stickiness {
    enabled         = true
    type            = "lb_cookie"
    cookie_duration = 86400
  }

  health_check {
    interval            = 30
    path                = "/health"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
  }
}

resource "aws_lb_listener" "https_listener" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 443
  protocol          = "HTTPS"

  ssl_policy      = "ELBSecurityPolicy-2016-08"
  certificate_arn = aws_acm_certificate.cert.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group.arn

  }
}

resource "aws_route53_record" "lb_record" {
  zone_id = var.route53_zone_id
  name    = var.route53_domain_name
  type    = "A"

  alias {
    name                   = aws_lb.alb.dns_name
    zone_id                = aws_lb.alb.zone_id
    evaluate_target_health = true
  }
}
