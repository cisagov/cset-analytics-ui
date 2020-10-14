data "aws_security_group" "alb" {
  name = "${var.app}-${var.env}-alb"
}

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
