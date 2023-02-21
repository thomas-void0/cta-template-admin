ARG NAME=node
ARG VERSION=18.14-alpine
ARG PROXY=nginx
ARG PROXY_VERSION=1.22.1

FROM ${NAME}:${VERSION} as deps
WORKDIR /workspace
COPY yarn.lock package.json .yarnrc ./
RUN yarn install

FROM ${NAME}:${VERSION} as builder
WORKDIR /workspace
COPY --from=deps /workspace/node_modules ./node_modules
COPY . .
RUN yarn build

FROM ${PROXY}:${PROXY_VERSION} as runer
LABEL maintainer="thomas-void0 <yjy15680489038@163.com>"
WORKDIR /
COPY /nginx/ /etc/nginx/
COPY --from=builder /workspace/dist/ /usr/share/nginx/html/
EXPOSE 80
# CMD envsubst < /nginx.conf.template > /etc/nginx/nginx.conf \
# 	&& cat /etc/nginx/nginx.conf \
# 	&& nginx -g "daemon off;"

# FROM ${NAME}:${VERSION} as runer
# WORKDIR /workspace
# COPY --from=builder /workspace/dist ./
# CMD ["serve","-n","-s"]

