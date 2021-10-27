terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.49.0"
    }
  }
}

provider "aws" {
  shared_credentials_file = "/home/Manu/Project/Terraform-Foodfix/architecture/credentials"
  region                  = "us-east-1"
}

resource "aws_default_vpc" "default" {
  tags = {
    Name = "Default VPC"
  }
}

resource "aws_default_security_group" "default" {
  vpc_id = aws_default_vpc.default.id
}

resource "aws_security_group_rule" "in_ssh" {
  security_group_id = aws_default_security_group.default.id
  cidr_blocks       = ["0.0.0.0/0"]
  description       = "Port to SSH connection"
  type              = "ingress"
  protocol          = 6
  from_port         = 22
  to_port           = 22
}

resource "aws_security_group_rule" "out_all" {
  security_group_id = aws_default_security_group.default.id
  cidr_blocks       = ["0.0.0.0/0"]
  description       = "All ports open"
  type              = "egress"
  protocol          = -1
  from_port         = 0
  to_port           = 0
}

resource "aws_security_group_rule" "in_all" {
  security_group_id = aws_default_security_group.default.id
  cidr_blocks       = [aws_default_vpc.default.cidr_block]
  description       = "All ports open"
  type              = "ingress"
  protocol          = -1
  from_port         = 0
  to_port           = 0
}

resource "aws_default_subnet" "default" {
  availability_zone = "us-east-1a"
  tags = {
    Name = "Default subnet for us-east-1a"
  }
}

resource "aws_key_pair" "foodfix" {
  key_name_prefix = "foodfix-"
  public_key      = file("/home/Manu/.ssh/aws.pub")
}

resource "aws_instance" "web" {
  ami                         = "ami-07d02ee1eeb0c996c" //debian 10
  instance_type               = "t2.large"
  subnet_id                   = aws_default_subnet.default.id
  vpc_security_group_ids      = [aws_default_security_group.default.id]
  associate_public_ip_address = true
  key_name                    = aws_key_pair.educasi.key_name

  user_data_base64 = filebase64("./install.sh")

root_block_device {
  volume_size = 15
}
  tags = {
    Name = "foodfix"
  }
}
