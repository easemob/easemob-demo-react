var _version = '1.4.13';
var all = require('./all');
var protobuf = require('protobufjs');
var SockJS = require('sockjs-client');
var Base64 = require('Base64')

var _code = require('./status').code; 
var _utils = require('./utils').utils; 
var _msg = require('./message');
var _message = _msg._msg;
var _msgHash = {};
var Queue = require('./queue').Queue;

var ChatMessage = require('./chat/sendChatMessage');
var HandleChatMessage = require('./chat/handleChatMessage');
var HandleMucMessage = require('./muc/HandleMucMessage');
var HandleRosterMessage = require('./roster/HandleRosterMessage');

var CryptoJS = require('crypto-js');
var _ = require('underscore');

var Long = require("long");
protobuf.util.Long = Long;
protobuf.configure();
var sock;
var mr_cache = {};


var root = protobuf.Root.fromJSON(all);
// var sock = new SockJS('http://39.107.157.123:8280/ws');

// sock.onopen = function (a,b,c) {
//     console.log(a,111);
//     console.log(b,22);
//     console.log(c,33);
//     console.log("open");
//     connection.onOpened();
// };

var Strophe = window.Strophe
var isStropheLog;
var stropheConn = null

window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

var logMessage = function (message) {
}

if (window.XDomainRequest) {

    // not support ie8 send is not a function , canot 
    // case send is object, doesn't has a attr of call
    // XDomainRequest.prototype.oldsend = XDomainRequest.prototype.send;
    // XDomainRequest.prototype.send = function () {
    //     XDomainRequest.prototype.oldsend.call(this, arguments);
    //     this.readyState = 2;
    // };
}



var _listenNetwork = function (onlineCallback, offlineCallback) {

    if (window.addEventListener) {
        window.addEventListener('online', onlineCallback);
        window.addEventListener('offline', offlineCallback);

    } else if (window.attachEvent) {
        if (document.body) {
            document.body.attachEvent('ononline', onlineCallback);
            document.body.attachEvent('onoffline', offlineCallback);
        } else {
            window.attachEvent('load', function () {
                document.body.attachEvent('ononline', onlineCallback);
                document.body.attachEvent('onoffline', offlineCallback);
            });
        }
    } else {
        /*var onlineTmp = window.ononline;
         var offlineTmp = window.onoffline;

         window.attachEvent('ononline', function () {
         try {
         typeof onlineTmp === 'function' && onlineTmp();
         } catch ( e ) {}
         onlineCallback();
         });
         window.attachEvent('onoffline', function () {
         try {
         typeof offlineTmp === 'function' && offlineTmp();
         } catch ( e ) {}
         offlineCallback();
         });*/
    }
};

var _parseRoom = function (result) {       //已废弃的方法里使用
    var rooms = [];
    var items = result.getElementsByTagName('item');
    if (items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var roomJid = item.getAttribute('jid');
            var tmp = roomJid.split('@')[0];
            var room = {
                jid: roomJid,
                name: item.getAttribute('name'),
                roomId: tmp.split('_')[1]
            };
            rooms.push(room);
        }
    }
    return rooms;
};

var _parseRoomOccupants = function (result) {    //已废弃的方法里使用
    var occupants = [];
    var items = result.getElementsByTagName('item');
    if (items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var room = {
                jid: item.getAttribute('jid'),
                name: item.getAttribute('name')
            };
            occupants.push(room);
        }
    }
    return occupants;
};


var _parseNameFromJidFn = function (jid, domain) {     //*******删掉或者改动 */
    return jid.name;
};

var _getSock = function(conn){
    if (location.protocol != 'https:' && conn.isHttpDNS) {
        var host = conn.xmppHosts[conn.xmppIndex];
        var domain = host.domain;
        var ip = host.ip;
        if (ip) {
            url = ip;
            var port = host.port;
            if (port != '80') {
                url += ':' + port;
            }
        } else {
            url = domain;
        }
        if(url){
            // var parter = /(.+\/\/).+(\/.+)/;
            // conn.url = conn.url.replace(parter, "$1" + url + "$2");
            conn.url = "//" + url + "/ws";
        }
    }
    return new SockJS(conn.url);
}
var _login = function (options, conn) {
    if(!options){
        return;
    }
    
    sock = _getSock(conn);

    sock.onopen = function () {
        var emptyMessage = [];

        var provisionMessage = root.lookup("easemob.pb.Provision");
        var secondMessage = provisionMessage.decode(emptyMessage);
        conn.logOut = false;
        conn.offLineSendConnecting = false;
        if (conn.unSendMsgArr.length > 0) {
            console.log("unSendMesArr",conn.unSendMsgArr);
            for (var i in conn.unSendMsgArr) {
                var str = conn.unSendMsgArr[i];
                conn.sendMSync(str);
                delete conn.unSendMsgArr[i];
            }
        }

        secondMessage.compressType = conn.compressType;
        secondMessage.encryptType = conn.encryptType;
        secondMessage.osType = conn.osType;
        secondMessage.version = conn.version;
        secondMessage.deviceName = "websdk";
        secondMessage.resource = (new Date()).valueOf();
        secondMessage.auth = "$t$" + options.access_token;
        secondMessage = provisionMessage.encode(secondMessage).finish();
        var firstLookUpMessage = root.lookup("easemob.pb.MSync");
        var firstMessage = firstLookUpMessage.decode(emptyMessage);

        firstMessage.version = conn.version;
        firstMessage.guid = conn.context.jid;
        firstMessage.auth = "$t$" + options.access_token;
        firstMessage.command = 3;
        firstMessage.deviceId = conn.deviceId;
        firstMessage.encryptType = conn.encryptType;
        firstMessage.payload = secondMessage;
        firstMessage = firstLookUpMessage.encode(firstMessage).finish();
        base64transform(firstMessage);
        conn.onOpened();
    };

    sock.onclose = function (e) {
        if(!conn.logOut 
            && conn.autoReconnectNumTotal <= conn.autoReconnectNumMax 
            && conn.autoReconnectNumTotal <= conn.xmppHosts.length
            && conn.xmppIndex < conn.xmppHosts.length
        )
        {
            conn.reconnect();
        }
        var error = {
            type: _code.WEBIM_CONNCTION_DISCONNECTED
        };
        conn.onError(error);
        console.log("close",e);
    };

    sock.onmessage = function (e) {
        console.log("返回消息" + e.data);
        var getmessage = Base64.atob(e.data);
       //var getmessage = window.atob(e.data);
        var arr = [];
        for (var i = 0, j = getmessage.length; i < j; ++i) {
            arr.push(getmessage.charCodeAt(i));
        }
        var tmpUint8Array = new Uint8Array(arr);    //注释：ie9不兼容https://www.cnblogs.com/jiangxiaobo/p/6016431.html

        var mainMessage = root.lookup("easemob.pb.MSync");
        var result = mainMessage.decode(tmpUint8Array);
        switch (result.command) {
            case 0:
                var CommSyncDLMessage = root.lookup("easemob.pb.CommSyncDL");
                CommSyncDLMessage = CommSyncDLMessage.decode(result.payload);
                var msgId = new Long(CommSyncDLMessage.serverId.low,CommSyncDLMessage.serverId.high, CommSyncDLMessage.serverId.unsigned).toString();
                var metaId = new Long(CommSyncDLMessage.metaId.low,CommSyncDLMessage.metaId.high, CommSyncDLMessage.metaId.unsigned).toString();
                console.log(CommSyncDLMessage);
                if (CommSyncDLMessage.metas.length !== 0) {
                        metapayload(CommSyncDLMessage.metas, CommSyncDLMessage.status, conn);
                        lastsession(CommSyncDLMessage.nextKey, CommSyncDLMessage.queue);
                }
                else if(CommSyncDLMessage.isLast){
                    //当前为最后一条消息
                }
                else if(CommSyncDLMessage.status.errorCode === 0){
                    if (_msgHash[metaId]) {
                        try {
                            _msgHash[metaId].success instanceof Function && _msgHash[metaId].success(metaId, msgId);
                        } catch (e) {
                            this.onError({
                                type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR
                                , data: e
                            });
                        }
                        delete _msgHash[metaId];
                    }
                    conn.onReceivedMessage({
                        id: metaId,
                        mid: msgId
                    })
                }
                break;
            case 1:
                var CommUnreadDLMessage = root.lookup("easemob.pb.CommUnreadDL");
                CommUnreadDLMessage = CommUnreadDLMessage.decode(result.payload);
                if (CommUnreadDLMessage.unread.length === 0) {
                    // rebuild();   //????感觉没卵用
                }
                else {
                    for (var i = 0; i < CommUnreadDLMessage.unread.length; i++) {
                        backqueue(CommUnreadDLMessage.unread[i].queue);
                    }
                }
                break;
            case 2:
                var Message = root.lookup("easemob.pb.CommNotice");
                var noticeMessage = Message.decode(result.payload);
                // console.log(noticeMessage.queue);
                backqueue(noticeMessage.queue);
                break;
            case 3:
                receiveProvision(result);
                break;
        }

    };
    var accessToken = options.access_token || '';
    if (accessToken == '') {
        var loginfo = _utils.stringify(options);
        conn.onError({
            type: _code.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
            data: options
        });
        return;
    }

    conn.context.accessToken = options.access_token;
};


/**
 * 确定收到消息给erlang反馈//跟服务端确认是否为最后一条消息comm消息islast = true
 * */
var lastsession = function (nexkey, queue) {

    console.log("队列");
    console.log(queue);
    var emptyMessage = [];
    var commSyncULMessage = root.lookup("easemob.pb.CommSyncUL");
    var secondMessage = commSyncULMessage.decode(emptyMessage);
    secondMessage.queue = queue;
    secondMessage.key = new Long(nexkey.low,nexkey.high, nexkey.unsigned).toString();
    secondMessage = commSyncULMessage.encode(secondMessage).finish();

    var mSyncMessage = root.lookup("easemob.pb.MSync");

    var firstMessage = mSyncMessage.decode(emptyMessage);
    firstMessage.version = "web1.0";
    firstMessage.encryptType = [0];
    firstMessage.command = 0;
    firstMessage.payload = secondMessage;
    firstMessage = mSyncMessage.encode(firstMessage).finish();


    if (sock.readyState !== SockJS.OPEN) {
        console.log("这里出错");
    } else {

        base64transform(firstMessage);
    }
}

var metapayload = function (metas, status, conn) {
    for (var i = 0; i < metas.length; i++) {
        if(metas[i].ns === 1){      //CHAT
            // messageBody(metas[i]);
            HandleChatMessage.handleMessage(metas[i], status, conn)
        }
        else if(metas[i].ns === 2){   //MUC
            HandleMucMessage.handleMessage(metas[i], status, conn);
        }
        else if(metas[i].ns === 3){    //ROSTER
            HandleRosterMessage.handleMessage(metas[i], status, conn);
        }
    }
}



/**
 *
 * 如何没有未读消息的处理
 * */
var rebuild = function () {

    var emptyMessage = [];
    //再次发送信息
    var StatisticsMessage = root.lookup("easemob.pb.StatisticsBody");
    var fourthMessage = StatisticsMessage.decode(emptyMessage);
    //console.log(statisticsmessage);
    fourthMessage.operation = 0;
    // statisticsmessage.imTime=123;
    // statisticsmessage.chatTime=123;
    fourthMessage = StatisticsMessage.encode(fourthMessage).finish();

    var MetaMessage = root.lookup("easemob.pb.Meta");
    var thirdMessage = MetaMessage.decode(emptyMessage);
    thirdMessage.id = (new Date()).valueOf();
    thirdMessage.ns = 0;
    thirdMessage.payload = fourthMessage;
    // metamessage = MetaMessage.encode(metamessage).finish();
    var commsynculMessage = root.lookup("easemob.pb.CommSyncUL");
    var secondMessage = commsynculMessage.decode(emptyMessage);
    secondMessage.meta = thirdMessage;
    secondMessage = commsynculMessage.encode(secondMessage).finish();

    var mainMessage = root.lookup("easemob.pb.MSync");
    var firstMessage = mainMessage.decode(emptyMessage);
    firstMessage.version = "web1.0";
    firstMessage.encryptType = [0];
    firstMessage.command = 0;
    firstMessage.payload = secondMessage;
    firstMessage = mainMessage.encode(firstMessage).finish();
    base64transform(firstMessage);
}

/**
 * 当服务器有新消息提示时进行返回queue
 * */
var backqueue = function (backqueue) {
    var emptyMessage = [];
    var commsynculMessage = root.lookup("easemob.pb.CommSyncUL");
    var secondMessage = commsynculMessage.decode(emptyMessage);
    secondMessage.queue = backqueue;
    secondMessage = commsynculMessage.encode(secondMessage).finish();
    var mainMessage = root.lookup("easemob.pb.MSync");
    var firstMessage = mainMessage.decode(emptyMessage);
    firstMessage.version = "web1.0";
    firstMessage.encryptType = [0];
    firstMessage.command = 0;
    firstMessage.payload = secondMessage;
    firstMessage = mainMessage.encode(firstMessage).finish();
    base64transform(firstMessage);
}

var receiveProvision = function (result) {

    var provisionMessage = root.lookup("easemob.pb.Provision");
    var receiveProvisionResult = provisionMessage.decode(result.payload);

    if (receiveProvisionResult.status.errorCode == 0) {
        unreadDeal();
    }
}

var unreadDeal = function () {
    var emptyMessage = [];
    var MSyncMessage = root.lookup("easemob.pb.MSync");
    var firstMessage = MSyncMessage.decode(emptyMessage);
    firstMessage.version = "web1.0";
    firstMessage.encryptType = [0];
    firstMessage.command = 1;
    firstMessage = MSyncMessage.encode(firstMessage).finish();
    base64transform(firstMessage);
}

var base64transform = function (str) {

    var strr = "";
    for (var i = 0; i < str.length; i++) {
        var str0 = String.fromCharCode(str[i]);
        strr = strr + str0;
    }
    strr = Base64.btoa(strr)
    //strr = window.btoa(strr);
    console.log("转码发送" + strr);
    sock.send(strr);
}



var _handleMessageQueue = function (conn) {      // ******callback connect时调用
    for (var i in _msgHash) {
        if (_msgHash.hasOwnProperty(i)) {
            _msgHash[i].send(conn);
        }
    }
};

var _loginCallback = function (status, msg, conn) {    //******
    var conflict, error;

    if (msg === 'conflict') {
        conflict = true;
        conn.close();
    }

    if (status == Strophe.Status.CONNFAIL) {
        //client offline, ping/pong timeout, server quit, server offline
        error = {
            type: _code.WEBIM_CONNCTION_SERVER_CLOSE_ERROR,
            msg: msg,
            reconnect: true
        };

        conflict && (error.conflict = true);
        conn.onError(error);
    } else if (status == Strophe.Status.ATTACHED || status == Strophe.Status.CONNECTED) {
        // client should limit the speed of sending ack messages  up to 5/s  (后修改为10/s途虎重复收到离线消息)
        conn.autoReconnectNumTotal = 0;
        conn.intervalId = setInterval(function () {
            conn.handelSendQueue();
        }, 100);
        var handleMessage = function (msginfo) {
            var delivery = msginfo.getElementsByTagName('delivery');
            var acked = msginfo.getElementsByTagName('acked');
            if (delivery.length) {
                // conn.handleDeliveredMessage(msginfo);
                return true;
            }
            if (acked.length) {
                // conn.handleAckedMessage(msginfo);
                return true;
            }
            var type = _parseMessageType(msginfo);
            switch (type) {
                case "received":
                    // conn.handleReceivedMessage(msginfo);
                    return true;
                case "invite":
                    // conn.handleInviteMessage(msginfo);
                    return true;
                case "delivery":
                    // conn.handleDeliveredMessage(msginfo);
                    return true;
                case "acked":
                    // conn.handleAckedMessage(msginfo);
                    return true;
                case "userMuted":
                    // conn.handleMutedMessage(msginfo);
                    return true;
                default:
                    conn.handleMessage(msginfo);
                    return true;
            }
        };
        var handlePresence = function (msginfo) {
            conn.handlePresence(msginfo);
            return true;
        };
        var handlePing = function (msginfo) {
            // conn.handlePing(msginfo);
            return true;
        };
        // var handleIqRoster = function (msginfo) {
        //     conn.handleIqRoster(msginfo);
        //     return true;
        // };
        var handleIqPrivacy = function (msginfo) {
            // conn.handleIqPrivacy(msginfo);
            return true;
        };
        var handleIq = function (msginfo) {
            // conn.handleIq(msginfo);
            return true;
        };

        // conn.addHandler(handleMessage, null, 'message', null, null, null);
        // conn.addHandler(handlePresence, null, 'presence', null, null, null);
        // conn.addHandler(handlePing, 'urn:xmpp:ping', 'iq', 'get', null, null);
        // conn.addHandler(handleIqRoster, 'jabber:iq:roster', 'iq', 'set', null, null);
        // conn.addHandler(handleIqPrivacy, 'jabber:iq:privacy', 'iq', 'set', null, null);
        // conn.addHandler(handleIq, null, 'iq', null, null, null);

        conn.registerConfrIQHandler && (conn.registerConfrIQHandler());

        conn.context.status = _code.STATUS_OPENED;

        var supportRecMessage = [
            _code.WEBIM_MESSAGE_REC_TEXT,
            _code.WEBIM_MESSAGE_REC_EMOJI];

        if (_utils.isCanDownLoadFile) {
            supportRecMessage.push(_code.WEBIM_MESSAGE_REC_PHOTO);
            supportRecMessage.push(_code.WEBIM_MESSAGE_REC_AUDIO_FILE);
        }
        var supportSedMessage = [_code.WEBIM_MESSAGE_SED_TEXT];
        if (_utils.isCanUploadFile) {
            supportSedMessage.push(_code.WEBIM_MESSAGE_REC_PHOTO);
            supportSedMessage.push(_code.WEBIM_MESSAGE_REC_AUDIO_FILE);
        }
        // conn.heartBeat();
        conn.isAutoLogin && conn.setPresence();
        console.log("conn",conn);

        try {
            if (conn.unSendMsgArr.length > 0) {
                console.log("unSendMesArr",conn.unSendMsgArr);
                for (var i in conn.unSendMsgArr) {
                    var dom = conn.unSendMsgArr[i];
                    conn.sendCommand(dom);
                    delete conn.unSendMsgArr[i];
                }
            }
        } catch (e) {
            console.error(e.message);
        }
        conn.offLineSendConnecting = false;
        conn.logOut = false;
        conn.onOpened({
            canReceive: supportRecMessage,
            canSend: supportSedMessage,
            accessToken: conn.context.accessToken
        });
    } else if (status == Strophe.Status.DISCONNECTING) {
        if (conn.isOpened()) {
            // conn.stopHeartBeat();
            conn.context.status = _code.STATUS_CLOSING;

            error = {
                type: _code.WEBIM_CONNCTION_SERVER_CLOSE_ERROR,
                msg: msg,
                reconnect: true
            };

            conflict && (error.conflict = true);
            conn.onError(error);
        }
    } else if (status == Strophe.Status.DISCONNECTED) {
        if (!conn.isClosing() || conn.isOpened()) {
            if (conn.autoReconnectNumTotal < conn.autoReconnectNumMax) {
                conn.reconnect(!conn.isClosing());
                return;
            } else {
                error = {
                    type: _code.WEBIM_CONNCTION_DISCONNECTED
                };
                conn.onError(error);
            }
        }
        conn.context.status = _code.STATUS_CLOSED;
        conn.clear();
        conn.onClosed();
    } else if (status == Strophe.Status.AUTHFAIL) {
        error = {
            type: _code.WEBIM_CONNCTION_AUTH_ERROR
        };

        conflict && (error.conflict = true);
        conn.onError(error);
        conn.clear();
    } else if (status == Strophe.Status.ERROR) {
        conn.context.status = _code.STATUS_ERROR;
        error = {
            type: _code.WEBIM_CONNCTION_SERVER_ERROR
        };

        conflict && (error.conflict = true);
        conn.onError(error);
    }
    conn.context.status_now = status;
};

var _getJid = function (options, conn) {      //均在已经废弃的api中使用
    var jid = options.toJid || {};

    if (jid === {}) {
        
        var appKey = conn.context.appKey || '';
        var toJid = {
            appKey: appKey,
            name: options.to,
            domain: conn.domain,
            clientResource: conn.clientResource
        }
        if (options.resource) {
            toJid.clientResource = options.resource
        }
        jid = toJid;
    }
    return jid;
};

var _getJidByName = function (name, conn) {    //均在已经废弃的api中使用
    var options = {
        to: name
    };
    return _getJid(options, conn);
};

var _validCheck = function (options, conn) {
    options = options || {};

    if (options.user == '') {
        conn.onError({
            type: _code.WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR
        });
        return false;
    }

    var user = (options.user + '') || '';
    var appKey = options.appKey || '';
    var devInfos = appKey.split('#');

    if (devInfos.length !== 2) {
        conn.onError({
            type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
        });
        return false;
    }
    var orgName = devInfos[0];
    var appName = devInfos[1];

    if (!orgName) {
        conn.onError({
            type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
        });
        return false;
    }
    if (!appName) {
        conn.onError({
            type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
        });
        return false;
    }

    // var jid = appKey + '_' + user.toLowerCase() + '@' + conn.domain,
    //     resource = options.resource || 'webim';

    // if (conn.isMultiLoginSessions) {
    //     resource += user + new Date().getTime() + Math.floor(Math.random().toFixed(6) * 1000000);
    // }
    // conn.context.jid = jid + '/' + resource;
    /*jid: {appkey}_{username}@domain/resource*/

    conn.context.jid = {
        appKey: appKey,
        name: user,
        domain: conn.domain,
        clientResource: conn.clientResource
    }
    // conn.context.sock = sock;
    conn.context.root = root;
    conn.context.userId = user;
    conn.context.appKey = appKey;
    conn.context.appName = appName;
    conn.context.orgName = orgName;

    return true;
};

var _getXmppUrl = function (baseUrl, https) {
    if (/^(ws|http)s?:\/\/?/.test(baseUrl)) {
        return baseUrl;
    }

    var url = {
        prefix: 'http',
        base: '://' + baseUrl,
        suffix: '/http-bind/'
    };

    if (https && _utils.isSupportWss) {
        url.prefix = 'wss';
        url.suffix = '/ws/';
    } else {
        if (https) {
            url.prefix = 'https';
        } else if (window.WebSocket) {
            url.prefix = 'ws';
            url.suffix = '/ws/';
        }
    }

    return url.prefix + url.base + url.suffix;
};


/**
 * The connection class.
 * @constructor
 * @param {Object} options - 创建连接的初始化参数
 * @param {String} options.url - xmpp服务器的URL
 * @param {String} options.apiUrl - API服务器的URL
 * @param {Boolean} options.isHttpDNS - 防止域名劫持
 * @param {Boolean} options.isMultiLoginSessions - 为true时同一账户可以同时在多个Web页面登录（多标签登录，默认不开启，如有需要请联系商务），为false时同一账号只能在一个Web页面登录
 * @param {Boolean} options.https - 是否启用wss.
 * @param {Number} options.heartBeatWait - 发送心跳包的时间间隔（毫秒）
 * @param {Boolean} options.isAutoLogin - 登录成功后是否自动出席
 * @param {Number} options.autoReconnectNumMax - 掉线后重连的最大次数
 * @param {Number} options.autoReconnectInterval -  掉线后重连的间隔时间（毫秒）
 * @param {Boolean} options.isWindowSDK - 是否运行在WindowsSDK上
 * @param {Boolean} options.encrypt - 是否加密文本消息
 * @param {Boolean} options.delivery - 是否发送delivered ack
 * @returns {Class}  连接实例
 */


//class
var connection = function (options) {
    if (!this instanceof connection) {
        return new connection(options);
    }

    var options = options || {};

    this.isHttpDNS = options.isHttpDNS || false;
    this.isMultiLoginSessions = options.isMultiLoginSessions || false;
    this.wait = options.wait || 30;    //**** attach*/
    this.retry = options.retry || false;   //*** */
    this.https = options.https && location.protocol === 'https:';
    this.url = options.url;
    this.hold = options.hold || 1;    //**** attach*/
    this.route = options.route || null;   //*** */
    // this.domain = options.domain || 'easemob.com';
    this.inactivity = options.inactivity || 30;     //****getStrophe */
    this.heartBeatWait = options.heartBeatWait || 4500;   //*** */
    this.maxRetries = options.maxRetries || 5;     //*** getStrophe*/
    this.isAutoLogin = options.isAutoLogin === false ? false : true;      //**** */
    this.pollingTime = options.pollingTime || 800;    //****getStrophe */
    this.stropheConn = false;
    this.autoReconnectNumMax = options.autoReconnectNumMax || 0;
    this.autoReconnectNumTotal = 0;
    this.autoReconnectInterval = options.autoReconnectInterval || 0;
    this.context = {status: _code.STATUS_INIT};
    this.sendQueue = new Queue();  //instead of sending message immediately,cache them in this queue
    this.intervalId = null;   //clearInterval return value
    this.apiUrl = options.apiUrl || '';
    this.isWindowSDK = options.isWindowSDK || false;    //????
    this.encrypt = options.encrypt || {encrypt: {type: 'none'}};   //**** */
    this.delivery = options.delivery || false;


    //jid 所用参数
    this.appKey = options.appKey || "easemob-demo#chatdemoui";
    this.domain = options.domain || "easemob.com";
    this.clientResource = "84ff3eba1";
    this.user = '';
    this.orgName = '';
    this.appName = '';
    this.token = '';
    this.unSendMsgArr = [];

    this.dnsArr = ['https://rs.easemob.com', 'https://rsbak.easemob.com', 'http://182.92.174.78', 'http://112.126.66.111']; //http dns server hosts
    this.dnsIndex = 0;   //the dns ip used in dnsArr currently
    this.dnsTotal = this.dnsArr.length;  //max number of getting dns retries
    this.restHosts = null; //rest server ips
    this.restIndex = 0;    //the rest ip used in restHosts currently
    this.restTotal = 0;    //max number of getting rest token retries
    this.xmppHosts = null; //xmpp server ips
    this.xmppIndex = 0;    //the xmpp ip used in xmppHosts currently
    this.xmppTotal = 0;    //max number of creating xmpp server connection(ws/bosh) retries

    this.groupOption = {};
    //mysnc配置
    this.version = options.version || "web1.0";
    this.compressAlgorimth = options.compressAlgorimth || 0;   //*** */
    this.userAgent = options.userAgent || 0;    //*** */
    this.pov = options.pov || 0;    /**** */
    this.command = options.command || 3;
    this.deviceId = options.deviceId || 0;
    this.encryptKey = options.encryptKey || "";
    this.firstPayload = options.firstPayload || [];   //*** */
    this.compressType = options.compressType || [0];
    this.encryptType = options.encryptType || [0];
    this.osType = 16;
    window.this = this;

    
    // global params
    isStropheLog = options.isStropheLog || false;
};

/**
 * 注册新用户
 * @param {Object} options - 
 * @param {String} options.username - 用户名，即用户ID
 * @param {String} options.password - 密码
 * @param {String} options.nickname - 用户昵称
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */

connection.prototype.registerUser = function (options) {
    if (location.protocol != 'https:' && this.isHttpDNS) {
        this.dnsIndex = 0;
        this.getHttpDNS(options, 'signup');
    } else {
        this.signup(options);
    }
}

/**
 * 处理发送队列
 * @private
 */

// connection.prototype.handelSendQueue = function () {
//     var options = this.sendQueue.pop();
//     if (options !== null) {
//         this.sendReceiptsMessage(options);
//     }
// };

/**
 * 注册监听函数
 * @param {Object} options - 回调函数集合
 * @param {connection~onOpened} options.onOpened - 处理登录的回调
 * @param {connection~onTextMessage} options.onTextMessage - 处理文本消息的回调
 * @param {connection~onEmojiMessage} options.onEmojiMessage - 处理表情消息的回调
 * @param {connection~onPictureMessage} options.onPictureMessage - 处理图片消息的回调
 * @param {connection~onAudioMessage} options.onAudioMessage - 处理音频消息的回调
 * @param {connection~onVideoMessage} options.onVideoMessage - 处理视频消息的回调
 * @param {connection~onFileMessage} options.onFileMessage - 处理文件消息的回调
 * @param {connection~onLocationMessage} options.onLocationMessage - 处理位置消息的回调
 * @param {connection~onCmdMessage} options.onCmdMessage - 处理命令消息的回调
 * @param {connection~onPresence} options.onPresence - 处理Presence消息的回调
 * @param {connection~onError} options.onError - 处理错误消息的回调
 * @param {connection~onReceivedMessage} options.onReceivedMessage - 处理Received消息的回调
 * @param {connection~onInviteMessage} options.onInviteMessage - 处理邀请消息的回调    /.....
 * @param {connection~onDeliverdMessage} options.onDeliverdMessage - 处理Delivered ACK消息的回调
 * @param {connection~onReadMessage} options.onReadMessage - 处理Read ACK消息的回调   //.....
 * @param {connection~onRecallMessage} options.onRecallMessage - 处理Recall 消息的回调   //.....
 * @param {connection~onMutedMessage} options.onMutedMessage - 处理禁言消息的回调
 * @param {connection~onOffline} options.onOffline - 处理断网的回调
 * @param {connection~onOnline} options.onOnline - 处理联网的回调
 * @param {connection~onCreateGroup} options.onCreateGroup - 处理创建群组的回调
 */
connection.prototype.listen = function (options) {
    /**
     * 登录成功后调用
     * @callback connection~onOpened
     */
    /**
     * 收到文本消息
     * @callback connection~onTextMessage
     */
    /**
     * 收到表情消息
     * @callback connection~onEmojiMessage
     */
    /**
     * 收到图片消息
     * @callback connection~onPictureMessage
     */
    /**
     * 收到音频消息
     * @callback connection~onAudioMessage
     */
    /**
     * 收到视频消息
     * @callback connection~onVideoMessage
     */
    /**
     * 收到文件消息
     * @callback connection~onFileMessage
     */
    /**
     * 收到位置消息
     * @callback connection~onLocationMessage
     */
    /**
     * 收到命令消息
     * @callback connection~onCmdMessage
     */
    /**
     * 收到错误消息
     * @callback connection~onError
     */
    /**
     * 收到Presence消息
     * @callback connection~onPresence
     */
    /**
     * 收到Received消息
     * @callback connection~onReceivedMessage
     */
    /**
     * 被邀请进群
     * @callback connection~onInviteMessage   //....
     */
    /**
     * 收到已送达回执
     * @callback connection~onDeliverdMessage
     */
    /**
     * 收到已读回执
     * @callback connection~onReadMessage
     */
    /**
     * 收到撤回消息回执
     * @callback connection~onRecallMessage
     */
    /**
     * 被群管理员禁言
     * @callback connection~onMutedMessage
     */
    /**
     * 浏览器被断网时调用
     * @callback connection~onOffline
     */
    /**
     * 浏览器联网时调用
     * @callback connection~onOnline
     */
    /**
     * 建群成功后调用
     * @callback connection~onCreateGroup
     */
    this.onOpened = options.onOpened || _utils.emptyfn;
    this.onClosed = options.onClosed || _utils.emptyfn;
    this.onTextMessage = options.onTextMessage || _utils.emptyfn;
    this.onEmojiMessage = options.onEmojiMessage || _utils.emptyfn;
    this.onPictureMessage = options.onPictureMessage || _utils.emptyfn;
    this.onAudioMessage = options.onAudioMessage || _utils.emptyfn;
    this.onVideoMessage = options.onVideoMessage || _utils.emptyfn;
    this.onFileMessage = options.onFileMessage || _utils.emptyfn;
    this.onLocationMessage = options.onLocationMessage || _utils.emptyfn;
    this.onCmdMessage = options.onCmdMessage || _utils.emptyfn;
    this.onPresence = options.onPresence || _utils.emptyfn;
    this.onRoster = options.onRoster || _utils.emptyfn;
    this.onError = options.onError || _utils.emptyfn;
    this.onReceivedMessage = options.onReceivedMessage || _utils.emptyfn;
    this.onInviteMessage = options.onInviteMessage || _utils.emptyfn;
    this.onDeliverdMessage = options.onDeliveredMessage || _utils.emptyfn;
    this.onReadMessage = options.onReadMessage || _utils.emptyfn;
    this.onRecallMessage = options.onRecallMessage  || _utils.emptyfn;
    this.onMutedMessage = options.onMutedMessage || _utils.emptyfn;
    this.onOffline = options.onOffline || _utils.emptyfn;
    this.onOnline = options.onOnline || _utils.emptyfn;
    this.onConfirmPop = options.onConfirmPop || _utils.emptyfn;
    this.onCreateGroup = options.onCreateGroup || _utils.emptyfn;
    //for WindowSDK start
    this.onUpdateMyGroupList = options.onUpdateMyGroupList || _utils.emptyfn;
    this.onUpdateMyRoster = options.onUpdateMyRoster || _utils.emptyfn;
    //for WindowSDK end
    this.onBlacklistUpdate = options.onBlacklistUpdate || _utils.emptyfn;

    _listenNetwork(this.onOnline, this.onOffline);
};

/**
 * 发送心跳
 * webrtc需要强制心跳，加个默认为false的参数 向下兼容
 * @param {Boolean} forcing - 是否强制发送
 * @private
 */
// connection.prototype.heartBeat = function (forcing) {        //****改为协议发送心跳 */
//     if (forcing !== true) {
//         forcing = false;
//     }
//     var me = this;
//     //IE8: strophe auto switch from ws to BOSH, need heartbeat
//     var isNeed = !/^ws|wss/.test(me.url) || /mobile/.test(navigator.userAgent);

//     if (this.heartBeatID || (!forcing && !isNeed)) {
//         return;
//     }

//     var options = {
//         toJid: this.domain,
//         type: 'normal'
//     };
//     this.heartBeatID = setInterval(function () {
//         // fix: do heartbeat only when websocket 
//         _utils.isSupportWss && me.ping(options);
//     }, this.heartBeatWait);
// };

/**
 * @private
 */

// connection.prototype.stopHeartBeat = function () {
//     if (typeof this.heartBeatID == "number") {
//         this.heartBeatID = clearInterval(this.heartBeatID);
//     }
// };

/**
 * 发送接收消息回执
 * @param {Object} options -
 * @param {String} options.id - 消息id
 * @private
 */
// connection.prototype.sendReceiptsMessage = function (options) {
//     var dom = $msg({
//         from: this.context.jid || '',
//         to: this.domain,
//         id: options.id || ''
//     }).c('received', {
//         xmlns: 'urn:xmpp:receipts',
//         id: options.id || ''
//     });
//     this.sendCommand(dom.tree());
// };

/**
 * @private
 */

// connection.prototype.cacheReceiptsMessage = function (options) {
//     this.sendQueue.push(options);
// };

/**
 * @private
 */

connection.prototype.getStrophe = function () {
    if (location.protocol != 'https:' && this.isHttpDNS) {
        //TODO: try this.xmppTotal times on fail
        var url = '';
        var host = this.xmppHosts[this.xmppIndex];
        var domain = _utils.getXmlFirstChild(host, 'domain');
        var ip = _utils.getXmlFirstChild(host, 'ip');
        if (ip) {
            url = ip.textContent;
            var port = _utils.getXmlFirstChild(host, 'port');
            if (port.textContent != '80') {
                url += ':' + port.textContent;
            }
        } else {
            url = domain.textContent;
        }

        if (url != '') {
            var parter = /(.+\/\/).+(\/.+)/;
            this.url = this.url.replace(parter, "$1" + url + "$2");
        }
    }

    var stropheConn = new Strophe.Connection(this.url, {
        inactivity: this.inactivity,
        maxRetries: this.maxRetries,
        pollingTime: this.pollingTime
    });
    return stropheConn;
};

/**
 *
 * @param data
 * @param tagName
 * @private
 */
// connection.prototype.getHostsByTag = function (data, tagName) {
//     var tag = _utils.getXmlFirstChild(data, tagName);
//     if (!tag) {
//         console.log(tagName + ' hosts error');
//         return null;
//     }
//     var hosts = tag.getElementsByTagName('hosts');
//     if (hosts.length == 0) {
//         console.log(tagName + ' hosts error2');
//         return null;
//     }
//     return hosts[0].getElementsByTagName('host');

// };

/**
 * @private
 */
connection.prototype.getRestFromHttpDNS = function (options, type) {
    if (this.restIndex > this.restTotal) {
        console.log('rest hosts all tried,quit');
        return;
    }
    var url = '';
    var host = this.restHosts[this.restIndex];
    var domain = host.domain;
    var ip = host.ip;
    if (ip) {
        var port = host.port;
        url = (location.protocol === 'https:' ? 'https:' : 'http:') + '//' + ip + ':' + port;
    } else {
        url = (location.protocol === 'https:' ? 'https:' : 'http:') + '//' + domain;
    }

    if (url != '') {
        this.apiUrl = url;
        options.apiUrl = url;
    }

    if (type == 'login') {
        this.login(options);
    } else {
        this.signup(options);
    }
};

/**
 * @private
 */

connection.prototype.getHttpDNS = function (options, type) {
    // if (this.restHosts) {r
    //     this.getRestFromHttpDNS(options, type);
    //     return;
    // }
    var self = this;
    var suc = function (data, xhr) {
        // data = new DOMParser().parseFromString(data, "text/xml").documentElement;
        //get rest ips
        var restHosts = data.rest.hosts;
        if (!restHosts) {
            console.log('rest hosts error3');
            return;
        }
        self.restHosts = restHosts;
        self.restTotal = restHosts.length;

        //get xmpp ips
        var makeArray = function(obj){    //伪数组转为数组
          return Array.prototype.slice.call(obj,0); 
        } 
        try{ 
            Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType; 
        }catch(e){ 
            makeArray = function(obj){ 
                var res = []; 
                for(var i=0,len=obj.length; i<len; i++){
                   res.push(obj[i]); 
                } 
              return res; 
          } 
        } 
        var xmppHosts = data['msync-ws'].hosts;
        if (!xmppHosts) {
            console.log('xmpp hosts error3');
            return;
        }
        for(var i = 0; i< xmppHosts.length; i++){
            var httpType = self.https ? 'https' : 'http';
            if( xmppHosts[i].protocol=== httpType ){
                var currentPost = xmppHosts[i];
                xmppHosts.splice(i,1);
                xmppHosts.unshift(currentPost);
            }
        }
        self.xmppHosts = xmppHosts;
        self.xmppTotal = xmppHosts.length;

        self.getRestFromHttpDNS(options, type);
    };
    var error = function (res, xhr, msg) {

        console.log('getHttpDNS error', res, msg);
        self.dnsIndex++;
        if (self.dnsIndex < self.dnsTotal) {
            self.getHttpDNS(options, type);
        }

    };
    var options2 = {
        url: this.dnsArr[this.dnsIndex] + '/easemob/server.json',
        dataType: 'json',
        type: 'GET',

        // url: 'http://www.easemob.com/easemob/server.xml',
        // dataType: 'xml',
        data: {app_key: encodeURIComponent(options.appKey || this.appKey)},
        success: suc || _utils.emptyfn,
        error: error || _utils.emptyfn
    };
    _utils.ajax(options2);
};

/**
 * @private
 */

connection.prototype.signup = function (options) {
    var self = this;
    var orgName = options.orgName || '';
    var appName = options.appName || '';
    var appKey = options.appKey || this.appKey;
    var suc = options.success || _utils.emptyfn;
    var err = options.error || _utils.emptyfn;

    if (!orgName && !appName && appKey) {
        var devInfos = appKey.split('#');
        if (devInfos.length === 2) {
            orgName = devInfos[0];
            appName = devInfos[1];
        }
    }
    if (!orgName && !appName) {
        err({
            type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
        });
        return;
    }

    var error = function (res, xhr, msg) {
        if (location.protocol != 'https:' && self.isHttpDNS) {
            if ((self.restIndex + 1) < self.restTotal) {
                self.restIndex++;
                self.getRestFromHttpDNS(options, 'signup');
                return;
            }
        }
        self.clear();
        err(res);
    };
    var https = options.https || this.https;
    var apiUrl = options.apiUrl || this.apiUrl;
    var restUrl = apiUrl + '/' + orgName + '/' + appName + '/users';

    var userjson = {
        username: options.username,
        password: options.password,
        nickname: options.nickname || ''
    };

    var userinfo = _utils.stringify(userjson);
    var options2 = {
        url: restUrl,
        dataType: 'json',
        data: userinfo,
        success: suc,
        error: error
    };
    _utils.ajax(options2);
};

/**
 * 登录  
 * @param {Object} options - 用户信息
 * @param {String} options.user - 用户名
 * @param {String} options.pwd - 用户密码，跟token二选一
 * @param {String} options.accessToken - token，跟密码二选一
 * @param {String} options.appKey - Appkey
 * @param {String} options.apiUrl - Rest 服务地址,非必须。可在项目的WebIMConfig配置
 * @param {String} options.xmppURL - Xmpp 服务地址,非必须。可在项目的WebIMConfig配置
 * @param {Function} options.success - 成功之后的回调，默认为空，token登录没有该回调
 * @param {Function} options.error - 失败之后的回调，默认为空，token登录没有该回调
 */

connection.prototype.open = function (options) {
    console.log(8888888);
    
    var appkey = options.appKey,
        orgName = appkey.split('#')[0],
        appName = appkey.split('#')[1];
    this.orgName = orgName;
    this.appName = appName;
    if (options.accessToken) {
        this.token = options.accessToken;
    }
    // if (options.xmppURL) {
    //     this.url = _getXmppUrl(options.xmppURL, this.https);
    // }
    if (location.protocol != 'https:' && this.isHttpDNS) {
        this.dnsIndex = 0;
        this.getHttpDNS(options, 'login');
    } else {
        this.login(options);
    }
};

/**
 *
 * @param options
 * @private
 */

connection.prototype.login = function (options) {
    this.user = options.user;
    var pass = _validCheck(options, this);

    if (!pass) {
        return;
    }

    var conn = this;

    if (conn.isOpened()) {    //** */
        return;
    }

    if (options.accessToken) {
        options.access_token = options.accessToken;
        // conn.context.restTokenData = options;
        _login(options, conn);
    } else {
        var apiUrl = options.apiUrl;
        var userId = this.context.userId;
        var pwd = options.pwd || '';
        var appName = this.context.appName;
        var orgName = this.context.orgName;

        var suc = function (data, xhr) {
            // conn.context.status = _code.STATUS_DOLOGIN_IM;
            // conn.context.restTokenData = data;
            if (options.success)
                options.success(data);
            conn.token = data.access_token;
            conn.context.restTokenData = data.access_token;
            _login(data, conn);
        };
        var error = function (res, xhr, msg) {
            if (options.error)
                options.error();
            // if (location.protocol != 'https:' && conn.isHttpDNS) {
            //     if ((conn.restIndex + 1) < conn.restTotal) {
            //         conn.restIndex++;
            //         conn.getRestFromHttpDNS(options, 'login');
            //         return;
            //     }
            // }
            // conn.clear();
            // if (res.error && res.error_description) {
            //     conn.onError({
            //         type: _code.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
            //         data: res,
            //         xhr: xhr
            //     });
            // } else {
            //     conn.onError({
            //         type: _code.WEBIM_CONNCTION_OPEN_ERROR,
            //         data: res,
            //         xhr: xhr
            //     });
            // }
        };

        // this.context.status = _code.STATUS_DOLOGIN_USERGRID;

        var loginJson = {
            grant_type: 'password',
            username: userId,
            password: pwd,
            timestamp: +new Date()
        };
        var loginfo = _utils.stringify(loginJson);

        var options2 = {
            url: apiUrl + '/' + orgName + '/' + appName + '/token',
            dataType: 'json',
            data: loginfo,
            success: suc || _utils.emptyfn,
            error: error || _utils.emptyfn
        };
        _utils.ajax(options2);
    }
};

/**
 * attach to xmpp server for BOSH
 * @private
 */
// connection.prototype.attach = function (options) {
//     var pass = _validCheck(options, this);

//     if (!pass) {
//         return;
//     }

//     options = options || {};

//     var accessToken = options.accessToken || '';
//     if (accessToken == '') {
//         this.onError({
//             type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
//         });
//         return;
//     }

//     var sid = options.sid || '';
//     if (sid === '') {
//         this.onError({
//             type: _code.WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR
//         });
//         return;
//     }

//     var rid = options.rid || '';
//     if (rid === '') {
//         this.onError({
//             type: _code.WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR
//         });
//         return;
//     }

//     var stropheConn = this.getStrophe();

//     this.context.accessToken = accessToken;
//     this.context.stropheConn = stropheConn;
//     this.context.status = _code.STATUS_DOLOGIN_IM;

//     var conn = this;
//     var callback = function (status, msg) {
//         _loginCallback(status, msg, conn);
//     };

//     var jid = this.context.jid;
//     var wait = this.wait;
//     var hold = this.hold;
//     var wind = this.wind || 5;
//     stropheConn.attach(jid, sid, rid, callback, wait, hold, wind);
// };

/**
 * 断开连接，同时心跳停止
 * @param {String} reason - 断开原因
 */

connection.prototype.close = function (reason) {
    this.logOut = true;
    this.context.status = _code.STATUS_CLOSING;
    sock.close();
    // this.stopHeartBeat();

    // var status = this.context.status;
    // if (status == _code.STATUS_INIT) {
    //     return;
    // }

    // if (this.isClosed() || this.isClosing()) {
    //     return;
    // }

    this.context.status = _code.STATUS_CLOSING;
    // this.context.stropheConn.disconnect(reason);
};

/**
 * strophe 的方法
 * @private
 */

// connection.prototype.addHandler = function (handler, ns, name, type, id, from, options) {
//     this.context.stropheConn.addHandler(handler, ns, name, type, id, from, options);
// };

/**
 * strophe sendIQ
 * @private
 */
// connection.prototype.notifyVersion = function (suc, fail) {       //****_loginCallback调用 */
//     var jid = _getJid({}, this);
//     var dom = $iq({
//         from: this.context.jid || ''
//         , to: this.domain
//         , type: 'result'
//     })
//         .c('query', {xmlns: 'jabber:iq:version'})
//         .c('name')
//         .t('easemob')
//         .up()
//         .c('version')
//         .t(_version)
//         .up()
//         .c('os')
//         .t('webim');

//     var suc = suc || _utils.emptyfn;
//     var error = fail || this.onError;
//     var failFn = function (ele) {
//         error({
//             type: _code.WEBIM_CONNCTION_NOTIFYVERSION_ERROR
//             , data: ele
//         });
//     };
//     this.context.stropheConn.sendIQ(dom.tree(), suc, failFn);
//     return;
// };

/**
 * handle all types of presence message
 * @private
 */
// connection.prototype.handlePresence = function (msginfo) {
//     if (this.isClosed()) {
//         return;
//     }
//     var from = msginfo.getAttribute('from') || '';
//     var to = msginfo.getAttribute('to') || '';
//     var type = msginfo.getAttribute('type') || '';
//     var presence_type = msginfo.getAttribute('presence_type') || '';
//     var fromUser = _parseNameFromJidFn(from);
//     var toUser = _parseNameFromJidFn(to);
//     var isCreate = false;
//     var isMemberJoin = false;
//     var isDecline = false;
//     var isApply = false;
//     var info = {
//         from: fromUser,
//         to: toUser,
//         fromJid: from,
//         toJid: to,
//         type: type,
//         chatroom: msginfo.getElementsByTagName('roomtype').length ? true : false
//     };

//     var showTags = msginfo.getElementsByTagName('show');
//     if (showTags && showTags.length > 0) {
//         var showTag = showTags[0];
//         info.show = Strophe.getText(showTag);
//     }
//     var statusTags = msginfo.getElementsByTagName('status');
//     if (statusTags && statusTags.length > 0) {
//         var statusTag = statusTags[0];
//         info.status = Strophe.getText(statusTag);
//         info.code = statusTag.getAttribute('code');
//     }

//     var priorityTags = msginfo.getElementsByTagName('priority');
//     if (priorityTags && priorityTags.length > 0) {
//         var priorityTag = priorityTags[0];
//         info.priority = Strophe.getText(priorityTag);
//     }

//     var error = msginfo.getElementsByTagName('error');
//     if (error && error.length > 0) {
//         var error = error[0];
//         info.error = {
//             code: error.getAttribute('code')
//         };
//     }

//     var destroy = msginfo.getElementsByTagName('destroy');
//     if (destroy && destroy.length > 0) {
//         var destroy = destroy[0];
//         info.destroy = true;

//         var reason = destroy.getElementsByTagName('reason');
//         if (reason && reason.length > 0) {
//             info.reason = Strophe.getText(reason[0]);
//         }
//     }

//     var members = msginfo.getElementsByTagName('item');
//     if (members && members.length > 0) {
//         var member = members[0];
//         var role = member.getAttribute('role');
//         var jid = member.getAttribute('jid');
//         var affiliation = member.getAttribute('affiliation');
//         // dismissed by group
//         if (role == 'none' && jid) {
//             var kickedMember = _parseNameFromJidFn(jid);
//             var actor = member.getElementsByTagName('actor')[0];
//             var actorNick = actor.getAttribute('nick');
//             info.actor = actorNick;
//             info.kicked = kickedMember;
//         }
//         // Service Acknowledges Room Creation `createGroupACK`
//         if (role == 'moderator' && info.code == '201') {
//             if (affiliation === 'owner') {
//                 info.type = 'createGroupACK';
//                 isCreate = true;
//             }
//             // else
//             //     info.type = 'joinPublicGroupSuccess';
//         }
//     }

//     var x = msginfo.getElementsByTagName('x');
//     if (x && x.length > 0) {
//         // 加群申请
//         var apply = x[0].getElementsByTagName('apply');
//         // 加群成功
//         var accept = x[0].getElementsByTagName('accept');
//         // 同意加群后用户进群通知
//         var item = x[0].getElementsByTagName('item');
//         // 加群被拒绝
//         var decline = x[0].getElementsByTagName('decline');
//         // 被设为管理员
//         var addAdmin = x[0].getElementsByTagName('add_admin');
//         // 被取消管理员
//         var removeAdmin = x[0].getElementsByTagName('remove_admin');
//         // 被禁言
//         var addMute = x[0].getElementsByTagName('add_mute');
//         // 取消禁言
//         var removeMute = x[0].getElementsByTagName('remove_mute');

//         // if (apply && apply.length > 0) {
//         //     isApply = true;
//         //     info.toNick = apply[0].getAttribute('toNick');
//         //     info.type = 'joinGroupNotifications';
//         //     var groupJid = apply[0].getAttribute('to');
//         //     var gid = groupJid.split('@')[0].split('_');
//         //     gid = gid[gid.length - 1];
//         //     info.gid = gid;
//         // } else if (accept && accept.length > 0) {
//         //     info.type = 'joinPublicGroupSuccess';
//         // } else if (item && item.length > 0) {
//         //     var affiliation = item[0].getAttribute('affiliation'),
//         //         role = item[0].getAttribute('role');
//         //     if (affiliation == 'member'
//         //         ||
//         //         role == 'participant') {
//         //         isMemberJoin = true;
//         //         info.mid = info.fromJid.split('/');
//         //         info.mid = info.mid[info.mid.length - 1];
//         //         info.type = 'memberJoinPublicGroupSuccess';
//         //         var roomtype = msginfo.getElementsByTagName('roomtype');
//         //         if (roomtype && roomtype.length > 0) {
//         //             var type = roomtype[0].getAttribute('type');
//         //             if (type == 'chatroom') {
//         //                 info.type = 'memberJoinChatRoomSuccess';
//         //             }
//         //         }
//         //     }
//         // } else if (decline && decline.length) {
//         //     isDecline = true;
//         //     var gid = decline[0].getAttribute("fromNick");
//         //     var owner = _parseNameFromJidFn(decline[0].getAttribute("from"));
//         //     info.type = "joinPublicGroupDeclined";
//         //     info.owner = owner;
//         //     info.gid = gid;
//         // } else if (addAdmin && addAdmin.length > 0) {
//         //     var gid = _parseNameFromJidFn(addAdmin[0].getAttribute('mucjid'));
//         //     var owner = _parseNameFromJidFn(addAdmin[0].getAttribute('from'));
//         //     info.owner = owner;
//         //     info.gid = gid;
//         //     info.type = "addAdmin";
//         // } else if (removeAdmin && removeAdmin.length > 0) {
//         //     var gid = _parseNameFromJidFn(removeAdmin[0].getAttribute('mucjid'));
//         //     var owner = _parseNameFromJidFn(removeAdmin[0].getAttribute('from'));
//         //     info.owner = owner;
//         //     info.gid = gid;
//         //     info.type = "removeAdmin";
//         // } else if (addMute && addMute.length > 0) {
//         //     var gid = _parseNameFromJidFn(addMute[0].getAttribute('mucjid'));
//         //     var owner = _parseNameFromJidFn(addMute[0].getAttribute('from'));
//         //     info.owner = owner;
//         //     info.gid = gid;
//         //     info.type = "addMute";
//         // } else if (removeMute && removeMute.length > 0) {
//         //     var gid = _parseNameFromJidFn(removeMute[0].getAttribute('mucjid'));
//         //     var owner = _parseNameFromJidFn(removeMute[0].getAttribute('from'));
//         //     info.owner = owner;
//         //     info.gid = gid;
//         //     info.type = "removeMute";
//         // }
//         //}
//     }


//     // if (info.chatroom) {
//     //     // diff the
//     //     info.presence_type = presence_type;
//     //     info.original_type = info.type;
//     //     var reflectUser = from.slice(from.lastIndexOf('/') + 1);

//     //     if (reflectUser === this.context.userId) {
//     //         if (info.type === '' && !info.code) {
//     //             info.type = 'joinChatRoomSuccess';
//     //         } else if (presence_type === 'unavailable' || info.type === 'unavailable') {
//     //             if (!info.status) {// logout successfully.
//     //                 info.type = 'leaveChatRoom';
//     //             } else if (info.code == 110) {// logout or dismissied by admin.
//     //                 info.type = 'leaveChatRoom';
//     //             } else if (info.error && info.error.code == 406) {// The chat room is full.
//     //                 info.type = 'reachChatRoomCapacity';
//     //             }
//     //         }
//     //     }
//     // } 

//     // else {
//     //     info.presence_type = presence_type;
//     //     info.original_type = type;

//     //     if (/subscribe/.test(info.type)) {
//     //         //subscribe | subscribed | unsubscribe | unsubscribed
//     //     } else if (type == ""
//     //         &&
//     //         !info.status
//     //         &&
//     //         !info.error
//     //         &&
//     //         !isCreate
//     //         &&
//     //         !isApply
//     //         &&
//     //         !isMemberJoin
//     //         &&
//     //         !isDecline
//     //     ) {
//     //         console.log(2222222, msginfo, info, isApply);
//     //         // info.type = 'joinPublicGroupSuccess';
//     //     } 
//         // else if (presence_type === 'unavailable' || type === 'unavailable') {// There is no roomtype when a chat room is deleted.
//         //     if (info.destroy) {// Group or Chat room Deleted.
//         //         info.type = 'deleteGroupChat';
//         //     } else if (info.code == 307 || info.code == 321) {// Dismissed by group.
//         //         var nick = msginfo.getAttribute('nick');
//         //         if (!nick)
//         //             info.type = 'leaveGroup';
//         //         else
//         //             info.type = 'removedFromGroup';
//         //     }
//         // }
//     //}
//     this.onPresence(info, msginfo);
// };

/**
 * @private
 */

// connection.prototype.handlePing = function (e) {
//     if (this.isClosed()) {
//         return;
//     }
//     var id = e.getAttribute('id');
//     var from = e.getAttribute('from');
//     var to = e.getAttribute('to');
//     var dom = $iq({
//         from: to
//         , to: from
//         , id: id
//         , type: 'result'
//     });
//     this.sendCommand(dom.tree());
// };

/**
 * @private
 */

// connection.prototype.handleIq = function (iq) {
//     return true;
// };

/**
 * @private
 */
// connection.prototype.handleIqPrivacy = function (msginfo) {
//     var list = msginfo.getElementsByTagName('list');
//     if (list.length == 0) {
//         return;
//     }
//     this.getBlacklist();
// };

/**
 * @private
 */
// connection.prototype.handleMessage = function (msginfo) {    //****
//     var self = this;
//     if (this.isClosed()) {
//         return;
//     }

//     var id = msginfo.getAttribute('id') || '';


//     // cache ack into sendQueue first , handelSendQueue will do the send thing with the speed of  5/s
//     this.cacheReceiptsMessage({
//         id: id
//     });
//     var parseMsgData = _parseResponseMessage(msginfo);
//     if (parseMsgData.errorMsg) {
//         this.handlePresence(msginfo);
//         return;
//     }
//     // send error
//     var error = msginfo.getElementsByTagName('error');
//     var errorCode = '';
//     var errorText = '';
//     var errorBool = false;
//     if (error.length > 0) {
//         errorBool = true;
//         errorCode = error[0].getAttribute('code');
//         var textDOM = error[0].getElementsByTagName('text');
//         errorText = textDOM[0].textContent || textDOM[0].text;
//     }

//     var msgDatas = parseMsgData.data;
//     for (var i in msgDatas) {
//         if (!msgDatas.hasOwnProperty(i)) {
//             continue;
//         }
//         var msg = msgDatas[i];
//         if (!msg.from || !msg.to) {
//             continue;
//         }

//         var from = (msg.from + '').toLowerCase();
//         var too = (msg.to + '').toLowerCase();
//         var extmsg = msg.ext || {};
//         var chattype = '';
//         var typeEl = msginfo.getElementsByTagName('roomtype');
//         if (typeEl.length) {
//             chattype = typeEl[0].getAttribute('type') || 'chat';
//         } else {
//             chattype = msginfo.getAttribute('type') || 'chat';
//         }

//         var msgBodies = msg.bodies;
//         if (!msgBodies || msgBodies.length == 0) {
//             continue;
//         }
//         var msgBody = msg.bodies[0];
//         var type = msgBody.type;
//         var isCmdMsg = false;

//         try {
//             switch (type) {
//                 case 'txt':
//                     var receiveMsg = msgBody.msg;
//                     if (self.encrypt.type === 'base64') {
//                         receiveMsg = atob(receiveMsg);
//                     } else if (self.encrypt.type === 'aes') {
//                         var key = CryptoJS.enc.Utf8.parse(self.encrypt.key);
//                         var iv = CryptoJS.enc.Utf8.parse(self.encrypt.iv);
//                         var mode = self.encrypt.mode.toLowerCase();
//                         var option = {};
//                         if (mode === 'cbc') {
//                             option = {
//                                 iv: iv,
//                                 mode: CryptoJS.mode.CBC,
//                                 padding: CryptoJS.pad.Pkcs7
//                             };
//                         } else if (mode === 'ebc') {
//                             option = {
//                                 mode: CryptoJS.mode.ECB,
//                                 padding: CryptoJS.pad.Pkcs7
//                             }
//                         }
//                         var encryptedBase64Str = receiveMsg;
//                         var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, option);
//                         var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
//                         receiveMsg = decryptedStr;
//                     }
//                     var emojibody = _utils.parseTextMessage(receiveMsg, WebIM.Emoji);
//                     if (emojibody.isemoji) {
//                         var msg = {
//                             id: id
//                             , type: chattype
//                             , from: from
//                             , to: too
//                             , delay: parseMsgData.delayTimeStamp
//                             , data: emojibody.body
//                             , ext: extmsg
//                         };
//                         !msg.delay && delete msg.delay;
//                         msg.error = errorBool;
//                         msg.errorText = errorText;
//                         msg.errorCode = errorCode;
//                         this.onEmojiMessage(msg);
//                     } else {
//                         var msg = {
//                             id: id
//                             , type: chattype
//                             , from: from
//                             , to: too
//                             , delay: parseMsgData.delayTimeStamp
//                             , data: receiveMsg
//                             , ext: extmsg
//                         };
//                         !msg.delay && delete msg.delay;
//                         msg.error = errorBool;
//                         msg.errorText = errorText;
//                         msg.errorCode = errorCode;
//                         this.onTextMessage(msg);
//                     }
//                     break;
//                 case 'img':
//                     var rwidth = 0;
//                     var rheight = 0;
//                     if (msgBody.size) {
//                         rwidth = msgBody.size.width;
//                         rheight = msgBody.size.height;
//                     }
//                     var msg = {
//                         id: id
//                         , type: chattype
//                         , from: from
//                         , to: too
//                         ,
//                         url: (location.protocol != 'https:' && self.isHttpDNS) ? (self.apiUrl + msgBody.url.substr(msgBody.url.indexOf("/", 9))) : msgBody.url
//                         , secret: msgBody.secret
//                         , filename: msgBody.filename
//                         , thumb: msgBody.thumb
//                         , thumb_secret: msgBody.thumb_secret
//                         , file_length: msgBody.file_length || ''
//                         , width: rwidth
//                         , height: rheight
//                         , filetype: msgBody.filetype || ''
//                         , accessToken: this.context.accessToken || ''
//                         , ext: extmsg
//                         , delay: parseMsgData.delayTimeStamp
//                     };
//                     !msg.delay && delete msg.delay;
//                     msg.error = errorBool;
//                     msg.errorText = errorText;
//                     msg.errorCode = errorCode;
//                     this.onPictureMessage(msg);
//                     break;
//                 case 'audio':
//                     var msg = {
//                         id: id
//                         , type: chattype
//                         , from: from
//                         , to: too
//                         ,
//                         url: (location.protocol != 'https:' && self.isHttpDNS) ? (self.apiUrl + msgBody.url.substr(msgBody.url.indexOf("/", 9))) : msgBody.url
//                         , secret: msgBody.secret
//                         , filename: msgBody.filename
//                         , length: msgBody.length || ''
//                         , file_length: msgBody.file_length || ''
//                         , filetype: msgBody.filetype || ''
//                         , accessToken: this.context.accessToken || ''
//                         , ext: extmsg
//                         , delay: parseMsgData.delayTimeStamp
//                     };
//                     !msg.delay && delete msg.delay;
//                     msg.error = errorBool;
//                     msg.errorText = errorText;
//                     msg.errorCode = errorCode;
//                     this.onAudioMessage(msg);
//                     break;
//                 case 'file':
//                     var msg = {
//                         id: id
//                         , type: chattype
//                         , from: from
//                         , to: too
//                         ,
//                         url: (location.protocol != 'https:' && self.isHttpDNS) ? (self.apiUrl + msgBody.url.substr(msgBody.url.indexOf("/", 9))) : msgBody.url
//                         , secret: msgBody.secret
//                         , filename: msgBody.filename
//                         , file_length: msgBody.file_length
//                         , accessToken: this.context.accessToken || ''
//                         , ext: extmsg
//                         , delay: parseMsgData.delayTimeStamp
//                     };
//                     !msg.delay && delete msg.delay;
//                     msg.error = errorBool;
//                     msg.errorText = errorText;
//                     msg.errorCode = errorCode;
//                     this.onFileMessage(msg);
//                     break;
//                 case 'loc':
//                     var msg = {
//                         id: id
//                         , type: chattype
//                         , from: from
//                         , to: too
//                         , addr: msgBody.addr
//                         , lat: msgBody.lat
//                         , lng: msgBody.lng
//                         , ext: extmsg
//                         , delay: parseMsgData.delayTimeStamp
//                     };
//                     !msg.delay && delete msg.delay;
//                     msg.error = errorBool;
//                     msg.errorText = errorText;
//                     msg.errorCode = errorCode;
//                     this.onLocationMessage(msg);
//                     break;
//                 case 'video':
//                     var msg = {
//                         id: id
//                         , type: chattype
//                         , from: from
//                         , to: too
//                         ,
//                         url: (location.protocol != 'https:' && self.isHttpDNS) ? (self.apiUrl + msgBody.url.substr(msgBody.url.indexOf("/", 9))) : msgBody.url
//                         , secret: msgBody.secret
//                         , filename: msgBody.filename
//                         , file_length: msgBody.file_length
//                         , accessToken: this.context.accessToken || ''
//                         , ext: extmsg
//                         , delay: parseMsgData.delayTimeStamp
//                     };
//                     !msg.delay && delete msg.delay;
//                     msg.error = errorBool;
//                     msg.errorText = errorText;
//                     msg.errorCode = errorCode;
//                     this.onVideoMessage(msg);
//                     break;
//                 case 'cmd':
//                     var msg = {
//                         id: id
//                         , from: from
//                         , to: too
//                         , action: msgBody.action
//                         , ext: extmsg
//                         , delay: parseMsgData.delayTimeStamp
//                     };
//                     !msg.delay && delete msg.delay;
//                     msg.error = errorBool;
//                     msg.errorText = errorText;
//                     msg.errorCode = errorCode;
//                     if(msgBody.action === 'em_retrieve_dns'){
//                         isCmdMsg = true;
//                     }
//                     if(msgBody.action.indexOf("em_") !== 0){
//                         self.onCmdMessage(msg);
//                     }
//                     else{
//                         var ackMessage = new WebIM.message("read", self.getUniqueId())
//                         ackMessage.set({ id: msg.id, to: msg.from, ext: { logo: "easemob" } })
//                         self.send(ackMessage.body)
//                         self.handelSendQueue();        
//                     }
//                     break;
//             }
//             ;
//             if (self.delivery) {
//                 var msgId = self.getUniqueId();
//                 var bodyId = msg.id;
//                 var deliverMessage = new WebIM.message('delivery', msgId);
//                 deliverMessage.set({
//                     id: bodyId
//                     , to: msg.from
//                 });
//                 self.send(deliverMessage.body);
//             }
//             isCmdMsg && this.close();       //action==em_retrieve_dns 的cmd消息用于迁集群，退出重新登录以获取config信息
//         } catch (e) {
//             this.onError({
//                 type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR
//                 , data: e
//             });
//         }
//     }
// };

/**
 * @private
 */
// connection.prototype.handleDeliveredMessage = function (message) {  //****
//     var id = message.id;
//     var body = message.getElementsByTagName('body');
//     var mid = 0;
//     mid = body[0].innerHTML;
//     var msg = {
//         mid: mid
//     };
//     this.onDeliverdMessage(msg);
//     // this.sendReceiptsMessage({
//     //     id: id
//     // });
// };

/**
 * @private
 */
// connection.prototype.handleAckedMessage = function (message) {  //****
//     var id = message.id;
//     var body = message.getElementsByTagName('body');
//     var mid = 0;
//     mid = body[0].innerHTML;
//     var msg = {
//         mid: mid
//     };
//     this.onReadMessage(msg);
//     this.sendReceiptsMessage({
//         id: id
//     });
// };

/**
 * @private
 */
// connection.prototype.handleReceivedMessage = function (message) {  //****
//     try {
//         var received = message.getElementsByTagName("received");
//         var mid = received[0].getAttribute('mid');
//         var body = message.getElementsByTagName("body");
//         var id = body[0].innerHTML;
//         var msg = {
//             mid: mid,
//             id: id
//         };
//         this.onReceivedMessage(msg);
//     } catch (e) {
//         this.onError({
//             type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR
//             , data: e
//         });
//     }

//     var rcv = message.getElementsByTagName('received'),
//         id,
//         mid;

//     if (rcv.length > 0) {
//         if (rcv[0].childNodes && rcv[0].childNodes.length > 0) {
//             id = rcv[0].childNodes[0].nodeValue;
//         } else {
//             id = rcv[0].innerHTML || rcv[0].innerText;
//         }
//         mid = rcv[0].getAttribute('mid');
//     }

//     if (_msgHash[id]) {
//         try {
//             _msgHash[id].msg.success instanceof Function && _msgHash[id].msg.success(id, mid);
//         } catch (e) {
//             this.onError({
//                 type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR
//                 , data: e
//             });
//         }
//         delete _msgHash[id];
//     }
// };

/**
 * @private
 */
// connection.prototype.handleInviteMessage = function (message) {  //****
//     var form = null;
//     var invitemsg = message.getElementsByTagName('invite');
//     var reasonDom = message.getElementsByTagName('reason')[0];
//     var reasonMsg = reasonDom.textContent;
//     var id = message.getAttribute('id') || '';
//     this.sendReceiptsMessage({
//         id: id
//     });

//     if (invitemsg && invitemsg.length > 0) {
//         var fromJid = invitemsg[0].getAttribute('from');
//         form = _parseNameFromJidFn(fromJid);
//     }
//     var xmsg = message.getElementsByTagName('x');
//     var roomid = null;
//     if (xmsg && xmsg.length > 0) {
//         for (var i = 0; i < xmsg.length; i++) {
//             if ('jabber:x:conference' === xmsg[i].namespaceURI) {
//                 var roomjid = xmsg[i].getAttribute('jid');
//                 roomid = _parseNameFromJidFn(roomjid);
//             }
//         }
//     }
//     this.onInviteMessage({
//         type: 'invite',
//         from: form,
//         roomid: roomid,
//         reason: reasonMsg
//     });
// };

/**
 * @private
 */
// connection.prototype.handleMutedMessage = function (message) {  //****
//     var id = message.id;
//     this.onMutedMessage({
//         mid: id
//     });
// };

/**
 * @private
 */
// connection.prototype.sendCommand = function (dom, id) {     //**** */
//     if (this.isOpened()) {
//         this.context.stropheConn.send(dom);
//     } else {
//         this.unSendMsgArr.push(dom);
//         if(!this.offLineSendConnecting && !this.logOut){
//             this.offLineSendConnecting = true;
//             this.reconnect();
//         }
//         this.onError({
//             type: _code.WEBIM_CONNCTION_DISCONNECTED,
//             reconnect: true
//         });
//     }
// };

/**
 * 消息撤回
 * @param {Object} option - 
 */
connection.prototype.recallMessage = function(option){
    var messageOption = {
        id: this.getUniqueId(),
        type: "recall",
        mid: option.mid,
        to: option.to,
        success: option.success,
        fail: option.fail
    }
    this.send(messageOption, this);
}




/**
 * @private
 */
connection.prototype.sendMSync = function(str){     //
    var strr = "";
    // this.unSendMsgArr.push(dom);
    for (var i = 0; i < str.length; i++) {
        var str0 = String.fromCharCode(str[i]);
        strr = strr + str0;
    }
    strr = Base64.btoa(strr);
    //strr = window.btoa(strr);

    console.log("转码发送" + strr);
    if(sock.readyState === SockJS.OPEN){
        sock.send(strr);
    }
    else{
        this.unSendMsgArr.push(strr);
        if(!this.offLineSendConnecting && !this.logOut){
            this.offLineSendConnecting = true;
            this.reconnect();
        }
        this.onError({
            type: _code.WEBIM_CONNCTION_DISCONNECTED,
            reconnect: true
        });
    }
}

/**
 * 随机生成一个id用于消息id
 * @param {String} prefix - 前缀，默认为"WEBIM_"
 */
// connection.prototype.getUniqueIdOld = function (prefix) {
//     // fix: too frequently msg sending will make same id
//     if (this.autoIncrement) {
//         this.autoIncrement++
//     } else {
//         this.autoIncrement = 1
//     }
//     var cdate = new Date();
//     var offdate = new Date(2010, 1, 1);
//     var offset = cdate.getTime() - offdate.getTime();
//     var hexd = parseFloat(offset).toString(16) + this.autoIncrement;

//     if (typeof prefix === 'string' || typeof prefix === 'number') {
//         return prefix + '_' + hexd;
//     } else {
//         return 'WEBIM_' + hexd;
//     }
// };

connection.prototype.getUniqueId = function (prefix) { //*******
    // fix: too frequently msg sending will make same id
    if (this.autoIncrement) {
        this.autoIncrement++
    } else {
        this.autoIncrement = 1
    }
    var cdate = new Date();
    var offdate = new Date(2010, 1, 1);
    var offset = cdate.getTime() - offdate.getTime();
    var hexd = offset + this.autoIncrement;
    return hexd;

};

/**
 * 发送消息旧
 * @param {Object} messageSource - 由 Class Message 生成
 * @example
 *let deliverMessage = new WebIM.message('delivery', msgId);
 *deliverMessage.set({
 *  id: msgId, 
 *  to: msg.from
 *});
 *conn.send(deliverMessage.body);
 */

// connection.prototype.sendOld = function (messageSource) {
//     var self = this;
//     var message = messageSource;
//     if (message.type === 'txt') {
//         if (this.encrypt.type === 'base64') {
//             message = _.clone(messageSource);
//             message.msg = btoa(message.msg);
//         } else if (this.encrypt.type === 'aes') {
//             message = _.clone(messageSource);
//             var key = CryptoJS.enc.Utf8.parse(this.encrypt.key);
//             var iv = CryptoJS.enc.Utf8.parse(this.encrypt.iv);
//             var mode = this.encrypt.mode.toLowerCase();
//             var option = {};
//             if (mode === 'cbc') {
//                 option = {
//                     iv: iv,
//                     mode: CryptoJS.mode.CBC,
//                     padding: CryptoJS.pad.Pkcs7
//                 };
//             } else if (mode === 'ebc') {
//                 option = {
//                     mode: CryptoJS.mode.ECB,
//                     padding: CryptoJS.pad.Pkcs7
//                 }
//             }
//             var encryptedData = CryptoJS.AES.encrypt(message.msg, key, option);

//             message.msg = encryptedData.toString();
//         }
//     }
//     if (this.isWindowSDK) {
//         WebIM.doQuery('{"type":"sendMessage","to":"' + message.to + '","message_type":"' + message.type + '","msg":"' + encodeURI(message.msg) + '","chatType":"' + message.chatType + '"}',
//             function (response) {
//             },
//             function (code, msg) {
//                 var message = {
//                     data: {
//                         data: "send"
//                     },
//                     type: _code.WEBIM_MESSAGE_SED_ERROR
//                 };
//                 self.onError(message);
//             });
//     } else {
//         if (Object.prototype.toString.call(message) === '[object Object]') {
//             var appKey = this.context.appKey || '';
//             var toJid = appKey + '_' + message.to + '@' + this.domain;

//             if (message.group) {
//                 toJid = appKey + '_' + message.to + '@conference.' + this.domain;
//             }
//             if (message.resource) {
//                 toJid = toJid + '/' + message.resource;
//             }

//             message.toJid = toJid;
//             message.id = message.id || this.getUniqueId();
//             _msgHash[message.id] = new _message(message);
//             _msgHash[message.id].send(this);
//         } else if (typeof message === 'string') {
//             _msgHash[message] && _msgHash[message].send(this);
//         }
//     }
// };

/**
 * 发送消息
 * @param {Object} messageSource - 由 Class Message 生成
 * @example
 *let deliverMessage = new WebIM.message('delivery', msgId);
 *deliverMessage.set({
 *  id: msgId, 
 *  to: msg.from
 *});
 *conn.send(deliverMessage.body);
 */

connection.prototype.send= function (messageOption) {
    var self = this;
    ChatMessage.default(messageOption, self);
    _msgHash[messageOption.id] = messageOption;
};

/**
 * 添加联系人(已废弃)
 * @param {Object} options
 * @deprecated
 */

connection.prototype.addRoster = function (options) {
    var jid = _getJid(options, this);
    var name = options.name || '';
    var groups = options.groups || '';

    var iq = $iq({type: 'set'});
    iq.c('query', {xmlns: 'jabber:iq:roster'});
    iq.c('item', {jid: jid, name: name});

    if (groups) {
        for (var i = 0; i < groups.length; i++) {
            iq.c('group').t(groups[i]).up();
        }
    }
    var suc = options.success || _utils.emptyfn;
    var error = options.error || _utils.emptyfn;
    this.context.stropheConn.sendIQ(iq.tree(), suc, error);
};

/**
 * 删除联系人
 *
 * @param {Object} options -
 * @param {String} options.to - 联系人ID
 * @param {String} options.resource - 用于生成jid，默认"webim"
 * @param {Function} options.success - 成功之后的回调，在回调里调用connection.unsubscribed才能真正删除联系人
 * @param {Function} options.error - 失败之后的回调，默认为空
 * @example
 * connection.removeRoster({
 *   to: id,
 *   success: function() {
 *      connection.unsubscribed({
 *          to: id
 *      })
 *   },
 *   error: function() {
 *
 *   }
 * })
 * @fires connection#unsubscribed
 */

connection.prototype.removeRoster = function (options) {
    HandleRosterMessage.operatRoster(options, "remove", this);
};

/**
 * 获取联系人
 * @param {Object} options - 
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.getRosterOld = function (options) {
    var conn = this;
    var dom = $iq({
        type: 'get'
    }).c('query', {xmlns: 'jabber:iq:roster'});

    var options = options || {};
    var suc = options.success || this.onRoster;
    var completeFn = function (ele) {
        var rouster = [];
        var msgBodies = ele.getElementsByTagName('query');
        if (msgBodies && msgBodies.length > 0) {
            var queryTag = msgBodies[0];
            rouster = _parseFriend(queryTag);
        }
        suc(rouster, ele);
    };
    var error = options.error || this.onError;
    var failFn = function (ele) {
        error({
            type: _code.WEBIM_CONNCTION_GETROSTER_ERROR
            , data: ele
        });
    };
    if (this.isOpened()) {
        this.context.stropheConn.sendIQ(dom.tree(), completeFn, failFn);
    } else {
        error({
            type: _code.WEBIM_CONNCTION_DISCONNECTED
        });
    }
};

/**
 * 获取联系人
 * @param {Object} options - 
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */

connection.prototype.getRoster = function (options) {
    var options = options || {};
    var self = this;
    if (!_utils.isCanSetRequestHeader) {
        conn.onError({
            type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
        });
        return;
    }

    var conn = this,
        token = options.accessToken || this.token;

    if (token) {
        var apiUrl = options.apiUrl || this.apiUrl;
        var appName = this.context.appName;
        var orgName = this.context.orgName;

        if (!appName || !orgName) {
            conn.onError({
                type: _code.WEBIM_CONNCTION_AUTH_ERROR
            });
            return;
        }

        var suc = function (data, xhr) {
            //_parseFriend *****之前用这个方法处理的返回消息
            let friends = [];
            data.data.forEach((v,i) => {
                friends.push({
                    name: v,
                    subscription: 'both',
                    jid: self.context.jid
                });
            })
            typeof options.success === 'function' && options.success(friends);
            this.onRoster && this.onRoster();
        };

        var error = function (res, xhr, msg) {
            typeof options.error === 'function' && options.error(res);
        };

        // var pageInfo = {
        //     pagenum: parseInt(options.pagenum) || 1,
        //     pagesize: parseInt(options.pagesize) || 20
        // };

        var opts = {
            url: apiUrl + '/' + orgName + '/' + appName + '/users/' + this.user + '/contacts/users',
            dataType: 'json',
            type: 'GET',
            headers: {'Authorization': 'Bearer ' + token},
            // data: pageInfo,
            success: suc || _utils.emptyfn,
            error: error || _utils.emptyfn
        };
        _utils.ajax(opts);
    } else {
        conn.onError({
            type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
        });
    }
};



/**
 * 订阅和反向订阅
 * @example
 *
 * A订阅B（A添加B为好友）
 * A执行：
 *  conn.subscribe({
        to: 'B',
        message: 'Hello~'
    });
 B的监听函数onPresence参数message.type == subscribe监听到有人订阅他
 B执行：
 conn.subscribed({
    to: 'A',
    message: '[resp:true]'
 });
 同意A的订阅请求
 B继续执行：
 conn.subscribe({
    to: 'A',
    message: '[resp:true]'
 });
 反向订阅A，这样才算双方添加好友成功。
 若B拒绝A的订阅请求，只需执行：
 conn.unsubscribed({
    to: 'A',
    message: 'I don't want to be subscribed'
 });
 另外，在监听函数onPresence参数message.type == "subscribe"这个case中，加一句
 if (message && message.status === '[resp:true]') {
    return;
 }
 否则会进入死循环
 *
 * @param {Object} options - 
 * @param {String} options.to - 想要订阅的联系人ID
 * @param {String} options.nick - 想要订阅的联系人昵称 （非必须）
 * @param {String} options.message - 发送给想要订阅的联系人的验证消息（非必须）
 */
connection.prototype.subscribe = function (options) {
    HandleRosterMessage.operatRoster(options, "add", this);
};

/**
 * 被订阅后确认同意被订阅
 * @param {Object} options - 
 * @param {String} options.to - 订阅人的ID
 * @param {String} options.message  - 默认为[resp:true]，后续将去掉该参数
 */
connection.prototype.subscribed = function (options) {
    HandleRosterMessage.operatRoster(options, "accept", this);
};

/**
 * 取消订阅成功(已废弃)
 * @param {Object} options
 * @deprecated
 */
connection.prototype.unsubscribe = function (options) {
    var jid = _getJid(options, this);
    var pres = $pres({to: jid, type: 'unsubscribe'});

    if (options.message) {
        pres.c('status').t(options.message);
    }
    this.sendCommand(pres.tree());
};

/**
 * 拒绝对方的订阅请求
 * @function connection#event:unsubscribed
 * @param {Object} options -
 * @param {String} options.to - 订阅人的ID
 * @param {String} options.message - 发送给拒绝订阅的联系人的验证消息（非必须）
 */
connection.prototype.unsubscribed = function (options) {
    HandleRosterMessage.operatRoster(options, "decline", this);
    // var jid = _getJid(options, this);
    // var pres = $pres({to: jid, type: 'unsubscribed'});

    // if (options.message) {
    //     pres.c('status').t(options.message).up();
    // }
    // this.sendCommand(pres.tree());
};

/**
 * 加入公开群组(已废弃)
 * @param {Object} options
 * @deprecated
 */
connection.prototype.joinPublicGroup = function (options) {
    var roomJid = this.context.appKey + '_' + options.roomId + '@conference.' + this.domain;
    var room_nick = roomJid + '/' + this.context.userId;
    var suc = options.success || _utils.emptyfn;
    var err = options.error || _utils.emptyfn;
    var errorFn = function (ele) {
        err({
            type: _code.WEBIM_CONNCTION_JOINROOM_ERROR,
            data: ele
        });
    };
    var iq = $pres({
        from: this.context.jid,
        to: room_nick
    })
        .c('x', {xmlns: Strophe.NS.MUC});

    this.context.stropheConn.sendIQ(iq.tree(), suc, errorFn);
};

/**
 * 获取聊天室列表(已废弃)
 * @param {Object} options
 * @deprecated
 */
connection.prototype.listRooms = function (options) {
    var iq = $iq({
        to: options.server || 'conference.' + this.domain,
        from: this.context.jid,
        type: 'get'
    })
        .c('query', {xmlns: Strophe.NS.DISCO_ITEMS});

    var suc = options.success || _utils.emptyfn;
    var error = options.error || this.onError;
    var completeFn = function (result) {
        var rooms = [];
        rooms = _parseRoom(result);
        try {
            suc(rooms);
        } catch (e) {
            error({
                type: _code.WEBIM_CONNCTION_GETROOM_ERROR,
                data: e
            });
        }
    };
    var err = options.error || _utils.emptyfn;
    var errorFn = function (ele) {
        err({
            type: _code.WEBIM_CONNCTION_GETROOM_ERROR
            , data: ele
        });
    };
    this.context.stropheConn.sendIQ(iq.tree(), completeFn, errorFn);
};

/**
 * 获取群组成员列表(已废弃)
 * @param {Object} options
 * @deprecated
 */
connection.prototype.queryRoomMember = function (options) {
    var domain = this.domain;
    var members = [];
    var iq = $iq({
        to: this.context.appKey + '_' + options.roomId + '@conference.' + this.domain
        , type: 'get'
    })
        .c('query', {xmlns: Strophe.NS.MUC + '#admin'})
        .c('item', {affiliation: 'member'});

    var suc = options.success || _utils.emptyfn;
    var completeFn = function (result) {
        var items = result.getElementsByTagName('item');

        if (items) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var mem = {
                    jid: item.getAttribute('jid')
                    , affiliation: 'member'
                };
                members.push(mem);
            }
        }
        suc(members);
    };
    var err = options.error || _utils.emptyfn;
    var errorFn = function (ele) {
        err({
            type: _code.WEBIM_CONNCTION_GETROOMMEMBER_ERROR
            , data: ele
        });
    };
    this.context.stropheConn.sendIQ(iq.tree(), completeFn, errorFn);
};

/**
 * 获取群组信息(已废弃)
 * @param {Object} options
 * @deprecated
 */
connection.prototype.queryRoomInfo = function (options) {
    var domain = this.domain;
    var iq = $iq({
        to: this.context.appKey + '_' + options.roomId + '@conference.' + domain,
        type: 'get'
    }).c('query', {xmlns: Strophe.NS.DISCO_INFO});

    var suc = options.success || _utils.emptyfn;
    var members = [];

    var completeFn = function (result) {
        var settings = '';
        var features = result.getElementsByTagName('feature');
        if (features) {
            settings = features[1].getAttribute('var') + '|' + features[3].getAttribute('var') + '|' + features[4].getAttribute('var');
        }
        switch (settings) {
            case 'muc_public|muc_membersonly|muc_notallowinvites':
                settings = 'PUBLIC_JOIN_APPROVAL';
                break;
            case 'muc_public|muc_open|muc_notallowinvites':
                settings = 'PUBLIC_JOIN_OPEN';
                break;
            case 'muc_hidden|muc_membersonly|muc_allowinvites':
                settings = 'PRIVATE_MEMBER_INVITE';
                break;
            case 'muc_hidden|muc_membersonly|muc_notallowinvites':
                settings = 'PRIVATE_OWNER_INVITE';
                break;
        }
        var owner = '';
        var fields = result.getElementsByTagName('field');
        var fieldValues = {};
        if (fields) {
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                var fieldVar = field.getAttribute('var');
                var fieldSimplify = fieldVar.split('_')[1];
                switch (fieldVar) {
                    case 'muc#roominfo_occupants':
                    case 'muc#roominfo_maxusers':
                    case 'muc#roominfo_affiliations':
                    case 'muc#roominfo_description':
                        fieldValues[fieldSimplify] = (field.textContent || field.text || '');
                        break;
                    case 'muc#roominfo_owner':
                        var mem = {
                            jid: (field.textContent || field.text) + '@' + domain
                            , affiliation: 'owner'
                        };
                        members.push(mem);
                        fieldValues[fieldSimplify] = (field.textContent || field.text);
                        break;
                }

                // if (field.getAttribute('label') === 'owner') {
                //     var mem = {
                //         jid: (field.textContent || field.text) + '@' + domain
                //         , affiliation: 'owner'
                //     };
                //     members.push(mem);
                //     break;
                // }
            }
            fieldValues['name'] = (result.getElementsByTagName('identity')[0]).getAttribute('name');
        }
        suc(settings, members, fieldValues);
    };
    var err = options.error || _utils.emptyfn;
    var errorFn = function (ele) {
        err({
            type: _code.WEBIM_CONNCTION_GETROOMINFO_ERROR
            , data: ele
        });
    };
    this.context.stropheConn.sendIQ(iq.tree(), completeFn, errorFn);
};

/**
 * 获取聊天室管理员(已废弃)
 * @param {Object} options
 * @deprecated
 */
connection.prototype.queryRoomOccupants = function (options) {
    var suc = options.success || _utils.emptyfn;
    var completeFn = function (result) {
        var occupants = [];
        occupants = _parseRoomOccupants(result);
        suc(occupants);
    }
    var err = options.error || _utils.emptyfn;
    var errorFn = function (ele) {
        err({
            type: _code.WEBIM_CONNCTION_GETROOMOCCUPANTS_ERROR
            , data: ele
        });
    };
    var attrs = {
        xmlns: Strophe.NS.DISCO_ITEMS
    };
    var info = $iq({
        from: this.context.jid
        , to: this.context.appKey + '_' + options.roomId + '@conference.' + this.domain
        , type: 'get'
    }).c('query', attrs);
    this.context.stropheConn.sendIQ(info.tree(), completeFn, errorFn);
};

/**
 *
 * @deprecated
 * @private
 */
// connection.prototype.setUserSig = function (desc) {
//     var dom = $pres({xmlns: 'jabber:client'});
//     desc = desc || '';
//     dom.c('status').t(desc);
//     this.sendCommand(dom.tree());
// };

/**
 *
 * @private //demo删除
 */
// connection.prototype.setPresence = function (type, status) {
//     var dom = $pres({xmlns: 'jabber:client'});
//     if (type) {
//         if (status) {
//             dom.c('show').t(type);
//             dom.up().c('status').t(status);
//         } else {
//             dom.c('show').t(type);
//         }
//     }
//     this.sendCommand(dom.tree());
// };

/**
 * @private
 *
 */
// connection.prototype.getPresence = function () {
//     var dom = $pres({xmlns: 'jabber:client'});
//     var conn = this;
//     this.sendCommand(dom.tree());
// };

/**
 * @private
 *
 */
// connection.prototype.ping = function (options) {
//     var options = options || {};
//     var jid = _getJid(options, this);

//     var dom = $iq({
//         from: this.context.jid || ''
//         , to: jid
//         , type: 'get'
//     }).c('ping', {xmlns: 'urn:xmpp:ping'});

//     var suc = options.success || _utils.emptyfn;
//     var error = options.error || this.onError;
//     var failFn = function (ele) {
//         error({
//             type: _code.WEBIM_CONNCTION_PING_ERROR
//             , data: ele
//         });
//     };
//     if (this.isOpened()) {
//         this.context.stropheConn.sendIQ(dom.tree(), suc, failFn);
//     } else {
//         error({
//             type: _code.WEBIM_CONNCTION_DISCONNECTED
//         });
//     }
//     return;
// };

/**
 * @private
 *
 */
connection.prototype.isOpened = function () {
    return this.context.status == _code.STATUS_OPENED;
};

/**
 * @private
 *
 */
connection.prototype.isOpening = function () {
    var status = this.context.status;
    return status == _code.STATUS_DOLOGIN_USERGRID || status == _code.STATUS_DOLOGIN_IM;
};

/**
 * @private
 *
 */
connection.prototype.isClosing = function () {
    return this.context.status == _code.STATUS_CLOSING;
};

/**
 * @private
 *
 */
connection.prototype.isClosed = function () {
    return this.context.status == _code.STATUS_CLOSED;
};

/**
 * @private
 *
 */
connection.prototype.clear = function () {
    var key = this.context.appKey;
    if (this.errorType != _code.WEBIM_CONNCTION_DISCONNECTED) {
        // this.context = {
        //     status: _code.STATUS_INIT,
        //     appKey: key
        // };
        if (this.logOut) {
            this.unSendMsgArr = [];
            this.offLineSendConnecting = false;
            this.context = {
                status: _code.STATUS_INIT,
                appKey: key
            };
        }
    }
    if (this.intervalId) {
        clearInterval(this.intervalId);
    }
    this.restIndex = 0;
    this.xmppIndex = 0;

    if (this.errorType == _code.WEBIM_CONNCTION_CLIENT_LOGOUT || this.errorType == -1) {
        var message = {
            data: {
                data: "logout"
            },
            type: _code.WEBIM_CONNCTION_CLIENT_LOGOUT
        };
        this.onError(message);
    }
};

/**
 * 获取对话历史消息
 * @param {Object} options
 * @param {String} options.queue 对方id
 * @param {Function} options.success
 * @param {Funciton} options.fail
 */
connection.prototype.fetchHistoryMessages = function(options) {
    var conn = this
    if (!options.queue) {
        conn.onError({
            type: "",
            msg: "queue is not specified"
        });
        return;
    }

    var count = options.count || 20

    function _readCacheMessages() {
        conn._fetchMessages({
            count: count,
            isGroup: options.isGroup ? true: false,
            queue: options.queue,
            success: function(data) {
                var length = data.msgs.length
                if (length >= count || data.is_last) {
                    options.success(_utils.reverse(data.msgs.splice(0, count)))
                } else {
                    _readCacheMessages()
                }
            }
        })
    }
    _readCacheMessages()
};

/**
 * 获取对话历史消息
 * @param {Object} options
 * @param {String} options.queue
 * @param {Function} options.success
 * @param {Funciton} options.fail
 */
connection.prototype._fetchMessages = function(options) {
    var conn = this,
        token = options.accessToken || this.context.accessToken
    
    if (!_utils.isCanSetRequestHeader) {
        conn.onError({
            type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
        });
        return;
    }

    if (token) {
        var apiUrl = this.apiUrl;
        var appName = this.context.appName;
        var orgName = this.context.orgName;

        if (!appName || !orgName) {
            conn.onError({
                type: _code.WEBIM_CONNCTION_AUTH_ERROR
            });
            return;
        }

        if (!options.queue) {
            conn.onError({
                type: "",
                msg: "queue is not specified"
            });
            return;
        }

        var queue = options.queue
        var _dataQueue = mr_cache[queue] || (mr_cache[queue] = {msgs: []})
    
        var suc = function (res, xhr) {
            
            if (res && res.data) {
                var data = res.data
                var msgs =data.msgs;
                var length = msgs.length;
                
                _dataQueue.is_last = data.is_last;
                _dataQueue.next_key = data.next_key;

                var _paseMeta = function(meta){
                    var arr = [];
                    meta = Base64.atob(meta);
                    for (var i = 0, j = meta.length; i < j; ++i) {
                        arr.push(meta.charCodeAt(i));
                    }
                    var tmpUint8Array = new Uint8Array(arr); 

                    var CommSyncDLMessage = conn.context.root.lookup("easemob.pb.Meta");
                    CommSyncDLMessage = CommSyncDLMessage.decode(tmpUint8Array);

                    var status = {
                        errorCode: 0,
                        reason: ''
                    }
                    
                    var thirdMessage = HandleChatMessage.handleMessage(CommSyncDLMessage, status, conn, true)
                    return thirdMessage;
                }

                for (var i = 0; i < length; i++) {
                    var msgObj = _paseMeta(msgs[i].msg)
                    msgObj && _dataQueue.msgs.push(msgObj); 
                }

                typeof options.success === 'function' && options.success(_dataQueue);
            }
        };

        var error = function (res, msg) {
            if (res.error && res.error_description) {
                conn.onError({
                    type: _code.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,
                    msg: res.error_description,
                    data: res
                });
            }
        };

        var userId = this.context.userId;    
        var start = -1
        
        // 无历史消息或者缓存消息足够不再加载
        if (_dataQueue.msgs.length >= options.count || _dataQueue.is_last) {
            typeof options.success === 'function' && options.success(_dataQueue);
            return;
        }
        
        // 根据上一次拉取返回的last_key 进行本次消息拉取
        if (_dataQueue && _dataQueue.next_key) {
            start = _dataQueue.next_key
        }

        var suffix = options.isGroup ? "@conference.easemob.com" : "@easemob.com";
        var data = {
            queue: queue + suffix,
            start: start,
            end: -1
        };
 
        var opts = {
            url: apiUrl + '/' + orgName + '/' + appName + '/users/' + userId + '/messageroaming',
            dataType: 'json',
            type: 'POST',
            headers: {'Authorization': 'Bearer ' + token},
            data: JSON.stringify(data),
            success: suc || _utils.emptyfn,
            error: error || _utils.emptyfn
        };

        _utils.ajax(opts);

    }  else {
        conn.onError({
            type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
        });
    }
}

/**
 * 获取聊天室列表（分页）
 * @param {Object} options -
 * @param {String} options.apiUrl - rest的接口地址
 * @param {Number} options.pagenum - 页码，默认1
 * @param {Number} options.pagesize - 每页数量，默认20
 * @param {Function} options.success - 成功之后的回调，默认为空
 */
connection.prototype.getChatRooms = function (options) {

    if (!_utils.isCanSetRequestHeader) {
        conn.onError({
            type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
        });
        return;
    }

    var conn = this,
        token = options.accessToken || this.context.accessToken;

    if (token) {
        var apiUrl = options.apiUrl;
        var appName = this.context.appName;
        var orgName = this.context.orgName;

        if (!appName || !orgName) {
            conn.onError({
                type: _code.WEBIM_CONNCTION_AUTH_ERROR
            });
            return;
        }

        var suc = function (data, xhr) {
            typeof options.success === 'function' && options.success(data);
        };

        var error = function (res, xhr, msg) {
            if (res.error && res.error_description) {
                conn.onError({
                    type: _code.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,
                    msg: res.error_description,
                    data: res,
                    xhr: xhr
                });
            }
        };

        var pageInfo = {
            pagenum: parseInt(options.pagenum) || 1,
            pagesize: parseInt(options.pagesize) || 20
        };

        var opts = {
            url: apiUrl + '/' + orgName + '/' + appName + '/chatrooms',
            dataType: 'json',
            type: 'GET',
            headers: {'Authorization': 'Bearer ' + token},
            data: pageInfo,
            success: suc || _utils.emptyfn,
            error: error || _utils.emptyfn
        };
        _utils.ajax(opts);
    } else {
        conn.onError({
            type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
        });
    }

};

/**
 * 加入聊天室
 * @param {Object} options - 
 * @param {String} options.roomId - 聊天室的ID
 * @param {stirng} opt.userName - 用户ID
 * @param {stirng} opt.message - 原因
 * @param {stirng} opt.nickname - 昵称
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.joinChatRoom = function (options) {
    var options = options || {};
    if (!_utils.isCanSetRequestHeader) {
        conn.onError({
            type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
        });
        return;
    }

    var conn = this
    var token = options.accessToken || this.token;


    if (token) {
        var apiUrl = options.apiUrl || this.apiUrl;
        var appName = this.context.appName;
        var orgName = this.context.orgName;
        var roomId = options.roomId
        var roomJid = this.context.appKey + '_' + options.roomId + '@conference.' + this.domain;
        var userName = options.userName;
        var message = options.message || '';
        var nickname = options.nickname || '';
        if (!appName || !orgName) {
            conn.onError({
                type: _code.WEBIM_CONNCTION_AUTH_ERROR
            });
            return;
        }

        var suc = function (data, xhr) {
            typeof options.success === 'function' && options.success(data);
        };

        var error = function (res, xhr, msg) {
            typeof options.error === 'function' && options.error(res);
        };

        var opts = {
            url: apiUrl + '/' + orgName + '/' + appName + '/chatrooms/' + roomId + '/apply',
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify({
                message: message,
                nickname: nickname
            }),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            success: suc || _utils.emptyfn,
            error: error || _utils.emptyfn
        };
        _utils.ajax(opts);
    } else {
        conn.onError({
            type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
        });
    }
};

/**
 * 退出聊天室
 * @param {Object} options -
 * @param {String} options.roomId - 聊天室的ID
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.quitChatRoom = function (options) {
    var options = options || {};
    if (!_utils.isCanSetRequestHeader) {
        conn.onError({
            type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
        });
        return;
    }

    var conn = this
    var token = options.accessToken || this.token;

    if (token) {
        var apiUrl = options.apiUrl || this.apiUrl;
        var appName = this.context.appName;
        var orgName = this.context.orgName;
        var roomId = options.roomId
        var roomJid = this.context.appKey + '_' + options.roomId + '@conference.' + this.domain;
        if (!appName || !orgName) {
            conn.onError({
                type: _code.WEBIM_CONNCTION_AUTH_ERROR
            });
            return;
        }

        var suc = function (data, xhr) {
            typeof options.success === 'function' && options.success(data);
        };

        var error = function (res, xhr, msg) {
            typeof options.error === 'function' && options.error(res);
        };

        var opts = {
            url: apiUrl + '/' + orgName + '/' + appName + '/chatrooms/' + roomId + '/quit',
            dataType: 'json',
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: suc || _utils.emptyfn,
            error: error || _utils.emptyfn
        };
        _utils.ajax(opts);
    } else {
        conn.onError({
            type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
        });
    }
};

/**
 * for windowSDK
 * @private
 *
 */
connection.prototype._onReceiveInviteFromGroup = function (info) {
    info = eval('(' + info + ')');
    var self = this;
    var options = {
        title: "Group invitation",
        msg: info.user + " invites you to join into group:" + info.group_id,
        agree: function agree() {
            WebIM.doQuery('{"type":"acceptInvitationFromGroup","id":"' + info.group_id + '","user":"' + info.user + '"}', function (response) {
            }, function (code, msg) {
                var message = {
                    data: {
                        data: "acceptInvitationFromGroup error:" + msg
                    },
                    type: _code.WEBIM_CONNECTION_ACCEPT_INVITATION_FROM_GROUP
                };
                self.onError(message);
            });
        },
        reject: function reject() {
            WebIM.doQuery('{"type":"declineInvitationFromGroup","id":"' + info.group_id + '","user":"' + info.user + '"}', function (response) {
            }, function (code, msg) {
                var message = {
                    data: {
                        data: "declineInvitationFromGroup error:" + msg
                    },
                    type: _code.WEBIM_CONNECTION_DECLINE_INVITATION_FROM_GROUP
                };
                self.onError(message);
            });
        }
    };

    this.onConfirmPop(options);
};

/**
 * for windowSDK
 * @private
 *
 */
connection.prototype._onReceiveInviteAcceptionFromGroup = function (info) {
    info = eval('(' + info + ')');
    var options = {
        title: "Group invitation response",
        msg: info.user + " agreed to join into group:" + info.group_id,
        agree: function agree() {
        }
    };
    this.onConfirmPop(options);
};

/**
 * for windowSDK
 * @private
 *
 */
connection.prototype._onReceiveInviteDeclineFromGroup = function (info) {
    info = eval('(' + info + ')');
    var options = {
        title: "Group invitation response",
        msg: info.user + " rejected to join into group:" + info.group_id,
        agree: function agree() {
        }
    };
    this.onConfirmPop(options);
};

/**
 * for windowSDK
 * @private
 *
 */
connection.prototype._onAutoAcceptInvitationFromGroup = function (info) {
    info = eval('(' + info + ')');
    var options = {
        title: "Group invitation",
        msg: "You had joined into the group:" + info.group_name + " automatically.Inviter:" + info.user,
        agree: function agree() {
        }
    };
    this.onConfirmPop(options);
};

/**
 * for windowSDK
 * @private
 *
 */
connection.prototype._onLeaveGroup = function (info) {
    info = eval('(' + info + ')');
    var options = {
        title: "Group notification",
        msg: "You have been out of the group:" + info.group_id + ".Reason:" + info.msg,
        agree: function agree() {
        }
    };
    this.onConfirmPop(options);
};

/**
 * for windowSDK
 * @private
 *
 */
connection.prototype._onReceiveJoinGroupApplication = function (info) {
    info = eval('(' + info + ')');
    var self = this;
    var options = {
        title: "Group join application",
        msg: info.user + " applys to join into group:" + info.group_id,
        agree: function agree() {
            WebIM.doQuery('{"type":"acceptJoinGroupApplication","id":"' + info.group_id + '","user":"' + info.user + '"}', function (response) {
            }, function (code, msg) {
                var message = {
                    data: {
                        data: "acceptJoinGroupApplication error:" + msg
                    },
                    type: _code.WEBIM_CONNECTION_ACCEPT_JOIN_GROUP
                };
                self.onError(message);
            });
        },
        reject: function reject() {
            WebIM.doQuery('{"type":"declineJoinGroupApplication","id":"' + info.group_id + '","user":"' + info.user + '"}', function (response) {
            }, function (code, msg) {
                var message = {
                    data: {
                        data: "declineJoinGroupApplication error:" + msg
                    },
                    type: _code.WEBIM_CONNECTION_DECLINE_JOIN_GROUP
                };
                self.onError(message);
            });
        }
    };
    this.onConfirmPop(options);
};

/**
 * for windowSDK
 * @private
 *
 */
connection.prototype._onReceiveAcceptionFromGroup = function (info) {
    info = eval('(' + info + ')');
    var options = {
        title: "Group notification",
        msg: "You had joined into the group:" + info.group_name + ".",
        agree: function agree() {
        }
    };
    this.onConfirmPop(options);
};

/**
 * for windowSDK
 * @private
 *
 */
connection.prototype._onReceiveRejectionFromGroup = function () {
    info = eval('(' + info + ')');
    var options = {
        title: "Group notification",
        msg: "You have been rejected to join into the group:" + info.group_name + ".",
        agree: function agree() {
        }
    };
    this.onConfirmPop(options);
};

/**
 * for windowSDK
 * @private
 *
 */
connection.prototype._onUpdateMyGroupList = function (options) {
    this.onUpdateMyGroupList(options);
};

/**
 * for windowSDK
 * @private
 *
 */
connection.prototype._onUpdateMyRoster = function (options) {
    this.onUpdateMyRoster(options);
};

/**
 * @private
 *
 */
connection.prototype.reconnect = function (v) {
    var that = this;
    if(that.xmppIndex < that.xmppHosts.length){
        that.xmppIndex++;       //重连时改变ip地址
    }
    setTimeout(function () {
        _login({access_token: that.context.restTokenData}, that);
    }, (this.autoReconnectNumTotal == 0 ? 0 : this.autoReconnectInterval) * 1000);
    this.autoReconnectNumTotal++;
};

/**
 *
 * @private
 * @deprecated
 */
connection.prototype.closed = function () {
    var message = {
        data: {
            data: "Closed error"
        },
        type: _code.WEBIM_CONNECTION_CLOSED
    };
    this.onError(message);
};

/**
 * used for blacklist
 * @private
 *
 */
function _parsePrivacy(iq) {      //**** */
    var list = {};
    var items = iq.getElementsByTagName('item');

    if (items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var jid = item.getAttribute('value');
            var order = item.getAttribute('order');
            var type = item.getAttribute('type');
            if (!jid) {
                continue;
            }
            var n = _parseNameFromJidFn(jid);
            list[n] = {
                type: type,
                order: order,
                jid: jid,
                name: n
            };
        }
    }
    return list;
};

/**
 * 获取好友黑名单
 * @param {Object} options - 
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.getBlacklistOld = function (options) {
    options = (options || {});
    var iq = $iq({type: 'get'});
    var sucFn = options.success || _utils.emptyfn;
    var errFn = options.error || _utils.emptyfn;
    var me = this;

    iq.c('query', {xmlns: 'jabber:iq:privacy'})
        .c('list', {name: 'special'});

    this.context.stropheConn.sendIQ(iq.tree(), function (iq) {
        me.onBlacklistUpdate(_parsePrivacy(iq));
        sucFn();
    }, function () {
        me.onBlacklistUpdate([]);
        errFn();
    });
};

/**
 * 获取好友黑名单
 * @param {Object} options - 
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.getBlacklist = function (options) {
    var me = this;
    var options = options || {};
    if (!_utils.isCanSetRequestHeader) {
        conn.onError({
            type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
        });
        return;
    }

    var conn = this,
        token = options.accessToken || this.token;

    if (token) {
        var apiUrl = options.apiUrl || this.apiUrl;
        var appName = this.context.appName;
        var orgName = this.context.orgName;

        if (!appName || !orgName) {
            conn.onError({
                type: _code.WEBIM_CONNCTION_AUTH_ERROR
            });
            return;
        }

        var suc = function (data, xhr) {
            var list = {};
            data.data.forEach((v,i)=>{
                list[v] = {
                    name: v
                }
            })
            me.onBlacklistUpdate(list);
            typeof options.success === 'function' && options.success(data);
        };

        var error = function (res, xhr, msg) {
            me.onBlacklistUpdate([]);
            typeof options.error === 'function' && options.error(res);
        };

        var opts = {
            url: apiUrl + '/' + orgName + '/' + appName + '/users/' + this.user + '/blocks/users',
            dataType: 'json',
            type: 'GET',
            headers: {'Authorization': 'Bearer ' + token},
            success: suc || _utils.emptyfn,
            error: error || _utils.emptyfn
        };
        _utils.ajax(opts);
    } else {
        conn.onError({
            type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
        });
    }
};

/**
 * 将好友加入到黑名单
 * @param {Object} options -    //&&&&
 * @param {Object[]} options.list - json数组，调用这个函数后黑名单的所有名单列表（已经存在的黑名单加上这次新加黑名单），json的key值为好友的ID，value为之前获取的整个好友对象即可
 * @param {Object} options.type - 要加到黑名单的好友对象的type，默认是"jid"
 * @param {Number} options.list[].order - 要加到黑名单的好友对象的order，所有order不重复,可不填
 * @param {string} options.list[].jid - 要加到黑名单的好友的jid
 * @param {string} options.list[].name - 要加到黑名单的好友的ID
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.addToBlackList = function (options) {
    HandleRosterMessage.operatRoster({
        to: options.name
    }, "ban", this);
    // var iq = $iq({type: 'set'});    ******
    // var blacklist = options.list || {};
    // var type = options.type || 'jid';
    // var sucFn = options.success || _utils.emptyfn;
    // var errFn = options.error || _utils.emptyfn;
    // var piece = iq.c('query', {xmlns: 'jabber:iq:privacy'})
    //     .c('list', {name: 'special'});

    // var keys = Object.keys(blacklist);
    // var len = keys.length;
    // var order = 2;

    // for (var i = 0; i < len; i++) {
    //     var item = blacklist[keys[i]];
    //     var type = item.type || 'jid';
    //     var jid = item.jid;

    //     piece = piece.c('item', {action: 'deny', order: order++, type: type, value: jid})
    //         .c('message');
    //     if (i !== len - 1) {
    //         piece = piece.up().up();
    //     }
    // }

    // // console.log('addToBlackList', blacklist, piece.tree());
    // this.context.stropheConn.sendIQ(piece.tree(), sucFn, errFn);
};

/**
 * 将好友从黑名单移除
 * @param {Object} options -      //&&&&&
 * @param {Object[]} options.list - json数组，调用这个函数后黑名单的所有名单列表，json的key值为好友的ID，value为之前获取的整个好友对象即可
 * @param {Object} options.type - 要加到黑名单的好友对象的type，默认是"jid"
 * @param {Number} options.list[].order - 要加到黑名单的好友对象的order，所有order不重复
 * @param {string} options.list[].jid - 要加到黑名单的好友的jid
 * @param {string} options.list[].name - 要加到黑名单的好友的ID
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.removeFromBlackList = function (options) {
    HandleRosterMessage.operatRoster({
        to: options.name
    }, "allow", this);
    // var iq = $iq({type: 'set'});
    // var blacklist = options.list || {};
    // var sucFn = options.success || _utils.emptyfn;
    // var errFn = options.error || _utils.emptyfn;
    // var piece = iq.c('query', {xmlns: 'jabber:iq:privacy'})
    //     .c('list', {name: 'special'});

    // var keys = Object.keys(blacklist);
    // var len = keys.length;

    // for (var i = 0; i < len; i++) {
    //     var item = blacklist[keys[i]];
    //     var type = item.type || 'jid';
    //     var jid = item.jid;
    //     var order = item.order;

    //     piece = piece.c('item', {action: 'deny', order: order, type: type, value: jid})
    //         .c('message');
    //     if (i !== len - 1) {
    //         piece = piece.up().up();
    //     }
    // }

    // // console.log('removeFromBlackList', blacklist, piece.tree());
    // this.context.stropheConn.sendIQ(piece.tree(), sucFn, errFn);
};

/**
 *
 * @private
 */
connection.prototype._getGroupJid = function (to) {
    var appKey = this.context.appKey || '';
    return appKey + '_' + to + '@conference.' + this.domain;
};

/**
 * 加入群组黑名单(已废弃)
 * @param {Object} options
 * @deprecated
 */
connection.prototype.addToGroupBlackList = function (options) {
    var sucFn = options.success || _utils.emptyfn;
    var errFn = options.error || _utils.emptyfn;
    var jid = _getJid(options, this);
    var affiliation = 'admin';//options.affiliation || 'admin';
    var to = this._getGroupJid(options.roomId);
    var iq = $iq({type: 'set', to: to});

    iq.c('query', {xmlns: 'http://jabber.org/protocol/muc#' + affiliation})
        .c('item', {
            affiliation: 'outcast',
            jid: jid
        });

    this.context.stropheConn.sendIQ(iq.tree(), sucFn, errFn);
};

/**
 *
 * @private
 */
function _parseGroupBlacklist(iq) {
    var list = {};
    var items = iq.getElementsByTagName('item');

    if (items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var jid = item.getAttribute('jid');
            var affiliation = item.getAttribute('affiliation');
            var nick = item.getAttribute('nick');
            if (!jid) {
                continue;
            }
            var n = _parseNameFromJidFn(jid);
            list[n] = {
                jid: jid,
                affiliation: affiliation,
                nick: nick,
                name: n
            };
        }
    }
    return list;
}

/**
 * 获取群组黑名单(已废弃)
 * @param {Object} options
 * @deprecated
 */
connection.prototype.getGroupBlacklist = function (options) {
    var sucFn = options.success || _utils.emptyfn;
    var errFn = options.error || _utils.emptyfn;

    // var jid = _getJid(options, this);
    var affiliation = 'admin';//options.affiliation || 'admin';
    var to = this._getGroupJid(options.roomId);
    var iq = $iq({type: 'get', to: to});

    iq.c('query', {xmlns: 'http://jabber.org/protocol/muc#' + affiliation})
        .c('item', {
            affiliation: 'outcast',
        });

    this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
        sucFn(_parseGroupBlacklist(msginfo));
    }, function () {
        errFn();
    });
};

/**
 * 从群组黑名单删除(已废弃)
 * @param {Object} options
 * @deprecated
 */
connection.prototype.removeGroupMemberFromBlacklist = function (options) {
    var sucFn = options.success || _utils.emptyfn;
    var errFn = options.error || _utils.emptyfn;

    var jid = _getJid(options, this);
    var affiliation = 'admin';//options.affiliation || 'admin';
    var to = this._getGroupJid(options.roomId);
    var iq = $iq({type: 'set', to: to});

    iq.c('query', {xmlns: 'http://jabber.org/protocol/muc#' + affiliation})
        .c('item', {
            affiliation: 'none',
            jid: jid
        });

    this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
        sucFn();
    }, function () {
        errFn();
    });
};

/**
 * 修改群名称(已废弃)
 *
 * @param options
 * @deprecated
 */
// <iq to='easemob-demo#chatdemoui_roomid@conference.easemob.com' type='set' id='3940489311' xmlns='jabber:client'>
//     <query xmlns='http://jabber.org/protocol/muc#owner'>
//         <x type='submit' xmlns='jabber:x:data'>
//             <field var='FORM_TYPE'><value>http://jabber.org/protocol/muc#roomconfig</value></field>
//             <field var='muc#roomconfig_roomname'><value>Room Name</value></field>
//         </x>
//     </query>
// </iq>

connection.prototype.changeGroupSubject = function (options) {
    var sucFn = options.success || _utils.emptyfn;
    var errFn = options.error || _utils.emptyfn;

    // must be `owner`
    var affiliation = 'owner';
    var to = this._getGroupJid(options.roomId);
    var iq = $iq({type: 'set', to: to});

    iq.c('query', {xmlns: 'http://jabber.org/protocol/muc#' + affiliation})
        .c('x', {type: 'submit', xmlns: 'jabber:x:data'})
        .c('field', {'var': 'FORM_TYPE'})
        .c('value')
        .t('http://jabber.org/protocol/muc#roomconfig')
        .up().up()
        .c('field', {'var': 'muc#roomconfig_roomname'})
        .c('value')
        .t(options.subject)
        .up().up()
        .c('field', {'var': 'muc#roomconfig_roomdesc'})
        .c('value')
        .t(options.description);


    this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
        sucFn();
    }, function () {
        errFn();
    });
};

/**
 * 删除群组(已废弃)
 *
 * @param {Object} options -
 * @example
 <iq id="9BEF5D20-841A-4048-B33A-F3F871120E58" to="easemob-demo#chatdemoui_1477462231499@conference.easemob.com" type="set">
 <query xmlns="http://jabber.org/protocol/muc#owner">
 <destroy>
 <reason>xxx destory group yyy</reason>
 </destroy>
 </query>
 </iq>
 * @deprecated
 */
connection.prototype.destroyGroup = function (options) {
    var sucFn = options.success || _utils.emptyfn;
    var errFn = options.error || _utils.emptyfn;

    // must be `owner`
    var affiliation = 'owner';
    var to = this._getGroupJid(options.roomId);
    var iq = $iq({type: 'set', to: to});

    iq.c('query', {xmlns: 'http://jabber.org/protocol/muc#' + affiliation})
        .c('destroy')
        .c('reason').t(options.reason || '');

    this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
        sucFn();
    }, function () {
        errFn();
    });
};

/**
 * 主动离开群组(已废弃)
 *
 * @param {Object} options -
 * @example
 <iq id="5CD33172-7B62-41B7-98BC-CE6EF840C4F6_easemob_occupants_change_affiliation" to="easemob-demo#chatdemoui_1477481609392@conference.easemob.com" type="set">
 <query xmlns="http://jabber.org/protocol/muc#admin">
 <item affiliation="none" jid="easemob-demo#chatdemoui_lwz2@easemob.com"/>
 </query>
 </iq>
 <presence to="easemob-demo#chatdemoui_1479811172349@conference.easemob.com/mt002" type="unavailable"/>
 * @deprecated
 */
connection.prototype.leaveGroupBySelf = function (options) {
    var self = this;
    var sucFn = options.success || _utils.emptyfn;
    var errFn = options.error || _utils.emptyfn;

    // must be `owner`
    var jid = _getJid(options, this);
    var affiliation = 'admin';
    var to = this._getGroupJid(options.roomId);
    var iq = $iq({type: 'set', to: to});

    iq.c('query', {xmlns: 'http://jabber.org/protocol/muc#' + affiliation})
        .c('item', {
            affiliation: 'none',
            jid: jid
        });

    this.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
        sucFn(msgInfo);
        var pres = $pres({type: 'unavailable', to: to + '/' + self.context.userId});
        self.sendCommand(pres.tree());
    }, function (errInfo) {
        errFn(errInfo);
    });
};

/**
 * 群主从群组中踢人(已废弃)
 *
 * @param {Object} options -
 * @param {string[]} options.list - 需要从群组移除的好友ID组成的数组
 * @param {string} options.roomId - 群组ID
 * @deprecated
 * @example
 <iq id="9fb25cf4-1183-43c9-961e-9df70e300de4:sendIQ" to="easemob-demo#chatdemoui_1477481597120@conference.easemob.com" type="set" xmlns="jabber:client">
 <query xmlns="http://jabber.org/protocol/muc#admin">
 <item affiliation="none" jid="easemob-demo#chatdemoui_lwz4@easemob.com"/>
 <item jid="easemob-demo#chatdemoui_lwz4@easemob.com" role="none"/>
 <item affiliation="none" jid="easemob-demo#chatdemoui_lwz2@easemob.com"/>
 <item jid="easemob-demo#chatdemoui_lwz2@easemob.com" role="none"/>
 </query>
 </iq>
 */
connection.prototype.leaveGroup = function (options) {
    var sucFn = options.success || _utils.emptyfn;
    var errFn = options.error || _utils.emptyfn;
    var list = options.list || [];
    var affiliation = 'admin';
    var to = this._getGroupJid(options.roomId);
    var iq = $iq({type: 'set', to: to});
    var piece = iq.c('query', {xmlns: 'http://jabber.org/protocol/muc#' + affiliation});
    var keys = Object.keys(list);
    var len = keys.length;

    for (var i = 0; i < len; i++) {
        var name = list[keys[i]];
        var jid = _getJidByName(name, this);

        piece = piece.c('item', {
            affiliation: 'none',
            jid: jid
        }).up().c('item', {
            role: 'none',
            jid: jid,
        }).up();
    }

    this.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
        sucFn(msgInfo);
    }, function (errInfo) {
        errFn(errInfo);
    });
};

/**
 * 添加群组成员(已废弃)
 *
 * @param {Object} options -
 * @param {Object} options.list - 字符串数组，成员列表。[id1,id2,id3]
 * @param {Object} options.roomId - 群组id
 * @param {Function} options.success - 成功回调
 * @param {Function} options.error - 失败回调
 * @deprecated
 * @example
 Attention the sequence: message first (每个成员单独发一条message), iq second (多个成员可以合成一条iq发)
 <!-- 添加成员通知：send -->
 <message to='easemob-demo#chatdemoui_1477482739698@conference.easemob.com'>
 <x xmlns='http://jabber.org/protocol/muc#user'>
 <invite to='easemob-demo#chatdemoui_lwz2@easemob.com'>
 <reason>liuwz invite you to join group '谢谢'</reason>
 </invite>
 </x>
 </message>
 <!-- 添加成员：send -->
 <iq id='09DFB1E5-C939-4C43-B5A7-8000DA0E3B73_easemob_occupants_change_affiliation' to='easemob-demo#chatdemoui_1477482739698@conference.easemob.com' type='set'>
 <query xmlns='http://jabber.org/protocol/muc#admin'>
 <item affiliation='member' jid='easemob-demo#chatdemoui_lwz2@easemob.com'/>
 </query>
 </iq>
 */
connection.prototype.addGroupMembers = function (options) {
    var sucFn = options.success || _utils.emptyfn;
    var errFn = options.error || _utils.emptyfn;
    var list = options.list || [];
    var affiliation = 'admin';
    var to = this._getGroupJid(options.roomId);
    var iq = $iq({type: 'set', to: to});
    var piece = iq.c('query', {xmlns: 'http://jabber.org/protocol/muc#' + affiliation});
    var len = list.length;

    for (var i = 0; i < len; i++) {

        var name = list[i];
        var jid = _getJidByName(name, this);

        piece = piece.c('item', {
            affiliation: 'member',
            jid: jid
        }).up();

        var dom = $msg({
            to: to
        }).c('x', {
            xmlns: 'http://jabber.org/protocol/muc#user'
        }).c('invite', {
            to: jid
        }).c('reason').t(options.reason || '');

        this.sendCommand(dom.tree());

    }

    this.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
        sucFn(msgInfo);
    }, function (errInfo) {
        errFn(errInfo);
    });
};

/**
 * 接受加入申请(已废弃)
 *
 * @param {Object} options - 
 * @param {Array} options.list - 列表，默认[]
 * @param {String} options.roomId - 聊天室id
 * @param {String} options.reason - 原因
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 * @deprecated
 */
connection.prototype.acceptInviteFromGroup = function (options) {
    options.success = function () {
        // then send sendAcceptInviteMessage
        // connection.prototype.sendAcceptInviteMessage(optoins);
    };
    this.addGroupMembers(options);
};

/**
 * 拒绝入群申请(已废弃)
 * @param {Object} options -
 * @example
 throw request for now 暂时不处理，直接丢弃

 <message to='easemob-demo#chatdemoui_mt002@easemob.com' from='easmeob-demo#chatdemoui_mt001@easemob.com' id='B83B7210-BCFF-4DEE-AB28-B9FE5579C1E2'>
 <x xmlns='http://jabber.org/protocol/muc#user'>
 <apply to='easemob-demo#chatdemoui_groupid1@conference.easemob.com' from='easmeob-demo#chatdemoui_mt001@easemob.com' toNick='llllll'>
 <reason>reject</reason>
 </apply>
 </x>
 </message>
 * @deprecated
 */
connection.prototype.rejectInviteFromGroup = function (options) {
    // var from = _getJidByName(options.from, this);
    // var dom = $msg({
    //     from: from,
    //     to: _getJidByName(options.to, this)
    // }).c('x', {
    //     xmlns: 'http://jabber.org/protocol/muc#user'
    // }).c('apply', {
    //     from: from,
    //     to: this._getGroupJid(options.groupId),
    //     toNick: options.groupName
    // }).c('reason').t(options.reason || '');
    //
    // this.sendCommand(dom.tree());
};

/**
 * 创建群组-异步(已废弃)
 * @param {Object} p -
 * @deprecated
 */
connection.prototype.createGroupAsync = function (p) {
    var roomId = p.from
    var me = this;
    var toRoom = this._getGroupJid(roomId);
    var to = toRoom + '/' + this.context.userId;
    var options = this.groupOption;
    var suc = p.success || _utils.emptyfn;

    // Creating a Reserved Room
    var iq = $iq({type: 'get', to: toRoom})
        .c('query', {xmlns: 'http://jabber.org/protocol/muc#owner'});

    // Strophe.info('step 1 ----------');
    // Strophe.info(options);
    me.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
        // console.log(msgInfo);

        // for ie hack
        if ('setAttribute' in msgInfo) {
            // Strophe.info('step 3 ----------');
            var x = msgInfo.getElementsByTagName('x')[0];
            x.setAttribute('type', 'submit');
        } else {
            // Strophe.info('step 4 ----------');
            Strophe.forEachChild(msgInfo, 'x', function (field) {
                field.setAttribute('type', 'submit');
            });
        }

        Strophe.info('step 5 ----------');
        Strophe.forEachChild(x, 'field', function (field) {
            var fieldVar = field.getAttribute('var');
            var valueDom = field.getElementsByTagName('value')[0];
            Strophe.info(fieldVar);
            switch (fieldVar) {
                case 'muc#roomconfig_maxusers':
                    _setText(valueDom, options.optionsMaxUsers || 200);
                    break;
                case 'muc#roomconfig_roomname':
                    _setText(valueDom, options.subject || '');
                    break;
                case 'muc#roomconfig_roomdesc':
                    _setText(valueDom, options.description || '');
                    break;
                case 'muc#roomconfig_publicroom': // public 1
                    _setText(valueDom, +options.optionsPublic);
                    break;
                case 'muc#roomconfig_membersonly':
                    _setText(valueDom, +options.optionsMembersOnly);
                    break;
                case 'muc#roomconfig_moderatedroom':
                    _setText(valueDom, +options.optionsModerate);
                    break;
                case 'muc#roomconfig_persistentroom':
                    _setText(valueDom, 1);
                    break;
                case 'muc#roomconfig_allowinvites':
                    _setText(valueDom, +options.optionsAllowInvites);
                    break;
                case 'muc#roomconfig_allowvisitornickchange':
                    _setText(valueDom, 0);
                    break;
                case 'muc#roomconfig_allowvisitorstatus':
                    _setText(valueDom, 0);
                    break;
                case 'allow_private_messages':
                    _setText(valueDom, 0);
                    break;
                case 'allow_private_messages_from_visitors':
                    _setText(valueDom, 'nobody');
                    break;
                default:
                    break;
            }
        });

        var iq = $iq({to: toRoom, type: 'set'})
            .c('query', {xmlns: 'http://jabber.org/protocol/muc#owner'})
            .cnode(x);

        me.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
            me.addGroupMembers({
                list: options.members,
                roomId: roomId
            });

            suc(options);
        }, function (errInfo) {
            // errFn(errInfo);
        });
        // sucFn(msgInfo);
    }, function (errInfo) {
        // errFn(errInfo);
    });
};

/**
 * 创建群组(已废弃)
 * @param {Object} options -
 * @deprecated
 * @example
 * 1. 创建申请 -> 得到房主身份
 * 2. 获取房主信息 -> 得到房间form
 * 3. 完善房间form -> 创建成功
 * 4. 添加房间成员
 * 5. 消息通知成员
 */
connection.prototype.createGroup = function (options) {
    this.groupOption = options;
    var roomId = +new Date();
    var toRoom = this._getGroupJid(roomId);
    var to = toRoom + '/' + this.context.userId;

    var pres = $pres({to: to})
        .c('x', {xmlns: 'http://jabber.org/protocol/muc'}).up()
        .c('create', {xmlns: 'http://jabber.org/protocol/muc'}).up();

    // createGroupACK
    this.sendCommand(pres.tree());
};
/**
 * 通过RestFul API接口创建群组
 * @param opt {Object} - 
 * @param opt.data {Object} - 群组信息
 * @param opt.data.groupname {string} - 群组名
 * @param opt.data.desc {string} - 群组描述
 * @param opt.data.members {string[]} - 好友id数组，群好友列表
 * @param opt.data.public {Boolean} - true: 公开群，false: 私有群
 * @param opt.data.approval {Boolean} - 前提：opt.data.public=true, true: 加群需要审批，false: 加群无需审批
 * @param opt.data.allowinvites {Boolean} - 前提：opt.data.public=false, true: 允许成员邀请入群，false: 不允许成员邀请入群
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.createGroupNew = function (opt) {
    opt.data.owner = this.user;
    opt.data.invite_need_confirm = false;
    var options = {
        url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatgroups',
        dataType: 'json',
        type: 'POST',
        data: JSON.stringify(opt.data),
        headers: {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        }
    };
    options.success = function (respData) {
        opt.success(respData);
        this.onCreateGroup(respData);
    }.bind(this);
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API屏蔽群组，只对移动端有效
 * @param {Object} opt -
 * @param {string} opt.groupId - 需要屏蔽的群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.blockGroup = function (opt) {
    var groupId = opt.groupId;
    groupId = 'notification_ignore_' + groupId;
    var data = {
        entities: []
    };
    data.entities[0] = {};
    data.entities[0][groupId] = true;
    var options = {
        type: 'PUT',
        url: this.apiUrl + '/' + this.orgName + '/'
        + this.appName + '/' + 'users' + '/' + this.user,
        data: JSON.stringify(data),
        headers: {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        }
    };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};
/**
 * 通过RestFul API发出入群申请
 * @param {Object} opt -
 * @param {String} opt.groupId - 加入群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.joinGroup = function (opt) {
    var options = {
        url: this.apiUrl + '/' + this.orgName + '/'
        + this.appName + '/' + 'chatgroups' + '/' + opt.groupId + '/' + 'apply',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({ message: 'join group' }),    // 后端参数变更，申请入群需要填写入群消息
        headers: {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        }
    };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};
/**
 * 通过RestFul API分页获取群组列表
 * @param {Object} opt -
 * @param {Number} opt.limit - 每一页群组的最大数目
 * @param {string} opt.cursor=null - 游标，如果数据还有下一页，API 返回值会包含此字段，传递此字段可获取下一页的数据，为null时获取第一页数据
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.listGroups = function (opt) {
    var requestData = [];
    requestData['limit'] = opt.limit;
    requestData['cursor'] = opt.cursor;
    if (!requestData['cursor'])
        delete requestData['cursor'];
    if (isNaN(opt.limit)) {
        throw 'The parameter \"limit\" should be a number';
        return;
    }
    var options = {
        url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/publicchatgroups',
        type: 'GET',
        dataType: 'json',
        data: requestData,
        headers: {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        }
    };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API根据groupId获取群组详情
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.getGroupInfo = function (opt) {
    var options = {
        url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatgroups/' + opt.groupId,
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        }
    };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API列出某用户所加入的所有群组
 * @param {Object} opt - 
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.getGroup = function (opt) {
    var options = {
        url: this.apiUrl + '/' + this.orgName +
        '/' + this.appName + '/' + 'users' + '/' +
        this.user + '/' + 'joined_chatgroups',
        dataType: 'json',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        }
    };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API分页列出群组的所有成员
 * @param {Object} opt -
 * @param {Number} opt.pageNum - 页码，默认1
 * @param {Number} opt.pageSize - 每一页的最大群成员数目,最大值1000
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.listGroupMember = function (opt) {
    if (isNaN(opt.pageNum) || opt.pageNum <= 0) {
        throw 'The parameter \"pageNum\" should be a positive number';
        return;
    } else if (isNaN(opt.pageSize) || opt.pageSize <= 0) {
        throw 'The parameter \"pageSize\" should be a positive number';
        return;
    } else if (opt.groupId === null && typeof opt.groupId === 'undefined') {
        throw 'The parameter \"groupId\" should be added';
        return;
    }
    var requestData = [],
        groupId = opt.groupId;
    requestData['pagenum'] = opt.pageNum;
    requestData['pagesize'] = opt.pageSize;
    var options = {
        url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatgroups'
        + '/' + groupId + '/users',
        dataType: 'json',
        type: 'GET',
        data: requestData,
        headers: {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        }
    };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API禁止群用户发言
 * @param {Object} opt -
 * @param {string} opt.username - 被禁言的群成员的ID
 * @param {Number} opt.muteDuration - 被禁言的时长，单位ms
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.mute = function (opt) {
    var groupId = opt.groupId,
        requestData = {
            "usernames": [opt.username],
            "mute_duration": opt.muteDuration
        },
        options = {
            url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/' + 'chatgroups'
            + '/' + groupId + '/' + 'mute',
            dataType: 'json',
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(requestData)
        };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API取消对用户禁言
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {string} opt.username - 被取消禁言的群用户ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.removeMute = function (opt) {
    var groupId = opt.groupId,
        username = opt.username;
    var options = {
        url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/' + 'chatgroups'
        + '/' + groupId + '/' + 'mute' + '/' + username,
        dataType: 'json',
        type: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        }
    };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API获取群组下所有管理员
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.getGroupAdmin = function (opt) {
    var groupId = opt.groupId;
    var options = {
        url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatgroups'
        + '/' + groupId + '/admin',
        dataType: 'json',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        }
    };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API获取群组下所有被禁言成员
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.getMuted = function (opt) {
    var groupId = opt.groupId;
    var options = {
        url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatgroups'
        + '/' + groupId + '/mute',
        dataType: 'json',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        }
    };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API设置群管理员
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {string} opt.username - 用户ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.setAdmin = function (opt) {
    var groupId = opt.groupId,
        requestData = {
            newadmin: opt.username
        },
        options = {
            url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/' + 'chatgroups'
            + '/' + groupId + '/' + 'admin',
            type: "POST",
            dataType: 'json',
            data: JSON.stringify(requestData),
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API取消群管理员
 * @param {Object} opt -
 * @param {string} opt.gorupId - 群组ID
 * @param {string} opt.username - 用户ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.removeAdmin = function (opt) {
    var groupId = opt.groupId,
        username = opt.username,
        options = {
            url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/' + 'chatgroups'
            + '/' + groupId + '/' + 'admin' + '/' + username,
            type: 'DELETE',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API同意用户加入群
 * @param {Object} opt -
 * @param {string} opt.applicant - 申请加群的用户ID
 * @param {Object} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.agreeJoinGroup = function (opt) {
    var groupId = opt.groupId,
        requestData = {
            "applicant": opt.applicant,
            "verifyResult": true,
            "reason": "no clue"
        },
        options = {
            url: this.apiUrl + '/' + this.orgName + '/' + this.appName
            + '/' + 'chatgroups' + '/' + groupId + '/' + 'apply_verify',
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(requestData),
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API拒绝用户加入群
 * @param {Object} opt -
 * @param {string} opt.applicant - 申请加群的用户ID
 * @param {Object} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.rejectJoinGroup = function (opt) {
    var groupId = opt.groupId,
        requestData = {
            "applicant": opt.applicant,
            "verifyResult": false,
            "reason": "no clue"
        },
        options = {
            url: this.apiUrl + '/' + this.orgName + '/' + this.appName
            + '/' + 'chatgroups' + '/' + groupId + '/' + 'apply_verify',
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(requestData),
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API添加用户至群组黑名单(单个)
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {stirng} opt.username - 用户ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.groupBlockSingle = function (opt) {
    var groupId = opt.groupId,
        username = opt.username,
        options = {
            url: this.apiUrl + '/' + this.orgName + '/' + this.appName
            + '/' + 'chatgroups' + '/' + groupId + '/' + 'blocks' + '/'
            + 'users' + '/' + username,
            type: 'POST',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API添加用户至群组黑名单(批量)
 * @param {Object} opt -
 * @param {string[]} opt.username - 用户ID数组
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.groupBlockMulti = function (opt) {
    var groupId = opt.groupId,
        usernames = opt.usernames,
        requestData = {
            usernames: usernames
        },
        options = {
            url: this.apiUrl + '/' + this.orgName + '/' + this.appName
            + '/' + 'chatgroups' + '/' + groupId + '/' + 'blocks' + '/'
            + 'users',
            data: JSON.stringify(requestData),
            type: 'POST',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API将用户从群黑名单移除（单个）
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {string} opt.username - 用户ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.removeGroupBlockSingle = function (opt) {
    var groupId = opt.groupId,
        username = opt.username,
        options = {
            url: this.apiUrl + '/' + this.orgName + '/' + this.appName
            + '/' + 'chatgroups' + '/' + groupId + '/' + 'blocks' + '/'
            + 'users' + '/' + username,
            type: 'DELETE',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API将用户从群黑名单移除（批量）
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {string[]} opt.username - 用户ID数组
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.removeGroupBlockMulti = function (opt) {
    var groupId = opt.groupId,
        username = opt.username.join(','),
        options = {
            url: this.apiUrl + '/' + this.orgName + '/' + this.appName
            + '/' + 'chatgroups' + '/' + groupId + '/' + 'blocks' + '/'
            + 'users' + '/' + username,
            type: 'DELETE',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API解散群组
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.dissolveGroup = function (opt) {
    var groupId = opt.groupId,
        options = {
            url: this.apiUrl + '/' + this.orgName + '/' + this.appName
            + '/' + 'chatgroups' + '/' + groupId + '?version=v3',
            type: 'DELETE',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API获取群组黑名单
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.getGroupBlacklistNew = function (opt) {
    var groupId = opt.groupId,
        options = {
            url: this.apiUrl + '/' + this.orgName + '/' + this.appName
            + '/' + 'chatgroups' + '/' + groupId + '/' + 'blocks' + '/' + 'users',
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API离开群组
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.quitGroup = function (opt) {
    var groupId = opt.groupId,
        options = {
            url: this.apiUrl + '/' + this.orgName + '/' + this.appName
            + '/' + 'chatgroups' + '/' + groupId + '/' + 'quit',
            type: 'DELETE',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API修改群信息
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {string} opt.groupName - 群组名
 * @param {string} opt.description - 群组简介
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.modifyGroup = function (opt) {
    var groupId = opt.groupId,
        requestData = {
            groupname: opt.groupName,
            description: opt.description
        },
        options = {
            url: this.apiUrl + '/' + this.orgName + '/' + this.appName
            + '/' + 'chatgroups' + '/' + groupId,
            type: 'PUT',
            data: JSON.stringify(requestData),
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API删除单个群成员
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {string} opt.username - 用户ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.removeSingleGroupMember = function (opt) {
    var groupId = opt.groupId,
        username = opt.username,
        options = {
            url: this.apiUrl + '/' + this.orgName + '/' + this.appName
            + '/' + 'chatgroups' + '/' + groupId + '/' + 'users' + '/'
            + username,
            type: 'DELETE',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API删除多个群成员
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {string[]} opt.users - 用户ID数组
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.removeMultiGroupMember = function (opt) {
    var groupId = opt.groupId,
        users = opt.users.join(','),
        options = {
            url: this.apiUrl + '/' + this.orgName + '/' + this.appName
            + '/' + 'chatgroups' + '/' + groupId + '/' + 'users' + '/'
            + users,
            type: 'DELETE',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

/**
 * 通过RestFul API邀请群成员
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组名
 * @param {string[]} opt.users - 用户ID数组
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.inviteToGroup = function (opt) {
    var groupId = opt.groupId,
        users = opt.users,
        requestData = {
            usernames: users
        },
        options = {
            url: this.apiUrl + '/' + this.orgName + '/' + this.appName
            + '/' + 'chatgroups' + '/' + groupId + '/' + 'invite',
            type: 'POST',
            data: JSON.stringify(requestData),
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        };
    options.success = opt.success || _utils.emptyfn;
    options.error = opt.error || _utils.emptyfn;
    WebIM.utils.ajax(options);
};

// function _setText(valueDom, v) {
//     if ('textContent' in valueDom) {
//         valueDom.textContent = v;
//     } else if ('text' in valueDom) {
//         valueDom.text = v;
//     } else {
//         // Strophe.info('_setText 4 ----------');
//         // valueDom.innerHTML = v;
//     }
// }


var WebIM = window.WebIM || {};
WebIM.connection = connection;
WebIM.utils = _utils;
WebIM.statusCode = _code;
WebIM.message = _msg.message;
WebIM.doQuery = function (str, suc, fail) {
    if (typeof window.cefQuery === 'undefined') {
        return;
    }
    window.cefQuery({
            request: str,
            persistent: false,
            onSuccess: suc,
            onFailure: fail
        }
    );
};

/**************************** debug ****************************/
WebIM.debug = function (bool) {

    logMessage = function (message) {
        bool && console.log(WebIM.utils.ts() + '[recv] ', message.data);
    }

    Strophe.Connection.prototype.rawOutput = function (data) {
        bool && console.log('%c ' + WebIM.utils.ts() + '[send] ' + data, "background-color: #e2f7da");
    }

}

module.exports = WebIM;

if (module.hot) {
    module.hot.accept();
}
