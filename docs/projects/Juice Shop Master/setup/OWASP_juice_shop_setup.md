# Local Installation Guide
## Prerequisites

- **Node.js** (LTS version, **22.x, 24.x, or 26.x recommended**) and npm installed — only needed for the Node.js method.
  > Juice Shop follows the official Node.js LTS schedule; check the [project README](https://github.com/juice-shop/juice-shop) for the current list of supported versions.
- **Git** installed (already used to clone the repo).
- **Docker** installed and running — only needed for the Docker method.
- At least **~1 GB of free disk space** and a stable internet connection for dependency downloads.

---

## Clone the Repository

Before following either installation option below, clone the official OWASP Juice Shop repository from GitHub:

```bash
git clone https://github.com/juice-shop/juice-shop.git --depth 1
```

> The `--depth 1` flag does a shallow clone (history only, not the full commit log), which saves about 700 MB of disk space. Omit it if you need the full Git history.

This creates a `juice-shop` folder in your current directory, which the steps below assume you `cd` into.

---

## Option A: Run with Node.js / npm

### Step 1: Navigate into the cloned repository

```bash
cd juice-shop
```

### Step 2: Install dependencies

Run `npm install` from inside the project folder. This downloads all required Node modules defined in `package.json`. It can take a few minutes the first time.

```bash
npm install
```

### Step 3: Start the application

Once installation completes, start the server:

```bash
npm start
```

This runs the app in production-like mode using the compiled files. Alternatively, for development with hot-reload, use:

```bash
npm run serve
```

### Step 4: Open the application in your browser

By default, Juice Shop listens on port `3000`. Open:

```
http://localhost:3000
```

### Step 5: (Optional) Change the port

If port 3000 is already in use, set the `PORT` environment variable before starting:

```bash
# macOS/Linux
PORT=3001 npm start

# Windows (cmd)
set PORT=3001 && npm start

# Windows (PowerShell)
$env:PORT=3001; npm start
```

---

## Option B: Run with Docker

### Step 1: Pull the official image (optional if building locally)

```bash
docker pull bkimminich/juice-shop
```

### Step 2: Or build the image from the cloned source

From inside the cloned repository folder:

```bash
cd juice-shop
docker build -t juice-shop .
```

### Step 3: Run the container

```bash
docker run --rm -p 3000:3000 bkimminich/juice-shop
```

If you built your own image locally instead, replace the image name:

```bash
docker run --rm -p 3000:3000 juice-shop
```

### Step 4: Open the application in your browser

```
http://localhost:3000
```

---

## Verifying the Installation

- The Juice Shop welcome page and product listing should load in the browser.
- A cookie consent banner and a score board / hint system are visible, confirming the app initialized correctly.
- Check the terminal output for a confirmation message such as `Server listening on port 3000`.

---

## Troubleshooting Tips

- **"Port already in use" error:** stop the conflicting process or use the `PORT` environment variable to pick a different port.
- **`npm install` fails:** confirm your Node.js version meets the minimum required in `package.json`, and try clearing the npm cache with `npm cache clean --force`.
- **Docker container exits immediately:** run `docker logs <container_id>` to inspect the error, and confirm Docker Desktop/daemon is running.
- **Blank page in browser:** hard-refresh (`Ctrl+Shift+R`) and confirm you're pointing at `http://localhost:3000`, not `https`.

---

## Notes

> ⚠️ OWASP Juice Shop is an **intentionally vulnerable** web application intended for security training, awareness demonstrations, and CTF exercises. Only run it in an isolated or controlled environment (local machine, private VM, or private network) and avoid exposing it to the public internet.
