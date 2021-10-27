data "aws_instance" "name" {
  instance_id = aws_instance.web.id
}

output "sec_group_ids" {
  value = data.aws_instance.name.vpc_security_group_ids
}

output "ip_public" {
  value = aws_instance.web.public_ip
}

output "ssh_connection" {
  # data.aws_instance.name.public_ip
  # aws_security_group_rule.ssh.from_port
  value = "ssh ${data.aws_instance.name.public_ip}"
}
