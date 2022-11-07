# syntax=docker/dockerfile:1
ARG VERSION="latest"
FROM node:${VERSION} AS builder
VOLUME ["/app"]
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM node:alpine
WORKDIR /app
COPY --from=builder ["./app/dist", "/app/dist/"]
COPY --from=builder ["./app/env", "/app/env/"]
COPY --from=builder ["./app/rbac", "/app/rbac/"]
COPY --from=builder ["./app/package.json", "./app/package-lock.json", "/app/"]
RUN npm install --production
ENTRYPOINT [ "npm", "run","start:prod" ]
EXPOSE 3000
