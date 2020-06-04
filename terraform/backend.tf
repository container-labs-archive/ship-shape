terraform {
  backend "gcs" {
    prefix = "ship-shape"
    bucket = "clabs-tf-state"
  }
}
