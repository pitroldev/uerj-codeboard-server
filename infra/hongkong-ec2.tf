# Define provider for AWS
provider "aws" {
  alias  = "hongkong"
  region = "ap-east-1"
}


# Create EC2 instance in Hongkong
# resource "aws_instance" "hongkong_instance" {
#   provider      = aws.hongkong
#   instance_type = "t2.micro"

#   tags = {
#     Name = "hongkong-instance"
#   }
# }
