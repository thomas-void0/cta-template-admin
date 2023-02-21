#!/bin/bash
set -eu

printf "==========start build images==========\n"

TAG=th-template:prodution
docker build --build-arg NODE_IMAGE_TAG=18.14-alpine -t $TAG -f Dockerfile .

printf "==========del legacy container==========\n"
docker rm -f th-template 2> /dev/null

printf "==========del legacy images==========\n"
docker rmi -f $TAG 2> /dev/null

printf "==========run new images==========\n"
docker run --name th-template -d -p 1314:3000 $TAG
