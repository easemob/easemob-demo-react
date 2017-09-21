#!/bin/bash

set -e
cd webim-h5-deploy

docker images |grep webim-h5-deploy|awk '{print $3}'|xargs docker rmi -f

docker build -t docker-registry-cn.easemob.com/kubernetes/im/webim-h5-deploy:latest .

docker push docker-registry-cn.easemob.com/kubernetes/im/webim-h5-deploy:latest
