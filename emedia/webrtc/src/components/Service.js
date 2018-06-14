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

var DefaultMouseTrack = require('../../../pannel/src/components/DefaultTrack');

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
        emedia.__easemob_current_mservice = self;

        if(self.useRTCCfg === undefined){
            self.useRTCCfg = emedia.config.useRTCCfgIfServerReturn;
        }

        if(typeof self.useRTCCfg === "string"){
            self.useRTCCfg = JSON.parse(self.useRTCCfg);
        }
    },

    AVPubstream: __Stream.extend({
        __init__: function () {
            var self = this;

            self.type = 0;
            self._located = true;

            self.mutedMuted = true;

            if(self.constaints){
                self.constaints.video || (self.voff = 1);
                self.constaints.audio || (self.aoff = 1);
            }
            //self.constaints || (self.constaints = {audio: !self.aoff, video: !self.voff});
            self.constaints || (self.constaints = {audio: true, video: true});
        }
    }),

    AudioMixerPubstream: new __Stream.extend({
        __init__: function () {
            var self = this;

            self.type = 2;
            self._located = true;

            self.mutedMuted = true;

            self.constaints || (self.constaints = {audio: true, video: false});
            if(self.constaints){
                self.constaints.audio = true;
                self.constaints.video || (self.constaints.video = false);

                self.constaints.video || (self.voff = 1);
                self.constaints.audio || (self.aoff = 1);
            }
        },

        onGotRemoteMediaStream: function(remoteMediaStream){
            var self = this;

            if(!self.remotePlayAudioObject){
                var _audioId = "__o_remote_play_audio_" + self.id;

                var audioObject = document.createElement("audio");
                audioObject.style.display = "none";
                audioObject.id = "__o_remote_play_audio_" + self.id;
                audioObject.autoplay = true;
                audioObject.playsinline = true;

                //monitorEvents && monitorEvents(audioObject);

                self.remotePlayAudioObject = audioObject;

                document.body.appendChild(audioObject);
            }

            // self.remotePlayAudioObject.autoplay = true;
            // self.remotePlayAudioObject.playsinline = true;
            self.remotePlayAudioObject.srcObject = remoteMediaStream;

            //window.__$_remoteMediaStream = remoteMediaStream;
        }
    }),

    //screenOptions ['screen', 'window', 'tab']
    ShareDesktopPubstream: __Stream.extend({
        voff: 0,

        __init__: function () {
            var self = this;

            self.type = 1;
            self._located = true;

            self.mutedMuted = true;
            self.constaints = {audio: !this.aoff, video: true};
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

    hasAudioMixers: function () {
        var self = this;

        self.__assertCurrent();

        for(var sid in self.current.audioMixers) {
            var stream = self.current.audioMixers[sid];
            if(stream && stream.located()){
                return true;
            }
        }
    },

    getMediaDevices: function (kind, devices, errorCallback) {
        if(typeof kind === 'function'){
            errorCallback = devices;
            devices = kind;
            kind = undefined;
        }

        function gotDevices(deviceInfos) {
            var resultDeviceInfos = [];

            for (var i = 0; i !== deviceInfos.length; ++i) {
                var deviceInfo = deviceInfos[i];
                var deviceId = deviceInfo.deviceId;

                if(!kind){
                    resultDeviceInfos.push(deviceInfo);
                }

                if(kind && kind === deviceInfo.kind){
                    resultDeviceInfos.push(deviceInfo);
                }else if (deviceInfo.kind === 'audioinput') {
                } else if (deviceInfo.kind === 'audiooutput') {
                } else if (deviceInfo.kind === 'videoinput') {
                } else {
                    _logger.info('Some other kind of source/device: ', deviceInfo);
                }
            }

            devices && devices(resultDeviceInfos);
        };

        navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(function handleError(error) {
            _logger.warn('navigator.getUserMedia error: ', error);
            errorCallback && errorCallback(error);
        });
    },

    // Attach audio output device to video element using device/sink ID.
    // sinkId deviceInfo.deviceId;
    // attachSinkId(videoElement, deviceInfo.deviceId);
    attachSinkId: function (videoObj, sinkId) {
        if (typeof videoObj.sinkId !== 'undefined') {
            videoObj.setSinkId(sinkId)
                .then(function() {
                    _logger.info('Success, audio output device attached: ' + sinkId);
                })
                .catch(function(error) {
                    var errorMessage = error;
                    if (error.name === 'SecurityError') {
                        errorMessage = 'You need to use HTTPS for selecting audio output ' + 'device: ' + error;
                    }
                    _logger.warn(errorMessage);
                });
        } else {
            _logger.warn('Browser does not support output device selection.');
        }
    },

    _stopTracks: function (_stream) {
        emedia.stopTracks(_stream);
        _stream && _logger.warn("Stream tracks stop. it = ", _stream);
    },
    _enableVideoTracks: function (_stream, enabled) {
        emedia.enableVideoTracks(_stream, enabled);
    },
    _enableAudioTracks: function (_stream, enabled) {
        emedia.enableAudioTracks(_stream, enabled);
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
                }else if(pubS instanceof self.AudioMixerPubstream){
                    self._openCamera(pubS, success, errCallback)
                }else{
                    throw "Unspported pubS"
                }
            }
        }
    },

    _openSharedDesktop: function (pubS, success, errCallback) {
        var self = this;

        //self.__assertCurrent();

        function getAudioStream(pubS) {
            self.__getUserMedia({audio: true}, function (_user, stream) {
                var mediaStream = new MediaStream();
                mediaStream._located = true;

                stream && stream.getAudioTracks().forEach(function(track) {
                    mediaStream.addTrack(track);
                });

                pubS.localStream && pubS.localStream.getVideoTracks().forEach(function(track) {
                    mediaStream.addTrack(track);
                });

                pubS.localStream = mediaStream;

                success && success(self.current, mediaStream);
            }, errCallback);
        }

        var videoTracks;
        if(pubS._localMediaStream
            && (videoTracks = pubS._localMediaStream.getVideoTracks())
            && videoTracks.length > 0){
            pubS.localStream = pubS._localMediaStream;

            if(pubS.constaints.audio){
                getAudioStream(pubS);
            }else{
                success && success(self.current, stream);
            }

            return ;
        }

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

                    if(pubS.constaints.audio){
                        getAudioStream(pubS);
                    }else{
                        success && success(self.current, stream);
                    }
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
        emedia.enableVideoTracks(stream, !pubS.voff);
        emedia.enableAudioTracks(stream, !pubS.aoff);
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

            stream._located = true;

            success && success(self.current, stream);
        }

        function onFail(e) {
            _logger.debug('[WebRTC-API] getUserMedia() error: ', e);

            emedia.stopTracks(_openstream);

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

        var sysUserId = memName = ticket.memName;

        if(self.current && !self.current.closed){
            var __eventCalling = new __event.CurrentCalling();
            self.current.onEvent(__eventCalling);
            throw __eventCalling;
            //return;

            //self.current.exit(0);
        }

        var TargetAttendee = self.Attendee || Attendee;
        var _Attendee = TargetAttendee.extend(EventHandler);

        var attendee = self.current = new _Attendee({
            _service: self,
            autoSub: emedia.config.autoSub,
            getCopyIntervalMillis: emedia.config.getCopyIntervalMillis,
            sysUserId: sysUserId,
            memName: memName,
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

    getStreamById: function (streamId) {
        var stream = this.current && this.current._cacheStreams[streamId];
        return stream && _util.extend(false, {}, stream);
    },

    getMemberById: function (memId) {
        var member = this.current && this.current._cacheMembers[memId];
        return member && _util.extend(false, {}, member);
    },

    exit: function (closeMyConfrIfICrtConfr) {
        _logger.warn("User click exit ", closeMyConfrIfICrtConfr);
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

        subArgs || (subArgs = {subSVideo: true, subSAudio: true});


        var subStream = self.current._cacheStreams[streamId];
        // if(subStream && subStream.type === 2 && subArgs.subSAudio !== undefined && !subArgs.subSAudio){
        //     subfail && subfail(new __event.AudioMixerStreamNotAllowOnlySubVideo({stream: subStream}));
        //     self.current.onEvent(new __event.AudioMixerStreamNotAllowOnlySubVideo({stream: subStream}));
        //     return;
        // }

        var webrtc = self.current._getWebrtc(streamId);


        // if(webrtc && webrtc.isConnected() && !emedia.isSafari){
        if(webrtc && webrtc.isConnected()){
            self.current.subscribeStream(webrtc._rtcId, streamId, subfail, subArgs);
            return;
        }

        webrtc && (!webrtc.closed) && self.current.closeWebrtc(webrtc.getRtcId(), true, false);

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
            emedia.stopTracks(stream._localMediaStream);
            emedia.stopTracks(stream.localStream);
        }
    },

    hungup: function (streamId) {
        var stream = this.getStreamById(streamId);
        try{
            this._hungup(streamId);
        }finally{
            this.onHungup && this.onHungup(stream);
        }
    },
    _hungup: function (streamId) {
        var self = this;

        self.__assertCurrent();

        var attendee = self.current;

        var stream = attendee._cacheStreams[streamId];
        var rtcId = stream && stream.rtcId;
        if(rtcId){
            attendee.closeWebrtc(rtcId);

            if(stream.located()){
                stream.type !== 1 && stream._localMediaStream && emedia.stopTracks(stream._localMediaStream);

                if(stream.remotePlayAudioObject){
                    document.body.removeChild(stream.remotePlayAudioObject);
                }

                attendee._cacheStreams[streamId] && attendee.onRemoveStream(stream);

                delete attendee._cacheStreams[streamId];
            }
        }

        if(stream && !stream.located()){
            attendee._linkedStreams[stream.id] && (delete attendee._linkedStreams[stream.id]);
            _logger.warn("Hangeup remove from _linkedStreams. stream = ", stream.id);

            stream = attendee._cacheStreams[streamId];
            if(!stream){
                return;
            }

            var _stream = new __Stream(stream);
            stream.rtcId = _stream.rtcId = undefined;
            stream._webrtc = _stream._webrtc = undefined;
            stream.mediaStream = _stream.mediaStream = undefined;

            attendee.onUpdateStream(_stream, new _stream.Update(_stream));
        }
    },

    postMessage: function (memberIdOrStreamId, message, fail, onRsp) {
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

        attendee.postMessage(message, (fail || onRsp) && function (rsp) {
            onRsp && onRsp(rsp, theMessage);

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

    base64Img2Blob: function base64Img2Blob(code) {
        var parts = code.split(';base64,');
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    },

    blob2URL: function (blob) {
        return URL.createObjectURL(blob);
    },

    imagesPngContext2URL: function (code) {
        var self = this;
        return self.blob2URL(self.blob2URL(code));
    },

    downloadFile: function downloadFile(fileName, content) {
        var self = this;

        var aLink = document.createElement('a');
        var blob = self.base64Img2Blob(content); //new Blob([content]);


        aLink.download = fileName;
        aLink.href = self.blob2URL(blob);

        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, false); //initEvent 不加后两个参数在FF下会报错
        aLink.dispatchEvent(evt);

        aLink.click();
    },

    videoCaptureBase64Context2URL: function (videoObj) {
        var self = this;
        return self.imagesPngContext2URL(self.getCaptureBase64Context(videoObj));
    },

    getCaptureBase64Context: function (videoObj) {
        var canvas = document.createElement("canvas");
        var id = canvas.id = "__capture_video_" + new Date().getTime();

        canvas.width = videoObj.videoWidth;
        canvas.height = videoObj.videoHeight;

        var canvas2dContext = canvas.getContext('2d');
        canvas2dContext.drawImage(videoObj, 0, 0, canvas.width, canvas.height);

        var base64 = canvas.toDataURL('images/png');
        //console.log(base64);

        return base64;
    },

    captureVideo: function captureVideo(videoObj, storeLocal, filename) {
        var self = this;

        var base64 = self.getCaptureBase64Context(videoObj);

        if (storeLocal) {
            filename = filename || ("capture_" + (new Date()).getTime());
            self.downloadFile(filename, base64);
            //window.location.href = base64;

            // var iframe = document.createElement("iframe");
            // iframe.id = "__capture_video_pic_dl_iframe_" + (new Date().getTime());
            // iframe.style.display = "none";
            //
            // //document.body.appendChild(iframe);
            //
            // iframe.src = base64;
            // //iframe.contentWindow.location.href = URL.createObjectURL(base64);
            //
            // setTimeout(function () {
            //     //document.body.removeChild(iframe);
            // }, 50);
        }

        return base64;
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
            rspBase64Pic: (rspBase64Pic === true)
        };

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

    eventXYAtMedia: function (eventXY, videoTag) {
        var videoXY = _util.getDomPageRect(videoTag);

        var videoWidth = videoXY.width, videoHeight = videoXY.height;
        var mediaWidth = videoTag.videoWidth, mediaHeight = videoTag.videoHeight;

        if(mediaHeight/mediaWidth > videoHeight/videoWidth){
            var t = mediaWidth / mediaHeight;
            mediaHeight = videoHeight;
            mediaWidth = mediaHeight * t;
        } else {
            var t = mediaHeight / mediaWidth;
            mediaWidth = videoWidth;
            mediaHeight = mediaWidth * t;
        }

        var clickXY = eventXY;

        var isRadioX, isRadioY;
        if(isRadioX = _util.isFloat(clickXY.x)){ //比率
            clickXY.x = clickXY.x * videoWidth;
        }
        if(isRadioY = _util.isFloat(clickXY.y)){ //比率
            clickXY.y = clickXY.y * videoHeight;
        }

        if(Math.abs(clickXY.x) < (videoWidth - mediaWidth) / 2
            || (videoWidth - Math.abs(clickXY.x)  < (videoWidth - mediaWidth) / 2)){
            return;
        }
        if(Math.abs(clickXY.y) < (videoHeight - mediaHeight) / 2
            || (videoHeight - Math.abs(clickXY.y)  < (videoHeight - mediaHeight) / 2)){
            return;
        }

        clickXY.x = clickXY.x < 0 ? Math.floor(clickXY.x + (videoWidth - mediaWidth) / 2)
            : Math.floor(clickXY.x - (videoWidth - mediaWidth) / 2);
        clickXY.y = clickXY.y < 0 ? Math.floor(clickXY.y + (videoHeight - mediaHeight) / 2)
            : Math.floor(clickXY.y - (videoHeight - mediaHeight) / 2);


        if(isRadioX){
            clickXY.x = clickXY.x / mediaWidth;
        }
        if(isRadioY){
            clickXY.y = clickXY.y / mediaHeight;
        }

        return {x: clickXY.x, y: clickXY.y, width: mediaWidth, height: mediaHeight};
    },

    eventXYAtVideo: function (mediaXY, videoTag) {
        var videoXY = _util.getDomPageRect(videoTag);

        var videoWidth = videoXY.width, videoHeight = videoXY.height;
        var mediaWidth = videoTag.videoWidth, mediaHeight = videoTag.videoHeight;

        if(mediaHeight/mediaWidth > videoHeight/videoWidth){
            var t = mediaWidth / mediaHeight;
            mediaHeight = videoHeight;
            mediaWidth = mediaHeight * t;
        } else {
            var t = mediaHeight / mediaWidth;
            mediaWidth = videoWidth;
            mediaHeight = mediaWidth * t;
        }

        var isRadioX, isRadioY;
        if(isRadioX = _util.isFloat(mediaXY.x)){ //比率
            mediaXY.x = mediaXY.x * mediaWidth;
        }
        if(isRadioY = _util.isFloat(mediaXY.y)){ //比率
            mediaXY.y = mediaXY.y * mediaHeight;
        }

        mediaXY.x = mediaXY.x < 0 ? Math.floor(mediaXY.x - (videoWidth - mediaWidth) / 2)
            : Math.floor(mediaXY.x + (videoWidth - mediaWidth) / 2);
        mediaXY.y = mediaXY.y < 0 ? Math.floor(mediaXY.y - (videoHeight - mediaHeight) / 2)
            : Math.floor(mediaXY.y + (videoHeight - mediaHeight) / 2);

        if(isRadioX){
            mediaXY.x = mediaXY.x / videoWidth;
        }
        if(isRadioY){
            mediaXY.y = mediaXY.y / videoHeight;
        }

        return mediaXY;
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

        if(mediaHeight/mediaWidth > videoTag.offsetHeight/videoTag.offsetWidth){
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

        if(mediaHeight/mediaWidth > videoTag.offsetHeight/videoTag.offsetWidth){
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

        var _pubS;

        switch(pubS.type) {
            case 0:
                emedia.stopTracks(pubS._localMediaStream);

                _pubS = new self.AVPubstream(pubS);

                setTimeout(function () {
                    self.openUserMedia(_pubS).then(function () {
                        pubS.localStream = _pubS.localStream;

                        pubS.isRepublished = true;

                        pubS.optimalVideoCodecs = pubS.optimalVideoCodecs || ( webrtc && webrtc.optimalVideoCodecs);
                        self.push(pubS, success, error);
                    }, error);
                }, 300);

                break;
            case 1:
                emedia.stopAndRemoveAudioTracks(pubS._localMediaStream);

                _pubS = new self.ShareDesktopPubstream(pubS);

                setTimeout(function () {
                    self.openUserMedia(_pubS).then(function () {
                        pubS.localStream = _pubS.localStream;

                        pubS.isRepublished = true;

                        pubS.optimalVideoCodecs = pubS.optimalVideoCodecs || ( webrtc && webrtc.optimalVideoCodecs);
                        self.push(pubS, success, error);
                    }, error);
                }, 300);

                break;
            case 2:
                emedia.stopTracks(pubS._localMediaStream);

                _pubS = new self.AudioMixerPubstream(pubS);

                setTimeout(function () {
                    self.openUserMedia(_pubS).then(function () {
                        pubS.localStream = _pubS.localStream;

                        pubS.isRepublished = true;

                        pubS.optimalVideoCodecs = pubS.optimalVideoCodecs || ( webrtc && webrtc.optimalVideoCodecs);
                        self.push(pubS, success, error);
                    }, error);
                }, 300);

                break;
        }
    },

    chanageCamera: function(pubS, error){
        var self = this;

        if(typeof pubS === 'string'){ //id
            pubS = self.current._cacheStreams[pubS];
        } else if(pubS.id){
            pubS = self.current._cacheStreams[pubS.id];
        }

        if(pubS.voff){
            _logger.warn("Stream id = ", pubS.id, " voff, do not chanage camera.");
            return;
        }

        self.getMediaDevices("videoinput", function (devices) {
            if(devices.length <= 1){
                _logger.warn("Only video input. not chanage");
                return;
            }


            var cameraIndex = (pubS._cameraIndex === null || pubS._cameraIndex === undefined) ? 0 : pubS._cameraIndex;
            while(cameraIndex < devices.length){
                var lastDevice = devices[cameraIndex];
                cameraIndex = (cameraIndex + 1) % devices.length;

                var device = devices[cameraIndex];

                var videoTracks = pubS._localMediaStream.getVideoTracks();
                if(!videoTracks || videoTracks.length === 0 || device.label != videoTracks[0].label){
                    break;
                }
            }

            var device = devices[cameraIndex];
            var deviceInfoLabel = device.label;

            _logger.warn("Stream ", pubS.id, lastDevice.label, ">>", deviceInfoLabel);

            pubS._cameraIndex = cameraIndex;

            pubS.constaints || (pubS.constaints = {});
            pubS.constaints.video = (typeof pubS.constaints.video === "object") ? pubS.constaints.video : {};
            pubS.constaints.video.deviceId = {exact: device.deviceId};

            self._republish(pubS, function(){
            },function (_evt) {
                if(_evt instanceof emedia.event.OpenMediaError){ //设备可能不支持，比如 没有摄像头，或 被禁止访问摄像头
                    pubS.constaints.video = false;
                }

                error && error(_evt);
            });
        }, error);
    },

    voff: function(pubS, _voff, error){
        var self = this;

        if(typeof pubS === 'string'){ //id
            pubS = self.current._cacheStreams[pubS];
        }

        _voff = _voff ? 1 : 0;
        pubS.voff = _voff;

        function updateAndDisabled() {
            emedia.enableVideoTracks(pubS.getMediaStream(), !_voff);

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

        if(typeof pubS === 'string'){ //id
            pubS = self.current._cacheStreams[pubS];
        }

        _aoff = _aoff ? 1 : 0;
        pubS.aoff = _aoff;

        function updateAndDisabled() {
            emedia.enableAudioTracks(pubS.getMediaStream(), !_aoff);
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

    _onCapturePicture: function (evt) {
        var self = this;

        var rspBase64Pic = evt.arg.rspBase64Pic;
        var streamId = evt.arg.streamId;
        var stream = self.current._cacheStreams[streamId];

        var base64;
        if(rspBase64Pic){
            var htmlVideo;
            if(typeof self.getHTMLVideo !== "function" || !(htmlVideo = self.getHTMLVideo(streamId))){
                _logger.warn("Not support capture picture. caused by htmlVideo not found");
                return;
            }

            base64 = self.getCaptureBase64Context(htmlVideo);
        }else{
            if(typeof self.onCapturePicture !== "function"){
                _logger.warn("Not support capture picture. caused by onCapturePicture not found");
                return;
            }
            self.onCapturePicture(stream);
        }

        var message = self.current.newMessage({
            op: 1001,
            tsxId: evt.tsxId,
            memId: evt.memId,
            arg: JSON.stringify(base64 ? {pic: base64} : {}),
            result: 0
        });

        self.current.postMessage(message, function (rsp) {
            _logger.warn("Send remote control onCapturePicture response. the result = ", rsp.result, rsp.msg || "");
        });

        return true;
    },

    // _onRemotePannelControl: function (evt) {
    //
    // },

    newSession: function (attendee, ticket) {
        var self = this;

        var ExtendSession = self.Session || Session;
        var session = new ExtendSession({
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
                attendee.onExit(evt.cver, evt.memId, evt.reason || 0);
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
                attendee.onStreamControl(evt.cver, evt.streamId, evt.voff, evt.aoff, evt.sver);
            },
            onRemoteControl: function (evt) {
                if(typeof evt.arg === 'string'){
                    evt.arg = JSON.parse(evt.arg);
                }
                if(evt.arg.op2 === 20 && evt.arg.pic && self._onCapturePicture.call(self, evt)){
                    return;
                }
                if(evt.arg.op2 === 30 && self._onRemotePannelControl){
                    try{
                        self._onRemotePannelControl.call(self, evt);
                        return;
                    }catch (e){
                        _logger.warn(e);
                    }
                }

                _logger.warn("Not support remote control");

                var message = attendee.newMessage({
                    op: 1001,
                    tsxId: evt.tsxId,
                    memId: evt.memId,
                    arg: JSON.stringify(evt.arg),
                    result: evt && evt.arg && evt.arg.op2 === 30 ? -405 : -507,
                    msg: "Not support the remote control."
                });

                attendee.postMessage(message, function (rsp) {
                    _logger.warn("Send remote control response. the result = ", rsp.result, rsp.msg || "");
                });
            },
            onRecvRemoteMessage: function (evt) {
                attendee._onRecvRemoteMessage && attendee._onRecvRemoteMessage(evt.memId, evt.arg, evt);
            }
        });

        return session;
    },

    _judgeTalking: function (meter) {
        if(!meter){
            return false;
        }

        return meter.instant >= emedia.config.judgeTalkingByInstantGE;
    },

    graffitiVideo: function (streamId, videoTag, canvasTag) {
        var self = this;

        var easemobStream = self.getStreamById(streamId);

        var mediaStream = new MediaStream();
        mediaStream._located = true;

        easemobStream._localMediaStream.getAudioTracks().forEach(function(track) {
            mediaStream.addTrack(track);
        });

        var drawStream = canvasTag.captureStream(25);
        drawStream.getVideoTracks().forEach(function(track) {
            mediaStream.addTrack(track);
        });

        videoTag.srcObject = mediaStream;

        easemobStream.localStream = mediaStream;
        easemobStream.isRepublished = true;
        easemobStream.optimalVideoCodecs = easemobStream.optimalVideoCodecs;
        self.push(easemobStream);
    },

    resetCanvas: function (canvasTag) {
        var set;
        if(arguments.length > 1){
            for(var i = 0; i < arguments.length; i++){
                set = arguments[i];

                typeof set === "function" && set(canvasTag);
                typeof set !== "function" && _util.isPlainObject(set) && _util.forEach(set, function (key, value) {
                    _logger.debug("Canvas set ", key, " = ", value);
                    canvasTag.setAttribute(key, value);
                });
            }
        }
    },

    _random: function (c) {
        return Math.floor(Math.random() * c)
    },
    requestFrame: function (stream, millis) {
        var self = this;

        var _cacheStream;
        if(typeof stream === "string"){
            _cacheStream = this.current._cacheStreams[stream];
        }else if(stream.id){
            _cacheStream = this.current._cacheStreams[stream.id];
        }else{
            return;
        }

        if(!_cacheStream){
            return;
        }

        function _requestFrame() {
            _cacheStream.requestFrame();

            if(_cacheStream.canvas){
                var redraw = DefaultMouseTrack.prototype.redraw.bind({_canvasContext: _cacheStream.canvas.getContext("2d")});
                //_logger.debug(self._random(255));
                redraw(3, 3);
            }
        }

        if(!millis){
            _requestFrame();
            return;
        }

        setTimeout(function () {
            _requestFrame();
            self.requestFrame(_cacheStream, millis);
        }, millis)
    },

    graffitiCanvas: function (withVoice, canvasTag) {
        if(_util.targetDOM(withVoice)){
            canvasTag = withVoice;
            withVoice = false;
        }

        var self = this;

        var pubS = new self.ShareDesktopPubstream({
            voff: 0,
            aoff: withVoice ? 0 : 1
        });

        canvasTag || (canvasTag = document.createElement("canvas"));

        //canvasTag.getContext("2d", {willReadFrequently: true}); //Fixed: Firefox captureStream  NS_ERROR_NOT_INITIALIZED
        canvasTag.getContext("2d");
        pubS.canvas = canvasTag;

        var diy = function () {}
        diy.prototype.setCanvas = function(set){
            this.canvasTag = canvasTag;
            self.resetCanvas(canvasTag, set);

            return this;
        }

        diy.prototype.push = function (frameRate, _onpushed) {
            var diy = this;
            diy._push(frameRate, _onpushed);
        }
        diy.prototype._push = function (frameRate, _onpushed) {
            if(typeof frameRate === "function"){
                _onpushed = frameRate;
                frameRate = undefined;
            }

            canvasTag.captureStream && (canvasTag.captureStream.enabled = true);
            var drawStream = canvasTag.captureStream(frameRate || 25);

            function pushed(stream) {
                stream.canvas = canvasTag;
                _onpushed && _onpushed(stream, canvasTag, drawStream);

                if(withVoice){ //发送一帧视频
                    stream.requestFrame();
                }
            }

            function pub(pubS, pushed) {
                var mediaStream = new MediaStream();
                mediaStream._located = true;

                pubS._localMediaStream && pubS._localMediaStream.getAudioTracks().forEach(function(track) {
                    mediaStream.addTrack(track);
                });

                drawStream.getVideoTracks().forEach(function(track) {
                    mediaStream.addTrack(track);
                });

                pubS._localMediaStream = mediaStream;
                pubS.localStream = mediaStream;
                self.push(pubS, pushed);
            }

            if(withVoice){
                self.__getUserMedia({audio: true}, function success(_user, stream) {
                    pubS._localMediaStream = stream;
                    pub(pubS, pushed);
                });
            }else{
                pub(pubS, pushed);
            }

            return this;
        }

        return new diy();
    }
});