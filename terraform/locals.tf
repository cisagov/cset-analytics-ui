locals {
  container_name = "${var.app}-ui"

  port     = 80
  protocol = "HTTP"
  alb_port = 443

  environment = {
    "API_URL" : "https://${var.app}.${var.env}.${var.domain_name}/api/"
  }
}
