terraform {
  backend "s3" {
    bucket         = "inl-tf-backend"
    key            = "cset-analytics-ui"
    region         = "us-east-1"
    dynamodb_table = "inl-tf-lock"
  }
}
