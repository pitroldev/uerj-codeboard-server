# Define provider for AWS
provider "aws" {
  alias  = "ohio"
  region = "us-east-2"
}


# Create EC2 instance in Ohio
resource "aws_instance" "ohio_instance" {
  provider      = aws.ohio
  instance_type = "t2.micro"

  tags = {
    Name = "ohio-instance"
  }
}
