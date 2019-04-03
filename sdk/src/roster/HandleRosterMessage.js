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
var addRoster = function(option, type, conn){
    var emptyMessage = [];
    var rosterBody = conn.context.root.lookup("easemob.pb.RosterBody");
    var rosterBodyJson = rosterBody.decode(emptyMessage);
    if(type === 'add'){
        rosterBodyJson.operation = 2
    }
    else if(type === 'del'){
        rosterBodyJson.operation = 3
    }
    rosterBodyJson.from = conn.context.jid;
    rosterBodyJson.to = [{
        appKey: conn.appKey,
        name: option.to,
        domain: "easemob.com",
        clientResource: conn.clientResource
    }]
    // rosterBodyJson.reason = ;
    // rosterBodyJson.roster_ver = '';
    // rosterBodyJson.bi_direction = false;
    rosterBodyJson = rosterBody.encode(rosterBodyJson).finish();
    var MetaMessage = conn.context.root.lookup("easemob.pb.Meta");
    var MetaMessageJson = MetaMessage.decode(emptyMessage);
    MetaMessageJson.id = option.id || conn.getUniqueId();
    MetaMessageJson.from = conn.context.jid;
    MetaMessageJson.to = {
        domain: "@easemob.com",
    }
    MetaMessageJson.ns = 3;
    MetaMessageJson.payload = rosterBodyJson;
    var commSyncULMessage = conn.context.root.lookup("easemob.pb.CommSyncUL");
    var commSyncULMessageJson = commSyncULMessage.decode(emptyMessage);
    commSyncULMessageJson.meta = MetaMessageJson;
    commSyncULMessageJson = commSyncULMessage.encode(commSyncULMessageJson).finish();
    var msyncMessage = conn.context.root.lookup("easemob.pb.MSync");
    var msyncMessageJson = msyncMessage.decode(emptyMessage);
    msyncMessageJson.version = conn.version;
    msyncMessageJson.encryptType = [0];
    msyncMessageJson.command = 0;
    msyncMessageJson.guid = conn.jid;
    msyncMessageJson.payload = commSyncULMessageJson;
    msyncMessageJson = msyncMessage.encode(msyncMessageJson).finish();
    conn.sendMSync(msyncMessageJson);

}
var handleMessage = function(meta, conn){
	var self = conn;
	var messageBodyMessage = self.context.root.lookup("easemob.pb.RosterBody");
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

export {
    handleMessage,
    addRoster
}