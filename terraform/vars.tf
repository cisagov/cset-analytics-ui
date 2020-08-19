variable "env" {
  type = string
}

variable "app" {
  type    = string
  default = "cset-analytics"
}

variable "region" {
  type    = string
  default = "us-east-1"
}

variable "vpc_id" {
  type = string
}

variable "private_subnet_ids" {
  type = list(string)
}

variable "public_subnet_ids" {
  type = list(string)
}

variable "image_repo" {
  type = string
}

variable "image_tag" {
  type = string
}
