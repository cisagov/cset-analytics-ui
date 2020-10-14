#==============================================
# Cluster
#
#   This is the cluster for Fargate. It is a
#   organization namespace to hold multiple
#   services.
#==============================================
data "aws_ecs_cluster" "cluster" {
  cluster_name = "${var.app}-${var.env}"
}

#==============================================
# Container Definition
#
#   This is the container definition for a task
#   in Fargate. This is where things like
#   repo/image_tag, env vars, logging would
#   be set.
#==============================================
module "container_def" {
  source    = "github.com/cisagov/fargate-container-def-tf-module"
  namespace = var.app
  stage     = var.env
  name      = "ui"

  container_name  = local.container_name
  container_image = "${var.image_repo}:${var.image_tag}"
  container_port  = local.port
  region          = var.region
  log_retention   = 7
  environment     = local.environment
}

#==============================================
# Task Definition
#
#   This is where the task definition is set.
#   It can reference multiple container defs
#   and is where iam roles and cpu/memory
#   requirements are set.
#==============================================
resource "aws_ecs_task_definition" "task" {
  family                   = "${var.app}-${var.env}-ui"
  container_definitions    = module.container_def.json
  cpu                      = 2048
  execution_role_arn       = data.aws_iam_role.execution.arn
  memory                   = 4096
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  task_role_arn            = data.aws_iam_role.task.arn
}

#==============================================
# Service
#
#   This is where the service is created. A
#   task definition is attached to it, and this
#   is where things like load balancing,
#   networking and scaling are defined.
#==============================================
resource "aws_ecs_service" "service" {
  name            = "ui"
  cluster         = data.aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  load_balancer {
    target_group_arn = aws_lb_target_group.tg.arn
    container_name   = local.container_name
    container_port   = local.port
  }

  network_configuration {
    subnets          = var.private_subnet_ids
    security_groups  = [aws_security_group.ui.id]
    assign_public_ip = false
  }
}
