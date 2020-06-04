locals {
  apis = [
    "cloudbilling.googleapis.com",
    "cloudbuild.googleapis.com",
    "secretmanager.googleapis.com",
    "pubsub.googleapis.com",
    "cloudscheduler.googleapis.com"
  ]
}

resource "google_project_service" "project-apis" {
  for_each = toset(local.apis)

  project = var.gcp_project
  service = each.key

  disable_dependent_services = true
}

resource "google_pubsub_topic" "butler" {
  name = "butler"
  project = var.gcp_project

  # depends_on = [
  #   google_project_service.project-apis["pubsub.googleapis.com"]
  # ]
}


resource "google_cloud_scheduler_job" "butler" {
  name        = "butler-job"
  description = "butler job"
  schedule    = "*/10 * * * *"
  region      = "us-west3"
  project     = var.gcp_project

  pubsub_target {
    topic_name = google_pubsub_topic.butler.id
    data       = base64encode("butler-cron")
  }
}
