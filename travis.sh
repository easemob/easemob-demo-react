echo TAG: $TRAVIS_TAG
echo nexus_auth: ${nexus_auth}

packing(){
    cd ./demo
	npm install
    cd ../
    cd ./webrtc
    npm link
    cd ../
    cd ./demo
    npm link easemob-webrtc
    cd ../
    cd ./emedia
    npm link
    cd ../
    cd ./demo
    npm link easemob-emedia
    cd ../
    cd ./demo
    npm run build
}

upload(){
	# 为了不修改 ci，copy 一份
	cp -r ./demo/build ./chatdemo-webim
	zip -r $TRAVIS_TAG.zip chatdemo-webim
	curl -v -F r=releases -F hasPom=false -F e=zip -F g=com.easemob.chatdemo2 -F a=webim -F v=$TRAVIS_TAG -F p=zip -F file=@$TRAVIS_TAG.zip -u ${nexus_auth} https://hk.nexus.op.easemob.com/nexus/service/local/artifact/maven/content
}


if [ $TRAVIS_TAG ]; then
	echo -e "\n[is a tag] start packing\n"
	packing || exit 1
	upload
else
	echo -e "\n[not a tag] exit packing\n"
fi