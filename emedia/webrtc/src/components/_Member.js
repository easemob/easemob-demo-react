
var _util = require('./Util');
var _logger = _util.tagLogger("Member");

var __event = require('./event');

var WebRTC = require('./_Webrtc');

/**
 * 未体现 Member 使用了 session。
 * 请 这样创建
 * Member({_session: sess, _memberId: memberId})
 * this._session
 *
 * {
 *  _memberId:
 *  _ices[Map]:
 * }
 *
 *
 *
 */
module.exports = _util.prototypeExtend({
    __init__: function(){
        var self = this;

        if(!self._session) throw "Require session";

        self.closed = false;
        self._ices = {};

        self.supportVCodes = {};

        self.audioMixers = {};
    },

    reflushSupportVCodes: function (vcodes) {
        var self = this;

        self.supportVCodes = {};

        self._orderVCodes = vcodes;

        if(!vcodes || vcodes.length == 0){
            _logger.warn("Not config support vcodes");
            return;
        }
        
        _util.forEach(vcodes, function (index, vcode) {
            self.supportVCodes[vcode] = 1;
        });
    },

    getOptimalVideoCodecs: function () {
        var self = this;

        if(!self._orderVCodes || self._orderVCodes.length == 0){
            return (/Chrome/.test(navigator.userAgent)) ? 'VP8'
                : (/Safari/.test(navigator.userAgent)) ? 'H264' : 'VP8';
        }

        var memberCount = 0;
        _util.forEach(self._cacheMembers, function () {
            memberCount ++;
        });


        var maxSupportCount = 0;
        var optimalVCode;

        for(var i = 0; i < self._orderVCodes.length; i++){
            var vcode = self._orderVCodes[i];

            if(maxSupportCount == 0){
                maxSupportCount = self.supportVCodes[vcode];
            }

            if(self.supportVCodes[vcode] > memberCount){
                return vcode;
            }

            if(self.supportVCodes[vcode] > maxSupportCount){
                maxSupportCount = self.supportVCodes[vcode];
                optimalVCode = vcode;
            }
        }

        return optimalVCode;
    },

    setMemberId: function (memberId) {
        this._memberId = memberId;
    },

    getMemberId: function () {
        return this._memberId || this.id;
    },

    /**
     * createWebrtc({
     *  _rtcId:
     *  iceServerConfig:
     *  onGotMediaStream:
      * onEvent:
     * })
     *
     * @param iceServerConfig
     */
    createWebrtc: function(webrtcCfg, rebuildCount){
        var self = this;

        webrtcCfg || (webrtcCfg = {});

        _util.extend(webrtcCfg, {_rebuildCount: (rebuildCount || 0)});

        if(self._service.useRTCCfg === true && self.__rtc_cfg){ //优先使用 __rtc_cfg
            webrtcCfg.iceServerConfig = _util.extend(true, {}, self.__rtc_cfg);
        }else if(_util.isPlainObject(self._service.useRTCCfg)){
            webrtcCfg.iceServerConfig = _util.extend(true, {}, self._service.useRTCCfg);
        }

        var webrtc = new WebRTC({
            //iceServerConfig: iceServerConfig,

            onIceStateChange: function(iceState){
                var state = iceState;

                _logger.debug("evt.target ice state", state);

                if(state == 'failed'){
                    self.onEvent(new __event.ICEConnectFail({webrtc: webrtc}));
                    webrtc.onEvent && webrtc.onEvent(new __event.ICEConnectFail({webrtc: webrtc}));

                    return;
                }
                if(state == 'connected'){
                    self.onEvent(new __event.ICEConnected({webrtc: webrtc}));
                    webrtc.onEvent = null;

                    return;
                }
                if(state == 'closed'){
                    self.onEvent(new __event.ICEClosed({webrtc: webrtc}));
                    webrtc.onEvent && webrtc.onEvent(new __event.ICEClosed({webrtc: webrtc}));

                    return;
                }
                if(state == 'disconnected'){
                    self.onEvent(new __event.ICEDisconnected({webrtc: webrtc}));
                    webrtc.onEvent && webrtc.onEvent(new __event.ICEDisconnected({webrtc: webrtc}));

                    return;
                }

                self._onIceStateChange && self._onIceStateChange(webrtc, iceState);
            },

            onIceCandidate: function (candidate) { //event.candidate
                self._onIceCandidate && candidate && self._onIceCandidate(webrtc, candidate);
            },

            onGotRemoteStream: function (remoteStream) {
                _logger.info("got stream.", webrtc, remoteStream);

                webrtc.onGotMediaStream && webrtc.onGotMediaStream(remoteStream);

                self.onEvent(new __event.ICERemoteMediaStream({webrtc: webrtc}));
            },
            onAddIceCandidateError: function (err) {
                self.onEvent(new __event.AddIceCandError({webrtc: webrtc, event: err}))
            },
            onSetSessionDescriptionError: function (error) {
                _logger.warn('onSetSessionDescriptionError : Failed to set session description: ' + error.toString());
                self.onEvent && self.onEvent(new __event.ICEConnectFail({webrtc: webrtc, event: error}));
            },
            onCreateSessionDescriptionError: function (error) {
                _logger.warn('Failed to create session description: ' + error.toString());
                self.onEvent && self.onEvent(new __event.ICEConnectFail({webrtc: webrtc, event: error}));
            },
            // onSetLocalSessionDescriptionSuccess: function (error) {
            //     _logger.debug('onSetLocalSessionDescriptionSuccess : setLocalDescription complete: ' + error.toString());
            //     self.onEvent && self.onEvent(new __event.ICEConnectFail({webrtc: webrtc, event: error}));
            // },
        }, webrtcCfg);

        (self._ices || (self._ices = {}));
        if(self._ices[webrtc.getRtcId()]){
            self._howDoWebrtcWhenCrtExsitsWebrtc(webrtc);
        }
        self._ices[webrtc.getRtcId()] = webrtc;
        self._ices[webrtc.__id] = webrtc;

        self._iceCreateRtcPeerConnection(webrtc.getRtcId());
        _logger.debug("create rtc ", webrtc);

        return webrtc;
    },

    _howDoWebrtcWhenCrtExsitsWebrtc: function (webrtc) {
        var self = this;

        //throw "Webrtc id exsits at ices. it is " + webrtc.getRtcId();
        self.closeWebrtc(webrtc.getRtcId(), true, false);
    },

    connect: function (suceess, fail) {
        var self = this;

        self._session.connect(suceess, fail);
    },

    connected: function () {
        var self = this;

        return self._session.connected();
    },

    newMessage: function message (cfg) {
        var self = this;

        var message = self._session.newMessage(cfg);
        message.post = function (callback, timeoutMillis) {
            self.postMessage(this, callback, timeoutMillis)
        };

        return message;
    },

    message: function (cfg) {
        var self = this;

        var message = self._session.newMessage(cfg);
        message.post = function (callback, timeoutMillis) {
            self.postMessage(this, callback, timeoutMillis)
        };

        return message;
    },

    postMessage: function(message, callback, timeoutMillis){
        var self = this;

        try {
            message.sessId || (message.sessId = self._session._sessionId);
            self._session.postMessage(message, callback, timeoutMillis);
        } catch (e){
            callback && callback({op: 1001, tsxId: message.tsxId, result: -9527, msg: "post message. exception"});
            _logger.warn(e);
        }
    },

    onEvent: function (error) {

    },

    _onIceStateChange: function(webrtc, rtcState){
        var self = this;

        _logger.info(webrtc.getRtcId(), rtcState);
        self.onEvent(new __event.ICEChanage({webrtc: webrtc, state: rtcState}));
    },

    _onIceCandidate: function (webrtc, cand) { //event.candidate
        var self = this;

        var cands;
        if(_util.isArray(cand)){
            cands = cand;
        }else{
            cands = [];
            cands.push(cand);
        }

        var tcklC = self.newMessage()
            .setOp(105)
            .setRtcId(webrtc.getRtcId())
            .setCands(cands);

        self.postMessage(tcklC, function (rsp) {
            if(rsp.result != 0){
                self.onEvent(new __event.RspFail({request: tcklC, response: rsp}));

                return;
            }
        });
    },

    _initC: function (webrtc, stream, sdp, subSId, rspFail, rspSuccess) {
        var self = this;

        if(stream && stream.rtcId !== webrtc.getRtcId()){
            throw "stream and webrtc rtcId not equal.";
        }

        var initC = self.newMessage()
            .setOp(102)
            .setRtcId(webrtc.getRtcId())
            .setSdp(sdp)
            .setSubSId(subSId);

        webrtc.subArgs && _util.extend(initC, webrtc.subArgs);

        if(stream && stream.located()){
            initC.setPubS(stream);
        }

        self.postMessage(initC, function (rsp) {
            if(rsp.result != 0){
                self.onEvent(new __event.RspFail({request: initC, response: rsp}));
                rspFail && rspFail(new __event.RspFail({request: initC, response: rsp, hidden: rsp.retrying === true}));

                return;
            }

            if(stream && !stream.id && rsp.streamId){
                stream.id = rsp.streamId;
            }

            try{
                rspSuccess && rspSuccess();
            }catch(e){
                _logger.warn(e);
            }

            rsp.sdp && self.ansC(webrtc.getRtcId(), rsp.sdp, rsp.cands)

            rsp.mems && self.onMembers && self.onMembers(rsp.cver, rsp.mems);
            rsp.streams && self.onStreams && self.onStreams(rsp.cver, rsp.streams);
        });
    },

    _acptC: function (webrtc, sdp, rspFail) {
        var self = this;

        var acptC = self.newMessage()
            .setOp(104)
            .setRtcId(webrtc.getRtcId())
            .setSdp(sdp);

        self.postMessage(acptC, function (rsp) {
            if(rsp.result != 0){
                self.onEvent(new __event.RspFail({request: acptC, response: rsp}));
                rspFail && rspFail(new __event.RspFail({request: acptC, response: rsp}));

                return;
            }
        });
    },

    _ansCAndPubstream: function(webrtc, stream, sdp, rspFail, rspSuccess){
        var self = this;

        var ansC = self.newMessage()
            .setOp(106)
            .setRtcId(webrtc.getRtcId())
            .setSdp(sdp);

        webrtc.subArgs && _util.extend(ansC, webrtc.subArgs);

        if(stream && stream.located()){
            stream = _util.extend({}, stream);
            _util.removeAttribute(stream, "mutedMuted");
            _util.removeAttribute(stream, "_located");

            ansC.setPubS(stream);
        }

        self.postMessage(ansC, function (rsp) {
            if(rsp.result != 0){
                self.onEvent(new __event.RspFail({request: ansC, response: rsp}));
                rspFail && rspFail(new __event.RspFail({request: ansC, response: rsp, hidden: rsp.retrying === true}));

                return;
            }

            if(stream && !stream.id && rsp.streamId){
                stream.id = rsp.streamId;
            }

            try{
                rspSuccess && rspSuccess();
            }catch(e){
                _logger.warn(e);
            }
        });
    },

    _ansC: function (webrtc, sdp, rspFail) {
        var self = this;

        var ansC = self.newMessage()
            .setOp(106)
            .setRtcId(webrtc.getRtcId())
            .setSdp(sdp);

        self.postMessage(ansC, function (rsp) {
            if(rsp.result != 0){
                self.onEvent(new __event.RspFail({request: ansC, response: rsp}));
                rspFail && rspFail(new __event.RspFail({request: ansC, response: rsp}));

                return;
            }
        });
    },

    _termC: function (webrtc, endReason, rspFail) {
        var self = this;

        var rtcId = (typeof webrtc === "string") ? webrtc : webrtc.getRtcId();
        var termC = self.newMessage()
            .setOp(107)
            .setRtcId(rtcId)
            .setEndReason(endReason);

        self.postMessage(termC, function (rsp) {
            if(rsp.result != 0){
                self.onEvent(new __event.RspFail({request: termC, response: rsp}));
                rspFail && rspFail(new __event.RspFail({request: termC, response: rsp}));

                return;
            }
        });
    },

    _iceCreateRtcPeerConnection: function(rtcId){
        var self = this;

        self._ices[rtcId].createRtcPeerConnection();

        _logger.debug("create rtc peer connection", rtcId);
    },

    doOffer: function(rtcId, onGotOffer, onCreateOfferError){
        var self = this;

        var webrtc = self._ices[rtcId];

        webrtc.createOffer(function(sdp){
            onGotOffer(sdp);
        });
    },

    offerCall: function(rtcId, stream, subSId, rspFail, rspSuccess){
        var self = this;

        var webrtc = self._ices[rtcId];

        webrtc.createOffer(function(sdp){
            self._initC && self._initC(webrtc, stream, sdp, subSId, rspFail, rspSuccess);
        });
    },

    accept: function(rtcId, rspFail){
        var self = this;

        var webrtc = self._ices[rtcId];
        webrtc.createPRAnswer(function(sdp){
            self._acptC && self._acptC(webrtc, sdp, rspFail);
        });
    },

    answerCall: function(rtcId, stream, rspFail, rspSuccess){
        var self = this;

        var webrtc = self._ices[rtcId];

        webrtc.createAnswer(function(sdp){
            self._ansCAndPubstream && self._ansCAndPubstream(webrtc, stream, sdp, rspFail, rspSuccess);
        });
    },

    answer: function(rtcId, rspFail){
        var self = this;

        var webrtc = self._ices[rtcId];
        webrtc.createAnswer(function(sdp){
            self._ansC && self._ansC(webrtc, sdp, rspFail);
        });
    },

    onTcklC: function(rtcId, cands){
        var self = this;
        self._addIceCandidate(cands, rtcId)
    },

    onAcptC: function(rtcId, sdp, cands){
        var self = this;
        self._iceSetRemoteSDP(sdp, rtcId)
        cands && self._addIceCandidate(cands, rtcId)
    },

    onAnsC: function(rtcId, sdp, cands){
        var self = this;
        self._iceSetRemoteSDP(sdp, rtcId)
        cands && self._addIceCandidate(cands, rtcId)
    },

    _addIceCandidate: function(cands, rtcId){
        var self = this;

        if(!cands || cands.length == 0){
            _logger.warn("drop cands", cands);
            return;
        }

        var webrtc = self._ices[rtcId];
        webrtc && webrtc.addIceCandidate(cands);
    },

    closeWebrtc: function(rtcId, remainLocalStream, serverClosed){
        var self = this;
        var webrtc = self._ices[rtcId];

        _util.forEach(self._cacheStreams, function (sid, _stream) {
            if(_stream.rtcId === rtcId && !_stream.located()){
                try{
                    var soundMeter = _util.removeAttribute(self._mediaMeters, sid);
                    soundMeter && soundMeter._finally();
                }catch(e){
                    _logger.warn(e);
                }
            }

            if(_stream.rtcId === rtcId && _stream.type === 2){
                _util.removeAttribute(self.audioMixers, _stream.id);
            }
        });

        if(!webrtc || webrtc.closed){
            _logger.warn("Webrtc not exsits or closed", webrtc && webrtc.closed);

            if(serverClosed){
                webrtc && _util.forEach(self._cacheStreams, function (sid, _stream) {
                    if(_stream.rtcId === rtcId){
                        delete self._linkedStreams[sid];
                        _logger.warn("Webrtc close, remvoe from _linkedStreams", sid);
                    }
                });
            }

            serverClosed || (self._termC(rtcId, 0));

            return;
        }

        if(self._records){
            function _stopRecord(_stream) {
                try{
                    self.stopRecord(_stream);
                } catch (e){
                    _logger.warn(e);
                } finally {
                    _util.removeAttribute(self._records, _stream.id);
                }
            }

            _util.forEach(self._records, function (sid, _stream) {
                _stream.rtcId === rtcId && _stopRecord(_stream);
            });
        }

        try{
            serverClosed || (webrtc && self._termC(webrtc, remainLocalStream && webrtc._localStream ? -10 : 0));
        } finally {
            //webrtc && _util.removeAttribute(self._ices, rtcId);

            webrtc && webrtc.close();
            webrtc && self.onWebrtcTermC && self.onWebrtcTermC(webrtc);

            if(remainLocalStream){
            }else{
                webrtc && _util.forEach(self._cacheStreams, function (sid, _stream) {
                    if(_stream.rtcId === rtcId){
                        if(_stream.located()){
                            emedia.stopTracks(_stream._localMediaStream);

                            self._cacheStreams[sid] && self._linkedStreams[sid] && self.onRemoveStream(_stream);

                            delete self._cacheStreams[sid];
                            _logger.info("Webrtc close. Remove stream", sid, ". from cache");
                        }

                        if(serverClosed){
                            delete self._linkedStreams[sid];
                            _logger.info("Webrtc close. Remove stream", sid, ". from _linkedStreams");
                        }
                    }
                });
            }
        }

        return webrtc;
    },

    __close: function (reason) {
        _logger.warn("closing, reason = ", reason);

        var self = this;
        if(self.closed){
            return;
        }

        self.closed = true;

        if(self.__getCopyInterval){
            clearInterval(self.__getCopyInterval);
            _logger.warn("Stop interval get copy");
        }


        if(self._ices) {
            for(var _rtcId in self._ices){
                self.closeWebrtc(_rtcId);
            }
        }

        var exit = self.newMessage()
            .setOp(201)
            .setReason(reason || 0);
        self.postMessage(exit);
    },


    exit: function (closeMyConfrIfICrtConfr) {
        var self = this;

        if(!closeMyConfrIfICrtConfr){
            self.close(0); // 正常挂断
            return;
        }

        if(closeMyConfrIfICrtConfr){
            self._closeMyConfr(11);
            //return;
        }
        setTimeout(function () {
            self.close(0); // 正常挂断
        }, 100);
    },

    _closeMyConfr: function (reason) {
        var self = this;

        var closeConfr = self.newMessage()
            .setOp(204)
            .setReason(reason || 0);
        self.postMessage(closeConfr,  function (rsp) {
            _logger.warn("Close confr ", rsp.result, rsp.msg);
        });
    },

    /**
     * 1.服务端 踢掉
     * 2.手动点击 挂断
     * 3.enter失败！
     *
     * @param reason
     */
    close: function (reason, failed) {
        var self = this;
        if(self.closed){
            return;
        }

        try{
            _util.forEach(self._cacheStreams || {}, function (sid, _stream) {
                if(_stream.located() && _stream._localMediaStream){
                    emedia.stopTracks(_stream._localMediaStream);
                }
            });

            self.__close(reason);

            _util.forEach(self._cacheStreams, function (sid, _stream) {
                self.onRemoveStream(_stream);
            });
            _util.forEach(self._cacheMembers, function (_id, _member) {
                self.onRemoveMember(_member);
            });
        } finally {
            setTimeout(function () {
                self._session && self._session.close(reason);
            }, 500);

            self.onEvent(new __event.Hangup({reason: reason, failed: failed, self: {id: self._memberId}}));
            self.onMeExit && self.onMeExit(reason, failed);

            self._onFinally && self._onFinally();
        }
    },

    webrtcState: function(rtcId){
        var self = this;

        var webrtc = self._ices[rtcId];
        return webrtc.iceConnectionState();
    },

    _iceSetRemoteSDP: function (sdp, rtcId) {
        var self = this;

        var webrtc = self._ices[rtcId];
        webrtc.setRemoteDescription(sdp);
    },

    setLocalStream: function(stream, rtcId){
        var self = this;

        var webrtc = self._ices[rtcId];
        webrtc.setLocalStream(stream);
    },

    onWebrtcTermC: function (_webrtc) {

    }
});