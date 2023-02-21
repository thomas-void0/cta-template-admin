ARG NAME=node
ARG VERSION=18.14-alpine

FROM ${NAME}:${VERSION} as deps
WORKDIR /workspace
COPY yarn.lock package.json .yarnrc ./
RUN yarn install

FROM ${NAME}:${VERSION} as builder
WORKDIR /workspace
COPY --from=deps /workspace/node_modules ./node_modules
COPY . .
RUN yarn build

FROM ${NAME}:${VERSION} as runer
WORKDIR /workspace
COPY --from=builder /workspace/dist ./
CMD ["serve","-n","-s"]
