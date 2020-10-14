# ===================================
# Load Balancer
# ===================================
data "aws_lb" "public" {
  name = "${var.app}-${var.env}-public-alb"
}

# ===================================
# Listener
# ===================================
data "aws_lb_listener" "https" {
  load_balancer_arn = data.aws_lb.public.arn
  port              = 443
}

# ===================================
# Listener Rule
# ===================================
resource "aws_lb_listener_rule" "rule" {
  listener_arn = data.aws_lb_listener.https.arn
  priority     = 200

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.tg.arn
  }

  condition {
    path_pattern {
      values =["/", "/*", "*"]
    }
  }
}

#=========================
# TARGET GROUP
#=========================
resource "aws_lb_target_group" "tg" {
  name        = "${var.app}-${var.env}-ui"
  port        = local.port
  protocol    = local.protocol
  target_type = "ip"
  vpc_id      = var.vpc_id

  health_check {
    healthy_threshold   = 3
    interval            = 60
    matcher             = "200"
    path                = "/"
    port                = local.port
    protocol            = local.protocol
    unhealthy_threshold = 3
  }
}
