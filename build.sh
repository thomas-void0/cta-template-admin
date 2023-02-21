#!/bin/bash
set -eu
TAG=th-template
docker build --build-arg NODE_IMAGE_TAG=18.14-alpine -t $TAG -f Dockerfile .
docker push $TAG

docker rm -f th-template 2> /dev/null
docker rmi -f $TAG 2> /dev/null

docker run --name th-template -d -p 1314:3000 $TAG
