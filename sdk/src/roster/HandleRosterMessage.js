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
var operatRoster = function(option, type, conn){
    var emptyMessage = [];
    var rosterBody = conn.context.root.lookup("easemob.pb.RosterBody");
    var rosterBodyJson = rosterBody.decode(emptyMessage);
    if(type === 'add'){
        rosterBodyJson.operation = 2
    }
    else if(type === 'remove'){
        rosterBodyJson.operation = 3
    }
    else if(type === 'accept'){
        rosterBodyJson.operation = 4
    }
    else if(type === 'decline'){
        rosterBodyJson.operation = 5
    }
    rosterBodyJson.from = conn.context.jid;
    rosterBodyJson.to = [{
        appKey: conn.appKey,
        name: option.to,
        domain: "easemob.com",
        clientResource: conn.clientResource
    }]
    rosterBodyJson.reason = option.message;
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
    var msg = {
        to: thirdMessage.to[0].name,
        from: thirdMessage.from.name,
        status: thirdMessage.reason
    };
    switch (thirdMessage.operation){
        case 0:
            break;
        case 2:
            msg.type = 'subscribe';
            break;
        case 3:
            msg.type = 'unsubscribed';
            break;
        case 4:
            msg.type = 'subscribed';
            break;
        case 5:
            msg.type = 'unsubscribed';
            break;
        case 6:
            break;
        case 7:
            break;
        case 8:
            msg.type = 'subscribed';
            break;
        case 9:
            msg.type = 'unsubscribed';
             break;

    }

    conn.onPresence(msg);
    console.log(thirdMessage.operation);
    
    
}

export {
    handleMessage,
    operatRoster
}