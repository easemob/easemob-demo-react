echo TAG: $TRAVIS_TAG
echo nexus_auth: ${nexus_auth}

packing(){
    cd ./demo
	npm install
    cd ../
    echo -e "\nINSTALL DONE.\n"

    cd ./webrtc
    npm link
    cd ../
    echo -e "\nCREATE [WEBRTC] GLOBAL LINK DONE.\n"

    cd ./emedia
    npm link
    cd ../
    echo -e "\nCREATE [EMEDIA] GLOBAL LINK DONE.\n"

    cd ./demo
    npm link easemob-webrtc
    cd ../
    echo -e "\nLINK [WEBRTC] DONE.\n"

    cd ./demo
    npm link easemob-emedia
    cd ../
    echo -e "\nLINK [EMEDIA] DONE.\n"

    cd ./demo
    npm run build
    cd ../
    echo -e "\nBUILD DONE.\n"
}

upload(){
	# 为了不修改 ci，copy 一份
    echo -e "\nCOPY files...\n"
	cp -r ./demo/build ./chatdemo-webim
   
    echo -e "\nZIP files...\n"
	zip -r $TRAVIS_TAG.zip chatdemo-webim
    
    UPLOAD_PARAMS="-v -F r=releases -F hasPom=false -F e=zip -F g=com.easemob.chatdemo2 -F a=webim -F v="$TRAVIS_TAG" -F p=zip -F file=@"$TRAVIS_TAG".zip -u "${nexus_auth}
    UPLOAD_URL="https://hk.nexus.op.easemob.com/nexus/service/local/artifact/maven/content"
    echo -e "\nUPLOAD ZIP..."
    echo -e $UPLOAD_PARAMS"\n"$UPLOAD_URL"\n"
	curl $UPLOAD_PARAMS $UPLOAD_URL
}


if [ $TRAVIS_TAG ]; then
	echo -e "\n[is a tag] start packing\n"
	packing || exit 1
	upload
else
	echo -e "\n[not a tag] exit packing\n"
fi