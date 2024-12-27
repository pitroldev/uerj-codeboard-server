terraform {
  backend "s3" {
    bucket  = "terraform-states-gm"
    key     = "ucs-test/prod/terraform.tfstate"
    region  = "us-east-2"
    encrypt = true
  }
}
