var Long = require("long");
var _utils = require("../utils").utils;
// var _msg = require('./message');
var ChatMessage = require('./sendChatMessage');
var sendDelivery = function(conn, msg ,msgId){
    if(conn.delivery){
        var id = conn.getUniqueId();
        var deliverMessage = new WebIM.message('delivery', id);
        deliverMessage.set({
            ackId: msgId
            , to: msg.from
        });
        ChatMessage.default(deliverMessage.body, conn);
        // self.send(deliverMessage.body);
    }
}
var handleMessage = function(meta, status, conn, ignoreCallback){
	var self = conn;
	var messageBodyMessage = self.context.root.lookup("easemob.pb.MessageBody");
    var thirdMessage = messageBodyMessage.decode(meta.payload);
    var msgId = new Long(meta.id.low, meta.id.high, meta.id.unsigned).toString();
    var ackMsgId = thirdMessage.ackMessageId ? new Long(thirdMessage.ackMessageId.low, thirdMessage.ackMessageId.high, thirdMessage.ackMessageId.unsigned).toString() : "";
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
    else if(thirdMessage.type === 4){
        type = "read_ack";     //发送ack没写
        conn.onReadMessage({
            mid: ackMsgId
        });
        return;
    }
    else if(thirdMessage.type === 5){
        type = "deliver_ack";
        conn.onDeliverdMessage({
            mid: ackMsgId
        });
        return;
    }
    else if(thirdMessage.type === 6){
        type = "recall";
        conn.onRecallMessage({     //需要增加一个回撤消息的监听
            mid: ackMsgId
        });
        return;
    }
    
    for (var i = 0; i < thirdMessage.contents.length; i++) {
        var msg = {};
        var errorBool = status.errorCode > 0;
        var errorCode = status.errorCode;
        var errorText = status.reason;
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
                    msg.error = errorBool;
                    msg.errorText = errorText;
                    msg.errorCode = errorCode;
                    !ignoreCallback && self.onEmojiMessage(msg);
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
                    msg.error = errorBool;
                    msg.errorText = errorText;
                    msg.errorCode = errorCode;
			       !ignoreCallback &&  conn.onTextMessage(msg);
                }
                break;
        case 1:
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
            msg.error = errorBool;
            msg.errorText = errorText;
            msg.errorCode = errorCode;
            !ignoreCallback && conn.onPictureMessage(msg);
            break;
        case 2:
            msg = {
                id: msgId
                , type: type
                , from: from
                , to: to
                ,
                url: msgBody.remotePath && (location.protocol != 'https:' && self.isHttpDNS) ? (self.apiUrl + msgBody.remotePath.substr(msgBody.remotePath.indexOf("/", 9))) : msgBody.remotePath
                , secret: msgBody.secretKey
                , filename: msgBody.displayName
                , length: msgBody.duration || ''
                , file_length: msgBody.fileLength || ''
                , filetype: msgBody.filetype || ''
                , accessToken: conn.token || ''
                , ext: extmsg
                // , delay: parseMsgData.delayTimeStamp
            };
            !msg.delay && delete msg.delay;
            msg.error = errorBool;
            msg.errorText = errorText;
            msg.errorCode = errorCode;
            !ignoreCallback && conn.onAudioMessage(msg);
            break;
        case 3:
            msg = {
                id: msgId
                , type: type
                , from: from
                , to: to
                , addr: msgBody.address
                , lat: msgBody.latitude
                , lng: msgBody.longitude
                , ext: extmsg
                // , delay: parseMsgData.delayTimeStamp
            };
            !msg.delay && delete msg.delay;
            msg.error = errorBool;
            msg.errorText = errorText;
            msg.errorCode = errorCode;
            !ignoreCallback && conn.onLocationMessage(msg);
            break;
        case 4:
            msg = {
                id: msgId
                , type: type
                , from: from
                , to: to
                ,
                url: msgBody.remotePath && (location.protocol != 'https:' && self.isHttpDNS) ? (self.apiUrl + msgBody.remotePath.substr(msgBody.remotePath.indexOf("/", 9))) : msgBody.remotePath
                , secret: msgBody.secretKey
                , filename: msgBody.displayName
                , file_length: msgBody.fileLength || ''
                , accessToken: conn.token || ''
                , ext: extmsg
                // , delay: parseMsgData.delayTimeStamp
            };
            !msg.delay && delete msg.delay;
            msg.error = errorBool;
            msg.errorText = errorText;
            msg.errorCode = errorCode;
            !ignoreCallback && conn.onVideoMessage(msg);
            break;
        case 5:
            msg = {
                id: msgId
                , type: type
                , from: from
                , to: to
                ,
                url: (location.protocol != 'https:' && self.isHttpDNS) ? (self.apiUrl + msgBody.remotePath.substr(msgBody.remotePath.indexOf("/", 9))) : msgBody.remotePath
                , secret: msgBody.secretKey
                , filename: msgBody.displayName
                , file_length: msgBody.fileLength
                , accessToken: conn.token || ''
                , ext: extmsg
                // , delay: parseMsgData.delayTimeStamp
            };
            !msg.delay && delete msg.delay;
            msg.error = errorBool;
            msg.errorText = errorText;
            msg.errorCode = errorCode;
            !ignoreCallback && conn.onFileMessage(msg);
            break;
        case 6:
            msg = {
                id: msgId
                , from: from
                , to: to
                , action: msgBody.action
                , ext: extmsg
                // , delay: parseMsgData.delayTimeStamp
            };
            msg.error = errorBool;
            msg.errorText = errorText;
            msg.errorCode = errorCode;
            !ignoreCallback && conn.onCmdMessage(msg);
            break;
        default:
            break;
        }

        // msg.error = "";
        // msg.errorText = "";
        // msg.errorCode = "";
        !ignoreCallback && sendDelivery(conn, msg, msgId);

        if (ignoreCallback) {
            msg.message_type = type
            return msg
        }
    }
    
}

export {handleMessage}