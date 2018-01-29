//Service 类，会创建session(me), 并且将current属性设置为 me; 以后方法需要此值



var _util = require('./Util');
var _logger = _util.tagLogger("Service");


var Session = require('./Session');
var Attendee = require('./Attendee');

var __event = require('./event');
var EventHandler = require('./EventHandler');

var __Desktop = require('./_Desktop');

var __desktop = new __Desktop({
    onExtLoaded: function () {
        _logger.info("Share desktop ext. had loaded.");
    }
});

var __Stream = require('./_Stream');

/**
 * {
 *  newSession:
 *  onCalling:
 *  onRinging:
 *
 *
 * }
 *
 *
 *
 */
module.exports = _util.prototypeExtend({
    __init__: function () {
        var self = this;

        var urlLogLevel = _util.parseURL("__log_level___");
        if(urlLogLevel){
            emedia.LOG_LEVEL = parseInt(urlLogLevel);
        }

        // if(self.ticket && _util.isPlainObject(self.ticket)){
        //     self.setup(self.ticket);
        // }

        self.namespace = Math.uuidFast();
        emedia.__easemob_current_mservice = this;
    },

    AVPubstream: __Stream.extend({
        __init__: function () {
            var self = this;

            self.type = 0;
            self._located = true;

            if(self.constaints){
                self.constaints.video || (self.voff = 1);
                self.constaints.audio || (self.aoff = 1);
            }
            //self.constaints || (self.constaints = {audio: !self.aoff, video: !self.voff});
            self.constaints || (self.constaints = {audio: true, video: true});
        }
    }),

    //screenOptions ['screen', 'window', 'tab']
    ShareDesktopPubstream: __Stream.extend({
        __init__: function () {
            var self = this;

            self.type = 1;
            self._located = true;
        }
    }),

    __assertCurrent: function () {
        var self = this;
        if(!self.current){
            throw "Please call emedia.service.setup(ticket)"
        }
        if(self.current.closed){
            throw "current closed"
        }
    },

    openUserMedia: function (pubS) {
        var self = this;

        //self.__assertCurrent();

        if(!pubS){
            throw "require pubS";
        }

        return {
            then: function (success, errCallback) {
                if(pubS instanceof self.AVPubstream){
                    self._openCamera(pubS, success, errCallback);
                }else if(pubS instanceof self.ShareDesktopPubstream){
                    self._openSharedDesktop(pubS, success, errCallback)
                }else{
                    throw "Unspported pubS"
                }
            }
        }
    },

    _openSharedDesktop: function (pubS, success, errCallback) {
        var self = this;

        //self.__assertCurrent();

        //screenOptions ['screen', 'window', 'tab']
        __desktop.openDesktopMedia(pubS.screenOptions || ['screen', 'window', 'tab'], function (_event) {
            if(_event instanceof __event.OpenDesktopMedia){
                var desktopStreamId = _event.desktopStreamId;
                _logger.warn("desktop streamId", desktopStreamId);

                var constraints = {
                    audio: false,
                    video: {
                        mandatory: pubS.mandatory || {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: desktopStreamId,
                            maxWidth: window.screen.width > 1920 ? window.screen.width : 1920,
                            maxHeight: window.screen.height > 1080 ? window.screen.height : 1080
                        },
                        optional: []
                    }
                };

                delete pubS.mandatory;

                self.__getUserMedia(constraints, function (_me, stream) {
                    pubS.localStream = stream;
                    success && success(self.current, stream);
                }, errCallback);
            } else {
                self.current && self.current.onEvent(new __event.ShareDesktopExtensionNotFound({member: self.current}));
                errCallback && errCallback(_event);
            }
        });
    },

    _openCamera: function(pubS, success, errCallback){
        var self = this;

        //self.__assertCurrent();

        //var constaints = pubS.constaints || {audio: !pubS.aoff, video: !pubS.voff};
        var constaints = pubS.constaints || {audio: true, video: true};

        self.__getUserMedia(constaints, function (_me, stream) {
            self.__controlStream(pubS, stream);

            pubS.localStream = stream;
            success && success(self.current, stream);
        }, errCallback);
    },

    __controlStream: function (pubS, stream) {
        stream && stream.getVideoTracks().forEach(function (track) {
            track.enabled = !pubS.voff;
        });
        stream && stream.getAudioTracks().forEach(function (track) {
            track.enabled = !pubS.aoff;
        });
    },

    __getUserMedia: function (constaints, success, errCallback) {
        var self = this;

        var _openstream;

        function onSuccess(stream){
            _openstream = stream;

            var videoTracks = stream.getVideoTracks();
            var audioTracks = stream.getAudioTracks();

            if (videoTracks.length > 0) {
                _logger.debug('Using video device: ' + videoTracks[0].label);
            }
            if (audioTracks.length > 0) {
                _logger.debug('Using audio device: ' + audioTracks[0].label);
            }

            success && success(self.current, stream);
        }

        function onFail(e) {
            _logger.debug('[WebRTC-API] getUserMedia() error: ', e);

            _openstream && _openstream.getTracks().forEach(function (track) {
                track.stop();
            });

            self.current && self.current.onEvent(new __event.OpenMediaError({member: self.current, event: e}));
            errCallback && errCallback(new __event.OpenMediaError({member: self.current, event: e}));
        }

        navigator.mediaDevices.getUserMedia(constaints).then(onSuccess).catch(onFail);
        // navigator.mediaDevices ? navigator.mediaDevices.getUserMedia(constaints).then(onSuccess).catch(onFail)
        //     : navigator.getUserMedia(constaints, onSuccess, onFail);
    },

    setup: function (ticket, ext) {
        var self = this;

        _logger.debug("recv ticket", ticket, ext);

        ext = ext || {};

        var extObj = ext;
        if(_util.isPlainObject(ext)){ //ext 是对象， extObj 也是对象
            ext = JSON.stringify(ext);
        }else{ //ext 是字符串， extObj 尽量转换为 对象
            try{
                extObj = JSON.parse(ext);
            }catch (e){
            }
        }

        if(typeof ticket === "string"){
            ticket = JSON.parse(ticket);
        }

        var sysUserId = ticket.memName;

        if(self.current && !self.current.closed){
            var __eventCalling = new __event.CurrentCalling();
            self.current.onEvent(__eventCalling);
            throw __eventCalling;
            //return;

            //self.current.exit(0);
        }

        var _Attendee = Attendee.extend(EventHandler);

        var attendee = self.current = new _Attendee({
            autoSub: emedia.config.autoSub,
            getCopyIntervalMillis: emedia.config.getCopyIntervalMillis,
            sysUserId: sysUserId,
            resource: self.resource,
            nickName: self.nickName,
            ticket: ticket,
            ext: ext,
            extObj: extObj,

            sessionFactory: function(){
                return self.newSession(this, ticket);
            }
        }, self.listeners || {});

        return attendee;
    },

    exit: function (closeMyConfrIfICrtConfr) {
        this.current && this.current.exit(closeMyConfrIfICrtConfr);
    },

    join: function(joined, joinError){
        _logger.debug("begin join ...");

        var self = this;

        self.__assertCurrent();
        self.current._session._sessionId = undefined;

        self.current.join(joined, joinError);
    },

    withpublish: function (pubS) {
        var self = this;

        if(!pubS || !pubS.localStream){
            throw "pubS null or stream not open";
        }

        self.__assertCurrent();
        self.current._session._sessionId = undefined;

        return self.current.withpublish(pubS);
    },

    push: function(pubS, pushed, onPushError){
        _logger.debug("begin push ...");

        var self = this;

        if(arguments.length === 2){
            onPushError = pushed;
            pushed = undefined;
        }


        if(!pubS || !pubS.localStream){
            throw "pubS or stream open";
        }

        self.__assertCurrent();
        self.current.push(pubS, pushed, onPushError, false);
    },


    subscribe: function (streamId, onSub, subfail, subArgs) {
        var self = this;

        self.__assertCurrent();

        if(arguments.length == 2){
            subfail = onSub;
            onSub = undefined;
        }

        if(onSub && _util.isPlainObject(onSub)){
            subArgs = onSub;
            onSub = undefined;
        }
        if(subfail && _util.isPlainObject(subfail)){
            subArgs = subfail;
            subfail = undefined;
        }
        console.log("subArgs1",subArgs);
        subArgs || (subArgs = {fVideo: true, subSAudio: true});
        console.log("subArgs2",subArgs);

        var webrtc = self.current._getWebrtc(streamId);


        if(webrtc && webrtc.isConnected() && !emedia.isSafari){
            self.current.subscribeStream(webrtc._rtcId, streamId, subfail, subArgs);
            return;
        }

        webrtc && self.current.closeWebrtc(webrtc.getRtcId(), true, false);

        self.current.createWebrtcAndSubscribeStream(streamId, {
            onGotRemote: function(stream) {
                onSub && onSub(stream)
            },
            onEvent: function(_evt){
                subfail && subfail(_evt)
            }
        }, undefined, subArgs);
    },

    closePubstream: function (stream) {
        if(stream.located()){
            stream._localMediaStream && stream._localMediaStream.getTracks().forEach(function (track) {
                track.stop();
            });
            stream.localStream && stream.localStream.getTracks().forEach(function (track) {
                track.stop();
            });
        }
    },

    hungup: function (streamId) {
        var self = this;

        self.__assertCurrent();

        var attendee = self.current;

        var stream = attendee._cacheStreams[streamId];
        var rtcId = stream.rtcId;
        if(rtcId){
            attendee.closeWebrtc(rtcId);

            if(stream.located()){
                stream.type !== 1 && stream._localMediaStream && stream._localMediaStream.getTracks().forEach(function (track) {
                    track.stop();
                });

                attendee._cacheStreams[streamId] && attendee.onRemoveStream(stream);

                delete attendee._cacheStreams[streamId];
            }
        }

        if(stream && !stream.located()){
            attendee._linkedStreams[stream.id] && (delete attendee._linkedStreams[stream.id]);

            var _stream = new __Stream(stream);
            _stream.rtcId = undefined;
            _stream._webrtc = undefined;
            _stream.mediaStream = null;

            attendee.onUpdateStream(_stream, new _stream.Update(_stream));
        }
    },

    postMessage: function (memberIdOrStreamId, message, fail) {
        var self = this;

        var theMessage = message;
        if(typeof message !== 'string'){
            message = JSON.stringify(message);
        }

        self.__assertCurrent();
        var attendee = self.current;

        var memberId;

        var linkedStream = attendee._linkedStreams[memberIdOrStreamId];
        if(linkedStream && linkedStream.owner){
            memberId = linkedStream.owner.id;
        }else{
            memberId = memberIdOrStreamId;
        }

        var message = attendee.newMessage({
            op: 1003,
            memId: memberId,
            arg: message
        });

        attendee.postMessage(message, function (rsp) {
            if(rsp.result != 0){
                var _evt = new __event.RemoteControlFail({memId: memberId, failed: rsp.result, cause: rsp.msg, type: "postMessage", postMessage: message});
                attendee.onEvent(_evt);

                fail && fail(_evt, theMessage);

                return;
            }
        });
    },

    torchRemote: function (streamId, torch, success, fail) {
        var self = this;

        if(typeof torch === 'function'){
            fail = success;
            success = torch;
            torch = undefined;
        }

        self.__assertCurrent();
        var attendee = self.current;

        var linkedStream = attendee._linkedStreams[streamId];
        if(!linkedStream || linkedStream.located()){
            throw streamId + " not exsits or locate, not connect";
        }

        var lastTorch = linkedStream.torch;
        var torch = (torch === undefined) ? (!linkedStream.torch ? 1 : 0) : torch;

        var arg = {
            op2: 20,
            streamId: streamId,
            tor: torch,
        };

        var message = attendee.newMessage({
            op: 1002,
            memId: linkedStream.owner.id,
            arg: JSON.stringify(arg),
            _reqOps:[100206]
        });

        linkedStream.torch = torch;

        attendee.postMessage(message, function (rsp) {
            if(rsp.result != 0){
                var _evt = new __event.RemoteControlFail({stream: linkedStream, failed: rsp.result, cause: rsp.msg, type: "torch_control"});
                attendee.onEvent(_evt);

                linkedStream.torch = lastTorch;

                fail && fail(_evt, linkedStream.torch);

                return;
            } else {
                success && success(linkedStream.torch);
            }
        });
    },

    freezeFrameRemote: function (streamId, success, fail) {
        var self = this;

        self.__assertCurrent();
        var attendee = self.current;

        var linkedStream = attendee._linkedStreams[streamId];
        if(!linkedStream || linkedStream.located()){
            throw streamId + " not exsits or locate, not connect";
        }

        var freezeFrame = !linkedStream.freezeFrame;

        var arg = {
            op2: 20,
            streamId: streamId,
            frz: (freezeFrame ? 1 : 0),
        };

        var message = attendee.newMessage({
            op: 1002,
            memId: linkedStream.owner.id,
            arg: JSON.stringify(arg),
            _reqOps:[100204]
        });

        linkedStream.freezeFrame = freezeFrame;

        attendee.postMessage(message, function (rsp) {
            if(rsp.result != 0){
                var _evt = new __event.RemoteControlFail({stream: linkedStream, failed: rsp.result, cause: rsp.msg, type: "freeze_control"});
                attendee.onEvent(_evt);

                linkedStream.freezeFrame = !linkedStream.freezeFrame;

                fail && fail(_evt, linkedStream.freezeFrame);

                return;
            } else {
                success && success(linkedStream.freezeFrame);
            }
        });
    },

    capturePictureRemote: function (streamId, rspBase64Pic, success, fail) {
        var self = this;

        self.__assertCurrent();
        var attendee = self.current;

        var linkedStream = attendee._linkedStreams[streamId];
        if(!linkedStream || linkedStream.located()){
            throw streamId + " not exsits or locate, not connect";
        }

        var arg = {
            op2: 20,
            streamId: streamId,
            pic: 1,
            rspBase64Pic: true
        };

        rspBase64Pic && (arg.rspBase64Pic = true);

        var message = attendee.newMessage({
            op: 1002,
            memId: linkedStream.owner.id,
            arg: JSON.stringify(arg),
            _reqOps:[100205]
        });

        attendee.postMessage(message, function (rsp) {
            if(rsp.result != 0){
                var _evt = new __event.RemoteControlFail({stream: linkedStream, failed: rsp.result, cause: rsp.msg, type: "capture_control"});
                attendee.onEvent(_evt);
                fail && fail(_evt);

                return;
            } else {
                if(!rspBase64Pic){
                    success && success();
                    return;
                }

                if(!rsp.arg) {
                    fail && fail(new __event.RemoteControlFail({stream: linkedStream, failed: rsp.result, cause: "Not found base64 pic"}));
                    return;
                }

                var arg = JSON.parse(rsp.arg);
                success && success(arg.pic);
            }
        });
    },

    zoomRemote: function (streamId, multiples, fail) {
        var self = this;

        self.__assertCurrent();
        var attendee = self.current;

        var linkedStream = attendee._linkedStreams[streamId];
        if(!linkedStream || linkedStream.located()){
            throw streamId + " not exsits or locate, not connect";
        }

        linkedStream._zoom || (linkedStream._zoom = 1);

        var _zoom = linkedStream._zoom * multiples;
        if(_zoom < 1){
            return;
        }

        linkedStream._zoom = _zoom;

        var arg = {
            op2: 20,
            streamId: streamId,
            zoom: Math.round(_zoom * 10000)
        }

        var message = attendee.newMessage({
            op: 1002,
            memId: linkedStream.owner.id,
            arg: JSON.stringify(arg),
            _reqOps:[100201]
        });

        attendee.postMessage(message, function (rsp) {
            if(rsp.result != 0){
                var _evt = new __event.RemoteControlFail({stream: linkedStream, failed: rsp.result, cause: rsp.msg, type: "zoom_control"});
                attendee.onEvent(_evt);
                fail && fail(_evt);

                return;
            }
        });
    },

    _getPosition: function getPosition(obj){
        var topValue= 0,leftValue= 0;
        while(obj){
            leftValue+= obj.offsetLeft;
            topValue+= obj.offsetTop;
            obj= obj.offsetParent;
        }

        return {clientX: leftValue, clientY: topValue};
    },

    getClickXY: function (videoTag, clickEvent) {
        var self = this;

        var e = clickEvent || window.event;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;

        var xy = self._getPosition(videoTag);

        _logger.info("Video tag position ", xy.clientX, ":", xy.clientY);


        var mediaWidth = videoTag.videoWidth;
        var mediaHeight = videoTag.videoHeight;

        if(mediaHeight > mediaWidth){
            var t = mediaWidth / mediaHeight;
            mediaHeight = videoTag.offsetHeight;
            mediaWidth = mediaHeight * t;

            xy.clientX += (videoTag.offsetWidth - mediaWidth) / 2;
        } else {
            var t = mediaHeight / mediaWidth;
            mediaWidth = videoTag.offsetWidth;
            mediaHeight = mediaWidth * t;

            xy.clientY += (videoTag.offsetHeight - mediaHeight) / 2;
        }
        _logger.info("Media position ", xy.clientX, ":", xy.clientY);
        _logger.info("Media xy ", mediaWidth, ":", mediaHeight);
        _logger.info("Click position ", x, ":", y);

        return {
            mediaWidth: mediaWidth,
            mediaHeight: mediaHeight,
            x: (x - xy.clientX),
            y: (y - xy.clientY)
        };
    },

    focusExpoRemote: function (streamId, videoTag, clickEvent, fail) {
        var self = this;

        var e = clickEvent || window.event;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;

        var xy = self._getPosition(videoTag);

        _logger.info("Video tag position ", xy.clientX, ":", xy.clientY);


        var mediaWidth = videoTag.videoWidth;
        var mediaHeight = videoTag.videoHeight;

        if(mediaHeight > mediaWidth){
            var t = mediaWidth / mediaHeight;
            mediaHeight = videoTag.offsetHeight;
            mediaWidth = mediaHeight * t;

            xy.clientX += (videoTag.offsetWidth - mediaWidth) / 2;
        } else {
            var t = mediaHeight / mediaWidth;
            mediaWidth = videoTag.offsetWidth;
            mediaHeight = mediaWidth * t;

            xy.clientY += (videoTag.offsetHeight - mediaHeight) / 2;
        }
        _logger.info("Media position ", xy.clientX, ":", xy.clientY);
        _logger.info("Media xy ", mediaWidth, ":", mediaHeight);
        _logger.info("Click position ", x, ":", y);

        self._focusExpo(streamId, mediaWidth, mediaHeight, (x - xy.clientX), (y - xy.clientY), fail);
    },

    _focusExpo: function (streamId, width, height, x, y, fail) {
        var self = this;

        if(x <= 0 || x > width){
            return;
        }
        if(y <= 0 || y > height){
            return;
        }

        self.__assertCurrent();
        var attendee = self.current;

        var linkedStream = attendee._linkedStreams[streamId];
        if(!linkedStream || linkedStream.located()){
            throw streamId + " not exsits or locate, not connect";
        }

        var arg = {
            op2: 20,
            streamId: streamId,
            focus: 1,
            expo: 1,
            x: width === 0 ? 0 : Math.round(x * 10000 / width),
            y: height === 0 ? 0 : Math.round(y * 10000 / height)
        }

        var message = attendee.newMessage({
            op: 1002,
            memId: linkedStream.owner.id,
            arg: JSON.stringify(arg),
            _reqOps:[100202, 100203]
        });

        attendee.postMessage(message, function (rsp) {
            if(rsp.result != 0){
                var _evt = new __event.RemoteControlFail({stream: linkedStream, failed: rsp.result, cause: rsp.msg, type: "focus_expo_control"});
                attendee.onEvent(_evt);
                fail && fail(_evt);

                return;
            }
        });
    },

    _republish: function (pubS, success, error) {
        var self = this;

        var webrtc;
        if(pubS.id){
            var rtcId = self.current.__getWebrtcFor(pubS.id);
            rtcId && self.current.closeWebrtc(rtcId, true);

            webrtc = self.current._getWebrtc(pubS.id);
        }


        pubS._localMediaStream && pubS._localMediaStream.getTracks().forEach(function (track) {
            track.stop();
        });

        setTimeout(function () {
            var _pubS = new self.AVPubstream(pubS);

            self.openUserMedia(_pubS).then(function () {
                pubS.localStream = _pubS.localStream;

                // var pubS1 = _util.extend({}, _pubS);
                pubS.isRepublished = true;

                pubS.optimalVideoCodecs = pubS.optimalVideoCodecs || ( webrtc && webrtc.optimalVideoCodecs);
                self.push(pubS, success, error);
            }, error);
        }, 500);
    },

    voff: function(pubS, _voff, error){
        var self = this;

        _voff = _voff ? 1 : 0;
        pubS.voff = _voff;

        function updateAndDisabled() {
            pubS.getMediaStream() && pubS.getMediaStream().getVideoTracks().forEach(function (track) {
                track.enabled = !_voff;
            });

            self.current && self.current.voff(pubS, _voff);
        }

        if(pubS.constaints && !pubS.constaints.video){
            //error && error("When pub. only audio, voff invalidate");
            //throw "When pub. only audio, voff invalidate";

            pubS.constaints.video = true;
            self._republish(pubS, function(){
                updateAndDisabled();
            },function (_evt) {
                if(_evt instanceof emedia.event.OpenMediaError){ //设备可能不支持，比如 没有摄像头，或 被禁止访问摄像头
                    pubS.constaints.video = false;
                }

                error && error(_evt);
            });

            return;
        }

        updateAndDisabled();
    },

    aoff: function(pubS, _aoff, error){
        var self = this;

        _aoff = _aoff ? 1 : 0;
        pubS.aoff = _aoff;

        function updateAndDisabled() {
            pubS.getMediaStream() && pubS.getMediaStream().getAudioTracks().forEach(function (track) {
                track.enabled = !_aoff;
            });

            self.current && self.current.aoff(pubS, _aoff);
        }

        if(pubS.constaints && !pubS.constaints.audio){
            // error && error("When pub. only video, aoff invalidate");
            // throw "When pub. only video, aoff invalidate";

            pubS.constaints.audio = true;
            self._republish(pubS, function(){
                updateAndDisabled();
            },function (_evt) {
                if(_evt instanceof emedia.event.OpenMediaError){ //设备可能不支持，比如 没有摄像头，或 被禁止访问摄像头
                    pubS.constaints.audio = false;
                }

                error && error(_evt);
            });

            return;
        }

        updateAndDisabled();
    },

    iceing: function (streamId) {
        var self = this;

        return _util.isPlainObject(self.current._linkedStreams[streamId]);
    },

    recording: function (streamId) {
        var self = this;

        return _util.isPlainObject(self.current._records[streamId]);
    },

    startRecord: function (streamId, callback) {
        var self = this;

        var _stream = self.current._linkedStreams[streamId];
        if(!_stream){
            throw streamId + " not at linked streams";
        }
        if(!_stream._webrtc){
            callback && callback(false);
        }

        self.current.startRecord(_stream, callback);
    },

    stopRecord: function (streamId, callback) {
        var self = this;

        var _stream = self.current._records[streamId];
        if(!_stream){
            throw streamId + " not at recording streams";
        }

        self.current.stopRecord(_stream, callback);
    },

    getCurrentMembers: function () {
        var self = this;
        return self.current.getCurrentMembers();
    },

    newSession: function (attendee, ticket) {
        var self = this;

        var session = new Session({
            ticket: ticket,
            owner: attendee,

            onTcklC: function(evt){
                attendee.onTcklC(evt.rtcId, evt.cands);
            },
            onAcptC: function(evt){
                attendee.onAcptC(evt.rtcId, evt.sdp, evt.cands);
            },
            onAnsC: function(evt){
                attendee.onAnsC(evt.rtcId, evt.sdp, evt.cands);
            },
            onTermC: function(evt){
                //self.onTermC(me, evt);
                _logger.info("Server termc rtc: ", evt.rtcId, evt.message || evt.msg);

                if(evt.endReason === 21 || evt.endReason === 22){
                    _util.forEach(attendee._cacheStreams, function (sid, _stream) {
                        if(_stream.rtcId === evt.rtcId){
                            var _event;
                            if(evt.endReason === 21){
                                _event = new emedia.event.SwitchVCodes({stream: _stream, useVCodes: evt.useVCodes});
                            }else{
                                _event = new emedia.event.SubFailNotSupportVCodes({stream: _stream});
                            }

                            attendee.onEvent(_event);
                        }
                    });
                }else{
                    attendee.closeWebrtc(evt.rtcId, false, true);
                }
            },
            onEnter: function(evt){
                attendee.onEnter(evt.cver, evt.mem);
            },
            onExit: function(evt){
                attendee.onExit(evt.cver, evt.memId, evt.reason);
            },
            onPub: function(evt){
                attendee.onPub(evt.cver, evt.memId, evt.pubS);
            },
            onUnpub: function(evt){
                attendee.onUnpub(evt.cver, evt.memId, evt.pubSId);
            },
            onMems: function(evt){
            },
            onClose: function(evt){
                attendee.onClose(evt.cver, evt.confrId);
            },
            onEvent: function(evt){
                attendee.onEvent(evt);
            },
            onStreamControl: function (evt) {
                attendee.onStreamControl(evt.cver, evt.streamId, evt.voff, evt.aoff);
            },
            onRemoteControl: function (evt) {
                _logger.error("Web not support remote control");

                var message = attendee.newMessage({
                    op: 1001,
                    tsxId: evt.tsxId,
                    memId: evt.memId,
                    arg: evt.arg,
                    result: -507,
                    msg: "Web not support the remote control."
                });

                attendee.postMessage(message, function (rsp) {
                    _logger.error("Send remote control response. the result = ", rsp.result, rsp.msg || "");
                });
            },
            onRecvRemoteMessage: function (evt) {
                attendee._onRecvRemoteMessage && attendee._onRecvRemoteMessage(evt.memId, evt.arg);
            }
        });

        return session;
    },
});