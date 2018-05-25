
var _util = require('./Util');
var _logger = _util.tagLogger("Handler");

var __event = require('./event');


/**
 * Error({
 *   code:
 *   targetObj:
 *   evtObj:
 * })
 *
 *
 *
 *
 */
var Handler = _util.prototypeExtend({
    onEvent: function(evt){
        var self = this;

        evt && _logger.info("[EVT]", evt.message(), evt.hidden || "");

        if(evt instanceof __event.ServerRefuseEnter){
            evt.failed && evt.failed === -95270 && (evt.failed = -9527);
        }

        function afterNotify() {
            try{
                self.handleEvent(evt);
            }catch(e){
                _logger.warn(e);
            }
        }

        if(evt instanceof emedia.event.StreamState && evt.stream && evt.stream.located()){
            afterNotify();
            return;
        }

        try{
            evt.hidden || (self.onNotifyEvent && self.onNotifyEvent(evt));
        } finally {
            afterNotify();
        }
    },

    handleEvent: function (evt) {
        var self = this;

        if(evt instanceof __event.RecvResponse){
            self._onRecvResponse(evt);
        } else if(evt instanceof __event.ServerRefuseEnter){
            _logger.warn("Server refuse, ", evt.failed, evt.msg);
            self.onServerRefuseEnter(evt);
        } else if(evt instanceof __event.EnterFail){
            _logger.warn("Enter fail, result = ", evt.failed);
            self.onEnterFail();
        } else if(evt instanceof __event.WSClose){
            //_logger.warn("Websocket closed");
            self.onWSClose();
        } else if(evt instanceof __event.WSConnected){
            _logger.warn("Websocket connected");
        } else if(evt instanceof __event.ICEConnected){
            var webrtc = evt.webrtc;
            self.onICEConnected(webrtc);
        } else if(evt instanceof __event.ICEConnectFail){
            var webrtc = evt.webrtc;
            self.onICEConnectFail(webrtc);
        } else if(evt instanceof __event.ICEDisconnected){ //只要ICE断开
            var webrtc = evt.webrtc;
            self.onICEDisconnected(webrtc);
        }  else if(evt instanceof __event.ICEClosed){ //只要ICE断开
            var webrtc = evt.webrtc;
            self.onICEClosed(webrtc);
        } else if(evt instanceof __event.ICERemoteMediaStream) {
            self.onICERemoteMediaStream(evt.webrtc);
        } else if(evt instanceof __event.PushSuccess){
            self._cacheStreams[evt.stream.id] = self._linkedStreams[evt.stream.id] = evt.stream;

            var _stream = self.newStream(evt.stream);

            if(evt.hidden && !self._maybeNotExistStreams[evt.stream.id] && !_stream.isRepublished){
                self.onAddStream(_stream);
                return;
            }

            if(self.isSafari()){
                emedia._isSafariYetPushedStream = true;
            }

            try{
                //_stream && (_stream.mediaStream = _stream.getMediaStream());
                _stream && self.onUpdateStream(_stream,
                    new _stream.Update({voff: _stream.voff, aoff: _stream.aoff, mediaStream: _stream.getMediaStream()}));

                // _util.forEach(self._cacheStreams, function (_pubSId, _stream) {
                //     if(_stream.type === 2){
                //         self.onStreamControl(undefined, _pubSId, _stream.voff, _stream._1_aoff);
                //     }
                // });
            } finally {
                if(self.isSafari()){
                    _util.forEach(self._cacheStreams, function (_sid, _stream) {
                        if(_stream._autoSubWhenPushStream === true){
                            _util.removeAttribute(_stream, "_autoSubWhenPushStream");
                            self.createWebrtcAndSubscribeStream(_stream.id);
                        }
                    });
                }
            }
        } else if(evt instanceof __event.SubSuccess){
            self._linkedStreams[evt.stream.id] = evt.stream;
            evt.stream._zoom = 1;
        } else if(evt instanceof __event.PushFail){
            if(evt.hidden !== true){
                var _removeStream = _util.removeAttribute(self._linkedStreams, evt.stream.id);
                _logger.warn("PushFail remove from _linkedStreams", evt.stream.id, _removeStream);

                if(_removeStream){
                    var _stream = self.newStream(evt.stream);
                    self.onRemoveStream(_stream);
                }
            }
        } else if(evt instanceof __event.SubFail){
            if(evt.hidden !== true){
                delete self._linkedStreams[evt.stream.id];
                _logger.warn("SubFail remove from _linkedStreams", evt.stream.id);

                var _stream = self.newStream(evt.stream);
                _stream.rtcId = undefined;
                _stream._webrtc = undefined;
                _stream.mediaStream = undefined;

                self.onUpdateStream(_stream, new _stream.Update(_stream));
            }
        } else if(evt instanceof __event.SubFailNotSupportVCodes){
            // Server发现 此订阅时 不支持视频视频编码。或者 推送流 打开视频时，并不是所有的订阅端 都支持此视频编码
            // Server保持这个channel，客户端自行处理

            var stream = evt.stream;

            _logger.warn("Rtc donot support pub VCodes. close. sub fail.", stream.rtcId, " -> ", stream.id);
            try{
                self.onNotSupportPublishVideoCodecs && self.onNotSupportPublishVideoCodecs(stream);
            }catch (e){
                _logger.warn(e);
            }

            // var streamId = stream.id;
            //
            // var webrtc = self._getWebrtc(streamId);
            // if(webrtc && webrtc.isConnected()){
            //     self.subscribeStream(webrtc._rtcId, streamId, undefined, {subSVideo: false, subSAudio: true});
            //     return;
            // }
        } else if(evt instanceof __event.EnterSuccess){
            self.onEnterSuccess();
        } else if(evt instanceof  __event.SwitchVCodes) {
            var stream = evt.stream;
            var useVCodes = evt.useVCodes;
            var webrtc = stream._webrtc;
            _logger.warn("Rtc switch VCodes. ", stream.id, useVCodes);

            if (!useVCodes || useVCodes.length == 0) {
                _logger.warn("Rtc switch VCodes. error! useVCodes is empty ", stream.id, useVCodes);
            }

            if(webrtc && webrtc.optimalVideoCodecs){
                if(typeof webrtc.optimalVideoCodecs === 'string'
                    && webrtc.optimalVideoCodecs == useVCodes[0]){
                    _logger.warn("Rtc switch VCodes. igrone . useVCodes == optimalVideoCodecs ", stream.id, webrtc._rtcId, useVCodes);
                    return;
                }
                if(_util.isArray(webrtc.optimalVideoCodecs)
                    && webrtc.optimalVideoCodecs.length > 0
                    && webrtc.optimalVideoCodecs[0] == useVCodes[0]){
                    _logger.warn("Rtc switch VCodes. igrone ddd . useVCodes == optimalVideoCodecs ", stream.id, webrtc._rtcId, useVCodes);
                    return;
                }
            }

            stream.optimalVideoCodecs = useVCodes;

            webrtc && self.closeWebrtc(webrtc.getRtcId(), true);
            setTimeout(function () {
                stream.iceRebuildCount = 1;
                self.iceRebuild(stream);
                _logger.warn("Rtc switch VCodes. iceRebuild end.", stream.id, useVCodes);
            }, 300);
        }
    },

    _onRecvResponse: function (evt) {
        var self = this;

        var request = evt.request;
        var response = evt.response;

        if(request && response
            && request.op !== 200
            && request.op !== 1002
            && response.result !== 0){

            _logger.warn("Server refuse. when request = ", request);

            var failed = evt.failed;
            switch (failed){
                case -9527:
                case -95270:
                    //self.close(4, -9527);
                    break;
                case -500:
                case -502:
                case -504:
                case -508:
                case -510:
                    self.close(4, failed);
                    break;
                case -506:
                    self.close(11, failed);
                    break;

                case -501:
                    self.close(11, failed);
                default: // -501 异常引起 忽略
            }
        }
    },

    onServerRefuseEnter: function (evt) {
        var self = this;

        var failed = evt.failed;
        switch (failed){
            case -9527:
            case -95270:
                self.close(4, -9527);
                break;
            case -500:
            case -502:
            case -504:
            case -508:
            case -510:
                self.close(4, failed);
                break;
            case -506:
                self.close(11, failed);
                break;
            default:
                self.close(2);
        }
    },

    onEnterFail: function () {
        var self = this;

        if(self.__getCopyInterval){
            clearInterval(self.__getCopyInterval);
        }
    },

    onEnterSuccess: function () {
        var self = this;

        setTimeout(function () {
            self._failIcesRebuild();
        }, 200);

        if(self.getCopyIntervalMillis && self.getCopyIntervalMillis > 0){
            _logger.warn("Run interval get copy. interval = ", self.getCopyIntervalMillis);

            if(self.__getCopyInterval){
                clearInterval(self.__getCopyInterval);
            }

            self.__getCopyInterval = setInterval(function () {
                if(self._session.connected()){
                    self._sysCopy.apply(self);
                }else{
                    _logger.warn("Warn! cannot get copy. cause offline.");

                    self.__getCopyInterval && clearInterval(self.__getCopyInterval);
                }
            }, self.getCopyIntervalMillis);
        }

        if(self.getMediaMeterIntervalMillis && self.getMediaMeterIntervalMillis > 0){
            self._intervalGetMediaMeters();
        }
    },

    _intervalGetMediaMeters: function () {
        var self = this;

        function _start() {
            self.__getMediaMetersIntervalFlag && emedia.cancelAnimationFrame(self.__getMediaMetersIntervalFlag);

            if(!self.getMediaMeterIntervalMillis){
                _logger.warn("Ontalking closed. please use getMediaMeterIntervalMillis");
                return;
            }
            self.__getMediaMetersIntervalFlag = emedia.requestAnimationFrame(function (time) {
                if(typeof emedia.AudioContext === 'function'){
                    self._flushMediaMetersByAudioContext.apply(self);
                }

                !(self.closed !== false) && _start();
            }, self.getMediaMeterIntervalMillis);
        }
        _start();
    },

    _flushMediaMetersByAudioContext: function () {
        var self = this;

        _util.forEach(self._cacheStreams, function (_sid, _stream){
            self._updateMetersOrNewOne.call(self, _sid, _stream);
        });

        var delStreamSoundMeters = [];
        _util.forEach(self._mediaMeters, function (_sid, streamSoundMeter){
            var _stream = self._cacheStreams[_sid];
            _stream && self._updateMetersOrNewOne.call(self, _sid, _stream);
            _stream || delStreamSoundMeters.push(_sid);
        });

        _util.forEach(delStreamSoundMeters, function (index, _sid) {
            _util.removeAttribute(self._mediaMeters, _sid);
        })
    },

    _updateMetersOrNewOne: function (_sid, _stream) {
        var self = this;

        var metersData;

        var streamSoundMeter = self._mediaMeters[_sid];

        if(_stream.type === 2 && !_stream.located() && (!_stream.subArgs || !_stream.subArgs.subSAudio)) {
            var pubAudioMixersStream = self._oneAudioMixers();
            if (!pubAudioMixersStream) {
                streamSoundMeter && streamSoundMeter._finally();
                _util.removeAttribute(self._mediaMeters, _sid);
                self._onSoundChanage.call(self, _stream.owner, _stream);

                return;
            }
        }

        if(streamSoundMeter
            && streamSoundMeter._streamCreateId === _stream.__create_id
            && streamSoundMeter.__mediaSoundMeter.__worked){

            streamSoundMeter.onSoundMeters(function (metersData) {
                self._onSoundChanage.call(self, _stream.owner, _stream, metersData);
            });

            return streamSoundMeter;
        }

        if((streamSoundMeter && (streamSoundMeter._streamCreateId !== _stream.__create_id || streamSoundMeter.__mediaSoundMeter.__worked))){
            streamSoundMeter && streamSoundMeter._finally();
            _util.removeAttribute(self._mediaMeters, _sid);
            self._onSoundChanage.call(self, _stream.owner, _stream);
        }

        if(_stream.aoff){
            return;
        }

        streamSoundMeter = self._newMediaMeters(_stream);
        if(streamSoundMeter){
            self._mediaMeters[_sid] && (self._mediaMeters[_sid]._finally());
            self._mediaMeters[_sid] = streamSoundMeter;
        }

        return streamSoundMeter;
    },

    _newAudioContext: function () {
        var self = this;

        if(!emedia.__usingWebAudio){
            return;
        }

        return emedia.__audioContext;
    },

    _newMediaMeters: function (_stream) {
        var self = this;

        var mediaStream;
        if(_stream.type === 2
            && _stream.subArgs
            && _stream.subArgs.subSAudio
            && _stream._webrtc
            && _stream._webrtc.getRemoteStream()){
            var soundMeter = new _stream.StreamSoundMeter({
                _stream: _stream,
                _mediaStream: _stream._webrtc.getRemoteStream(),
                _webrtc: _stream._webrtc,
                __audioContext: self._newAudioContext()
            });

            return soundMeter;
        }

        if(_stream.type === 2 && _stream.located()){
            var soundMeter = new _stream.StreamSoundMeter({
                _stream: _stream,
                _mediaStream: _stream._localMediaStream,
                __audioContext: self._newAudioContext()
            });

            return soundMeter;
        }

        if(_stream.type === 2 && !_stream.located()){
            var pubAudioMixersStream = self._oneAudioMixers();
            if(!pubAudioMixersStream || !pubAudioMixersStream._webrtc || pubAudioMixersStream._webrtc.closed){
                return;
            }

            if(pubAudioMixersStream
                && (pubAudioMixersStream._remoteMediaSoundMeters === undefined || !pubAudioMixersStream._remoteMediaSoundMeters.__worked)
                && pubAudioMixersStream._webrtc
                && pubAudioMixersStream._webrtc.getRemoteStream()){
                pubAudioMixersStream._remoteMediaSoundMeters = new pubAudioMixersStream.MediaSoundMeter({
                    _mediaStream: pubAudioMixersStream._webrtc.getRemoteStream(),
                    __audioContext: self._newAudioContext()
                });
            }

            if(!pubAudioMixersStream._remoteMediaSoundMeters){
                return;
            }

            var soundMeter = new _stream.StreamSoundMeter({
                _stream: _stream,
                _webrtc: pubAudioMixersStream._webrtc,
                __mediaSoundMeter: pubAudioMixersStream._remoteMediaSoundMeters
            });

            return soundMeter;
        }

        if(!_stream.aoff && (mediaStream = _stream.getMediaStream())){
            var soundMeter = new _stream.StreamSoundMeter({
                _stream: _stream,
                _mediaStream: mediaStream,
                __audioContext: self._newAudioContext()
            });

            return soundMeter;
        }
    },

    _oneAudioMixers: function () {
        var self = this;

        for(var sid in self.audioMixers) {
            var stream = self.audioMixers[sid];
            if(stream.located()){
                return stream;
            }
        }
    },

    onWSClose: function () {
        var self = this;
        if(self.__getCopyInterval){
            clearInterval(self.__getCopyInterval);
        }

        _logger.info("Websocket closed.");
    },

    onICEDisconnected: function (webrtc) {
        var self = this;

        self.__networkWeakInterval && clearTimeout(self.__networkWeakInterval);
        self.__networkWeakInterval = setTimeout(function () {
            self.onNetworkWeak && self.onNetworkWeak();
        }, 1000);

        _util.forEach(self._linkedStreams, function (sid, stream) {
            if(stream.rtcId == webrtc.getRtcId()){
                var problemStream;
                if(!(problemStream = self._maybeNotExistStreams[sid])){
                    problemStream = self._maybeNotExistStreams[sid] = _util.extend({}, stream);
                    problemStream.iceRebuildCount = 1;
                }

                _logger.info("Stream maybe not exist. caused by disconnected", stream.id);
            }
        });
    },

    onICEConnectFail: function (webrtc) {
        var self = this;

        for(var sid in self._linkedStreams){
            var stream = self._linkedStreams[sid];
            if(stream.rtcId == webrtc.getRtcId()){
                if(stream._webrtc && stream._webrtc.__id !== webrtc.__id){
                    _logger.warn("Stream use other webrtc rtcId = ", stream.rtcId, ", id: ", stream._webrtc.__id, webrtc.__id);
                    continue;
                }

                var problemStream;
                if(!(problemStream = self._maybeNotExistStreams[sid])){
                    problemStream = self._maybeNotExistStreams[sid] = _util.extend({}, stream);
                    problemStream.iceRebuildCount = 1;
                }

                if(problemStream){
                    var _evt = new __event.StreamState({stream: problemStream});
                    _evt.iceFail();

                    self.onEvent(_evt);
                }

                _logger.info("ice fail. webrtc = ", webrtc.getRtcId(), " problem stream is ", problemStream.iceRebuildCount, problemStream.id);

                if(problemStream.iceRebuildCount > emedia.config.iceRebuildCount){
                    _logger.info("ice fail. webrtc = ", webrtc.getRtcId(), " rebuild fail. problem stream is ", problemStream.id);

                    if(problemStream.located()){
                        self.onEvent(new __event.PushFail({
                            stream: stream,
                            cause: "pub ice rebuild failed."
                        }));
                    }else{
                        self.onEvent(new __event.SubFail({
                            stream: stream,
                            cause: "sub ice rebuild failed."
                        }));
                    }
                    self.closeWebrtc(webrtc.getRtcId(), false);
                }else{
                    var recording = self._records[problemStream.id];

                    if(problemStream._localMediaStream){
                        _logger.info("ice fail. webrtc = ", webrtc.getRtcId(), " will rebuild. remain local stream. ", problemStream.id);
                    }else{
                        _logger.info("ice fail. webrtc = ", webrtc.getRtcId(), " will rebuild.", problemStream.id);
                    }

                    self.closeWebrtc(webrtc.getRtcId(), true);

                    if(recording){
                        self._records[problemStream.id] = recording;
                    }

                    (function (problemStream) {
                        setTimeout(function () {
                            self.iceRebuild(problemStream);
                        }, emedia.config.iceRebuildIntervalMillis);
                    })(problemStream);

                    _logger.info("ice fail. webrtc = ", webrtc.getRtcId(), " will rebuilding. problem stream is ", problemStream.id);
                }

                if(stream.type === 2){
                    _util.removeAttribute(self.audioMixers, stream.id);
                }
            }
        }
    },

    onICEClosed: function (webrtc) {
        var self = this;

        if(webrtc.closed){
            _logger.warn("Webrtc will be removed. by __id = ", webrtc.__id, ", rtcId = ", webrtc.getRtcId());
            var removedWebrtc = _util.removeAttribute(self._ices, webrtc.__id);
            if(removedWebrtc){
                _logger.warn("Webrtc removed. by id = ", removedWebrtc.__id, ", rtcId = ", removedWebrtc.getRtcId());
            }else{
                _logger.warn("Webrtc removed. by id = ", webrtc.__id, ", rtcId = ", webrtc.getRtcId());
            }

            var webrtc22 = self._ices[webrtc.getRtcId()];
            if(webrtc22 && webrtc22.__id === removedWebrtc.__id){
                removedWebrtc = _util.removeAttribute(self._ices, webrtc.getRtcId());
                _logger.warn("Webrtc removed. by rtcId = ", removedWebrtc.getRtcId(), ", __id = ", removedWebrtc.__id);
            }
        }else{
            _logger.info("ICE self closed. not allow. will rebuild", webrtc.getRtcId());
            self.onICEConnectFail(webrtc);
        }
    },

    onICEConnected: function (webrtc) {
        var self = this;

        _util.forEach(self._cacheStreams, function (sid, stream) {
            if(stream.rtcId == webrtc.getRtcId()){
                stream.finalVCodeChoices = webrtc.finalVCodeChoices;

                if(self._maybeNotExistStreams[sid]){
                    _util.removeAttribute(self._maybeNotExistStreams, stream.id);
                    self._linkedStreams[sid] = stream;

                    _logger.info("ice reconnected. webrtc = ", webrtc.getRtcId(), "will update stream = ", stream.id);
                    //stream.located() && self.onUpdateStream(self._linkedStreams[stream.id]);
                    //self.onUpdateStream(self._linkedStreams[stream.id]);

                    var _recordStream = self._records[stream.id];
                    if(_recordStream && _recordStream.rtcId !== stream.rtcId){ //在重连后，恢复录制
                        //self.stopRecord(_recordStream);
                        self.startRecord(stream);
                        _logger.warn("Re record. for ", stream.id, ", after rebuild ice.", _recordStream.rtcId, "->", stream.rtcId);
                    }
                } else {
                    _logger.info("ice connected. webrtc = ", webrtc.getRtcId(), stream.id);

                    stream.located() && self.onEvent(new __event.PushSuccess({stream: stream}));
                    stream.located() || self.onEvent(new __event.SubSuccess({stream: stream}));
                }

                if(stream.type === 2){
                    self.audioMixers[stream.id] = stream;
                }
            }
        });
    },

    onICERemoteMediaStream: function (webrtc) {
        var self = this;

        var streams = [];
        _util.forEach(self._cacheStreams, function (sid, _stream) {
            if (_stream.rtcId == webrtc.getRtcId() && (!_stream.located() || _stream.type === 2)) {
                var mediaStream = webrtc.getRemoteStream();
                self._updateRemoteStream(_stream, mediaStream);

                if(_stream.onGotRemoteMediaStream){
                    _stream.onGotRemoteMediaStream.call(_stream, mediaStream);
                }else{
                    var _stream = self.newStream(_stream);
                    _stream.mediaStream = webrtc.getRemoteStream();

                    self.onUpdateStream(_stream, new _stream.Update({mediaStream: _stream.mediaStream}));
                }
            }
        });
    },

    _failIcesRebuild: function () {
        var self = this;

        var count = 1;
        _util.forEach(self._maybeNotExistStreams, function (streamId, stream) {
            setTimeout(function () {
                self.iceRebuild(stream);
            }, count * 100);
        });
    },

    iceRebuild: function (stream) {
        var self = this;

        if(!self.connected()){
            stream.iceRebuildCount = 1;
            _logger.warn("Websocket disconnect. waiting. rebuild count reset", stream.iceRebuildCount, stream.id);
            return;
        }
        if(!self._linkedStreams[stream.id] || !self._cacheStreams[stream.id]){
            _logger.info("ice rebuild fail. it yet closed. stream is ", stream.id, stream.rtcId);
            _util.removeAttribute(self._maybeNotExistStreams, stream.id);
            _util.removeAttribute(self._linkedStreams, stream.id);
            _logger.warn("iceRebuild, remvoe from _linkedStreams", stream.id);

            return;
        }

        if(stream.iceRebuildCount > emedia.config.iceRebuildCount){
            _logger.info("ice rebuild fail. count too many. stream is ", stream.id);

            if(stream.located()){
                self.onEvent(new __event.PushFail({
                    stream: stream,
                    cause: "pub ice rebuild failed."
                }));
            }else{
                self.onEvent(new __event.SubFail({
                    stream: stream,
                    cause: "sub ice rebuild failed."
                }));
            }
        } else if(self.connected()){
            _logger.info("ice try rebuild. count", stream.iceRebuildCount, ". stream is ", stream.id);
            self.rebuildIce(stream);

            stream.iceRebuildCount ++;
        } else {
            _logger.warn("ice rebuild. stop. cause by not websocket disconnect", stream.id);
        }
    },

    rebuildIce: function (stream) {
        var self = this;

        if(!(self._cacheStreams[stream.id])){
            _logger.warn("Begin rebuild ice. not found stream at local", stream.iceRebuildCount, stream.id);
            return;
        }
        _logger.warn("Begin rebuild ice ", stream.iceRebuildCount, stream.id);

        if(stream.located()){
            stream.isRepublished = true;
            self.push(stream, undefined, undefined, true);
        }else{
            self.createWebrtcAndSubscribeStream(stream.id);
        }
        _logger.warn("Finish rebuild ice ", stream.iceRebuildCount, stream.id, self._cacheStreams[stream.id].rtcId);
    },

    _sysCopy: function () {
        var self = this;

        var copyMessage = self.newMessage()
            .setOp(1000)
            .setCver(self._cver || 0);

        self.postMessage(copyMessage, function (rsp) {
            if(rsp.result != 0){
                _logger.warn("Get copy fail. result = ", rsp.result);

                return;
            }

            if((self._cver || 0) < rsp.cver){
                self._cver = rsp.cver;

                self.onMembers(rsp.cver, rsp.mems || {});
                self.onStreams(rsp.cver, rsp.streams || {})

                _logger.info("Got copy success.");
            }
        });
    },
});

module.exports = Handler;
