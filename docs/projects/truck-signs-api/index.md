---
id: index
title: Tecnnical Writeups
sidebar_position: 1
---

# Truck Signs API

A containerized Django REST API for an e-commerce platform that provides truck sign products, customizations and order management.

The project uses Docker Compose to orchestrate the Django application and PostgreSQL database, with automated database migrations, static file collection, superuser initialization and Gunicorn application serving.

## Project Overview

The application is built with:

- **Django REST Framework** — REST API backend
- **PostgreSQL** — relational database
- **Docker** — application containerization
- **Docker Compose** — multi-container orchestration
- **Gunicorn** — WSGI application server
- **Bash** — container initialization and automation
- **GitHub Container Registry** — container image distribution

The project supports environment-specific configuration for development, testing and production.