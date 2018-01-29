var _version = '1.4.13';
var _code = require('./status').code;
var _utils = require('./utils').utils;
var _msg = require('./message');
var _message = _msg._msg;
var _msgHash = {};
var Queue = require('./queue').Queue;
var CryptoJS = require('crypto-js');
var _ = require('underscore');

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

Strophe.Request.prototype._newXHR = function () {
    var xhr = _utils.xmlrequest(true);
    if (xhr.overrideMimeType) {
        xhr.overrideMimeType('text/xml');
    }
    // use Function.bind() to prepend ourselves as an argument
    xhr.onreadystatechange = this.func.bind(null, this);
    return xhr;
};

Strophe.Websocket.prototype._closeSocket = function () {
    if (this.socket) {
        var me = this;
        setTimeout(function () {
            try {
                me.socket.close();
            } catch (e) {
            }
        }, 0);
    } else {
        this.socket = null;
    }
};

/** Function: log
 *  User overrideable logging function.
 *
 *  This function is called whenever the Strophe library calls any
 *  of the logging functions.  The default implementation of this
 *  function does nothing.  If client code wishes to handle the logging
 *  messages, it should override this with
 *  > Strophe.log = function (level, msg) {
     *  >   (user code here)
     *  > };
 *
 *  Please note that data sent and received over the wire is logged
 *  via Strophe.Connection.rawInput() and Strophe.Connection.rawOutput().
 *
 *  The different levels and their meanings are
 *
 *    DEBUG - Messages useful for debugging purposes.
 *    INFO - Informational messages.  This is mostly information like
 *      'disconnect was called' or 'SASL auth succeeded'.
 *    WARN - Warnings about potential problems.  This is mostly used
 *      to report transient connection errors like request timeouts.
 *    ERROR - Some error occurred.
 *    FATAL - A non-recoverable fatal error occurred.
 *
 *  Parameters:
 *    (Integer) level - The log level of the log message.  This will
 *      be one of the values in Strophe.LogLevel.
 *    (String) msg - The log message.
 */
/* jshint ignore:start */
Strophe.log =  function (level, msg) {
    if(!isStropheLog){
        return
    }
    switch(level){
        case this.LogLevel.DEBUG:
            console.debug(msg)
            break;
        case this.LogLevel.INFO:
            console.info(msg);
            break;
        case this.LogLevel.WARN:
            console.warn(msg);
            break;
        case this.LogLevel.ERROR:
        case this.LogLevel.FATAL:
            console.error(msg);
            break;
        default:
            console.log(msg);
    }
    return;
}

/**
 *
 * Strophe.Websocket has a bug while logout:
 * 1.send: <presence xmlns='jabber:client' type='unavailable'/> is ok;
 * 2.send: <close xmlns='urn:ietf:params:xml:ns:xmpp-framing'/> will cause a problem,log as follows:
 * WebSocket connection to 'ws://im-api.easemob.com/ws/' failed: Data frame received after close_connect @ strophe.js:5292connect @ strophe.js:2491_login @ websdk-1.1.2.js:278suc @ websdk-1.1.2.js:636xhr.onreadystatechange @ websdk-1.1.2.js:2582
 * 3 "Websocket error [object Event]"
 * _changeConnectStatus
 * onError Object {type: 7, msg: "The WebSocket connection could not be established or was disconnected.", reconnect: true}
 *
 * this will trigger socket.onError, therefore _doDisconnect again.
 * Fix it by overide  _onMessage
 */
Strophe.Websocket.prototype._onMessage = function (message) {
    logMessage(message)
    // 获取Resource
    var data = message.data;
    if (data.indexOf('<jid>') > 0) {
        var start = data.indexOf('<jid>'),
            end = data.indexOf('</jid>'),
            data = data.substring(start + 5, end);
        stropheConn.setJid(data);
    }
    var elem, data;
    // check for closing stream
    // var close = '<close xmlns="urn:ietf:params:xml:ns:xmpp-framing" />';
    // if (message.data === close) {
    //     this._conn.rawInput(close);
    //     this._conn.xmlInput(message);
    //     if (!this._conn.disconnecting) {
    //         this._conn._doDisconnect();
    //     }
    //     return;
    //
    // send and receive close xml: <close xmlns='urn:ietf:params:xml:ns:xmpp-framing'/>
    // so we can't judge whether message.data equals close by === simply.
    if (message.data.indexOf("<close ") === 0) {
        elem = new DOMParser().parseFromString(message.data, "text/xml").documentElement;
        var see_uri = elem.getAttribute("see-other-uri");
        if (see_uri) {
            this._conn._changeConnectStatus(Strophe.Status.REDIRECT, "Received see-other-uri, resetting connection");
            this._conn.reset();
            this._conn.service = see_uri;
            this._connect();
        } else {
            // if (!this._conn.disconnecting) {
            this._conn._doDisconnect("receive <close> from server");
            // }
        }
        return;
    } else if (message.data.search("<open ") === 0) {
        // This handles stream restarts
        elem = new DOMParser().parseFromString(message.data, "text/xml").documentElement;
        if (!this._handleStreamStart(elem)) {
            return;
        }
    } else {
        data = this._streamWrap(message.data);
        elem = new DOMParser().parseFromString(data, "text/xml").documentElement;
    }

    if (this._check_streamerror(elem, Strophe.Status.ERROR)) {
        return;
    }

    //handle unavailable presence stanza before disconnecting
    if (this._conn.disconnecting &&
        elem.firstChild.nodeName === "presence" &&
        elem.firstChild.getAttribute("type") === "unavailable") {
        this._conn.xmlInput(elem);
        this._conn.rawInput(Strophe.serialize(elem));
        // if we are already disconnecting we will ignore the unavailable stanza and
        // wait for the </stream:stream> tag before we close the connection
        return;
    }
    this._conn._dataRecv(elem, message.data);
};


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

var _parseRoom = function (result) {
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

var _parseRoomOccupants = function (result) {
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

var _parseResponseMessage = function (msginfo) {
    var parseMsgData = {errorMsg: true, data: []};

    var msgBodies = msginfo.getElementsByTagName('body');
    if (msgBodies) {
        for (var i = 0; i < msgBodies.length; i++) {
            var msgBody = msgBodies[i];
            var childNodes = msgBody.childNodes;
            if (childNodes && childNodes.length > 0) {
                var childNode = msgBody.childNodes[0];
                if (childNode.nodeType == Strophe.ElementType.TEXT) {
                    var jsondata = childNode.wholeText || childNode.nodeValue;
                    jsondata = jsondata.replace('\n', '<br>');
                    try {
                        var data = eval('(' + jsondata + ')');
                        parseMsgData.errorMsg = false;
                        parseMsgData.data = [data];
                    } catch (e) {
                    }
                }
            }
        }

        var delayTags = msginfo.getElementsByTagName('delay');
        if (delayTags && delayTags.length > 0) {
            var delayTag = delayTags[0];
            var delayMsgTime = delayTag.getAttribute('stamp');
            if (delayMsgTime) {
                parseMsgData.delayTimeStamp = delayMsgTime;
            }
        }
    } else {
        var childrens = msginfo.childNodes;
        if (childrens && childrens.length > 0) {
            var child = msginfo.childNodes[0];
            if (child.nodeType == Strophe.ElementType.TEXT) {
                try {
                    var data = eval('(' + child.nodeValue + ')');
                    parseMsgData.errorMsg = false;
                    parseMsgData.data = [data];
                } catch (e) {
                }
            }
        }
    }
    return parseMsgData;
};

var _parseNameFromJidFn = function (jid, domain) {
    domain = domain || '';
    var tempstr = jid;
    var findex = tempstr.indexOf('_');

    if (findex !== -1) {
        tempstr = tempstr.substring(findex + 1);
    }
    var atindex = tempstr.indexOf('@' + domain);
    if (atindex !== -1) {
        tempstr = tempstr.substring(0, atindex);
    }
    return tempstr;
};

var _parseFriend = function (queryTag, conn, from) {
    var rouster = [];
    var items = queryTag.getElementsByTagName('item');
    if (items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var jid = item.getAttribute('jid');
            if (!jid) {
                continue;
            }
            var subscription = item.getAttribute('subscription');
            var friend = {
                subscription: subscription,
                jid: jid
            };
            var ask = item.getAttribute('ask');
            if (ask) {
                friend.ask = ask;
            }
            var name = item.getAttribute('name');
            if (name) {
                friend.name = name;
            } else {
                var n = _parseNameFromJidFn(jid);
                friend.name = n;
            }
            var groups = [];
            Strophe.forEachChild(item, 'group', function (group) {
                groups.push(Strophe.getText(group));
            });
            friend.groups = groups;
            rouster.push(friend);
            // B同意之后 -> B订阅A
            // fix: 含有ask标示的好友代表已经发送过反向订阅消息，不需要再次发送。
            if (conn && (subscription == 'from') && !ask) {
                conn.subscribe({
                    toJid: jid,
                    message: "[resp:true]"
                });
            }

            if (conn && (subscription == 'to')) {
                conn.subscribed({
                    toJid: jid
                });
            }
        }
    }
    return rouster;
};

var _login = function (options, conn) {
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
    conn.context.accessTokenExpires = options.expires_in;
    if (conn.isOpening() && conn.context.stropheConn) {
        stropheConn = conn.getStrophe();
    } else if (conn.isOpened() && conn.context.stropheConn) {
        // return;
        stropheConn = conn.getStrophe();
    } else {
        stropheConn = conn.getStrophe();
    }
    var callback = function (status, msg) {
        _loginCallback(status, msg, conn);
    };

    conn.context.stropheConn = stropheConn;
    if (conn.route) {
        stropheConn.connect(conn.context.jid, '$t$' + accessToken, callback, conn.wait, conn.hold, conn.route);
    } else {
        stropheConn.connect(conn.context.jid, '$t$' + accessToken, callback, conn.wait, conn.hold);
    }
};

var _parseMessageType = function (msginfo) {
    var receiveinfo = msginfo.getElementsByTagName('received'),
        inviteinfo = msginfo.getElementsByTagName('invite'),
        deliveryinfo = msginfo.getElementsByTagName('delivery'),
        acked = msginfo.getElementsByTagName('acked'),
        error = msginfo.getElementsByTagName('error'),
        msgtype = 'normal';
    if (receiveinfo && receiveinfo.length > 0
        &&
        receiveinfo[0].namespaceURI === 'urn:xmpp:receipts') {

        msgtype = 'received';

    } else if (inviteinfo && inviteinfo.length > 0) {

        msgtype = 'invite';

    } else if (deliveryinfo && deliveryinfo.length > 0) {

        msgtype = 'delivery';           // 消息送达

    } else if (acked && acked.length) {

        msgtype = 'acked';              // 消息已读

    } else if (error && error.length) {

        var errorItem = error[0],
            userMuted = errorItem.getElementsByTagName('user-muted');

        if (userMuted && userMuted.length) {

            msgtype = 'userMuted';

        }

    }
    return msgtype;
};

var _handleMessageQueue = function (conn) {
    for (var i in _msgHash) {
        if (_msgHash.hasOwnProperty(i)) {
            _msgHash[i].send(conn);
        }
    }
};

var _loginCallback = function (status, msg, conn) {
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
        // client should limit the speed of sending ack messages  up to 5/s
        conn.autoReconnectNumTotal = 0;
        conn.intervalId = setInterval(function () {
            conn.handelSendQueue();
        }, 200);
        var handleMessage = function (msginfo) {
            var delivery = msginfo.getElementsByTagName('delivery');
            var acked = msginfo.getElementsByTagName('acked');
            if (delivery.length) {
                conn.handleDeliveredMessage(msginfo);
                return true;
            }
            if (acked.length) {
                conn.handleAckedMessage(msginfo);
                return true;
            }
            var type = _parseMessageType(msginfo);
            switch (type) {
                case "received":
                    conn.handleReceivedMessage(msginfo);
                    return true;
                case "invite":
                    conn.handleInviteMessage(msginfo);
                    return true;
                case "delivery":
                    conn.handleDeliveredMessage(msginfo);
                    return true;
                case "acked":
                    conn.handleAckedMessage(msginfo);
                    return true;
                case "userMuted":
                    conn.handleMutedMessage(msginfo);
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
            conn.handlePing(msginfo);
            return true;
        };
        var handleIqRoster = function (msginfo) {
            conn.handleIqRoster(msginfo);
            return true;
        };
        var handleIqPrivacy = function (msginfo) {
            conn.handleIqPrivacy(msginfo);
            return true;
        };
        var handleIq = function (msginfo) {
            conn.handleIq(msginfo);
            return true;
        };

        conn.addHandler(handleMessage, null, 'message', null, null, null);
        conn.addHandler(handlePresence, null, 'presence', null, null, null);
        conn.addHandler(handlePing, 'urn:xmpp:ping', 'iq', 'get', null, null);
        conn.addHandler(handleIqRoster, 'jabber:iq:roster', 'iq', 'set', null, null);
        conn.addHandler(handleIqPrivacy, 'jabber:iq:privacy', 'iq', 'set', null, null);
        conn.addHandler(handleIq, null, 'iq', null, null, null);

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
        conn.notifyVersion();
        conn.retry && _handleMessageQueue(conn);
        conn.heartBeat();
        conn.isAutoLogin && conn.setPresence();
        try {
            if (conn.unSendMsgArr.length > 0) {
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
            conn.stopHeartBeat();
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
        if (conn.isOpened()) {
            if (conn.autoReconnectNumTotal < conn.autoReconnectNumMax) {
                conn.reconnect();
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

var _getJid = function (options, conn) {
    var jid = options.toJid || '';

    if (jid === '') {
        var appKey = conn.context.appKey || '';
        var toJid = appKey + '_' + options.to + '@' + conn.domain;

        if (options.resource) {
            toJid = toJid + '/' + options.resource;
        }
        jid = toJid;
    }
    return jid;
};

var _getJidByName = function (name, conn) {
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

    var jid = appKey + '_' + user.toLowerCase() + '@' + conn.domain,
        resource = options.resource || 'webim';

    if (conn.isMultiLoginSessions) {
        resource += user + new Date().getTime() + Math.floor(Math.random().toFixed(6) * 1000000);
    }
    conn.context.jid = jid + '/' + resource;
    /*jid: {appkey}_{username}@domain/resource*/
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


//class
var connection = function (options) {
    if (!this instanceof connection) {
        return new connection(options);
    }

    var options = options || {};

    this.isHttpDNS = options.isHttpDNS || false;
    this.isMultiLoginSessions = options.isMultiLoginSessions || false;
    this.wait = options.wait || 30;
    this.retry = options.retry || false;
    this.https = options.https || location.protocol === 'https:';
    this.url = _getXmppUrl(options.url, this.https);
    this.hold = options.hold || 1;
    this.route = options.route || null;
    this.domain = options.domain || 'easemob.com';
    this.inactivity = options.inactivity || 30;
    this.heartBeatWait = options.heartBeatWait || 4500;
    this.maxRetries = options.maxRetries || 5;
    this.isAutoLogin = options.isAutoLogin === false ? false : true;
    this.pollingTime = options.pollingTime || 800;
    this.stropheConn = false;
    this.autoReconnectNumMax = options.autoReconnectNumMax || 0;
    this.autoReconnectNumTotal = 0;
    this.autoReconnectInterval = options.autoReconnectInterval || 0;
    this.context = {status: _code.STATUS_INIT};
    this.sendQueue = new Queue();  //instead of sending message immediately,cache them in this queue
    this.intervalId = null;   //clearInterval return value
    this.apiUrl = options.apiUrl || '';
    this.isWindowSDK = options.isWindowSDK || false;
    this.encrypt = options.encrypt || {encrypt: {type: 'none'}};
    this.delivery = options.delivery || false;
    this.user = '';
    this.orgName = '';
    this.appName = '';
    this.token = '';

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
    
    // global params
    isStropheLog = options.isStropheLog || false;
};

connection.prototype.registerUser = function (options) {
    if (location.protocol != 'https:' && this.isHttpDNS) {
        this.dnsIndex = 0;
        this.getHttpDNS(options, 'signup');
    } else {
        this.signup(options);
    }
}

connection.prototype.handelSendQueue = function () {
    var options = this.sendQueue.pop();
    if (options !== null) {
        this.sendReceiptsMessage(options);
    }
};
connection.prototype.listen = function (options) {
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

//webrtc需要强制心跳，加个默认为false的参数 向下兼容
connection.prototype.heartBeat = function (forcing) {
    if (forcing !== true) {
        forcing = false;
    }
    var me = this;
    //IE8: strophe auto switch from ws to BOSH, need heartbeat
    var isNeed = !/^ws|wss/.test(me.url) || /mobile/.test(navigator.userAgent);

    if (this.heartBeatID || (!forcing && !isNeed)) {
        return;
    }

    var options = {
        toJid: this.domain,
        type: 'normal'
    };
    this.heartBeatID = setInterval(function () {
        // fix: do heartbeat only when websocket 
        _utils.isSupportWss && me.ping(options);
    }, this.heartBeatWait);
};

connection.prototype.stopHeartBeat = function () {
    if (typeof this.heartBeatID == "number") {
        this.heartBeatID = clearInterval(this.heartBeatID);
    }
};

connection.prototype.sendReceiptsMessage = function (options) {
    var dom = $msg({
        from: this.context.jid || '',
        to: this.domain,
        id: options.id || ''
    }).c('received', {
        xmlns: 'urn:xmpp:receipts',
        id: options.id || ''
    });
    this.sendCommand(dom.tree());
};

connection.prototype.cacheReceiptsMessage = function (options) {
    this.sendQueue.push(options);
};

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
connection.prototype.getHostsByTag = function (data, tagName) {
    var tag = _utils.getXmlFirstChild(data, tagName);
    if (!tag) {
        console.log(tagName + ' hosts error');
        return null;
    }
    var hosts = tag.getElementsByTagName('hosts');
    if (hosts.length == 0) {
        console.log(tagName + ' hosts error2');
        return null;
    }
    return hosts[0].getElementsByTagName('host');

};
connection.prototype.getRestFromHttpDNS = function (options, type) {
    if (this.restIndex > this.restTotal) {
        console.log('rest hosts all tried,quit');
        return;
    }
    var url = '';
    var host = this.restHosts[this.restIndex];
    var domain = _utils.getXmlFirstChild(host, 'domain');
    var ip = _utils.getXmlFirstChild(host, 'ip');
    if (ip) {
        var port = _utils.getXmlFirstChild(host, 'port');
        url = (location.protocol === 'https:' ? 'https:' : 'http:') + '//' + ip.textContent + ':' + port.textContent;
    } else {
        url = (location.protocol === 'https:' ? 'https:' : 'http:') + '//' + domain.textContent;
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

connection.prototype.getHttpDNS = function (options, type) {
    if (this.restHosts) {
        this.getRestFromHttpDNS(options, type);
        return;
    }
    var self = this;
    var suc = function (data, xhr) {
        data = new DOMParser().parseFromString(data, "text/xml").documentElement;
        //get rest ips
        var restHosts = self.getHostsByTag(data, 'rest');
        if (!restHosts) {
            console.log('rest hosts error3');
            return;
        }
        self.restHosts = restHosts;
        self.restTotal = restHosts.length;

        //get xmpp ips
        var xmppHosts = self.getHostsByTag(data, 'xmpp');
        if (!xmppHosts) {
            console.log('xmpp hosts error3');
            return;
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
        url: this.dnsArr[this.dnsIndex] + '/easemob/server.xml',
        dataType: 'text',
        type: 'GET',

        // url: 'http://www.easemob.com/easemob/server.xml',
        // dataType: 'xml',
        data: {app_key: encodeURIComponent(options.appKey)},
        success: suc || _utils.emptyfn,
        error: error || _utils.emptyfn
    };
    _utils.ajax(options2);
};

connection.prototype.signup = function (options) {
    var self = this;
    var orgName = options.orgName || '';
    var appName = options.appName || '';
    var appKey = options.appKey || '';
    var suc = options.success || EMPTYFN;
    var err = options.error || EMPTYFN;

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
    var https = options.https || https;
    var apiUrl = options.apiUrl;
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


connection.prototype.open = function (options) {
    var appkey = options.appKey,
        orgName = appkey.split('#')[0],
        appName = appkey.split('#')[1];
    this.orgName = orgName;
    this.appName = appName;
    if (options.accessToken) {
        this.token = options.accessToken;
    }
    if (options.xmppURL) {
        this.url = _getXmppUrl(options.xmppURL, this.https);
    }
    if (location.protocol != 'https:' && this.isHttpDNS) {
        this.dnsIndex = 0;
        this.getHttpDNS(options, 'login');
    } else {
        this.login(options);
    }
};

connection.prototype.login = function (options) {
    this.user = options.user;
    var pass = _validCheck(options, this);

    if (!pass) {
        return;
    }

    var conn = this;

    if (conn.isOpened()) {
        return;
    }

    if (options.accessToken) {
        options.access_token = options.accessToken;
        conn.context.restTokenData = options;
        _login(options, conn);
    } else {
        var apiUrl = options.apiUrl;
        var userId = this.context.userId;
        var pwd = options.pwd || '';
        var appName = this.context.appName;
        var orgName = this.context.orgName;

        var suc = function (data, xhr) {
            conn.context.status = _code.STATUS_DOLOGIN_IM;
            conn.context.restTokenData = data;
            if (options.success)
                options.success(data);
            conn.token = data.access_token;
            _login(data, conn);
        };
        var error = function (res, xhr, msg) {
            if (options.error)
                options.error();
            if (location.protocol != 'https:' && conn.isHttpDNS) {
                if ((conn.restIndex + 1) < conn.restTotal) {
                    conn.restIndex++;
                    conn.getRestFromHttpDNS(options, 'login');
                    return;
                }
            }
            conn.clear();
            if (res.error && res.error_description) {
                conn.onError({
                    type: _code.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
                    data: res,
                    xhr: xhr
                });
            } else {
                conn.onError({
                    type: _code.WEBIM_CONNCTION_OPEN_ERROR,
                    data: res,
                    xhr: xhr
                });
            }
        };

        this.context.status = _code.STATUS_DOLOGIN_USERGRID;

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

// attach to xmpp server for BOSH
connection.prototype.attach = function (options) {
    var pass = _validCheck(options, this);

    if (!pass) {
        return;
    }

    options = options || {};

    var accessToken = options.accessToken || '';
    if (accessToken == '') {
        this.onError({
            type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
        });
        return;
    }

    var sid = options.sid || '';
    if (sid === '') {
        this.onError({
            type: _code.WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR
        });
        return;
    }

    var rid = options.rid || '';
    if (rid === '') {
        this.onError({
            type: _code.WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR
        });
        return;
    }

    var stropheConn = this.getStrophe();

    this.context.accessToken = accessToken;
    this.context.stropheConn = stropheConn;
    this.context.status = _code.STATUS_DOLOGIN_IM;

    var conn = this;
    var callback = function (status, msg) {
        _loginCallback(status, msg, conn);
    };

    var jid = this.context.jid;
    var wait = this.wait;
    var hold = this.hold;
    var wind = this.wind || 5;
    stropheConn.attach(jid, sid, rid, callback, wait, hold, wind);
};

connection.prototype.close = function (reason) {
    this.stopHeartBeat();

    var status = this.context.status;
    if (status == _code.STATUS_INIT) {
        return;
    }

    if (this.isClosed() || this.isClosing()) {
        return;
    }

    this.context.status = _code.STATUS_CLOSING;
    this.context.stropheConn.disconnect(reason);
};

connection.prototype.addHandler = function (handler, ns, name, type, id, from, options) {
    this.context.stropheConn.addHandler(handler, ns, name, type, id, from, options);
};

connection.prototype.notifyVersion = function (suc, fail) {
    var jid = _getJid({}, this);
    var dom = $iq({
        from: this.context.jid || ''
        , to: this.domain
        , type: 'result'
    })
        .c('query', {xmlns: 'jabber:iq:version'})
        .c('name')
        .t('easemob')
        .up()
        .c('version')
        .t(_version)
        .up()
        .c('os')
        .t('webim');

    var suc = suc || _utils.emptyfn;
    var error = fail || this.onError;
    var failFn = function (ele) {
        error({
            type: _code.WEBIM_CONNCTION_NOTIFYVERSION_ERROR
            , data: ele
        });
    };
    this.context.stropheConn.sendIQ(dom.tree(), suc, failFn);
    return;
};

// handle all types of presence message
connection.prototype.handlePresence = function (msginfo) {
    if (this.isClosed()) {
        return;
    }
    var from = msginfo.getAttribute('from') || '';
    var to = msginfo.getAttribute('to') || '';
    var type = msginfo.getAttribute('type') || '';
    var presence_type = msginfo.getAttribute('presence_type') || '';
    var fromUser = _parseNameFromJidFn(from);
    var toUser = _parseNameFromJidFn(to);
    var isCreate = false;
    var isMemberJoin = false;
    var isDecline = false;
    var isApply = false;
    var info = {
        from: fromUser,
        to: toUser,
        fromJid: from,
        toJid: to,
        type: type,
        chatroom: msginfo.getElementsByTagName('roomtype').length ? true : false
    };

    var showTags = msginfo.getElementsByTagName('show');
    if (showTags && showTags.length > 0) {
        var showTag = showTags[0];
        info.show = Strophe.getText(showTag);
    }
    var statusTags = msginfo.getElementsByTagName('status');
    if (statusTags && statusTags.length > 0) {
        var statusTag = statusTags[0];
        info.status = Strophe.getText(statusTag);
        info.code = statusTag.getAttribute('code');
    }

    var priorityTags = msginfo.getElementsByTagName('priority');
    if (priorityTags && priorityTags.length > 0) {
        var priorityTag = priorityTags[0];
        info.priority = Strophe.getText(priorityTag);
    }

    var error = msginfo.getElementsByTagName('error');
    if (error && error.length > 0) {
        var error = error[0];
        info.error = {
            code: error.getAttribute('code')
        };
    }

    var destroy = msginfo.getElementsByTagName('destroy');
    if (destroy && destroy.length > 0) {
        var destroy = destroy[0];
        info.destroy = true;

        var reason = destroy.getElementsByTagName('reason');
        if (reason && reason.length > 0) {
            info.reason = Strophe.getText(reason[0]);
        }
    }

    var members = msginfo.getElementsByTagName('item');
    if (members && members.length > 0) {
        var member = members[0];
        var role = member.getAttribute('role');
        var jid = member.getAttribute('jid');
        var affiliation = member.getAttribute('affiliation');
        // dismissed by group
        if (role == 'none' && jid) {
            var kickedMember = _parseNameFromJidFn(jid);
            var actor = member.getElementsByTagName('actor')[0];
            var actorNick = actor.getAttribute('nick');
            info.actor = actorNick;
            info.kicked = kickedMember;
        }
        // Service Acknowledges Room Creation `createGroupACK`
        if (role == 'moderator' && info.code == '201') {
            if (affiliation === 'owner') {
                info.type = 'createGroupACK';
                isCreate = true;
            }
            // else
            //     info.type = 'joinPublicGroupSuccess';
        }
    }

    var x = msginfo.getElementsByTagName('x');
    if (x && x.length > 0) {
        // 加群申请
        var apply = x[0].getElementsByTagName('apply');
        // 加群成功
        var accept = x[0].getElementsByTagName('accept');
        // 同意加群后用户进群通知
        var item = x[0].getElementsByTagName('item');
        // 加群被拒绝
        var decline = x[0].getElementsByTagName('decline');
        // 被设为管理员
        var addAdmin = x[0].getElementsByTagName('add_admin');
        // 被取消管理员
        var removeAdmin = x[0].getElementsByTagName('remove_admin');
        // 被禁言
        var addMute = x[0].getElementsByTagName('add_mute');
        // 取消禁言
        var removeMute = x[0].getElementsByTagName('remove_mute');

        if (apply && apply.length > 0) {
            isApply = true;
            info.toNick = apply[0].getAttribute('toNick');
            info.type = 'joinGroupNotifications';
            var groupJid = apply[0].getAttribute('to');
            var gid = groupJid.split('@')[0].split('_');
            gid = gid[gid.length - 1];
            info.gid = gid;
        } else if (accept && accept.length > 0) {
            info.type = 'joinPublicGroupSuccess';
        } else if (item && item.length > 0) {
            var affiliation = item[0].getAttribute('affiliation'),
                role = item[0].getAttribute('role');
            if (affiliation == 'member'
                ||
                role == 'participant') {
                isMemberJoin = true;
                info.mid = info.fromJid.split('/');
                info.mid = info.mid[info.mid.length - 1];
                info.type = 'memberJoinPublicGroupSuccess';
                var roomtype = msginfo.getElementsByTagName('roomtype');
                if (roomtype && roomtype.length > 0) {
                    var type = roomtype[0].getAttribute('type');
                    if (type == 'chatroom') {
                        info.type = 'memberJoinChatRoomSuccess';
                    }
                }
            }
        } else if (decline && decline.length) {
            isDecline = true;
            var gid = decline[0].getAttribute("fromNick");
            var owner = _parseNameFromJidFn(decline[0].getAttribute("from"));
            info.type = "joinPublicGroupDeclined";
            info.owner = owner;
            info.gid = gid;
        } else if (addAdmin && addAdmin.length > 0) {
            var gid = _parseNameFromJidFn(addAdmin[0].getAttribute('mucjid'));
            var owner = _parseNameFromJidFn(addAdmin[0].getAttribute('from'));
            info.owner = owner;
            info.gid = gid;
            info.type = "addAdmin";
        } else if (removeAdmin && removeAdmin.length > 0) {
            var gid = _parseNameFromJidFn(removeAdmin[0].getAttribute('mucjid'));
            var owner = _parseNameFromJidFn(removeAdmin[0].getAttribute('from'));
            info.owner = owner;
            info.gid = gid;
            info.type = "removeAdmin";
        } else if (addMute && addMute.length > 0) {
            var gid = _parseNameFromJidFn(addMute[0].getAttribute('mucjid'));
            var owner = _parseNameFromJidFn(addMute[0].getAttribute('from'));
            info.owner = owner;
            info.gid = gid;
            info.type = "addMute";
        } else if (removeMute && removeMute.length > 0) {
            var gid = _parseNameFromJidFn(removeMute[0].getAttribute('mucjid'));
            var owner = _parseNameFromJidFn(removeMute[0].getAttribute('from'));
            info.owner = owner;
            info.gid = gid;
            info.type = "removeMute";
        }
    }


    if (info.chatroom) {
        // diff the
        info.presence_type = presence_type;
        info.original_type = info.type;
        var reflectUser = from.slice(from.lastIndexOf('/') + 1);

        if (reflectUser === this.context.userId) {
            if (info.type === '' && !info.code) {
                info.type = 'joinChatRoomSuccess';
            } else if (presence_type === 'unavailable' || info.type === 'unavailable') {
                if (!info.status) {// logout successfully.
                    info.type = 'leaveChatRoom';
                } else if (info.code == 110) {// logout or dismissied by admin.
                    info.type = 'leaveChatRoom';
                } else if (info.error && info.error.code == 406) {// The chat room is full.
                    info.type = 'reachChatRoomCapacity';
                }
            }
        }
    } else {
        info.presence_type = presence_type;
        info.original_type = type;

        if (/subscribe/.test(info.type)) {
            //subscribe | subscribed | unsubscribe | unsubscribed
        } else if (type == ""
            &&
            !info.status
            &&
            !info.error
            &&
            !isCreate
            &&
            !isApply
            &&
            !isMemberJoin
            &&
            !isDecline
        ) {
            console.log(2222222, msginfo, info, isApply);
            // info.type = 'joinPublicGroupSuccess';
        } else if (presence_type === 'unavailable' || type === 'unavailable') {// There is no roomtype when a chat room is deleted.
            if (info.destroy) {// Group or Chat room Deleted.
                info.type = 'deleteGroupChat';
            } else if (info.code == 307 || info.code == 321) {// Dismissed by group.
                var nick = msginfo.getAttribute('nick');
                if (!nick)
                    info.type = 'leaveGroup';
                else
                    info.type = 'removedFromGroup';
            }
        }
    }
    this.onPresence(info, msginfo);
};

connection.prototype.handlePing = function (e) {
    if (this.isClosed()) {
        return;
    }
    var id = e.getAttribute('id');
    var from = e.getAttribute('from');
    var to = e.getAttribute('to');
    var dom = $iq({
        from: to
        , to: from
        , id: id
        , type: 'result'
    });
    this.sendCommand(dom.tree());
};

connection.prototype.handleIq = function (iq) {
    return true;
};

connection.prototype.handleIqPrivacy = function (msginfo) {
    var list = msginfo.getElementsByTagName('list');
    if (list.length == 0) {
        return;
    }
    this.getBlacklist();
};

connection.prototype.handleIqRoster = function (e) {
    var id = e.getAttribute('id');
    var from = e.getAttribute('from') || '';
    var name = _parseNameFromJidFn(from);
    var curJid = this.context.jid;
    var curUser = this.context.userId;

    var iqresult = $iq({type: 'result', id: id, from: curJid});
    this.sendCommand(iqresult.tree());

    var msgBodies = e.getElementsByTagName('query');
    if (msgBodies && msgBodies.length > 0) {
        var queryTag = msgBodies[0];
        var rouster = _parseFriend(queryTag, this, from);
        this.onRoster(rouster);
    }
    return true;
};

connection.prototype.handleMessage = function (msginfo) {
    var self = this;
    if (this.isClosed()) {
        return;
    }

    var id = msginfo.getAttribute('id') || '';


    // cache ack into sendQueue first , handelSendQueue will do the send thing with the speed of  5/s
    this.cacheReceiptsMessage({
        id: id
    });
    var parseMsgData = _parseResponseMessage(msginfo);
    if (parseMsgData.errorMsg) {
        this.handlePresence(msginfo);
        return;
    }
    // send error
    var error = msginfo.getElementsByTagName('error');
    var errorCode = '';
    var errorText = '';
    var errorBool = false;
    if (error.length > 0) {
        errorBool = true;
        errorCode = error[0].getAttribute('code');
        var textDOM = error[0].getElementsByTagName('text');
        errorText = textDOM[0].textContent || textDOM[0].text;
    }

    var msgDatas = parseMsgData.data;
    for (var i in msgDatas) {
        if (!msgDatas.hasOwnProperty(i)) {
            continue;
        }
        var msg = msgDatas[i];
        if (!msg.from || !msg.to) {
            continue;
        }

        var from = (msg.from + '').toLowerCase();
        var too = (msg.to + '').toLowerCase();
        var extmsg = msg.ext || {};
        var chattype = '';
        var typeEl = msginfo.getElementsByTagName('roomtype');
        if (typeEl.length) {
            chattype = typeEl[0].getAttribute('type') || 'chat';
        } else {
            chattype = msginfo.getAttribute('type') || 'chat';
        }

        var msgBodies = msg.bodies;
        if (!msgBodies || msgBodies.length == 0) {
            continue;
        }
        var msgBody = msg.bodies[0];
        var type = msgBody.type;

        try {
            switch (type) {
                case 'txt':
                    var receiveMsg = msgBody.msg;
                    if (self.encrypt.type === 'base64') {
                        receiveMsg = atob(receiveMsg);
                    } else if (self.encrypt.type === 'aes') {
                        var key = CryptoJS.enc.Utf8.parse(self.encrypt.key);
                        var iv = CryptoJS.enc.Utf8.parse(self.encrypt.iv);
                        var mode = self.encrypt.mode.toLowerCase();
                        var option = {};
                        if (mode === 'cbc') {
                            option = {
                                iv: iv,
                                mode: CryptoJS.mode.CBC,
                                padding: CryptoJS.pad.Pkcs7
                            };
                        } else if (mode === 'ebc') {
                            option = {
                                mode: CryptoJS.mode.ECB,
                                padding: CryptoJS.pad.Pkcs7
                            }
                        }
                        var encryptedBase64Str = receiveMsg;
                        var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, option);
                        var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
                        receiveMsg = decryptedStr;
                    }
                    var emojibody = _utils.parseTextMessage(receiveMsg, WebIM.Emoji);
                    if (emojibody.isemoji) {
                        var msg = {
                            id: id
                            , type: chattype
                            , from: from
                            , to: too
                            , delay: parseMsgData.delayTimeStamp
                            , data: emojibody.body
                            , ext: extmsg
                        };
                        !msg.delay && delete msg.delay;
                        msg.error = errorBool;
                        msg.errorText = errorText;
                        msg.errorCode = errorCode;
                        this.onEmojiMessage(msg);
                    } else {
                        var msg = {
                            id: id
                            , type: chattype
                            , from: from
                            , to: too
                            , delay: parseMsgData.delayTimeStamp
                            , data: receiveMsg
                            , ext: extmsg
                        };
                        !msg.delay && delete msg.delay;
                        msg.error = errorBool;
                        msg.errorText = errorText;
                        msg.errorCode = errorCode;
                        this.onTextMessage(msg);
                    }
                    break;
                case 'img':
                    var rwidth = 0;
                    var rheight = 0;
                    if (msgBody.size) {
                        rwidth = msgBody.size.width;
                        rheight = msgBody.size.height;
                    }
                    var msg = {
                        id: id
                        , type: chattype
                        , from: from
                        , to: too
                        ,
                        url: (location.protocol != 'https:' && self.isHttpDNS) ? (self.apiUrl + msgBody.url.substr(msgBody.url.indexOf("/", 9))) : msgBody.url
                        , secret: msgBody.secret
                        , filename: msgBody.filename
                        , thumb: msgBody.thumb
                        , thumb_secret: msgBody.thumb_secret
                        , file_length: msgBody.file_length || ''
                        , width: rwidth
                        , height: rheight
                        , filetype: msgBody.filetype || ''
                        , accessToken: this.context.accessToken || ''
                        , ext: extmsg
                        , delay: parseMsgData.delayTimeStamp
                    };
                    !msg.delay && delete msg.delay;
                    msg.error = errorBool;
                    msg.errorText = errorText;
                    msg.errorCode = errorCode;
                    this.onPictureMessage(msg);
                    break;
                case 'audio':
                    var msg = {
                        id: id
                        , type: chattype
                        , from: from
                        , to: too
                        ,
                        url: (location.protocol != 'https:' && self.isHttpDNS) ? (self.apiUrl + msgBody.url.substr(msgBody.url.indexOf("/", 9))) : msgBody.url
                        , secret: msgBody.secret
                        , filename: msgBody.filename
                        , length: msgBody.length || ''
                        , file_length: msgBody.file_length || ''
                        , filetype: msgBody.filetype || ''
                        , accessToken: this.context.accessToken || ''
                        , ext: extmsg
                        , delay: parseMsgData.delayTimeStamp
                    };
                    !msg.delay && delete msg.delay;
                    msg.error = errorBool;
                    msg.errorText = errorText;
                    msg.errorCode = errorCode;
                    this.onAudioMessage(msg);
                    break;
                case 'file':
                    var msg = {
                        id: id
                        , type: chattype
                        , from: from
                        , to: too
                        ,
                        url: (location.protocol != 'https:' && self.isHttpDNS) ? (self.apiUrl + msgBody.url.substr(msgBody.url.indexOf("/", 9))) : msgBody.url
                        , secret: msgBody.secret
                        , filename: msgBody.filename
                        , file_length: msgBody.file_length
                        , accessToken: this.context.accessToken || ''
                        , ext: extmsg
                        , delay: parseMsgData.delayTimeStamp
                    };
                    !msg.delay && delete msg.delay;
                    msg.error = errorBool;
                    msg.errorText = errorText;
                    msg.errorCode = errorCode;
                    this.onFileMessage(msg);
                    break;
                case 'loc':
                    var msg = {
                        id: id
                        , type: chattype
                        , from: from
                        , to: too
                        , addr: msgBody.addr
                        , lat: msgBody.lat
                        , lng: msgBody.lng
                        , ext: extmsg
                        , delay: parseMsgData.delayTimeStamp
                    };
                    !msg.delay && delete msg.delay;
                    msg.error = errorBool;
                    msg.errorText = errorText;
                    msg.errorCode = errorCode;
                    this.onLocationMessage(msg);
                    break;
                case 'video':
                    var msg = {
                        id: id
                        , type: chattype
                        , from: from
                        , to: too
                        ,
                        url: (location.protocol != 'https:' && self.isHttpDNS) ? (self.apiUrl + msgBody.url.substr(msgBody.url.indexOf("/", 9))) : msgBody.url
                        , secret: msgBody.secret
                        , filename: msgBody.filename
                        , file_length: msgBody.file_length
                        , accessToken: this.context.accessToken || ''
                        , ext: extmsg
                        , delay: parseMsgData.delayTimeStamp
                    };
                    !msg.delay && delete msg.delay;
                    msg.error = errorBool;
                    msg.errorText = errorText;
                    msg.errorCode = errorCode;
                    this.onVideoMessage(msg);
                    break;
                case 'cmd':
                    var msg = {
                        id: id
                        , from: from
                        , to: too
                        , action: msgBody.action
                        , ext: extmsg
                        , delay: parseMsgData.delayTimeStamp
                    };
                    !msg.delay && delete msg.delay;
                    msg.error = errorBool;
                    msg.errorText = errorText;
                    msg.errorCode = errorCode;
                    this.onCmdMessage(msg);
                    break;
            }
            ;
            if (self.delivery) {
                var msgId = self.getUniqueId();
                var bodyId = msg.id;
                var deliverMessage = new WebIM.message('delivery', msgId);
                deliverMessage.set({
                    id: bodyId
                    , to: msg.from
                });
                self.send(deliverMessage.body);
            }
        } catch (e) {
            this.onError({
                type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR
                , data: e
            });
        }
    }
};

connection.prototype.handleDeliveredMessage = function (message) {
    var id = message.id;
    var body = message.getElementsByTagName('body');
    var mid = 0;
    mid = body[0].innerHTML;
    var msg = {
        mid: mid
    };
    this.onDeliverdMessage(msg);
    this.sendReceiptsMessage({
        id: id
    });
};

connection.prototype.handleAckedMessage = function (message) {
    var id = message.id;
    var body = message.getElementsByTagName('body');
    var mid = 0;
    mid = body[0].innerHTML;
    var msg = {
        mid: mid
    };
    this.onReadMessage(msg);
    this.sendReceiptsMessage({
        id: id
    });
};

connection.prototype.handleReceivedMessage = function (message) {
    try {
        var received = message.getElementsByTagName("received");
        var mid = received[0].getAttribute('mid');
        var body = message.getElementsByTagName("body");
        var id = body[0].innerHTML;
        var msg = {
            mid: mid,
            id: id
        };
        this.onReceivedMessage(msg);
    } catch (e) {
        this.onError({
            type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR
            , data: e
        });
    }

    var rcv = message.getElementsByTagName('received'),
        id,
        mid;

    if (rcv.length > 0) {
        if (rcv[0].childNodes && rcv[0].childNodes.length > 0) {
            id = rcv[0].childNodes[0].nodeValue;
        } else {
            id = rcv[0].innerHTML || rcv[0].innerText;
        }
        mid = rcv[0].getAttribute('mid');
    }

    if (_msgHash[id]) {
        try {
            _msgHash[id].msg.success instanceof Function && _msgHash[id].msg.success(id, mid);
        } catch (e) {
            this.onError({
                type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR
                , data: e
            });
        }
        delete _msgHash[id];
    }
};

connection.prototype.handleInviteMessage = function (message) {
    var form = null;
    var invitemsg = message.getElementsByTagName('invite');
    var reasonDom = message.getElementsByTagName('reason')[0];
    var reasonMsg = reasonDom.textContent;
    var id = message.getAttribute('id') || '';
    this.sendReceiptsMessage({
        id: id
    });

    if (invitemsg && invitemsg.length > 0) {
        var fromJid = invitemsg[0].getAttribute('from');
        form = _parseNameFromJidFn(fromJid);
    }
    var xmsg = message.getElementsByTagName('x');
    var roomid = null;
    if (xmsg && xmsg.length > 0) {
        for (var i = 0; i < xmsg.length; i++) {
            if ('jabber:x:conference' === xmsg[i].namespaceURI) {
                var roomjid = xmsg[i].getAttribute('jid');
                roomid = _parseNameFromJidFn(roomjid);
            }
        }
    }
    this.onInviteMessage({
        type: 'invite',
        from: form,
        roomid: roomid,
        reason: reasonMsg
    });
};

connection.prototype.handleMutedMessage = function (message) {
    var id = message.id;
    this.onMutedMessage({
        mid: id
    });
};

connection.prototype.sendCommand = function (dom, id) {
    if (this.isOpened()) {
        this.context.stropheConn.send(dom);
    } else {
        this.onError({
            type: _code.WEBIM_CONNCTION_DISCONNECTED,
            reconnect: true
        });
    }
};

connection.prototype.getUniqueId = function (prefix) {
    // fix: too frequently msg sending will make same id
    if (this.autoIncrement) {
        this.autoIncrement++
    } else {
        this.autoIncrement = 1
    }
    var cdate = new Date();
    var offdate = new Date(2010, 1, 1);
    var offset = cdate.getTime() - offdate.getTime();
    var hexd = parseFloat(offset).toString(16) + this.autoIncrement;

    if (typeof prefix === 'string' || typeof prefix === 'number') {
        return prefix + '_' + hexd;
    } else {
        return 'WEBIM_' + hexd;
    }
};

connection.prototype.send = function (messageSource) {
    var self = this;
    var message = messageSource;
    if (message.type === 'txt') {
        if (this.encrypt.type === 'base64') {
            message = _.clone(messageSource);
            message.msg = btoa(message.msg);
        } else if (this.encrypt.type === 'aes') {
            message = _.clone(messageSource);
            var key = CryptoJS.enc.Utf8.parse(this.encrypt.key);
            var iv = CryptoJS.enc.Utf8.parse(this.encrypt.iv);
            var mode = this.encrypt.mode.toLowerCase();
            var option = {};
            if (mode === 'cbc') {
                option = {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                };
            } else if (mode === 'ebc') {
                option = {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                }
            }
            var encryptedData = CryptoJS.AES.encrypt(message.msg, key, option);

            message.msg = encryptedData.toString();
        }
    }
    if (this.isWindowSDK) {
        WebIM.doQuery('{"type":"sendMessage","to":"' + message.to + '","message_type":"' + message.type + '","msg":"' + encodeURI(message.msg) + '","chatType":"' + message.chatType + '"}',
            function (response) {
            },
            function (code, msg) {
                var message = {
                    data: {
                        data: "send"
                    },
                    type: _code.WEBIM_MESSAGE_SED_ERROR
                };
                self.onError(message);
            });
    } else {
        if (Object.prototype.toString.call(message) === '[object Object]') {
            var appKey = this.context.appKey || '';
            var toJid = appKey + '_' + message.to + '@' + this.domain;

            if (message.group) {
                toJid = appKey + '_' + message.to + '@conference.' + this.domain;
            }
            if (message.resource) {
                toJid = toJid + '/' + message.resource;
            }

            message.toJid = toJid;
            message.id = message.id || this.getUniqueId();
            _msgHash[message.id] = new _message(message);
            _msgHash[message.id].send(this);
        } else if (typeof message === 'string') {
            _msgHash[message] && _msgHash[message].send(this);
        }
    }
};

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

connection.prototype.removeRoster = function (options) {
    var jid = _getJid(options, this);
    var iq = $iq({type: 'set'}).c('query', {xmlns: 'jabber:iq:roster'}).c('item', {
        jid: jid,
        subscription: 'remove'
    });

    var suc = options.success || _utils.emptyfn;
    var error = options.error || _utils.emptyfn;
    this.context.stropheConn.sendIQ(iq, suc, error);
};

connection.prototype.getRoster = function (options) {
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

connection.prototype.subscribe = function (options) {
    var jid = _getJid(options, this);
    var pres = $pres({to: jid, type: 'subscribe'});
    if (options.message) {
        pres.c('status').t(options.message).up();
    }
    if (options.nick) {
        pres.c('nick', {'xmlns': 'http://jabber.org/protocol/nick'}).t(options.nick);
    }
    this.sendCommand(pres.tree());
};

connection.prototype.subscribed = function (options) {
    var jid = _getJid(options, this);
    var pres = $pres({to: jid, type: 'subscribed'});

    if (options.message) {
        pres.c('status').t(options.message).up();
    }
    this.sendCommand(pres.tree());
};

connection.prototype.unsubscribe = function (options) {
    var jid = _getJid(options, this);
    var pres = $pres({to: jid, type: 'unsubscribe'});

    if (options.message) {
        pres.c('status').t(options.message);
    }
    this.sendCommand(pres.tree());
};

connection.prototype.unsubscribed = function (options) {
    var jid = _getJid(options, this);
    var pres = $pres({to: jid, type: 'unsubscribed'});

    if (options.message) {
        pres.c('status').t(options.message).up();
    }
    this.sendCommand(pres.tree());
};


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

connection.prototype.setUserSig = function (desc) {
    var dom = $pres({xmlns: 'jabber:client'});
    desc = desc || '';
    dom.c('status').t(desc);
    this.sendCommand(dom.tree());
};

connection.prototype.setPresence = function (type, status) {
    var dom = $pres({xmlns: 'jabber:client'});
    if (type) {
        if (status) {
            dom.c('show').t(type);
            dom.up().c('status').t(status);
        } else {
            dom.c('show').t(type);
        }
    }
    this.sendCommand(dom.tree());
};

connection.prototype.getPresence = function () {
    var dom = $pres({xmlns: 'jabber:client'});
    var conn = this;
    this.sendCommand(dom.tree());
};

connection.prototype.ping = function (options) {
    var options = options || {};
    var jid = _getJid(options, this);

    var dom = $iq({
        from: this.context.jid || ''
        , to: jid
        , type: 'get'
    }).c('ping', {xmlns: 'urn:xmpp:ping'});

    var suc = options.success || _utils.emptyfn;
    var error = options.error || this.onError;
    var failFn = function (ele) {
        error({
            type: _code.WEBIM_CONNCTION_PING_ERROR
            , data: ele
        });
    };
    if (this.isOpened()) {
        this.context.stropheConn.sendIQ(dom.tree(), suc, failFn);
    } else {
        error({
            type: _code.WEBIM_CONNCTION_DISCONNECTED
        });
    }
    return;
};

connection.prototype.isOpened = function () {
    return this.context.status == _code.STATUS_OPENED;
};

connection.prototype.isOpening = function () {
    var status = this.context.status;
    return status == _code.STATUS_DOLOGIN_USERGRID || status == _code.STATUS_DOLOGIN_IM;
};

connection.prototype.isClosing = function () {
    return this.context.status == _code.STATUS_CLOSING;
};

connection.prototype.isClosed = function () {
    return this.context.status == _code.STATUS_CLOSED;
};

connection.prototype.clear = function () {
    var key = this.context.appKey;
    if (this.errorType != _code.WEBIM_CONNCTION_DISCONNECTED) {
        this.context = {
            status: _code.STATUS_INIT,
            appKey: key
        };
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

connection.prototype.joinChatRoom = function (options) {
    var roomJid = this.context.appKey + '_' + options.roomId + '@conference.' + this.domain;
    var room_nick = roomJid + '/' + this.context.userId;
    var suc = options.success || _utils.emptyfn;
    var err = options.error || _utils.emptyfn;
    var errorFn = function (ele) {
        err({
            type: _code.WEBIM_CONNCTION_JOINCHATROOM_ERROR
            , data: ele
        });
    };

    var iq = $pres({
        from: this.context.jid,
        to: room_nick
    })
        .c('x', {xmlns: Strophe.NS.MUC + '#user'})
        .c('item', {affiliation: 'member', role: 'participant'})
        .up().up()
        .c('roomtype', {xmlns: 'easemob:x:roomtype', type: 'chatroom'});

    this.context.stropheConn.sendIQ(iq.tree(), suc, errorFn);
};

connection.prototype.quitChatRoom = function (options) {
    var roomJid = this.context.appKey + '_' + options.roomId + '@conference.' + this.domain;
    var room_nick = roomJid + '/' + this.context.userId;
    var suc = options.success || _utils.emptyfn;
    var err = options.error || _utils.emptyfn;
    var errorFn = function (ele) {
        err({
            type: _code.WEBIM_CONNCTION_QUITCHATROOM_ERROR
            , data: ele
        });
    };
    var iq = $pres({
        from: this.context.jid,
        to: room_nick,
        type: 'unavailable'
    })
        .c('x', {xmlns: Strophe.NS.MUC + '#user'})
        .c('item', {affiliation: 'none', role: 'none'})
        .up().up()
        .c('roomtype', {xmlns: 'easemob:x:roomtype', type: 'chatroom'});

    this.context.stropheConn.sendIQ(iq.tree(), suc, errorFn);
};

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
connection.prototype._onUpdateMyGroupList = function (options) {
    this.onUpdateMyGroupList(options);
};
connection.prototype._onUpdateMyRoster = function (options) {
    this.onUpdateMyRoster(options);
};
connection.prototype.reconnect = function () {
    var that = this;
    setTimeout(function () {
        _login(that.context.restTokenData, that);
    }, (this.autoReconnectNumTotal == 0 ? 0 : this.autoReconnectInterval) * 1000);
    this.autoReconnectNumTotal++;
};

connection.prototype.closed = function () {
    var message = {
        data: {
            data: "Closed error"
        },
        type: _code.WEBIM_CONNECTION_CLOSED
    };
    this.onError(message);
};

// used for blacklist
function _parsePrivacy(iq) {
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

// used for blacklist
connection.prototype.getBlacklist = function (options) {
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

// used for blacklist
connection.prototype.addToBlackList = function (options) {
    var iq = $iq({type: 'set'});
    var blacklist = options.list || {};
    var type = options.type || 'jid';
    var sucFn = options.success || _utils.emptyfn;
    var errFn = options.error || _utils.emptyfn;
    var piece = iq.c('query', {xmlns: 'jabber:iq:privacy'})
        .c('list', {name: 'special'});

    var keys = Object.keys(blacklist);
    var len = keys.length;
    var order = 2;

    for (var i = 0; i < len; i++) {
        var item = blacklist[keys[i]];
        var type = item.type || 'jid';
        var jid = item.jid;

        piece = piece.c('item', {action: 'deny', order: order++, type: type, value: jid})
            .c('message');
        if (i !== len - 1) {
            piece = piece.up().up();
        }
    }

    // console.log('addToBlackList', blacklist, piece.tree());
    this.context.stropheConn.sendIQ(piece.tree(), sucFn, errFn);
};

// used for blacklist
connection.prototype.removeFromBlackList = function (options) {

    var iq = $iq({type: 'set'});
    var blacklist = options.list || {};
    var sucFn = options.success || _utils.emptyfn;
    var errFn = options.error || _utils.emptyfn;
    var piece = iq.c('query', {xmlns: 'jabber:iq:privacy'})
        .c('list', {name: 'special'});

    var keys = Object.keys(blacklist);
    var len = keys.length;

    for (var i = 0; i < len; i++) {
        var item = blacklist[keys[i]];
        var type = item.type || 'jid';
        var jid = item.jid;
        var order = item.order;

        piece = piece.c('item', {action: 'deny', order: order, type: type, value: jid})
            .c('message');
        if (i !== len - 1) {
            piece = piece.up().up();
        }
    }

    // console.log('removeFromBlackList', blacklist, piece.tree());
    this.context.stropheConn.sendIQ(piece.tree(), sucFn, errFn);
};

connection.prototype._getGroupJid = function (to) {
    var appKey = this.context.appKey || '';
    return appKey + '_' + to + '@conference.' + this.domain;
};

// used for blacklist
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

// used for blacklist
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

// used for blacklist
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
 * changeGroupSubject 修改群名称
 *
 * @param options
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
 * destroyGroup 删除群组
 *
 * @param options
 */
// <iq id="9BEF5D20-841A-4048-B33A-F3F871120E58" to="easemob-demo#chatdemoui_1477462231499@conference.easemob.com" type="set">
//     <query xmlns="http://jabber.org/protocol/muc#owner">
//         <destroy>
//             <reason>xxx destory group yyy</reason>
//         </destroy>
//     </query>
// </iq>
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
 * leaveGroupBySelf 主动离开群组
 *
 * @param options
 */
// <iq id="5CD33172-7B62-41B7-98BC-CE6EF840C4F6_easemob_occupants_change_affiliation" to="easemob-demo#chatdemoui_1477481609392@conference.easemob.com" type="set">
//     <query xmlns="http://jabber.org/protocol/muc#admin">
//         <item affiliation="none" jid="easemob-demo#chatdemoui_lwz2@easemob.com"/>
//     </query>
// </iq>
// <presence to="easemob-demo#chatdemoui_1479811172349@conference.easemob.com/mt002" type="unavailable"/>

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
 * leaveGroup 被踢出群组
 *
 * @param options
 */
// <iq id="9fb25cf4-1183-43c9-961e-9df70e300de4:sendIQ" to="easemob-demo#chatdemoui_1477481597120@conference.easemob.com" type="set" xmlns="jabber:client">
//     <query xmlns="http://jabber.org/protocol/muc#admin">
//         <item affiliation="none" jid="easemob-demo#chatdemoui_lwz4@easemob.com"/>
//         <item jid="easemob-demo#chatdemoui_lwz4@easemob.com" role="none"/>
//         <item affiliation="none" jid="easemob-demo#chatdemoui_lwz2@easemob.com"/>
//         <item jid="easemob-demo#chatdemoui_lwz2@easemob.com" role="none"/>
//     </query>
// </iq>
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
 * addGroupMembers 添加群组成员
 *
 * @param options

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
 * acceptInviteFromGroup 接受加入申请
 *
 * @param options
 */
connection.prototype.acceptInviteFromGroup = function (options) {
    options.success = function () {
        // then send sendAcceptInviteMessage
        // connection.prototype.sendAcceptInviteMessage(optoins);
    };
    this.addGroupMembers(options);
};

/**
 * rejectInviteFromGroup 拒绝入群申请
 *
 * throw request for now 暂时不处理，直接丢弃
 *
 <message to='easemob-demo#chatdemoui_mt002@easemob.com' from='easmeob-demo#chatdemoui_mt001@easemob.com' id='B83B7210-BCFF-4DEE-AB28-B9FE5579C1E2'>
 <x xmlns='http://jabber.org/protocol/muc#user'>
 <apply to='easemob-demo#chatdemoui_groupid1@conference.easemob.com' from='easmeob-demo#chatdemoui_mt001@easemob.com' toNick='llllll'>
 <reason>reject</reason>
 </apply>
 </x>
 </message>
 *
 * @param options
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
 * createGroup 创建群组
 *
 * 1. 创建申请 -> 得到房主身份
 * 2. 获取房主信息 -> 得到房间form
 * 3. 完善房间form -> 创建成功
 * 4. 添加房间成员
 * 5. 消息通知成员
 * @param options
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
// 通过Rest接口创建群组
connection.prototype.createGroupNew = function (opt) {
    opt.data.owner = this.user;
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
 * shieldGroup 屏蔽群组
 * @param valueDom
 * @param v
 * @private
 */
// 通过Rest屏蔽群组
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
// 通过Rest发出入群申请
connection.prototype.joinGroup = function (opt) {
    var options = {
        url: this.apiUrl + '/' + this.orgName + '/'
        + this.appName + '/' + 'chatgroups' + '/' + opt.groupId + '/' + 'apply',
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
// 通过Rest获取群组列表
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

// 通过Rest根据groupid获取群组详情
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

// 通过Rest列出某用户所加入的所有群组
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

// 通过Rest列出群组的所有成员
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

// 通过Rest禁止群用户发言
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

// 通过Rest取消对用户禁言
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

// 通过Rest获取群组下所有管理员
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

// 通过Rest获取群组下所有被禁言成员
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

// 通过Rest设置群管理员
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

// 通过Rest取消群管理员
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

// 通过Rest同意用户加入群
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

// 通过Rest拒绝用户加入群
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

// 通过Rest添加用户至群组黑名单(单个)
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

// 通过Rest添加用户至群组黑名单(批量)
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

// 通过Rest将用户从群黑名单移除（单个）
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

// 通过Rest将用户从群黑名单移除（批量）
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

// 通过Rest解散群组
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

// 通过Rest获取群组
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

// 通过Rest离开群组
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

function _setText(valueDom, v) {
    if ('textContent' in valueDom) {
        valueDom.textContent = v;
    } else if ('text' in valueDom) {
        valueDom.text = v;
    } else {
        // Strophe.info('_setText 4 ----------');
        // valueDom.innerHTML = v;
    }
}


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
