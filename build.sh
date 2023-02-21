#!/bin/bash
set -eu

printf "==========del legacy images==========\n"
docker rmi -f $TAG 2> /dev/null

printf "==========start build images==========\n"

TAG=th-template:prodution
docker build --pull -t $TAG -f Dockerfile .

printf "==========del legacy container==========\n"
docker rm -f th-template 2> /dev/null

printf "==========run new container==========\n"
docker run --name th-template -d -p 1314:3000 $TAG
