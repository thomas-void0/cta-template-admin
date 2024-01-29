ARG NODE=node
ARG NODE_VERSION=18.14-alpine
ARG NGINX=nginx
ARG NGINX_VERSION=1.22.1

FROM ${NODE}:${NODE_VERSION} as deps
WORKDIR /workspace
COPY pnpm-lock.yaml .npmrc ./
RUN pnpm fetch
COPY package.json ./
RUN pnpm install --frozen-lockfile --offline --ignore-scripts


FROM ${NODE}:${NODE_VERSION} as builder
WORKDIR /workspace

COPY --from=deps /workspace/node_modules ./node_modules
COPY . .
RUN pnpm build


FROM ${NGINX}:${NGINX_VERSION} as runer
WORKDIR /
COPY --from=builder /workspace/dist/ /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /workspace/nginx.conf /etc/nginx/conf.d/
