
# module "fargate" {
#   source    = "github.com/cisagov/fargate-service-tf-module"
#   namespace = var.app
#   stage     = var.env
#   name      = "ui"

#   https_cert_arn        = data.aws_acm_certificate.cert.arn
#   container_port        = local.port
#   container_definition  = module.container.json
#   container_name        = "${var.app}-ui"
#   cpu                   = 2048
#   memory                = 4096
#   vpc_id                = var.vpc_id
#   health_check_interval = 60
#   health_check_path     = "/"
#   health_check_codes    = "200"
#   load_balancer_arn     = data.aws_lb.public.arn
#   load_balancer_port    = local.alb_port
#   desired_count         = 1
#   subnet_ids            = var.private_subnet_ids
#   security_group_ids    = [aws_security_group.ui.id]
# }
