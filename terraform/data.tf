data "aws_lb" "public" {
  name = "${var.app}-${var.env}-public-alb"
}

data "aws_security_group" "alb" {
  name = "${var.app}-${var.env}-alb"
}

data "aws_acm_certificate" "cert" {
  domain = "${var.app}.${var.env}.${var.domain_name}"
}
