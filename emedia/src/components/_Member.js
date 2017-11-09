
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
    },

    setMemberId: function (memberId) {
        this._memberId = memberId;
    },

    getMemberId: function () {
        return this._memberId;
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
    createWebrtc: function(webrtcCfg){
        var self = this;

        var webrtc = new WebRTC({
            //iceServerConfig: iceServerConfig,

            onIceStateChange: function(event){
                var state = event.target.iceConnectionState;

                _logger.debug("evt.target ice state", state);

                if(state == 'failed'){
                    self.onEvent(new __event.ICEConnectFail({webrtc: webrtc, event: event}));
                    webrtc.onEvent && webrtc.onEvent(new __event.ICEConnectFail({webrtc: webrtc, event: event}));

                    return;
                }
                if(state == 'connected'){
                    self.onEvent(new __event.ICEConnected({webrtc: webrtc, event: event}));
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

                self._onIceStateChange && self._onIceStateChange(webrtc, event);
            },

            onIceCandidate: function (event) { //event.candidate
                self._onIceCandidate && self._onIceCandidate(webrtc, event);
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
                _logger.error('onSetSessionDescriptionError : Failed to set session description: ' + error.toString());
                webrtc.onEvent && webrtc.onEvent(new __event.ICEConnectFail({webrtc: webrtc, event: error}));
            },
            onCreateSessionDescriptionError: function (error) {
                _logger.error('Failed to create session description: ' + error.toString());
                webrtc.onEvent && webrtc.onEvent(new __event.ICEConnectFail({webrtc: webrtc, event: error}));
            },
        }, webrtcCfg || {});

        (self._ices || (self._ices = {}));
        if(self._ices[webrtc.getRtcId()]){
            throw "Webrtc id exsits at ices. it is " + webrtc.getRtcId();
        }
        self._ices[webrtc.getRtcId()] = webrtc;

        self._iceCreateRtcPeerConnection(webrtc.getRtcId());
        _logger.debug("create rtc ", webrtc);

        return webrtc;
    },

    connect: function (suceess, fail) {
        var self = this;

        self._session.connect(suceess, fail);
    },

    connected: function () {
        var self = this;

        return self._session.connected();
    },

    newMessage: function (cfg) {
        var self = this;
        return self._session.newMessage(cfg || {});
    },

    postMessage: function(message, callback){
        var self = this;

        try {
            message.sessId || message.setSessId(self._session._sessionId);
            self._session.postMessage(message, callback);
        } catch (e){
            callback && callback({op: 1001, tsxId: message.tsxId, result: -9527, msg: "post message. exception"});
            _logger.error(e);
        }
    },

    onEvent: function (error) {

    },

    _onIceStateChange: function(webrtc, webrtcEvent){
        var self = this;

        _logger.info(webrtc.getRtcId(), webrtcEvent);
        self.onEvent(new __event.ICEChanage({webrtc: webrtc, event: webrtcEvent, state: webrtcEvent.target.iceConnectionState}));
    },

    _onIceCandidate: function (webrtc, webrtcEvent) { //event.candidate
        var self = this;

        var cands = [];
        cands.push(webrtcEvent.candidate);

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

    _initC: function (webrtc, stream, sdp, subSId, rspFail) {
        var self = this;

        if(stream && stream.rtcId !== webrtc.getRtcId()){
            throw "stream and webrtc rtcId not equal.";
        }

        var initC = self.newMessage()
            .setOp(102)
            .setRtcId(webrtc.getRtcId())
            .setSdp(sdp)
            .setSubSId(subSId);
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

        var termC = self.newMessage()
            .setOp(107)
            .setRtcId(webrtc.getRtcId())
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

        webrtc && webrtc.createOffer(function(sdp){
            onGotOffer(sdp);
        });
    },

    offerCall: function(rtcId, stream, subSId, rspFail){
        var self = this;

        var webrtc = self._ices[rtcId];

        webrtc && webrtc.createOffer(function(sdp){
            self._initC && self._initC(webrtc, stream, sdp, subSId, rspFail);
        });
    },

    accept: function(rtcId, rspFail){
        var self = this;

        var webrtc = self._ices[rtcId];
        webrtc && webrtc.createPRAnswer(function(sdp){
            self._acptC && self._acptC(webrtc, sdp, rspFail);
        });
    },

    answer: function(rtcId, rspFail){
        var self = this;

        var webrtc = self._ices[rtcId];
        webrtc && webrtc.createAnswer(function(sdp){
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

        if(!webrtc || webrtc.closed){
            _logger.warn("Webrtc not exsits or closed", webrtc && webrtc.closed);

            if(serverClosed){
                webrtc && _util.forEach(self._cacheStreams, function (sid, _stream) {
                    if(_stream.rtcId === rtcId){
                        delete self._linkedStreams[sid];
                    }
                });
            }

            return;
        }



        if(self._records){
            function _stopRecord(_stream) {
                try{
                    self.stopRecord(_stream);
                } catch (e){
                    _logger.error(e);
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
                            // _stream.type !== 1 && _stream._localMediaStream && _stream._localMediaStream.getTracks().forEach(function (track) {
                            //     track.stop();
                            // });
                            _stream._localMediaStream && _stream._localMediaStream.getTracks().forEach(function (track) {
                                track.stop();
                            });

                            self._cacheStreams[sid] && self._linkedStreams[sid] && self.onRemoveStream(_stream);

                            delete self._cacheStreams[sid];
                            _logger.info("Remove stream", sid, ". from cache");
                        }

                        if(serverClosed){
                            delete self._linkedStreams[sid];
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

        if(closeMyConfrIfICrtConfr){
            self._closeMyConfr(11);
            return;
        }

        self.close(0); // 正常挂断
    },

    _closeMyConfr: function (reason) {
        var self = this;

        var closeConfr = self.newMessage()
            .setOp(204)
            .setReason(reason || 0);
        self.postMessage(closeConfr);
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
                    _stream._localMediaStream.getTracks().forEach(function (track) {
                        track.stop();
                    });
                }
            });

            self.__close(reason);
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
        return webrtc && webrtc.iceConnectionState();
    },

    _iceSetRemoteSDP: function (sdp, rtcId) {
        var self = this;

        var webrtc = self._ices[rtcId];
        webrtc && webrtc.setRemoteDescription(sdp);
    },

    setLocalStream: function(stream, rtcId){
        var self = this;

        var webrtc = self._ices[rtcId];
        webrtc && webrtc.setLocalStream(stream);
    },

    onWebrtcTermC: function (_webrtc) {

    }
});