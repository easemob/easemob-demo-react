
var _util = require('./Util');
var _logger = _util.tagLogger("Sess");

var __event = require('./event');

var __url_seqno = 0;

var Message = _util.prototypeExtend({
    setSessId: function (sessId) {
        sessId && (this.sessId = sessId);
        return this;
    },
    setOp: function (op) {
        op && (this.op = op);

        if(op === 200){
            this.res = {
                type: emedia.config.clientType,
                ver: emedia.config.version,
                agent: emedia.config.userAgent,
                ops: emedia.config.acptOps,

                vcodes: emedia.config.vcodes
            };

            //this.res = JSON.stringify(this.res);
        }

        return this;
    },
    setTsxId: function (tsxId) {
        tsxId && (this.tsxId = tsxId);
        return this;
    },
    setTicket: function (tkt) {
        tkt && (this.tkt = tkt);
        return this;
    },
    setSdp: function (sdp) {
        sdp && (this.sdp = sdp);
        return this;
    },
    setCands: function (cands) {
        cands && (this.cands = cands);
        return this;
    },
    setSubSId: function (subSId) {
        subSId && (this.subSId = subSId);
        return this;
    },
    setPubS: function (pubS) {
        pubS && (this.pubS = _util.extend(false, {}, pubS));

        var thisPubS = this.pubS;
        if(thisPubS.ext && _util.isPlainObject(thisPubS.ext)){
            thisPubS.ext = JSON.stringify(thisPubS.ext);
        }

        thisPubS && _util.forEach(thisPubS, function (key, value) {
           if(_util.isPlainObject(value) || typeof value === 'function'){
               _util.removeAttribute(thisPubS, key);
           }
        });

        thisPubS && _util.removeAttribute(thisPubS, "localStream");
        thisPubS && _util.removeAttribute(thisPubS, "_localMediaStream");
        thisPubS && _util.removeAttribute(thisPubS, "_webrtc");
        
        return this;
    },
    setRtcId: function (rtcId) {
        rtcId && (this.rtcId = rtcId);
        return this;
    },
    setCver: function (cver) {
        cver && (this.cver = cver);
        return this;
    },
    setEndReason: function (endReason) {
        endReason && (this.endReason = endReason);
        return this;
    },
    setNickName: function (nickName) {
        nickName && (this.nickName = nickName);
        return this;
    },
    setResource: function (resource){
        resource && (this.resource = resource);
        return this;
    },
    setReason: function (reason) {
        reason && (this.reason = reason);
        return this;
    },
    setConfrId: function (confrId) {
        confrId && (this.confrId = confrId);
        return this;
    },
    setVoff: function (voff) {
        (typeof voff === "undefined") || (this.voff = (voff ? 1 : 0));
        return this;
    },
    setAoff: function (aoff) {
        (typeof aoff === "undefined") || (this.aoff = (aoff ? 1 : 0));
        return this;
    },
    setFlag: function (flag) {
        flag === 0 && (this.flag = 0);
        flag === 1 && (this.flag = 1);

        return this;
    },
    setExt: function (ext) {
        if(ext && _util.isPlainObject(ext)){
            ext = JSON.stringify(ext);
        }
        ext && (this.ext = ext);
        return this;
    }
});


/**
 * {
 *   websocket:
 *   onMessage:
 *   _postMessage(Message):
 *   onError:
 * }
 *
 * reconnectCount > 0 时不上报错误（调用onWebsocketEvent）。
 * 不存在或==0 调用调用onWebsocketEvent
 * 调用onWebsocketEvent WSClose时 将会关闭
 *
 * @returns {*}
 *
 */

window.__session_globalCount = 0;

function _connect(onConnected, onConnectFail, retry){
    var self = this;

    function connectFail(cause, _evt){
        try{
            self.onWebsocketEvent(new __event.WSClose({url: self.thisWsUri, retry: retry, online: self.online, cause: cause, event: _evt, session: self}));
        } finally {
            onConnectFail && onConnectFail(new __event.WSClose({url: self.thisWsUri, retry: retry, online: self.online, cause: cause, event: _evt, session: self}));
        }
    }

    function post(message) {
        if(!self.connected(self.thisWsUri)){
            _logger.debug("current dont connect. the message = ", message);
            return;
        }

        if(_util.isPlainObject(message) && !(message instanceof Message)){
            throw "message not a Messages";
        }

        if(self.sessId && message.sessId != self.sessId){
            _logger.info("self.sessId && message.sessId != self.sessId", message);
            return;
        }

        self.thisWsUri === self._websocket.url && self._websocket.send(JSON.stringify(message));
        self.thisWsUri === self._websocket.url && _logger.info("Done send: req:", message, self._websocket.url);
        self.thisWsUri === self._websocket.url || _logger.info("Donot send(url not equal): req:", message, self._websocket.url);
    }

    function notifyNewMessage() {
        if(self.connected(self.thisWsUri)){
            if(self._bufferedMessages.length === 0){
                return;
            }

            var __array = [];

            var bufferedMessage;
            while((bufferedMessage = self._bufferedMessages.shift())){
                if(!bufferedMessage.sessId && !self.sessId && bufferedMessage.op != 200){ //等待Enter
                    __array.push(bufferedMessage);
                    continue;
                }

                if(bufferedMessage.op === 200){ //200单独发送，有可能会修改session值
                    post(bufferedMessage);
                    break;
                }

                if(self.sessId && !bufferedMessage.sessId){
                    bufferedMessage.sessId = self.sessId;
                }

                var _bufferedMessage = post(bufferedMessage);
                _bufferedMessage && __array.push(_bufferedMessage);
            }

            if(__array.length > 0){
                Array.prototype.push.apply(self._bufferedMessages, __array);
            }
        //} else if(!retry || !self.online){
        } else if(retry === 0 || !self.online){
            var _messageMap = _util.extend(false, {}, self._callbacks);

            var tmp = [];
            for(var tsxId in _messageMap){
                var msg = _messageMap[tsxId];
                if(retry > 0 && !self.online && (msg.op === 107 || msg.op === 201 || msg.op === 206 || msg.op === 400 || msg.op === 500)) {
                    tmp.push(msg);
                    continue;
                }
                self.onMessage({op: 1001, tsxId: tsxId, result: -9527, msg: "sdk rsp fail. retry fail or online = " + self.online});
            }

            self._bufferedMessages = (self._bufferedMessages || []);

            tmp.length > 0 && (Array.prototype.push.apply(self._bufferedMessages, tmp));
        }
        else if(!self.connected()){
            var _messageMap = _util.extend(false, {}, self._callbacks);

            for(var tsxId in _messageMap){
                var msg = _messageMap[tsxId];
                if(msg.op !== 102 && msg.op !== 105 && msg.op !== 1000) {
                    continue;
                }
                self.onMessage({op: 1001, tsxId: tsxId, result: -9527, msg: "websocket disconnect", retrying: true});
            }
        }
    }


    if(self.connected(self.thisWsUri)){
        onConnected && onConnected(self);
        _logger.info("Session connected. dont continue connect");
        self.notifyNewMessage && self.notifyNewMessage();

        return;
    }

    if(!self.online){
        connectFail();
        return;
    }

    self.notifyNewMessage = notifyNewMessage;


    _logger.info("Session begin connect.");

    var _websocket = self._websocket;
    if(_websocket){
        _logger.warn("will close. websocket state", _websocket.readyState, _websocket.url, self.thisWsUri);
        _websocket.close(1000);
    }

    try {
        _logger.warn("Connecting", self.thisWsUri, retry);
        _websocket = self._websocket = new WebSocket(self.thisWsUri);
    } catch (e) {
        _logger.error(e);
        connectFail(e);

        return;
    }

    _websocket.onopen = function(evt) {
        var _url = this.url;
        if(_url !== self.thisWsUri){
            _logger.error("ignore the onopen. caused by websocket url not ", self.thisWsUri, _url);
            return;

        }

        try{
            _logger.info("websocket connected:", _url);
            onConnectFail && (onConnectFail = null);
            onConnected && onConnected(self);
            self.onWebsocketEvent(new __event.WSConnected({event: evt, session: self}));
        }finally{
            //self.notifyNewMessage();
        }
    };

    _websocket.onmessage = function(evt) {
        var _url = this.url;
        if(_url !== self.thisWsUri){
            _logger.error("ignore recv data. caused by websocket url not ", self.thisWsUri, _url, evt.data);
            return;

        }

        _logger.debug("recv data", evt.data);

        var data = JSON.parse(evt.data);
        data && data.op == 1001 &&  _logger.debug("recv message: rsp:", data);
        data && data.op != 1001 &&  _logger.info("recv message: evt:", data);

        self.onMessage(data);
    };

    _websocket.onclose = function(evt) {
        var _url = this.url;
        _logger.info("Disconnected:", _url, self.thisWsUri, evt);
        if(_url !== self.thisWsUri){
            _logger.error("ignore onclose. caused by websocket url not ", self.thisWsUri, _url);
            return;

        }

        self.notifyNewMessage();

        if(evt.code !== 1000){ //手动断开
            connectFail(undefined, evt);
        }
    };

    _websocket.onerror = function(evt) {
        _logger.info("On error:", evt);

        self.onWebsocketEvent(new __event.WSError({event: evt, online: self.online, session: self, url: this.url}));
    };
}

/**
 * {
 *   ticket:
 *   reconnectCount:
 *   onError:
 *
 *   onEnter:
 *   onExit:
 *   onPub:
 *   onUnpub:
 *   onMems:
 *   onClose:
 *
 *   onInitC:
 *   onTcklC:
 *
 *
 *   newMessage:
 *   postMessage:
 * }
 *
 *
 * @private
 */
module.exports = _util.prototypeExtend({
    _events: {
        '0': 'onReqP2P',
        '1': 'onNewCfr',
        '2': 'onDelCfr',
        '3': 'onReqTkt',

        '100': 'onPing',
        '101': 'onPong',
        '102': 'onInitC',
        '103': 'onReqC',
        '104': 'onAcptC',
        '105': 'onTcklC',
        '106': 'onAnsC',
        '107': 'onTermC',

        '300': 'onEnter',
        '301': 'onExit',
        '302': 'onPub',
        '303': 'onUnpub',
        '304': 'onMems',
        '204': 'onClose',
        '400': 'onStreamControl',
        '401': 'onJoin',
        '1002': 'onRemoteControl'

        //'onServerError': 'onServerError'
    },

    __init__: function(){
        var self = this;

        //self.owner = null;

        self._bufferedMessages = [];
        self._callbacks = {};

        function nowline() {
            if(navigator.onLine){
                self.online = true;
            }else{
                self.online = false;
            }
        }

        nowline();

        // window.__easemob_checkLineIntervalId_ && clearInterval(window.__easemob_checkLineIntervalId_);
        // window.__easemob_checkLineIntervalId_ = setInterval(function () {
        //     var lastOnline = self.online;
        //     nowline();
        //     if(!lastOnline && self.online){
        //         online();
        //     }
        //     if(lastOnline && !self.online){
        //         offline();
        //     }
        // }, 500);


        function online(e) {
            self.online = true;
            _logger.warn("online online online");

            if(!self.closed){
                self._reconnect(emedia.config.reconnect);
            }
        }

        function offline(e) {
            self.online = false;
            _logger.warn("offline offline offline");

            self.__checkConnectIntervalId && clearTimeout(self.__checkConnectIntervalId);

            self.__retryConnectIntervalId && clearTimeout(self.__retryConnectIntervalId);
            self.__retryConnectIntervalId && delete self.__retryConnectIntervalId;

            self._websocket && self._websocket.close(1000);
        }

        window.addEventListener("online", online, true);

        window.addEventListener("offline", offline, true);

        _logger.warn("online status = ", self.online);
    },

    _nextWsUri: function () {
        var self = this;

        var url = self.ticket.url;
        if(url.indexOf("?") >= 0){
            url += "&" + __url_seqno++;
        }else{
            url += "?" + __url_seqno++;
        }
        return url;
    },

    _reconnect: function (retry) {
        var self = this;

        function connected() {
            _logger.warn("Reconnected. at ", retry, self._websocket.url);
            self.__retryConnectIntervalId && clearTimeout(self.__retryConnectIntervalId);
            self.__retryConnectIntervalId && delete self.__retryConnectIntervalId;

            var enter = self.newMessage()
                .setOp(200)
                .setSessId(self._sessionId)
                .setTicket(self.ticket)
                .setNickName(self.nickName || self.ticket.memName)
                .setResource(self.resource)
                .setExt(self.owner.ext)
            self.postMessage(enter, function(rsp){
                if(rsp.result != 0){
                    try {
                        self.onEvent(new __event.EnterFail({
                            me: self.owner,
                            cause: (new __event.RspFail({request: enter, response: rsp}))}));
                    } finally {
                        if(rsp.result !== -9527){ //-9527 客户端 自己返回，网络未通， 其他值服务端返回
                            self.onEvent(new __event.ServerRefuseEnter({failed: rsp.result, msg: rsp.msg}));
                        }
                    }

                    return;
                }

                self.onEvent(new __event.EnterSuccess());

                self.owner.onMembers(rsp.cver, rsp.mems);
                self.owner.onStreams(rsp.cver, rsp.streams);

                self.notifyNewMessage();
            });
        }
        
        function failed(evt) {
            if(retry <= 0){
                _logger.warn("Reconnect end. but fail.", evt.url, retry);
                self.__retryConnectIntervalId && delete self.__retryConnectIntervalId;

                return;
            }
            retry && (self.__retryConnectIntervalId = setTimeout(function () {
                self.connect(connected, failed, --retry);
            }, emedia.config.reconnectDelay));
        }

        self.connect(connected, failed, --retry);
    },

    __checkConnect: function () {
        var self = this;

        self.__checkConnectIntervalId && clearTimeout(self.__checkConnectIntervalId);

        emedia.config.checkConnectIntervalMillis && (self.__checkConnectIntervalId = setTimeout(function () {
            //_logger.trace("Check connect..");

            try{
                if(self.online && !self.connected()){
                    self.__retryConnectIntervalId && _logger.debug("online, reconnecting...");
                    self.__retryConnectIntervalId || _logger.debug("online, but disconnect. will reconnect");
                    self.__retryConnectIntervalId || self._reconnect(emedia.config.reconnect);
                } else {
                    //self.notifyNewMessage && self.notifyNewMessage();
                }
            }finally{
                self.__checkConnect();
            }
        }, emedia.config.checkConnectIntervalMillis));
    },

    connect: function(onConnected, onConnectFail, retry){
        var self = this;

        var nextUrl = self.thisWsUri = self._nextWsUri();

        (typeof retry !== "undefined") && _logger.warn("begin connect... at retry = ", retry, nextUrl);

        function connected() {
            try{
                onConnected.apply(self, arguments);
            }finally{
                self.__checkConnect();
            }
        }

        function failed(evt) {
            try{
                onConnectFail.apply(self, arguments);
            }finally{
                retry || evt.url !== nextUrl
                || self.onEvent(new __event.ServerRefuseEnter({
                    failed: -95270, msg: "sdk reconnect fail. " + nextUrl + "|" + evt.url}));
            }
        }
        _connect.call(self, connected, failed, retry);
    },

    connected: function (wsUri) {
        var self = this;
        var result = self.online && self._websocket && (!wsUri || wsUri === self._websocket.url) && self._websocket.readyState == WebSocket.OPEN;
        //_logger.trace("Connected?", result, self.online, wsUri, self._websocket && self._websocket.url, self._websocket && self._websocket.readyState);

        return result;
    },

    onWebsocketEvent: function (evt) {
        var self = this;
        self.onEvent(evt);
    },

    register: function (listeners) {
        if (typeof listeners === "object") {
            for (var event in listeners) {
                this.bind(event, listeners[event]);
            }
        }
    },

    bind: function (event, func) {
        var self = this;

        var onFunc;
        if ((onFunc = self._events[event])) {
            self[onFunc] = func;
        } else {
            throw "Not supported event = " + event;
        }
    },

    getSessionId: function(){
        return this._sessionId;
    },


    newMessage: function(cfg) {
        return new Message(cfg);
    },

    __modifyMessage: function (message) {
        if (message && message.sdp) {
            if (typeof message.sdp === 'string') {
                message.sdp = _util.parseJSON(message.sdp);
            }
            message.sdp.type && ( message.sdp.type =  message.sdp.type.toLowerCase());
        }
        if (message && message.cands) {
            if (typeof message.cands === 'string') {
                message.cands = _util.parseJSON(message.cands);
            }

            for (var i = 0; i < message.cands.length; i++) {
                typeof message.cands[i] === 'string' && (message.cands[i] = _util.parseJSON(message.cands[i]));

                message.cands[i].sdpMLineIndex = message.cands[i].mlineindex;
                message.cands[i].sdpMid = message.cands[i].mid;

                delete message.cands[i].mlineindex;
                delete message.cands[i].mid;
            }
        }

        if (message && message.mems) {
            if (!_util.isArray(message.mems)) {
                return;
            }

            var _mems = message.mems;
            message.mems = {};

            _util.forEach(_mems, function (index, _mem) {
                message.mems[_mem.id] = _mem;

                var acptOps = _mem.acptOps = {};
                _util.forEach(emedia.config.baseAcptOps, function (_index, _oper) {
                    acptOps[_oper] = true;
                });
                if(_mem.res){
                    _util.forEach(_mem.res.ops, function (_index, _oper) {
                        acptOps[_oper] = true;
                    })
                }

                if(_mem && _mem.ext){
                    try{
                        message.mems[_mem.id].ext = JSON.parse(_mem.ext);
                    }catch(e){
                        _logger.error(e);
                    }
                }
            })
        }

        if (message && message.mem) {
            var acptOps = message.mem.acptOps = {};
            _util.forEach(emedia.config.baseAcptOps, function (_index, _oper) {
                acptOps[_oper] = true;
            });
            if(message.mem.res){
                _util.forEach(message.mem.res.ops, function (_index, _oper) {
                    acptOps[_oper] = true;
                })
            }

            if(message.mem && message.mem.ext){
                try{
                    message.mem.ext = JSON.parse(message.mem.ext);
                }catch(e){
                    _logger.error(e);
                }
            }
        }

        if (message && message.streams) {
            if (!_util.isArray(message.streams)) {
                return;
            }

            var _streams = message.streams;
            message.streams = {};

            _util.forEach(_streams, function (index, _stream) {
                message.streams[_stream.id] = _stream;

                if(_stream && _stream.ext){
                    try{
                        message.streams[_stream.id].ext = JSON.parse(_stream.ext);
                    }catch(e){
                        _logger.error(e);
                    }
                }
            })
        }

        if (message && message.pubS) {
            if(message.pubS && message.pubS.ext){
                try{
                    message.pubS.ext = JSON.parse(message.pubS.ext);
                }catch(e){
                    _logger.error(e);
                }
            }
        }


        if(message && message.ext){
            try{
                message.ext = JSON.parse(message.ext);
            }catch(e){
                _logger.error(e);
            }
        }
    },

    onMessage: function(servMessage){
        var self = this;

        if(servMessage.op != 1001 && !servMessage.sessId){
            throw "message sessId error. server evt data error";
        }

        if(servMessage.op != 1001 && self._sessionId && self._sessionId != servMessage.sessId){
            throw "message sessId error. server and local not equal";
        }

        self.__modifyMessage(servMessage);

        var reqMessage = _util.removeAttribute(self._callbacks, servMessage.tsxId);
        if(reqMessage && reqMessage.op === 200){
            self._sessionId = servMessage.sessId;

            if(servMessage.result === 0) { //enter 成功
                for(var index in self._bufferedMessages){
                    var message = self._bufferedMessages[index];

                    if(!message.sessId && message.op !== 200){
                        message.sessId = servMessage.sessId;
                    }
                }

                setTimeout(function () {
                    self.notifyNewMessage();
                }, 100);
            } else {
                var bufferedMessage;
                while((bufferedMessage = self._bufferedMessages.shift())){
                    if(bufferedMessage.op === 200){
                        continue;
                    }

                    self.onMessage({op: 1001, tsxId: bufferedMessage.tsxId, result: -9527, msg: "sdk enter fail. sdk callback. enter result = " + servMessage.result});
                }
            }
        }


        if(reqMessage){
            self.onEvent(new __event.RecvResponse({request: reqMessage, response: servMessage}));
        }

        if(reqMessage && reqMessage.__callback__){
            reqMessage.__callback__(servMessage);
            return;
        }


        if(!servMessage.op || servMessage.op == 1001){
            _logger.trace("Igron message. caused by op not found.", servMessage);
            return;
        }

        var onFunc;
        var event = servMessage.op;
        if ((onFunc = self._events[event]) && (onFunc = self[onFunc])) {
            onFunc(servMessage);
        } else {
            throw "Not supported event = ", servMessage;
        }
    },

    __modifyMessageForPost: function (message) {
        if (message.cands) {
            var _cands = [];

            var cands = message.cands;
            for (var i = 0; i < cands.length; i++){
                if(cands[i].type && cands[i].type =="candidate"){
                    _cands.push(cands[i]);
                    continue;
                }

                var _cand = {
                    type: "candidate",
                    candidate: cands[i].candidate,
                    mlineindex: cands[i].sdpMLineIndex,
                    mid: cands[i].sdpMid,
                    // seq: i
                };

                _cands.push(_cand);
            }

            message.cands = _cands;
        }

        if (message.sdp && _util.isPlainObject(message.sdp)) {
            var _sdp = {
                type: message.sdp.type,
                sdp: message.sdp.sdp
            };

            message.sdp = _sdp;

            message.sdp.type = message.sdp.type.toUpperCase();
            message.sdp = _util.stringifyJSON(message.sdp);
        }

        // if(message.ext && _util.isPlainObject(message.ext)){
        //     message.ext = JSON.stringify(message.ext);
        // }

        return message;
    },

    postMessage: function(message, callback) {
        var self = this;

        if (!message.tsxId) {
            message.setTsxId("MSG" + Date.now() + "-" + (__session_globalCount++));
        }

        if(message.memId){
            var _mem = self.owner._cacheMembers[message.memId];

            if(!_mem){
                callback && callback({op: 1001, tsxId: message.tsxId, result: -507, msg: " member not found at local. memberId = " + message.memId});
                return;
            }

            var reqOps = message._reqOps;
            if(!reqOps){
                reqOps = [];
                reqOps.push(message.op);
            }

            for(var index in reqOps){
                var _reqOp = reqOps[index];

                if(!_mem.acptOps[_reqOp]){
                    callback && callback({op: 1001, tsxId: message.tsxId, result: -507, msg: " member not accept op " + _reqOp + ", " + message.memId});
                    return;
                }
            }
        }
        _util.removeAttribute(message, '_reqOps');

        if (self._sessionId && self._sessionId != message.sessId) {
            callback && callback({op: 1001, tsxId: message.tsxId, result: -9527, msg: "sessionId not excepted."});
            return;
        }
        if (self.closed) {
            callback && callback({op: 1001, tsxId: message.tsxId, result: -9527, msg: "session closed"});
            return;
        }

        self.__modifyMessageForPost(message);

        if(message.op === 200){ // enter 放在首位
            self._bufferedMessages.unshift(message);
        } else {
            self._bufferedMessages.push(message);
        }
        self._callbacks[message.tsxId] =  _util.extend(message, {
            __callback__: callback
        });


        self.notifyNewMessage && self.notifyNewMessage();
    },

    close: function (reason) {
        _logger.warn("sessiong closing, reason = ", reason);

        var self = this;

        self.notifyNewMessage && self.notifyNewMessage();

        self.closed = true;

        self.seqno = 0;

        self._websocket && ((reason == 0 || reason == 100) ? self._websocket.close(1000) : self._websocket.close());

        self.__retryConnectIntervalId && clearTimeout(self.__retryConnectIntervalId);
        self.__retryConnectIntervalId && delete self.__retryConnectIntervalId;

        self.__checkConnectIntervalId && clearTimeout(self.__checkConnectIntervalId);
        self.__checkConnectIntervalId && delete self.__checkConnectIntervalId;

        self.owner = null;
        //self._sessionId = null;

        self._bufferedMessages = [];
        self._callbacks = {};

        _logger.warn("session closed");
    }
});

