ARG NAME=node
ARG VERSION=18.14-alpine
ARG PROXY=nginx
ARG PROXY_VERSION=1.22.1

FROM ${NAME}:${VERSION} as deps
WORKDIR /workspace
COPY package-lock.json package.json .npmrc ./
RUN npm install

FROM ${NAME}:${VERSION} as builder
WORKDIR /workspace
COPY --from=deps /workspace/node_modules ./node_modules
COPY . .
RUN npm run build

FROM ${PROXY}:${PROXY_VERSION} as runer
LABEL maintainer="thomas-void0 <yjy15680489038@163.com>"
WORKDIR /
COPY --from=builder /workspace/dist/ /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /workspace/nginx.conf /etc/nginx/conf.d/

