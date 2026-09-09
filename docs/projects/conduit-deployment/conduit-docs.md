# Conduit-deployment

CI/CD Orchestrator for Distributed Services

This repository acts as a central CI/CD orchestrator for a multi-repository architecture where each service is treated as an independent project with its own lifecycle.

The goal is to enable decentralized builds with centralized deployment orchestration, using reusable workflows and container-based delivery via GitHub Container Registry (GHCR).


## Table of Contents

 - [Architecture Overview](#architecture-overview)
 - [Prerequisites](#prerequisites)
 - [Quick Start](#quick-start)
 - [First deployment](#first-deployment)
 - [Usage](#usage)

## Architecture Overview

Each service repository is responsible for:

  - Building its own Docker image
  - Pushing the image to GHCR
  - Triggering the orchestrator workflow

The orchestrator repository is responsible for:

  - Pulling pre-built images from GHCR
  - Managing deployment on the VPS
  - Ensuring services run inside a shared Docker network
  - Supporting full rebuild or partial updates

## Prerequisites

Before running this project, make sure you have the following installed:

- A GitHub account
- A remote server with SSH access
- Docker installed on the remote server
- A frontend repository located at: `<owner>/conduit-frontend`. Can be cloned:
  ```bash
     $ git clone git@github.com:vbortnyk/conduit-frontend.git
  ```
- A backend repository located at: `<owner>/conduit-backend`. Can be cloned:
  ```bash
     $ git clone https://github.com/vbortnyk/conduit-backend
  ```

## Quick Start

### Clone the repository:
   ```bash
      $ git clone git@github.com:vbortnyk/conduit-deployment.git
   ```
The repository contains a `compose.yml` file with Docker build and deployment instructions. Copy this file to your VPS under the following path:`~/projects/conduit-deployment`


Configuration details for each service can be found here:
- [Angular app README](https://github.com/vbortnyk/conduit-frontend/blob/master/README.md)
- [Django app README](https://github.com/vbortnyk/conduit-backend/blob/master/README.md)

### Configure environment variables and secrets for building images and deploying on your VPS:

Environment Variables:

In the cloned git repository navigate to: Settings-> Secrets and Variables -> Actions -> Variables
Configure the following environment variables:
   - `ALLOWED_HOSTS` -> set to `localhost,127.0.0.1,backend`
   - `BACKEND_PORT` -> set to  `8000`
   - `BACKEND_SERVICE_NAME` -> set to `conduit-backend`
   - `DATABASE_NAME` -> set to `postgres`
   - `DATABASE_USERNAME` -> set to `root`
   - `FRONTEND_PORT` -> set to `8282`
   - `VPS_HOST` -> set to `<your-host>`
   - `VPS_USERNAME` -> `<your-vps-user-name>`

Secrets:

In the cloned git repository navigate to: Settings-> Secrets and Variables -> Actions -> Secrets
set the following Secrets:
  - `DATABASE_PASSWORD` -> `<your-db-password>`
  - `GIT_SSH_KEY` -> `<your-ssh-key>`
  - `GIT_TOKEN` -> `<your-github-token>`
  - `VPS_SSH_KEY` -> `<your-ssh-private-key>`





## First Deployment
First full-system build and deployment

  - Make sure the workflow file is on the default branch. In your GitHub repository:
    - navigate to: Settings -> Default branch -> set the current branch as Default
  - Navigate to Actions tab
  - In the left sidebar under "All workflows" select `Deploy`
  - In the right sidebar click on the drop-down called "Run workflow". Select the branch currently configured as the default branch and click `Run workflow` 
  - Monitor execution
    -  After triggering:
       - The run appears in the workflow list
       - Click it to open logs
       - Each job shows step-by-step execution output
  - Validate deployment on VPS
    
    After successful run:
      -  login to your VPS
      - run:
        ```bash
           $ docker ps
        ```
     - check logs:
       ```bash
        $ docker logs <container-id>
       ```


## Usage

Apart from the full rebuild and redeploy workflow, which is used for general-purpose deployments of the entire Conduit stack, the system supports partial updates for individual services.

For this purpose, both the frontend and backend repositories define their own GitHub Actions workflows responsible for building their respective Docker images and pushing them to GitHub Container Registry (GHCR). Once a new image is published, a reusable workflow in the orchestrator repository is triggered.

The orchestrator then pulls the updated image and deploys only the affected service to the VPS, without interrupting or rebuilding unrelated components. This ensures isolated, incremental deployments while maintaining a shared Docker network for service communication.

To support this setup, both frontend and backend services are configured with the necessary environment variables and GitHub repository secrets, including authentication for GHCR and deployment access to the server.