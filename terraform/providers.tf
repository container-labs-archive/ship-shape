# provider "google" {
#   version = "~> 3.0"
#   project = var.seed_project_id
# }

# provider "google-beta" {
#   version = "~> 3.0"
#   project = var.seed_project_id
# }

provider "google" {
  version = "~> 3.0"
  project = var.gcp_project
}

provider "google-beta" {
  version = "~> 3.0"
  project = var.gcp_project
}
