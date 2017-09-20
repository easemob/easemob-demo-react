#!/bin/bash

set -e

CURDIR=$(cd "$(dirname "$0")"; pwd)
. ${CURDIR}/../docker-env.sh


cd ../../

VERSION=`grep version sdk/package.json|awk -F '"' '{printf("%s",$4)}'`
VERSION=2.0
echo version=$VERSION


IMAGE_NAME="docker-registry-cn.easemob.com/kubernetes/im/webim"
IMAGE_TAG=$IMAGE_NAME:$VERSION


echo "=== Building  image ${IMAGE_TAG} ==="




cp -r demo/build publish/
cp -r demo/storybook-static publish/storybook

file_conf="./demo/javascript/dist/webim.config.js"

echo 'publish done!'

rm -rf $CURDIR/webim/webim
mv publish $CURDIR/webim/webim

cd  $CURDIR/webim
docker build -t $IMAGE_TAG .

echo "=== Building done ==="
