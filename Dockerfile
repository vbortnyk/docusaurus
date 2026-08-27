FROM node:20.16-alpine as builder

WORKDIR /app

ARG BLOG_ENABLED=false
ARG DEPLOYMENT_URL="https://vbortnyk.github.io"
ARG DEPLOYMENT_BRANCH="main"
ARG GITHUB_ORG="vbortnyk"
ARG GITHUB_PROJECT="docusaurus"

COPY . $WORKDIR

RUN npm install && npm run build

FROM nginx:latest as runner

COPY --from=builder /app/build /usr/share/nginx/html