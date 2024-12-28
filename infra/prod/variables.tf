variable "instance_warmup_seconds" {
  description = "The number of seconds to wait for the EC2 instances to warm up."
  type        = number
  default     = 150
}

variable "asg_cooldown_seconds" {
  description = "The number of seconds to wait for the EC2 instances to warm up."
  type        = number
  default     = 150
}


variable "route53_zone_id" {
  description = "The ID of the Route53 zone in which to create the record."
  type        = string
  default     = "Z0931343M3AA4Z5715IH"
}

variable "route53_domain_name" {
  description = "The domain name to use for the Route53 record."
  type        = string
  default     = "api.growthstation.app"
}

variable "ami_id" {
  description = "Golden AMI ID to use for the EC2 instances."
  type        = string
  default     = "ami-08d05a07c3b3f7bc5"
}

variable "key_name" {
  description = "The name of the key pair to use for the EC2 instances."
  type        = string
  default     = "plataforma-growth"
}