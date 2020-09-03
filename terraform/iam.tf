data "aws_iam_role" "execution" {
    name = "${var.app}-${var.env}-ecs-execution"
}

data "aws_iam_role" "task" {
    name = "${var.app}-${var.env}-ecs-task"
}
