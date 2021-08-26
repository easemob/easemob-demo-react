//初始化IM SDK
WebIM.config = config;
WebIM.conn = new WebIM.connection({
    appKey: WebIM.config.appkey,
    isHttpDNS: WebIM.config.isHttpDNS,
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    host: WebIM.config.Host,
    https: WebIM.config.https,
    url: WebIM.config.xmppURL,
    apiUrl: WebIM.config.apiURL,
    isAutoLogin: false,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    isStropheLog: WebIM.config.isStropheLog,
    delivery: WebIM.config.delivery
})


//实时获取时间
var newDate;
window.onload = function () {
    setInterval(function () {
        var time = new Date();   // 程序计时的月从0开始取值后+1   
        var m = time.getMonth() + 1;
        var t = time.getFullYear() + "-" + m + "-"
            + time.getDate() + " " + time.getHours() + ":"
            + time.getMinutes() + ":" + time.getSeconds();
        newDate = t;
    }, 1000);
};

//注册IM 回调
WebIM.conn.listen({
    onOpened: function (message) {          //连接成功回调
        console.log("%c [opened] 连接已成功建立", "color: green", newDate);
    },
    onClosed: function (message) {
        console.log("退出登陆", newDate);
    },         //连接关闭回调
    onTextMessage: function (message) {
        console.log('onTextMessage: ', message);
        //判断是否有扩展字段，会议ID是否为空，如果有会议ID 就加入会议
    },    //收到文本消息
    onEmojiMessage: function (message) {
        console.log('onEmojiMessage: ', message);
    },   //收到表情消息
    onPictureMessage: function (message) {
        console.log('onPicMessage: ', message);
    }, //收到图片消息
    onCmdMessage: function (message) {
        console.log('onCmdMessage: ', message);
    },     //收到命令消息
    onAudioMessage: function (message) {
        console.log('onAudioMessage: ', message);
        window.localStorage.setItem('audioUrl', message.url)
        let options = {
            url: message.url,
            headers: {
                Accept: "audio/mp3"
            },
            onFileDownloadComplete: function (response) {
                console.log('>>>', response)
                // let objectUrl = WebIM.default.utils.parseDownloadResponse.call(WebIM.conn, response);
                var audio = document.createel;
                var audio = document.createElement('audio');
                document.body.appendChild(audio);
                audio.src = options.url;
                audio.controls = true

            },
            onFileDownloadError: function () {
                console.log("音频下载失败");
            }
        };
        WebIM.utils.download.call(WebIM.conn, options)
    },   //收到音频消息
    onLocationMessage: function (message) {
        console.log('onLocMessage: ', message);
    },//收到位置消息
    onFileMessage: function (message) {
        console.log('onFileMessage: ', message);
    },    //收到文件消息
    recallMessage: function (message) {
        console.log('recallMessage', message);
    }, //消息撤回
    onVideoMessage: function (message) {
        console.log('onVideoMessage: ', message);
        var node = document.getElementById('getVideo');
        var option = {
            url: message.url,
            headers: {
                'Accept': 'audio/mp4'
            },
            onFileDownloadComplete: function (response) {
                var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
                node.src = objectURL;
            },
            onFileDownloadError: function () {
                console.log('File down load error.')
            }
        };
        WebIM.utils.download.call(conn, option);
    },   //收到视频消息
    onPresence: function (message) {
        var myDate = new Date().toLocaleString();
        console.log('onPresence: ', myDate + JSON.stringify(message));
        switch (message.type) {
            case 'subscribe': // 对方请求添加好友
                var truthBeTold = window.confirm((message.from + "申请添加您为好友:"));
                if (truthBeTold) {
                    // 同意对方添加好友
                    WebIM.conn.subscribed({
                        to: message.from,
                        message: "[resp:true]"
                    });
                    console.log("同意添加好友");
                } else {
                    // 拒绝对方添加好友
                    WebIM.conn.unsubscribed({
                        to: message.from,
                        message: "rejectAddFriend" // 拒绝添加好友回复信息
                    });
                    console.log("拒绝添加好友");
                }
                break;
            case 'subscribed': // 对方同意添加好友，已方同意添加好友
                break;
            case 'unsubscribe': // 对方删除好友
                break;
            case 'unsubscribed': // 被拒绝添加好友，或被对方删除好友成功
                break;
            case 'memberJoinPublicGroupSuccess': // 成功加入聊天室
                console.log('join chat room success' + myDate);
                console.log(new Date().toLocaleString());
                break;
            case 'joinChatRoomFaild': // 加入聊天室失败
                console.log('join chat room faild');
                break;
            case 'joinPublicGroupSuccess': // 意义待查
                console.log('join public group success', message.from);
                break;

            case "joinGroupNotifications":  //收到申请加群通知
                var groupNotifications = window.confirm((message.from + "申请加入群组: " + message, groupid));
                if (groupNotifications) {
                    // 同意申请
                    var options = {
                        applicant: message.from,                          // 申请加群的用户名
                        groupId: message, groupid,                              // 群组ID
                        success: function (res) {
                            console.log('同意进群', res);
                        }
                    };
                    WebIM.conn.agreeJoinGroup(options);
                } else {
                    // 拒绝申请
                    var options = {
                        applicant: message.from,                // 申请加群的用户名
                        groupId: message, groupid,                    // 群组ID
                        success: function (res) {
                            console.log('同意进群', res);
                        }
                    };
                    WebIM.conn.rejectJoinGroup(options);
                }
                break;
            case "direct_joined":
                console.log('收到群组邀请', message)
                break;
            case 'createGroupACK':
                conn.createGroupAsync({
                    from: message.from,
                    success: function (option) {
                        console.log('Create Group Succeed');
                    }
                });
                break;
        }
    },       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
    onRoster: function (message) {
        for (var i = 0, l = message.length; i < l; i++) {
            var ros = message[i];
            if (ros.subscription === 'both' || ros.subscription === 'to') {
                console.log(ros.name)
            }
        }
    },         //处理好友申请
    onInviteMessage: function (message) {
        console.log('Invite');
    },  //处理群组邀请
    onOnline: function () {
        console.log("onOnline");
    },                  //本机网络连接成功
    onOffline: function () {
        console.log('offline');
    },                 //本机网络掉线
    onError: function (message) {
        console.log('onError: ', message);

    },          //失败回调
    onBlacklistUpdate: function (list) {       //黑名单变动
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        console.log(list);
    },
    onReceivedMessage: function (message) {
        console.log('onReceivedMessage: ', message);
    },    //收到消息送达服务器回执
    onDeliveredMessage: function (message) {
        console.log('onDeliveredMessage：', message);
    },   //收到消息送达客户端回执
    onReadMessage: function (message) {
        console.log('onReadMessage: ', message);
    },        //收到消息已读回执
    onCreateGroup: function (message) {
        console.log('onCreateGroup: ', message);
    },        //创建群组成功回执（需调用createGroupNew）
    onMutedMessage: function (message) {
        console.log('onMutedMessage: ', message);
    }         //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
});