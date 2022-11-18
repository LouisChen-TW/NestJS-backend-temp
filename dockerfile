# syntax=docker/dockerfile:1
ARG NODE_IMAGE=node:19.1

FROM ${NODE_IMAGE} AS builder
VOLUME ["/app"]
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM ${NODE_IMAGE}-alpine
WORKDIR /app
COPY --from=builder ["./app/dist", "/app/dist/"]
COPY --from=builder ["./app/.env", "/app/.env"]
COPY --from=builder ["./app/rbac", "/app/rbac/"]
COPY --from=builder ["./app/package.json", "./app/package-lock.json", "/app/"]
RUN npm install --production
ENTRYPOINT [ "npm", "run","start:prod" ]
EXPOSE 3000
