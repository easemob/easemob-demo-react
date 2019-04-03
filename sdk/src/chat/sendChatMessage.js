    var _utils = require("../utils").utils;

    var sendMessage = function(messageOption, conn){
        var self = conn;

        var emptyMessage = [];
        var contentMessage = conn.context.root.lookup("easemob.pb.MessageBody.Content");
        var fifthMessage = contentMessage.decode(emptyMessage);
        switch(messageOption.type){
            case 'txt':
                fifthMessage.type = 0;
                fifthMessage.text = messageOption.msg;
                break;
            case 'img':
                fifthMessage.type = 1;
                fifthMessage.displayName = messageOption.body.filename;
                fifthMessage.remotePath = messageOption.body.url;
                fifthMessage.secretKey = messageOption.body.secret;
                fifthMessage.fileLength = messageOption.body.file_length;
                fifthMessage.size = messageOption.body.size;
                fifthMessage.thumbnailDisplayName = messageOption.body.filename;
                break;
            case 'audio':
                fifthMessage.type = 2;
                break;
            case 'loc':
                fifthMessage.type = 3;
                break;
            case 'audio':
                fifthMessage.type = 4;
                break;
            case 'file':
                fifthMessage.type = 5;
                break;
            case 'cmd':
                fifthMessage.type = 6;
                break;
            // default:
            //     fifthMessage.type = 0;
            //     break;
        }
        var messageBody = conn.context.root.lookup("easemob.pb.MessageBody");
        var fourthMessage = messageBody.decode(emptyMessage);
        if(messageOption.type === "delivery"){   //目前为单聊的delivery
            fourthMessage.type = 5;
            fourthMessage.from = conn.context.jid;
            fourthMessage.to = {
                appKey: conn.appKey,
                name: messageOption.to,
                domain: "easemob.com",
                clientResource: conn.clientResource
            }
            fourthMessage.ack_message_id = messageOption.bodyId;
        }
        else if(!messageOption.group && !messageOption.roomType){
            fourthMessage.type = 1;
            fourthMessage.from = conn.context.jid;
            fourthMessage.to = {
                appKey: conn.appKey,
                name: messageOption.to,
                domain: "easemob.com",
                clientResource: conn.clientResource
            }
        }
        else if (messageOption.group === "groupchat" && !messageOption.roomType) {
            fourthMessage.type = 2;
            fourthMessage.from = {
                appKey: conn.appKey,
                name: conn.user,
                domain: "conference.easemob.com",
                clientResource: conn.clientResource
            };
            fourthMessage.to = {
                appKey: conn.appKey,
                name: messageOption.to,
                domain: "conference.easemob.com",
                clientResource: conn.clientResource
            }

        }
        else if (messageOption.group === "groupchat" && messageOption.roomType) {
            fourthMessage.type = 3;
            fourthMessage.from = {
                appKey: conn.appKey,
                name: conn.user,
                domain: "conference.easemob.com",
                clientResource: conn.clientResource
            };
            fourthMessage.to = {
                appKey: conn.appKey,
                name: messageOption.to,
                domain: "conference.easemob.com",
                clientResource: conn.clientResource
            }
        }
        fourthMessage.contents = [fifthMessage];

        fourthMessage = messageBody.encode(fourthMessage).finish();
        var MetaMessage = conn.context.root.lookup("easemob.pb.Meta");
        var thirdMessage = MetaMessage.decode(emptyMessage);
        thirdMessage.id = messageOption.id;
        if(messageOption.type === "delivery"){   //目前为单聊的delivery
            thirdMessage.from = conn.context.jid;
            thirdMessage.to = {
                appKey: conn.appKey,
                name: messageOption.to,
                domain: "easemob.com",
                clientResource: conn.clientResource
            }
        }
        else if(!messageOption.group && !messageOption.roomType){
            thirdMessage.from = conn.context.jid;
            thirdMessage.to = {
                appKey: conn.appKey,
                name: messageOption.to,
                domain: "easemob.com",
                clientResource: conn.clientResource
            }
        }
        else if (messageOption.group === "groupchat" && !messageOption.roomType ) {
            thirdMessage.from = {
                appKey: conn.appKey,
                name: conn.user,
                domain: "conference.easemob.com",
                clientResource: conn.clientResource
            };
            thirdMessage.to = {
                appKey: conn.appKey,
                name: messageOption.to,
                domain: "conference.easemob.com",
                clientResource: conn.clientResource
            }
        }
        else if (messageOption.group === "groupchat" && messageOption.roomType) {
            thirdMessage.from = {
                appKey: conn.appKey,
                name: conn.user,
                domain: "conference.easemob.com",
                clientResource: conn.clientResource
            };
            thirdMessage.to = {
                appKey: conn.appKey,
                name: messageOption.to,
                domain: "conference.easemob.com",
                clientResource: conn.clientResource
            }
        }
        thirdMessage.ns = 1;
        thirdMessage.payload = fourthMessage;
        var commSyncULMessage = conn.context.root.lookup("easemob.pb.CommSyncUL");
        var secondMessage = commSyncULMessage.decode(emptyMessage);
        secondMessage.meta = thirdMessage;
        secondMessage = commSyncULMessage.encode(secondMessage).finish();
        var msyncMessage = conn.context.root.lookup("easemob.pb.MSync");
        var firstMessage = msyncMessage.decode(emptyMessage);
        firstMessage.version = conn.version;
        firstMessage.encryptType = [0];
        firstMessage.command = 0;
        firstMessage.guid = conn.jid;
        firstMessage.payload = secondMessage;
        firstMessage = msyncMessage.encode(firstMessage).finish();
        conn.sendMSync(firstMessage);
    }

    var sendChatMessage = function(messageOption, conn){
        var me = this;
        this.msg = messageOption;
        if(messageOption.file){
            var _tmpComplete = this.msg.onFileUploadComplete;
            var _complete = function (data) {
                if (data.entities[0]['file-metadata']) {
                    var file_len = data.entities[0]['file-metadata']['content-length'];
                    // me.msg.file_length = file_len;
                    me.msg.filetype = data.entities[0]['file-metadata']['content-type'];
                    if (file_len > 204800) {
                        me.msg.thumbnail = true;
                    }
                }

                me.msg.body = {
                    type: me.msg.type || 'file'
                    ,
                    url: ((location.protocol != 'https:' && conn.isHttpDNS) ? (conn.apiUrl + data.uri.substr(data.uri.indexOf("/", 9))) : data.uri) + '/' + data.entities[0]['uuid']
                    , 
                    secret: data.entities[0]['share-secret']
                    , 
                    filename: me.msg.file.filename || me.msg.filename
                    , 
                    size: {
                        width: me.msg.width || 0
                        , height: me.msg.height || 0
                    }
                    , 
                    length: me.msg.length || 0
                    , 
                    file_length: me.msg.ext.file_length || 0
                    , 
                    filetype: me.msg.filetype
                }
                sendMessage(me.msg, conn);
                _tmpComplete instanceof Function && _tmpComplete(data, me.msg.id);
            };

            me.msg.onFileUploadComplete = _complete;
            _utils.uploadFile.call(conn, me.msg);
        }
        else{
            sendMessage(me.msg, conn);
        }
    }


    export default sendChatMessage;

 