# ===========================
# FARGATE
# ===========================
locals {
  port     = 80
  alb_port = 443
}


module "container" {
  source    = "github.com/cisagov/fargate-container-def-tf-module"
  namespace = var.app
  stage     = var.env
  name      = "ui"

  container_name  = "${var.app}-ui"
  container_image = "${var.image_repo}:${var.image_tag}"
  container_port  = local.port
  region          = var.region
  log_retention   = 7

  environment = {
    "API_URL" : "https://${var.app}.${var.env}.${domain_name}:8443/api/"
  }
}


module "fargate" {
  source    = "github.com/cisagov/fargate-service-tf-module"
  namespace = var.app
  stage     = var.env
  name      = "ui"

  https_cert_arn        = data.aws_acm_certificate.cert.arn
  container_port        = local.port
  container_definition  = module.container.json
  container_name        = "${var.app}-ui"
  cpu                   = 2048
  memory                = 4096
  vpc_id                = var.vpc_id
  health_check_interval = 60
  health_check_path     = "/"
  health_check_codes    = "200"
  load_balancer_arn     = data.aws_lb.public.arn
  load_balancer_port    = local.alb_port
  desired_count         = 1
  subnet_ids            = var.private_subnet_ids
  security_group_ids    = [aws_security_group.ui.id]
}


# ===========================
# SECURITY GROUP
# ===========================
resource "aws_security_group" "ui" {
  name        = "${var.app}-${var.env}-ui-alb"
  description = "Allow traffic for ui from alb"
  vpc_id      = var.vpc_id

  ingress {
    description     = "Allow container port from ALB"
    from_port       = local.port
    to_port         = local.port
    protocol        = "tcp"
    security_groups = [data.aws_security_group.alb.id]
    self            = true
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    "Name" = "${var.app}-${var.env}-ui-alb"
  }
}
