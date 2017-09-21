#!/bin/bash

cd webim-h5-online

docker images |grep webim-h5-online|awk '{print $3}'|xargs docker rmi -f

docker build -t docker-registry-cn.easemob.com/kubernetes/im/webim-h5-online:latest .

docker push docker-registry-cn.easemob.com/kubernetes/im/webim-h5-online:latest
