# DevSecOps Portfolio

> DevSecOps · Automation · Infrastructure · Security

A personal portfolio website built with [Docusaurus](https://docusaurus.io/), showcasing DevSecOps projects, case studies, and technical write-ups. The site is deployed as a static SPA to **GitHub Pages**.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Local Development](#local-development)
  - [Type Checking](#type-checking)
  - [Build](#build)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [Content Model](#content-model)
  - [Projects](#projects)
  - [Sidebar](#sidebar)
- [Deployment](#deployment)
  - [Deploying to GitHub Pages](#deploying-to-github-pages)
- [Code Style](#code-style)
- [License](#license)

---

## Overview

This repository is the source for my personal DevSecOps portfolio. Rather than a plain landing page, it's built on top of Docusaurus's documentation engine so that each project or case study lives as its own Markdown/MDX page, gets automatic sidebar navigation, and can link to related write-ups.

The blog feature is intentionally disabled — the site is structured purely around a **Projects** section, with a custom navbar linking out to my GitHub profile and contact details.

## Tech Stack

| Layer | Technology |
|---|---|
| Static site framework | [Docusaurus](https://docusaurus.io/) 3.5.2 (Classic preset) |
| UI | React 18 |
| Language | TypeScript 5 |
| Content | Markdown / MDX, with GitHub-style alerts via `remark-github-alerts` |
| Syntax highlighting | Prism (GitHub theme in light mode, Dracula in dark mode) |
| Package manager | pnpm (workspace-based) |
| Hosting | GitHub Pages |

## Project Structure

```text
.
├── .github/workflows/   # CI/CD pipeline(s) for building and deploying the site
├── docs/
│   └── projects/         # Markdown/MDX pages for each portfolio project — auto-added to the sidebar
├── src/                  # Custom React components, pages, and CSS overrides
├── static/               # Static assets (images, icons, favicon) served as-is
├── docusaurus.config.ts  # Site metadata, navbar, theming, and plugin configuration
├── sidebars.ts           # Sidebar configuration (currently auto-generated from docs/)
├── example.env           # Template for local environment variables
├── babel.config.js       # Babel configuration for the Docusaurus build
├── tsconfig.json         # TypeScript configuration
├── package.json          # Scripts and dependencies
└── LICENSE               # MIT license
```

> [!NOTE]
> `blog` is explicitly disabled in `docusaurus.config.ts`, so there is no `blog/` content directory in active use — all content lives under `docs/`.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `>= 18`
- [pnpm](https://pnpm.io/) (this repo uses `pnpm-lock.yaml` / `pnpm-workspace.yaml` as the source of truth for dependency resolution)

> [!TIP]
> A `package-lock.json` is also present in the repo. Stick to **pnpm** for installs to avoid drift between lockfiles.

### Installation

Clone the repository and install dependencies:

```bash
git clone <this-repo-url>
cd docusaurus
pnpm install
```

### Local Development

```bash
pnpm start
```

This starts a local dev server and opens the site in your browser. Most edits (content, components, styling) hot-reload without a restart.

### Type Checking

```bash
pnpm typecheck
```

Runs the TypeScript compiler (`tsc`) in check-only mode against `docusaurus.config.ts`, custom components, and the rest of the codebase.

### Build

```bash
pnpm build
```

Generates a production-ready static build in the `build/` directory, which can be served by any static file host.

To sanity-check the production build locally before deploying:

```bash
pnpm serve
```

## Configuration

Site-wide settings — title, tagline, favicon, navbar, theming, and contact links — are defined in [`docusaurus.config.ts`](https://github.com/<your-github-username>/docusaurus/blob/main/docusaurus.config.ts). Several values are overridable via environment variables so the same config works across local, CI, and production without code changes.

### Environment Variables

Copy the template and fill in your own values:

```bash
cp example.env .env
```

| Variable | Purpose | Default |
|---|---|---|
| `CONTACT_EMAIL` | Email shown/used via `customFields.contactEmail` | *(your contact email)* |
| `LINKEDIN_URL` | LinkedIn link via `customFields.linkedinUrl` | *(your LinkedIn profile URL)* |
| `DOCUSAURUS_URL` | Base site URL (`url` in config) | *(your GitHub Pages domain)* |
| `DOCUSAURUS_BASE_URL` | Base path the site is served from | `/portfolio/` |
| `PROFILE_GITHUB_URL` | Navbar "GitHub" link target | *(your GitHub profile URL)* |

> [!NOTE]
> `example.env` (used as a reference for the deploy pipeline) additionally defines `DEPLOYMENT_URL`, `DEPLOYMENT_BRANCH`, `BASE_URL`, `GITHUB_ORG`, and `GITHUB_PROJECT` — used for the GitHub Pages deploy step rather than the app itself. Fill these in with your own org/repo values, and keep both files in sync if you rename the repository or move to a custom domain.

## Content Model

### Projects

Each portfolio project is a Markdown/MDX file under `docs/projects/`. Add a new project by creating a new file there — no manual sidebar wiring is required (see below).

### Sidebar

`sidebars.ts` currently uses Docusaurus's **autogenerated** sidebar, deriving the "Projects" navigation directly from the folder structure under `docs/`:

```ts
tutorialSidebar: [{ type: "autogenerated", dirName: "." }]
```

This means dropping a new Markdown file into `docs/projects/` is enough for it to appear in the sidebar — no extra configuration needed. A manual/explicit sidebar can be defined later if finer control over ordering or grouping is needed.

## Deployment

The site is configured for GitHub Pages via `organizationName` and `projectName` in `docusaurus.config.ts`, served at `/portfolio/`. A GitHub Actions workflow under `.github/workflows/` handles building and publishing the site on push.

### Deploying to GitHub Pages

Manual deploy (bypassing CI), using SSH:

```bash
USE_SSH=true pnpm deploy
```

Or without SSH:

```bash
GIT_USER=<your-github-username> pnpm deploy
```

This builds the site and pushes the static output to the `gh-pages` branch.

## Code Style

Formatting is enforced via [Prettier](https://prettier.io/), configured directly in `package.json` (4-space indentation, no tabs). There's no separate lint script defined yet — `pnpm typecheck` is currently the only automated code-quality gate beyond CI's build step.

## License

Licensed under the **MIT License** — see [`LICENSE`](https://github.com/<your-github-username>/docusaurus/blob/main/LICENSE) for details.
