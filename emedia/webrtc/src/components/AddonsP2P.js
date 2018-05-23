var _util = require('./Util');
var _logger = _util.tagLogger("AddonsP2P");

var __event = require('./event');

/**
 *
 * 对于视频流，往往 会出现 多个流 共用一个webrtc情况
 *
 *
 * @type {{}}
 * @private
 */


var addonsSession = function (Session) {
    var NewSession = Session.extend({

        postMessage: function(message, callback) {
            var self = this;

            var tsxId = message.tsxId;
            if (!message.tsxId) {
                tsxId = message.tsxId = ("MSG" + Date.now() + "-" + (emedia.__session_globalCount++));
            }

            Session.prototype.postMessage.call(self, message, callback);

            (function (tsxId) {
                var attendee = self.owner;
                if(attendee.isP2P() && self._callbacks[tsxId]){
                    setTimeout(function () {
                        var _sentMessage = self._callbacks[tsxId];
                        if(_sentMessage && _sentMessage.op === 1004){
                            var rsp = self.newMessage({
                                op: 1001,
                                tsxId: _sentMessage.tsxId,
                                memId: _sentMessage.memId,
                                result: 0,
                                msg: ("3000ms not recv response. will success callback. " + _sentMessage.tsxId)
                            });
                            self.onMessage(rsp);
                        }
                    }, 3000);
                }
            })(tsxId);
        },

        __modifyMessageForPost: function (message) {
            var self = this;

            message = Session.prototype.__modifyMessageForPost.call(self, message);

            var attendee = self.owner;
            if(attendee.isP2P()){
                if(message.op === 102 || message.op === 105){ //缓存  回调推流成功
                    var rsp = self.newMessage({
                        op: 1001,
                        tsxId: message.tsxId,
                        memId: message.memId,
                        result: 0,
                        streamId: (message.rtcId + (attendee.isCaller() ? "__Caller" : "__Callee")),
                        sver: 1
                    });

                    setTimeout(function () {
                        self.onMessage(rsp);
                    }, 100);

                    if(!message._cached_){
                        var cacheMessage = _util.extend({_cached_: true}, message);
                        _util.removeAttribute(cacheMessage, "tsxId");
                        (message.op === 102) && (attendee.__cache_[message.rtcId] = []).push(cacheMessage);
                        (message.op === 105) && attendee.__cache_[message.rtcId] && attendee.__cache_[message.rtcId].push(cacheMessage);
                        attendee.__cache_[message.rtcId] && (attendee.__cache_[message.rtcId].selfId = attendee.getMemberId());
                    }
                }

                _util.removeAttribute(message, "_cached_");

                if(message.memId){
                    var p2pMessage = self.newMessage({
                        op: 1004,
                        sessId: _util.removeAttribute(message, "sessId"),
                        memId: _util.removeAttribute(message, "memId"),
                        tsxId: _util.removeAttribute(message, "tsxId"),
                        arg: JSON.stringify(message)
                    });

                    message = p2pMessage;
                }

                switch(message.op){
                    case 205:
                        var rsp = self.newMessage({
                            op: 1001,
                            tsxId: message.tsxId,
                            result: 0
                        });

                        setTimeout(function () {
                            self.onMessage(rsp);
                        }, 50);

                        return;
                    case 102:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                        if(message.endReason === -10){
                            return;
                        }
                    case 1001:
                    case 400:
                        var p2pMessage = self.newMessage({
                            op: 1004,
                            sessId: _util.removeAttribute(message, "sessId"),
                            tsxId: _util.removeAttribute(message, "tsxId"),
                            arg: JSON.stringify(message)
                        });

                        message = p2pMessage;

                        break;

                    case 303:
                    case 206:
                        return;

                    default:
                }
            }

            return message;
        },

        onP2PMessage: function (evt) {
            var self = this;
            var attendee = self.owner;

            if(self.owner.isConfr()){
                _logger.warn("Recv p2p ctrl message. when CONFR. ignore");
                return;
            }

            var message = JSON.parse(evt.arg);
            message.memId = evt.memId;
            message.tsxId = evt.tsxId;
            message.sessId = evt.sessId;

            if(message.op === 400){
                message.streamId = message.rtcId + (self.owner.isCaller() ? "__Callee" : "__Caller");
            }

            if(message.op !== 1001){
                var rsp = self.newMessage({
                    op: 1001,
                    tsxId: evt.tsxId,
                    memId: evt.memId,
                    sessId: evt.sessId,
                    result: 0,
                    msg: "Web sdk success recv"
                });

                if(message.op === 102 || message.op === 105){
                    _util.extend(rsp, {
                        streamId: (message.rtcId + (attendee.isCaller() ? "__Callee" : "__Caller")),
                        sver: 1
                    });
                }

                self.postMessage(rsp);
            }

            (function (message) {
                setTimeout(function () {
                    self.onMessage(message);
                }, 10);
            })(message);
        }
    });

    _util.extend(NewSession.prototype._events, {
        '1004': 'onP2PMessage'
    });

    return NewSession;
}

var addonsAttendee = function (Attendee) {
    var NewAttendee = Attendee.extend({
        __init__ : function () {
            var self = this;
            Attendee.prototype.__init__.call(self);

            self.__cache_ = {};

            var extIceRebuild = self.iceRebuild;
            self.iceRebuild = function (stream) {
                var self = this;

                if(!self.isP2P() || !stream.rtcId){
                    extIceRebuild.call(self, stream);
                    return;
                }

                if(stream._webrtc && (stream._webrtc.answerWebrtc === true)){
                    _logger.warn("Stream not auto iceRebuild. caused by answer webrtc. it = ", stream.id, stream);
                    return;
                }

                if(!stream.located()){ //被叫 rtcId 不自动重建；所有的订阅流不自动重建；
                    _logger.warn("Stream not auto iceRebuild. caused by not located. it = ", stream.id, stream);
                    return;
                }

                // stream.isRepublished = true;
                // self.push(stream, undefined, undefined, true);
                extIceRebuild.call(self, stream);
            };
        },

        onEnter: function(cver, mem){
            var self = this;
            try {
                Attendee.prototype.onEnter.call(self, cver, mem);
            } finally {
                if(!self.isP2P() || !(mem = self._cacheMembers[mem.id])){ //不是p2p 或者 没有 member
                    return;
                }
                _util.forEach(self.__cache_, function (rtcId, cacheMessages) {
                    if(cacheMessages.answered !== true){
                        _util.forEach(cacheMessages, function (index, cacheMessage) {
                            (function (cacheMessage) {
                                cacheMessage.memId = mem.id;
                                self.postMessage(cacheMessage);
                            })(cacheMessage);
                        });
                    }
                });
            }
        },

        rejectAnswer: function (memId, rtcId, endReason, rspFail) {
            var self = this;

            var termC = self.newMessage()
                .setOp(107)
                .setRtcId(rtcId)
                .setMemId(memId)
                .setEndReason(endReason);

            self.postMessage(termC, function (rsp) {
                if(rsp.result != 0){
                    self.onEvent(new __event.RspFail({request: termC, response: rsp}));
                    rspFail && rspFail(new __event.RspFail({request: termC, response: rsp}));

                    return;
                }
            });
        },

        closeWebrtc: function(rtcId, remainLocalStream, serverClosed){
            var self = this;

            var failed = false;

            if(self.isP2P()){
                var _webrtc = self._ices[rtcId];
                if(_webrtc){
                    var state = _webrtc.iceConnectionState();
                    failed = (state === 'failed');
                    failed = failed && (_webrtc._rebuildCount < emedia.config.iceRebuildCount);

                    _logger.warn("Webrtc state failed. it is ", rtcId, _webrtc._rebuildCount, emedia.config.iceRebuildCount, _webrtc.__id);
                }
            }

            //p2p failed认为服务端关闭，不发送 107.
            Attendee.prototype.closeWebrtc.call(self, rtcId, remainLocalStream, serverClosed || failed);

            if(self.isP2P())
            if(!serverClosed && failed){ //p2p failed 需要重连 所以需要将 steam重新添加到_linkedStreams中
                //换句话说 需要重建RTC必须 _linkedStreams中有值
                _util.forEach(self._cacheStreams, function (sid, _stream) {
                    if(_stream.rtcId === rtcId){
                        self._linkedStreams[sid] = _stream;
                        _logger.warn("Reput stream to _linkedStreams", sid);
                    }
                });
            }

            // p2p时 ice close 可以认为 流 已经关闭，移除流
            if(self.isP2P() && (!remainLocalStream)){
                _util.removeAttribute(self.__cache_, rtcId);

                var _tmp = _util.extend({}, self._cacheStreams);

                _util.forEach(_tmp, function (streamId, stream) {
                    if(rtcId === stream.rtcId){
                        _util.removeAttribute(self._linkedStreams, stream.id);
                        var rmStream = _util.removeAttribute(self._cacheStreams, stream.id);
                        _logger.warn("P2P close webrtc. remove stream from _cacheStreams. it = ", stream.id, stream);

                        if(rmStream._localMediaStream){
                            self._service._stopTracks(rmStream._localMediaStream);
                        }

                        if(self.onRemoveStream){
                            var stream = self.newStream(stream);

                            self.onRemoveStream(stream);
                        }
                    }
                });
            }
        },

        subscribeStream: function (rtcId, streamId, rspFail, subArgs){
            var self = this;

            if(!self.isP2P()){
                Attendee.prototype.subscribeStream.call(self, rtcId, streamId, rspFail, subArgs);
                return;
            }

            // throw "P2P not allow call subscribeStream";
            var webrtc = self._ices[rtcId];

            var subStream = self._cacheStreams[streamId];

            //var stream = self.newStream(subStream);
            var stream = subStream;
            stream._webrtc = webrtc;
            stream.rtcId = rtcId;

            var preSubArgs = stream.subArgs;

            subArgs = subArgs || {subSVideo: true, subSAudio: true};
            stream.subArgs = stream.subArgs || {subSVideo: true, subSAudio: true};
            stream._webrtc && (stream._webrtc.subArgs = stream._webrtc.subArgs || {subSVideo: true, subSAudio: true});

            if(!stream.subArgs.subSVideo && subArgs.subSVideo && stream.voff){
                throw "Sub not allow. stream voff"
            }

            if(!stream.subArgs.subSAudio && subArgs.subSAudio && stream.aoff){
                throw "Sub not allow. stream aoff"
            }

            if(stream.subArgs.subSVideo && !subArgs.subSVideo && !stream.voff && emedia.isSafari){
                throw "Sub not allow. safari close sub video. will error"
            }

            subArgs && stream._webrtc && stream._webrtc.setSubArgs(subArgs);
            subArgs && (stream.subArgs = subArgs);

            var evt = new __event.SubSuccess({
                stream: stream,
                hidden: true
            });
            self._updateRemoteStream(stream, stream._webrtc.getRemoteStream());
            self.onEvent(evt);
        },

        unsubscribeStream: function(streamId){
            var self = this;

            if(!self.isP2P()){
                Attendee.prototype.unsubscribeStream.call(self, streamId);
                return;
            }
        },

        onPub: function(cver, memId, pubS){
            var self = this;

            if(!self.isP2P()){
                Attendee.prototype.onPub.call(self, cver, memId, pubS);
                return;
            }

            var stream = Attendee.prototype.onPub.call(self, cver, memId, pubS);

            return stream;
        },

        onStreams: function(cver, streams) {
            var self = this;

            if(!self.isP2P()){
                Attendee.prototype.onStreams.call(self, cver, streams);
                return;
            }

            _logger.warn("P2P ingrone the onStreams");
        },

        _howDoWebrtcWhenCrtExsitsWebrtc: function (webrtc) {
            var self = this;

            if(!self.isP2P()){
                Attendee.prototype._howDoWebrtcWhenCrtExsitsWebrtc.call(self, webrtc);
                return;
            }

            self.closeWebrtc(webrtc.getRtcId(), true, true);
        },

        createWebrtcAndSubscribeStream: function (streamId, callbacks, iceServerConfig, subArgs) {
            var self = this;

            if(!self.isP2P()){
                Attendee.prototype.createWebrtcAndSubscribeStream.call(self, streamId, callbacks, iceServerConfig, subArgs);
                return;
            }


            var self = this;

            callbacks || (callbacks = {});

            var subStream = self._cacheStreams[streamId];
            var subMember = self._cacheMembers[subStream.owner.id];

            //var stream = self.newStream(subStream);
            var stream = subStream;
            subArgs = subArgs || stream.subArgs || {subSVideo: true, subSAudio: true};

            function _onSubFail(evt) {
                _logger.warn("sub stream error", streamId, evt);

                preSubArgs && stream._webrtc && stream._webrtc.setSubArgs(preSubArgs);
                preSubArgs && (stream.subArgs = preSubArgs);

                evt = new __event.SubFail({
                    stream: stream,
                    hidden: evt.hidden === true,
                    cause: evt
                });

                callbacks && callbacks.onEvent && callbacks.onEvent(evt);
                self.onEvent && self.onEvent(evt);
            }

            var pubStreamVCodes = subStream.vcodes;
            var pubMemberSupportVCodes = subMember.vcodes;
            var selfSupportVCodes = self.supportVCodes;

            var optimalVideoCodecs = self._getOptimalVideoCodecsSubset(pubStreamVCodes, pubMemberSupportVCodes, selfSupportVCodes);

            subArgs = subArgs || stream.subArgs;

            var preSubArgs = stream.subArgs;

            var offerOptions = {
                offerToReceiveAudio: (emedia.isSafari ? (subArgs.subSAudio) : true),
                offerToReceiveVideo: (emedia.isSafari ? (subArgs.subSVideo && !stream.voff) : true),
            };

            if(!offerOptions.offerToReceiveAudio && !offerOptions.offerToReceiveVideo){
                _logger.warn("offerToReceiveAudio == false and offerToReceiveVideo == false");
                //console.error("offerToReceiveAudio == false and offerToReceiveVideo == false");
            }

            var webrtc = self.createWebrtc({
                _rtcId: stream.rtcId,

                iceServerConfig: iceServerConfig,
                optimalVideoCodecs: optimalVideoCodecs,
                offerOptions: offerOptions,

                onGotMediaStream: function (remoteMediaStream) {
                    var evt = new __event.SubSuccess({
                        stream: stream,
                        hidden: true
                    });

                    callbacks.onGotRemote && callbacks.onGotRemote(stream);
                    self.onEvent && self.onEvent(evt);
                }
            }, stream.iceRebuildCount);
            var rtcId = webrtc.getRtcId();

            _logger.warn(rtcId, " sub stream ", streamId, optimalVideoCodecs);

            var preWebrtc = stream._webrtc;

            stream._webrtc = webrtc;
            stream.rtcId = rtcId;
            stream.owner = _util.extend({}, subMember);
            self._ices[rtcId] = webrtc;

            webrtc.answerWebrtc = true;


            subArgs && stream._webrtc && stream._webrtc.setSubArgs(subArgs);
            subArgs && (stream.subArgs = subArgs);

            function channelSet(localStream) {
                localStream && webrtc.setLocalStream(localStream);
                webrtc.setRemoteDescription(stream.sdp);
                stream.cands && (stream.cands.length > 0) && webrtc.addIceCandidate(stream.cands);
            }

            if(rtcId === ("rtc-" + self.ticket.confrId)){
                var lastCalleePub = self.__lastCalleePub;

                var calleePub = self._cacheStreams[rtcId + (self.isCaller() ? "__Caller" : "__Callee")];
                var calleePub = new self._service.AVPubstream(calleePub || {
                    constaints: {
                        audio: (!stream.aoff),
                        video: (!stream.voff)
                    }
                });

                preWebrtc && preWebrtc.getLocalStream() && self._service._stopTracks(preWebrtc.getLocalStream());

                self._service.openUserMedia(calleePub).then(function () {
                    var stream = self.newStream(calleePub);

                    stream._localMediaStream = calleePub.localStream;
                    stream._webrtc = webrtc;
                    stream.rtcId = webrtc.getRtcId();
                    stream.id = rtcId + (self.isCaller() ? "__Caller" : "__Callee");
                    stream.owner = {id: self.getMemberId(), nickName: self.nickName, name: self.sysUserId, ext: self.extObj};

                    self.onEvent(new __event.PushSuccess({stream: stream, hidden: true}));

                    channelSet(calleePub.localStream);
                    self.answerCall(rtcId, calleePub, _onSubFail);
                }, _onSubFail);

            }else{
                channelSet();
                self.answer(rtcId, _onSubFail);
            }
        }
    });

    return NewAttendee;
}


var addonsService = function (Service, Session, Attendee) {
    var NewService = Service.extend({
        Session: Session,
        Attendee: Attendee,

        __init__: function () {
            var self = this;
            Service.prototype.__init__.call(self);

            if(self.useRTCCfg === undefined || self.useRTCCfg === false || self.useRTCCfg === null){
                self.useRTCCfg = emedia.config.forceUseRTCCfgIfServerReturnWhenP2P;
            }
        },

        push: function(pubS, pushed, onPushError){
            var self = this;

            if(self.current && self.current.isP2P()){
                if(pubS.type === 2){
                    throw "P2P do not allow audio_mixer";
                }

                if((pubS instanceof self.AVPubstream) && !pubS.rtcId){ // 主叫 如果没有主RTC, 将创建
                    var p2pAV = self.current._cacheStreams["rtc-" + self.current.ticket.confrId + "__Caller"]
                        || self.current._cacheStreams["rtc-" + self.current.ticket.confrId + "__Callee"];

                    if(!p2pAV){
                        pubS.rtcId = "rtc-" + self.current.ticket.confrId;
                    }
                }
            }

            Service.prototype.push.call(self, pubS, pushed, onPushError);
        },

        newSession: function (attendee, ticket){
            var self = this;

            var session = Service.prototype.newSession.call(self, attendee, ticket);
            var preOnTermC = session.onTermC;
            var preOnAnsC = session.onAnsC;

            return _util.extend(session, {
                onInitC: function (message) {
                    if(!attendee.isP2P()){
                        return;
                    }

                    if(message.rtcId === ("rtc-" + attendee.ticket.confrId)){ //收到主呼叫
                        var streamId = message.rtcId + (attendee.isCaller() ? "__Callee" : "__Caller");
                        var _stream = attendee._cacheStreams[streamId];
                        if(_stream && _stream.owner && (_stream.owner.id !== message.memId)){
                            attendee.rejectAnswer(message.memId, message.rtcId, 10);
                            attendee.postMessage(attendee.newMessage({
                                op: 1001,
                                memId: message.memId,
                                tsxId: message.tsxId,
                                result: -554,
                                msg: "Other device call it. you no."
                            }));

                            return;
                        }
                    }

                    //认为 只有一个音视频流，多个桌面共享的流  音视频流双向的。
                    message.pubS.sdp = message.sdp;
                    message.pubS.cands = message.cands;
                    message.pubS.id = message.rtcId + (attendee.isCaller() ? "__Callee" : "__Caller");
                    message.pubS._located = false;
                    message.pubS.memId = message.memId;
                    message.pubS.rtcId = message.rtcId;
                    message.pubS.sver = 0;

                    var _stream = attendee._cacheStreams[message.pubS.id];
                    if(_stream){
                        message.pubS.sver = _stream.sver + 1;
                        _util.removeAttribute(attendee._maybeNotExistStreams, message.pubS.id);
                    }
                    attendee.onPub.call(attendee, ++attendee._cver, message.memId, message.pubS);
                },

                onTermC: function(evt){
                    if(!attendee.isP2P()){
                        preOnTermC.call(attendee, evt);
                        return;
                    }

                    if(evt.endReason === -20){
                        var callerPub = attendee._cacheStreams[(evt.rtcId+ "__Caller")];

                        _logger.warn("Begin re-publish. 20", callerPub);
                        callerPub && self._republish(callerPub);

                        return;
                    }

                    // memId 不相等说明 来自 p2p的对方
                    // 意思是 evt.memId 关闭了一个 rtcId
                    if(evt.memId && evt.memId !== attendee.getMemberId()){
                        // 由于流集合中，所有的发布流均有个特点，caller __Caller结尾，callee __Callee结尾
                        // 关闭流时，先关闭订阅流，在关闭发布流
                        // 所以做了下排序
                        var sortedStreams = [];
                        _util.forEach(attendee._cacheStreams, function (streamId, stream) {
                            sortedStreams.push(stream);
                        });
                        sortedStreams = sortedStreams.sort(function(a, b){
                            var result = -1;
                            if(a.id > b.id){
                                result = 1;
                            }

                            return attendee.isCallee() ? (0 - result) : result;
                        });

                        _util.forEach(sortedStreams, function (_index, stream) {
                            // evt.memId 关闭的 evt.rtcId 所关联的流 要关闭
                            if(stream && stream.owner && stream.owner.id === evt.memId && evt.rtcId === stream.rtcId){
                                (evt.endReason !== -10) && preOnTermC.call(attendee, evt);

                                if(evt.rtcId === ("rtc-" + attendee.ticket.confrId)){
                                    attendee.onUnpub(++attendee._cver, evt.memId, stream.id);
                                }

                                if(evt.endReason === 10){
                                    attendee.onEvent(new __event.OtherDeviceAnswer({rtcId: evt.rtcId, stream: stream}));
                                }
                            }

                            if(stream && stream.owner && stream.owner.id === attendee.getMemberId() && evt.rtcId === stream.rtcId){
                                attendee.closeWebrtc(evt.rtcId);
                                attendee.onUnpub(++attendee._cver, stream.owner.id, stream.id);
                            }
                        });
                        return;
                    }

                    (evt.endReason !== -10) && preOnTermC.call(attendee, evt);

                    if(evt.endReason === 10){
                        attendee.onEvent(new __event.OtherDeviceAnswer({rtcId: evt.rtcId}));
                    }
                },

                onAnsC: function(evt){
                    if(!attendee.isP2P()){
                        preOnAnsC.call(attendee, evt);
                        return;
                    }

                    if(!attendee.__cache_[evt.rtcId]){
                        _logger.warn("Webrtc ", evt.rtcId, "not created. drop the answer");

                        return;
                    }

                    if(attendee.__cache_[evt.rtcId].answered === true){
                        _logger.warn("Webrtc ", evt.rtcId, "had been ansC");

                        attendee.rejectAnswer(evt.memId, evt.rtcId, 10);
                        attendee.postMessage(attendee.newMessage({
                            op: 1001,
                            memId: evt.memId,
                            tsxId: evt.tsxId,
                            result: -554,
                            msg: "Other device sub it. you no."
                        }));

                        return;
                    }

                    try{
                        if(evt.pubS){
                            var stream = attendee.newStream(evt.pubS);

                            stream._webrtc = attendee._ices[evt.rtcId];
                            stream.rtcId = evt.rtcId;
                            stream.id = evt.rtcId + (attendee.isCaller() ? "__Callee" : "__Caller");
                            stream.owner = attendee._cacheMembers[evt.memId];

                            if(!attendee._cacheStreams[stream.id]){
                                attendee.onPub.call(attendee, ++attendee._cver, evt.memId, stream);
                            }else{
                                attendee._cacheStreams[stream.id] = stream;
                            }

                            attendee.onEvent(new __event.SubSuccess({stream: stream, hidden: true}));
                        }

                        var ansCMember = attendee._cacheMembers[evt.memId];

                        preOnAnsC.call(attendee, evt);

                        _util.forEach(attendee._cacheMembers, function (_memberId, _member) {
                            if(_memberId !== evt.memId && ansCMember.memName === _member.memName){
                                attendee.rejectAnswer(_memberId, evt.rtcId, 10);
                            }
                        });
                    } finally {
                        attendee.__cache_[evt.rtcId].answered = true;
                    }
                }
            });
        }
    });

    return NewService;
}


module.exports = function (Service) {
    var _Session = Service.prototype.Session || require('./Session');
    var Session = addonsSession(_Session.extend({}));

    var _Attendee = Service.prototype.Attendee || require('./Attendee');
    var Attendee = addonsAttendee(_Attendee.extend({}));

    return addonsService(Service, Session, Attendee);
};