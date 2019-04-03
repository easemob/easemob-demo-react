var Long = require("long");
var _utils = require("../utils").utils;
// var _msg = require('./message');
var ChatMessage = require('./sendChatMessage');
var sendDelivery = function(conn, msg ,msgId){
    if(conn.delivery){
        var id = conn.getUniqueId();
        var deliverMessage = new WebIM.message('delivery', id);
        deliverMessage.set({
            bodyId: msgId
            , to: msg.from
        });
        ChatMessage.default(deliverMessage.body, conn);
        // self.send(deliverMessage.body);
    }
}
var handleMessage = function(meta, conn){
	var self = conn;
	var messageBodyMessage = self.context.root.lookup("easemob.pb.MessageBody");
    var thirdMessage = messageBodyMessage.decode(meta.payload);
    var msgId = new Long(meta.id.low, meta.id.high, meta.id.unsigned).toString();
    var type = null;
    if (thirdMessage.type === 1) {             //messagetype 群组/聊天室。。。。
        type = "chat";
    }
    else if (thirdMessage.type === 2) {
        type = "groupchat";
    }
    else if (thirdMessage.type === 3) {
        type = "chatroom";
    }
    else if(thirdMessage.type === 5){
        type = "deliver_ack";
        return;
    }
    for (var i = 0; i < thirdMessage.contents.length; i++) {
        var msg = {};
        var msgBody = thirdMessage.contents[i];
        var from = thirdMessage.from.name;
        var to = thirdMessage.to.name
        var extmsg = thirdMessage.ext || {}
        switch(msgBody.type){                               //contentsType 为消息类型 txt、img。。。
            case 0:
            	var receiveMsg = thirdMessage.contents[i].text;
            	var emojibody = _utils.parseTextMessage(receiveMsg, WebIM.Emoji);
            	if (emojibody.isemoji) {
                    msg = {
                        id: msgId
                        , type: type
                        , from: from
                        , to: to
                        // , delay: parseMsgData.delayTimeStamp
                        , data: emojibody.body
                        , ext: extmsg
                    };
                    !msg.delay && delete msg.delay;
                    self.onEmojiMessage(msg);
                }
                else{
		            msg = {
		                id: msgId,
		                type: type,
		                from: from,
		                to: to,
		                data: msgBody.text,
		                ext: thirdMessage.ext,
		                sourceMsg: msgBody.text
		            }
		            msg.error = "";
			        msg.errorText = "";
			        msg.errorCode = "";
			        conn.onTextMessage(msg);
                }
                sendDelivery(conn, msg, msgId);
            break;
        case 1:
        	// var rwidth = 0;
         //    var rheight = 0;
            if (msgBody.size) {
                var rwidth = msgBody.size.width || 0;
                var rheight = msgBody.size.height || 0;
            }
            msg = {
                id: msgId
                , type: type
                , from: from
                , to: to
                ,
                url: msgBody.remotePath && (location.protocol != 'https:' && self.isHttpDNS) ? (self.apiUrl + msgBody.remotePath.substr(msgBody.remotePath.indexOf("/", 9))) : msgBody.remotePath
                , secret: msgBody.secretKey
                , filename: msgBody.displayName
                , thumb: msgBody.thumbnailRemotePath
                , thumb_secret: msgBody.thumbnailSecretKey
                , file_length: msgBody.fileLength || ''
                , width: rwidth
                , height: rheight
                , filetype: msgBody.filetype || ''
                , accessToken: conn.token || ''
                , ext: extmsg
                // , delay: parseMsgData.delayTimeStamp
            };
            !msg.delay && delete msg.delay;
            msg.error = "";
            msg.errorText = "";
            msg.errorCode = "";
            sendDelivery(conn, msg, msgId);
            conn.onPictureMessage(msg);
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        default:
            break;
        }

        // msg.error = "";
        // msg.errorText = "";
        // msg.errorCode = "";
        // conn.onTextMessage(msg);
    }
    
}

export {handleMessage}