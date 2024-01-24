ARG NODE=node
ARG NODE_VERSION=18.14-alpine
ARG NGINX=nginx
ARG NGINX_VERSION=1.22.1

FROM ${NODE}:${NODE_VERSION} as deps
WORKDIR /workspace

COPY yarn.lock .yarnrc package.json prepare.js ./
RUN yarn install --frozen-lockfile 


FROM ${NODE}:${NODE_VERSION} as builder
WORKDIR /workspace

COPY --from=deps /workspace/node_modules ./node_modules
COPY . .
RUN yarn build


FROM ${NGINX}:${NGINX_VERSION} as runer
WORKDIR /
COPY --from=builder /workspace/dist/ /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /workspace/nginx.conf /etc/nginx/conf.d/
