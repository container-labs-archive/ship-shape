
locals {
  seed_apis = [
    "cloudresourcemanager.googleapis.com",
    "cloudbilling.googleapis.com",
    "cloudbuild.googleapis.com",
    "secretmanager.googleapis.com",
    # "pubsub.googleapis.com"
  ]
}

resource "google_project_service" "seed-apis" {
  for_each = toset(local.seed_apis)

  project = var.seed_project_id
  service = each.key

  disable_dependent_services = true
}
