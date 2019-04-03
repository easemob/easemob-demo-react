var Long = require("long");
var _utils = require("../utils").utils;
// var ChatMessage = require('./sendChatMessage');
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
	var messageBodyMessage = self.context.root.lookup("easemob.pb.MUCBody");
    var thirdMessage = messageBodyMessage.decode(meta.payload);
    var msgId = new Long(meta.id.low, meta.id.high, meta.id.unsigned).toString();
    var type = null;
    // if (thirdMessage.type === 1) {             //messagetype 群组/聊天室。。。。
    //     type = "chat";
    // }
    // else if (thirdMessage.type === 2) {
    //     type = "groupchat";
    // }
    // else if (thirdMessage.type === 3) {
    //     type = "chatroom";
    // }
    // else if(thirdMessage.type === 5){
    //     type = "deliver_ack";
    //     return;
    // }
    console.log(thirdMessage.operation);
    
    
}

export {handleMessage}