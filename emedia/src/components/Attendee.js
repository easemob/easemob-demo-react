var _util = require('./Util');
var _logger = _util.tagLogger("Me");

var Member = require('./_Member');

var __event = require('./event');

var Stream = require('./_Stream');

/**
 * 未体现 member 使用了 session。
 * 请 这样创建
 * Member({_session: sess})
 *
 *
 * close:
 * 1.服务端 踢掉
 * 2.手动点击 挂断
 * 3.enter失败！
 *
 * websocket 断开连接后，并不会 去close。因为发送消息可以实现重连，重新enter
 *
 *
 */
var Attendee = Member.extend({
    __init__: function(){
        var self = this;

        self._session || (self.sessionFactory && (self._session = self.sessionFactory()));

        if(!self._session) throw "Require session";

        self._cver = 0;

        self._cacheMembers = {};
        self._cacheStreams = {};

        self._linkedStreams = {};
        self._maybeNotExistStreams = {}; //与self._streams结构相同，用 存储 断网时，ice fail的stream对象。这个对象可能不存在了

        self._records = {};

        self._ices = {};

        self.closed = false;
    },

    getCurrentMembers: function () {
        var self = this;

        var members = [];
        _util.forEach(self._cacheMembers, function (_memId, _cacheMember) {
            var member = _util.extend(true, {}, _cacheMember);
            members.push(member);
        });

        return members;
    },

    newStream: function(cfg){
        var attendee = this;

        var _Stream = Stream.extend({
            __init__: function () {
                var self = this;

                self.rtcId || (self._webrtc && (self.rtcId = self._webrtc.getRtcId()));
                self._webrtc || (self.rtcId && (self._webrtc = attendee._ices[self.rtcId]));

                if(self.memId && !self.owner){
                    self.owner = _util.extend({}, attendee._cacheMembers[self.memId]);
                    if(!self.owner && !self.located()){
                        throw "Remote stream, not owner. it = " + self.id;
                    }
                }
            }
        });

        return new _Stream(cfg);
    },

    getConfrId: function(){
        return this.ticket.confrId;
    },
    isCaller: function () {
        var self = this;
        return self.isP2P() && self.ticket.caller == self.name;
    },
    isCallee: function () {
        var self = this;
        return self.isP2P() && self.ticket.callee == self.name;
    },
    isP2P: function () {
        var self = this;
        return self.ticket && (self.ticket.type == "P2P" || self.ticket.type == "p2p");
    },
    isConfr: function () {
        var self = this;
        return self.ticket && (self.ticket.type == "CONFR" || self.ticket.type == "confr");
    },

    onEvent: function (evt) {

    },

    join: function(joined, joinError){
        _logger.debug("begin join ...");

        var self = this;

        var enter;

        function onJoinError(_event_) {
            try{
                if((_event_ instanceof __event.WSClose) && _event_.retry){
                    return;
                }

                if(!(_event_ instanceof __event.EnterFail)){
                    _event_ = new __event.EnterFail({ //可能是 websocket 链接未成功
                        attendee: self,
                        cause: _event_,
                    });
                }

                self.onEvent(_event_);
                joinError && joinError(_event_);
            } finally {

            }
        }

        function enterRsp(rsp) {
            if(rsp.result != 0){
                try{
                    onJoinError(new __event.RspFail({request: enter, response: rsp}));
                } finally {
                    if(rsp.result !== -9527){ //-9527 客户端 自己返回，网络未通， 其他值服务端返回
                        self.onEvent(new __event.ServerRefuseEnter({failed: rsp.result, msg: rsp.msg}));
                    }
                }

                return;
            }


            self.setMemberId(rsp.memId);

            self.onEvent(new __event.EnterSuccess());

            joined && joined(rsp.memId);

            self.onMembers(rsp.cver, rsp.mems);
            self.onStreams(rsp.cver, rsp.streams);
        }

        function onConnected() {
            enter = self.newMessage()
                .setOp(200)
                .setTicket(self.ticket)
                .setNickName(self.nickName || self.ticket.memName)
                .setResource(self.resource)
                .setExt(self.ext);
            self.postMessage(enter, enterRsp);
        }

        self.connect(onConnected, onJoinError);
        _logger.debug("join", self.ticket.url);
    },

    withpublish: function (pubS) {
        var self = this;

        if(!pubS || !pubS.localStream){
            throw "pubS null or stream not open";
        }

        var enter;

        var openedStream = pubS && pubS.localStream;

        var webrtc;

        function then(joined, joinError) {
            if(arguments.length === 1){
                joinError = joined;
                joined = undefined;
            }

            function onJoinError(_event_) {
                try{
                    if((_event_ instanceof __event.WSClose) && _event_.retry){
                        return;
                    }

                    if(!(_event_ instanceof __event.EnterFail)){
                        _event_ = new __event.EnterFail({ //可能是 websocket 链接未成功
                            attendee: self,
                            cause: _event_,
                        });
                    }

                    self.onEvent(_event_);
                    joinError && joinError(_event_);
                } finally {
                    if (openedStream) {
                        openedStream.getTracks().forEach(function (track) {
                            track.stop();
                        });
                    }

                    webrtc && self.closeWebrtc(webrtc.getRtcId());
                }
            }

            function enterRsp(rsp) {
                if(rsp.result != 0){
                    try{
                        onJoinError(new __event.RspFail({request: enter, response: rsp}));
                    } finally {
                        if(rsp.result !== -9527){ //-9527 客户端 自己返回，网络未通， 其他值服务端返回
                            self.onEvent(new __event.ServerRefuseEnter({failed: rsp.result, msg: rsp.msg}));
                        }
                    }

                    return;
                }


                self.setMemberId(rsp.memId);

                self.onEvent(new __event.EnterSuccess());

                var stream = self.newStream(pubS);
                stream._localMediaStream = pubS.localStream;
                stream.rtcId = webrtc.getRtcId();
                stream._webrtc = webrtc;
                stream.id = rsp.streamId;
                stream.owner = {id: rsp.memId, nickName: self.nickName, name: self.sysUserId, ext: self.extObj};

                joined && joined(rsp.memId, stream);
                self.onEvent(new __event.PushSuccess({stream: stream, hidden: true}));

                rsp.sdp && self.ansC(webrtc.getRtcId(), rsp.sdp);
                rsp.cands && self.tcklC(webrtc.getRtcId(), rsp.cands)

                self.onMembers(rsp.cver, rsp.mems);
                self.onStreams(rsp.cver, rsp.streams);
            }

            function onConnected() {
                _logger.debug("enter and pubs");

                var stream = pubS.localStream;

                webrtc = self.createWebrtc({_rtcId: pubS.rtcId});
                self.setLocalStream(stream, webrtc.getRtcId());

                self.doOffer(webrtc.getRtcId(), function (sdp) {
                    enter = self.newMessage()
                        .setOp(200)
                        .setTicket(self.ticket)
                        .setNickName(self.nickName || self.ticket.memName)
                        .setResource(self.resource)
                        .setSdp(sdp)
                        .setRtcId(webrtc.getRtcId())
                        .setPubS(pubS)
                        .setExt(self.ext);
                    self.postMessage(enter, enterRsp);
                });
            }

            self.connect(onConnected, onJoinError);
            _logger.debug("join", self.ticket.url);
        }

        return {
            join: then
        }
    },

    push: function(pubS, pushed, onPushError, autoPush){
        _logger.debug("begin push ...");

        var self = this;

        if(arguments.length === 2){
            onPushError = pushed;
            pushed = undefined;
        }


        if(!pubS || !pubS.localStream){
            throw "pubS or stream open";
        }


        var initC;

        var openedStream = pubS.localStream;

        var webrtc;

        function _onPushError(_event_) {
            try{
                var stream = self.newStream(pubS);
                stream._localMediaStream = pubS.localStream;
                stream._webrtc = webrtc;
                stream.rtcId = webrtc && webrtc.getRtcId();
                stream.owner = {id: self.getMemberId(), nickName: self.nickName, name: self.sysUserId, ext: self.extObj};

                var _event_ = new __event.PushFail({
                    stream: stream,
                    cause: _event_,
                    hidden: (autoPush && _event_.hidden === true)
                });

                self.onEvent(_event_);
                _event_.hidden || (onPushError && onPushError(_event_));
            } finally {
                if (openedStream && _event_.hidden !== true) {
                    openedStream.getTracks().forEach(function (track) {
                        track.stop();
                    });
                }

                webrtc && self.closeWebrtc(webrtc.getRtcId(), _event_.hidden === true);
            }
        }

        function pushRsp(webrtc, rsp) {
            if(rsp.result != 0){
                _onPushError(new __event.RspFail({request: initC, response: rsp, hidden: rsp.retrying === true}));

                return;
            }

            var stream = self.newStream(pubS);
            stream._localMediaStream = pubS.localStream;
            stream._webrtc = webrtc;
            stream.rtcId = webrtc.getRtcId();
            stream.id = rsp.streamId;
            stream.owner = {id: self.getMemberId(), nickName: self.nickName, name: self.sysUserId, ext: self.extObj};

            self.onEvent(new __event.PushSuccess({stream: stream, hidden: true}));
            pushed && pushed(stream);


            rsp.sdp && self.ansC(webrtc.getRtcId(), rsp.sdp);
            rsp.cands && self.tcklC(webrtc.getRtcId(), rsp.cands)
        }

        function pub(pubS) {
            _logger.debug("pubs");

            var stream = pubS.localStream;

            webrtc = self.createWebrtc({_rtcId: pubS.rtcId});
            self.setLocalStream(stream, webrtc.getRtcId());

            self.doOffer(webrtc.getRtcId(), function (sdp) {
                initC = self.newMessage()
                    .setOp(102)
                    .setRtcId(webrtc.getRtcId())
                    .setSdp(sdp)
                    .setPubS(pubS);

                self.postMessage(initC, function (rsp) {
                    pushRsp(webrtc, rsp);
                });
            });
        }

        pub(pubS);
        _logger.debug("push", self.ticket.url);
    },

    createWebrtcAndSubscribeStream: function (streamId, callbacks, iceServerConfig) {
        var self = this;

        callbacks || (callbacks = {});

        var subStream = self._cacheStreams[streamId];
        var subMember = self._cacheMembers[subStream.memId];

        var webrtc = self.createWebrtc({iceServerConfig: iceServerConfig,
            onGotMediaStream: function (remoteMediaStream) {
                var evt = new __event.SubSuccess({
                    stream: stream,
                    hidden: true
                });

                callbacks.onGotRemote && callbacks.onGotRemote(stream);
                self.onEvent && self.onEvent(evt);
            }
        });
        var rtcId = webrtc.getRtcId();

        //var stream = self.newStream(subStream);
        var stream = subStream;
        stream._webrtc = webrtc;
        stream.rtcId = rtcId;
        stream.owner = _util.extend({}, subMember);

        function _onSubFail(evt) {
            _logger.error("sub stream error", streamId, evt);

            evt = new __event.SubFail({
                stream: stream,
                hidden: evt.hidden === true,
                cause: evt
            });

            callbacks && callbacks.onEvent && callbacks.onEvent(evt);
            self.onEvent && self.onEvent(evt);
        }

        self.offerCall(rtcId, null, streamId, _onSubFail);
    },

    subscribeStream: function (rtcId, streamId, rspFail){
        var self = this;

        var webrtc = self._ices[rtcId];

        var subStream = self._cacheStreams[streamId];
        var subMember = self._cacheMembers[subStream.memId];

        //var stream = self.newStream(subStream);
        var stream = subStream;
        stream._webrtc = webrtc;
        stream.rtcId = rtcId;
        stream.owner = _util.extend({}, subMember);


        var unsubMessage = self.newMessage()
            .setOp(205)
            .setRtcId(rtcId)
            .setSubSId(streamId);

        self.postMessage(unsubMessage, function (rsp) {
            if(rsp.result != 0){
                var evt = new __event.SubFail({
                    stream: stream,
                    cause: (new __event.RspFail({request: unsubMessage, response: rsp}))
                });

                rspFail && rspFail(evt);
                self.onEvent(evt);

                return;
            }

            var evt = new __event.SubSuccess({
                stream: stream,
                hidden: true
            });
            self.onEvent(evt);
        });
    },

    unsubscribeStream: function(streamId){
        var self = this;

        var stream = self._cacheStreams[streamId];
        var rtcId = stream._webrtc && stream._webrtc.getRtcId();
        if(!rtcId){
            return;
        }

        try {
            var unsubMessage = self.newMessage()
                .setOp(206)
                .setRtcId(rtcId)
                .setSubSId(streamId);

            self.postMessage(unsubMessage);
        } finally {
            self.closeWebrtc(rtcId);
        }

        return rtcId;
    },

    onEnter: function(cver, mem){
        var self = this;

        if(!mem) return;
        if(self._cacheMembers[mem.id]){
            return;
        }

        self._cacheMembers[mem.id] = mem;
        self.onAddMember(mem);
    },

    _onFinally: function () {
        var self = this;

        self._cacheMembers = {}; // id, name, nickName, resource
        self._cacheStreams = {}; // id, memId, name, voff, aoff, type
        self._linkedStreams = {};
        self._ices = {};
        self._maybeNotExistStreams = {};

        _logger.warn("finally. all clean.");
    },

    onExit: function(cver, memId, reason){
        var self = this;

        if(memId == self.getMemberId()){ //被服务器 强制 exit
            _logger.warn("Me exit. ", reason, memId);

            try{
                self.closed || self.close(reason);
            }catch (e){
                self.onEvent(new __event.Hangup({reason: reason, self: {id: self._memberId}}));
                self.onMeExit && self.onMeExit(reason);

                _logger.error(e);
            }

            return;
        }

        var rmMember = self._cacheMembers[memId];
        if(rmMember){
            self._onRemoveMember(rmMember, reason);
            self.onEvent(new __event.Hangup({reason: reason, parnter: rmMember}));
        }
    },

    onPub: function(cver, memId, pubS){
        var self = this;

        if(!self._cacheMembers[memId]) throw "No found member. when pub";

        var newStream = self.newStream(pubS);
        var _stream = self._cacheStreams[pubS.id];

        if(_stream && (newStream.sver !== _stream.sver)){
            _logger.info("Onpub. the steam ", _stream.id, " republish. sver ", _stream.sver, newStream.sver);

            if(newStream && (newStream.aoff !== _stream.aoff || newStream.voff != _stream.voff)){
                self.onStreamControl(pubS.id, newStream.voff, newStream.aoff);
            }

            self._onRepublishStream(_stream);
            _stream.sver = newStream.sver;

            return;
        }

        var stream = newStream;
        stream.owner = self._cacheMembers[memId];
        self._cacheStreams[pubS.id] = stream;

        self.onAddStream(self.newStream(stream));

        if(self.autoSub){
            self.createWebrtcAndSubscribeStream(pubS.id, {
                onGotRemote: function(stream) {
                    //self.onAddStream(stream);
                }
            })
        }
    },

    onUnpub: function(cver, memId, sId){
        var self = this;

        var rmStream = self._cacheStreams[sId];
        self._onRemovePubstream(self._cacheMembers[memId], rmStream);
    },

    onClose: function(cver, confrId, reason){
        var self = this;

        try{
            self.close(reason || 0);
        } finally {
            self.onConfrClose && self.onConfrClose(confrId, reason);
        }
    },
    
    __getWebrtcFor: function (pubStreamId) {
        var self = this;

        var webrtc = self._cacheStreams[pubStreamId]._webrtc;
        return webrtc && webrtc.getRtcId();
    },

    _updateRemoteStream: function (stream, remoteMediaStream) {
        remoteMediaStream && remoteMediaStream.getAudioTracks().forEach(function (track) {
            track.enabled = !stream.aoff;
        });

        remoteMediaStream && remoteMediaStream.getVideoTracks().forEach(function (track) {
            track.enabled = !stream.voff;
        });
    },

    onStreamControl: function(streamId, voff, aoff){
        var self = this;

        var stream = self._cacheStreams[streamId];

        stream.voff = voff;
        stream.aoff = aoff;


        var webrtc = stream._webrtc;
        webrtc && webrtc._remoteStream && self._updateRemoteStream(stream, webrtc._remoteStream);

        var stream = self.newStream(stream);
        self.onUpdateStream && self.onUpdateStream(stream, new stream.Update({voff: voff, aoff: aoff}));
    },

    aoff: function(pubS, _aoff, callback){
        var self = this;

        var rtcId = self.__getWebrtcFor(pubS.id);
        if(!rtcId){
            throw "pubS not publish" + pubS.id;
        }

        self._linkedStreams[pubS.id].aoff = _aoff;

        var streamControl = self.newMessage()
            .setOp(400)
            .setRtcId(rtcId)
            .setVoff(pubS.voff)
            .setAoff(_aoff);
        self.postMessage(streamControl, callback);
    },

    voff: function(pubS, _voff, callback){
        var self = this;

        var rtcId = self.__getWebrtcFor(pubS.id);
        if(!rtcId){
            throw "pubS not publish" + pubS.id;
        }

        self._linkedStreams[pubS.id].voff = _voff;

        var streamControl = self.newMessage()
            .setOp(400)
            .setRtcId(rtcId)
            .setVoff(_voff)
            .setAoff(pubS.aoff);
        self.postMessage(streamControl, callback);
    },

    startRecord: function (_stream, success) {
        var self = this;

        var rtcId = _stream.rtcId;

        var startRecord = self.newMessage()
            .setOp(500)
            .setRtcId(rtcId)
            .setFlag(1);
        self.postMessage(startRecord, function (rsp) {
            _logger.warn("record ", rtcId, rsp.result, rsp.msg);
            success && success(rsp.result === 0);
            if(rsp.result === 0){
                self._records[_stream.id] = _util.extend(false, {}, _stream);
            }
        });
    },

    stopRecord: function (_stream, success) {
        var self = this;

        var rtcId = _stream.rtcId;

        var stopRecord = self.newMessage()
            .setOp(500)
            .setRtcId(rtcId)
            .setFlag(0);
        self.postMessage(stopRecord, function (rsp) {
            _logger.warn("stop record ", rtcId, rsp.result, rsp.msg);
            success && success(rsp.result === 0);
        });

        if(self._records[_stream.id]){
            _util.removeAttribute(self._records, _stream.id);
        }
    },

    onMembers: function(cver, members){
        var self = this;

        var removedMembers = [];
        _util.forEach(self._cacheStreams, function (_memberId, _member) {
            members[_memberId] || removedMembers.push(_member);
        });
        _util.forEach(removedMembers, function (_index, _member) {
            self.onExit(cver, _member.id);
        });

        var addMembers = [];
        _util.forEach(members, function (_memberId, _member) {
            if(_memberId != self.getMemberId()){
                self._cacheStreams[_memberId] || addMembers.push(_member);
            }
        });
        _util.forEach(addMembers, function (_index, _member) {
            self.onEnter(cver, _member);
        });

        cver && (self._cver = cver);
    },

    onStreams: function(cver, streams){
        var self = this;

        var removedStreams = [];
        _util.forEach(self._cacheStreams, function (_pubSId, _stream) {
            _stream.located() || streams[_pubSId] || removedStreams.push(_stream);
        });
        _util.forEach(removedStreams, function (_index, _stream) {
            self.onUnpub(cver, _stream.memId, _stream.id);
        });

        var addStreams = [];
        _util.forEach(streams, function (_pubSId, stream) {
            if(stream.memId != self.getMemberId()){
                self._cacheStreams[_pubSId] || addStreams.push(stream);
            }
        });
        _util.forEach(addStreams, function (_index, _stream) {
            self.onPub(cver, _stream.memId, _stream)
        });

        _util.forEach(self._cacheStreams, function (_pubSId, _stream) {
            var newStream = streams[_pubSId];
            if(newStream && (newStream.aoff !== _stream.aoff || newStream.voff != _stream.voff)){
                self.onStreamControl(_pubSId, newStream.voff, newStream.aoff);
            }

            if(newStream && (newStream.sver !== _stream.sver)){
                self._onRepublishStream(newStream);
                _stream.sver = newStream.sver;
            }
        });

        cver && (self._cver = cver);
    },

    _onRemoveMember: function(member, reason){
        var self = this;

        _logger.info("remove", member, reason);

        var unpubStreams = [];
        _util.forEach(self._cacheStreams, function (_pubSId, _stream) {
            if(_stream.memId === member.id){
                unpubStreams.push(_stream);
            }
        });
        
        _util.forEach(unpubStreams, function (index, stream) {
            self._onRemovePubstream(stream.owner, stream, reason);
        });

        _util.removeAttribute(self._cacheMembers, member.id);

        self.onRemoveMember && self.onRemoveMember(member, reason);
    },

    _onRemovePubstream: function(member, stream){
        var self = this;

        if(!stream){
            return;
        }

        var _rtcId = self.unsubscribeStream(stream.id);
        var rmStream = _util.removeAttribute(self._cacheStreams, stream.id);

        if(self.onRemoveStream){
            var stream = self.newStream(stream);

            self.onRemoveStream(stream);
        }
    },


    _onRepublishStream: function (_stream) {
        var self = this;

        if(self._ices[_stream.rtcId] && !self._maybeNotExistStreams[_stream.id]){
            var _rtcId = self.unsubscribeStream(_stream.id);

            self.createWebrtcAndSubscribeStream(_stream.id, {
                onGotRemote: function(stream) {
                    //self.onUpdateStream(_stream);
                }
            });
        }
    },

    onAddMember: function(member){

    },
    onRemoveMember: function(member, reason){

    },

    onAddStream: function(stream){ //stream undefined 表明 autoSub属性 空或false. autoSub = true时，自动订阅

    },
    onRemoveStream: function(stream){

    },
    onUpdateStream: function (stream, update) {
        
    }
});

module.exports = Attendee;
