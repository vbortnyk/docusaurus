---
id: index
title: Technical Writeups
sidebar_position: 1
---

# Conduit Deployment

A centralized CI/CD orchestration system for deploying a multi-repository application to a remote VPS using GitHub Actions, Docker and GitHub Container Registry.

The project separates application development from deployment orchestration. Frontend and backend repositories build and publish their own Docker images, while this repository is responsible for coordinating deployment of those images to the target server.

## Project Overview

The deployment architecture consists of:

- **Frontend repository** — builds the frontend Docker image
- **Backend repository** — builds the backend Docker image
- **GitHub Container Registry** — stores versioned container images
- **Conduit Deployment** — central deployment orchestrator
- **VPS** — target deployment environment
- **Docker Compose** — manages the running services

The architecture supports both complete system deployments and isolated updates of individual services.