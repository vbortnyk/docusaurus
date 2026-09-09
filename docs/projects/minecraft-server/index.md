---
id: index
title: Technical Writeups
sidebar_position: 1
---

# Minecraft Server

A containerized Minecraft 1.21.4 server deployed with Docker and Docker Compose.

This project demonstrates practical containerization and automation using a custom Docker image, environment-based configuration and a Shell entrypoint for automated server initialization.

## Project Overview

The Minecraft server runs inside a Docker container and is managed using Docker Compose.

The deployment uses environment variables to configure server parameters without modifying the container image.

The entrypoint script automatically prepares the server configuration when the container starts.

Key aspects include:

- Custom Docker image
- Minecraft 1.21.4 server
- Docker Compose deployment
- Environment-based configuration
- Automated server initialization
- Shell entrypoint scripting
- Persistent server data
- Container health and status testing
