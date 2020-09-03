data "aws_acm_certificate" "cert" {
  domain = "${var.app}.${var.env}.${var.domain_name}"
}
