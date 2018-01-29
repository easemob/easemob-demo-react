/**
 * WebRTC
 *
 *                              A                   |                                       B
 *                                                  |
 *   1.createMedia:got streamA                      | 1.createMedia:got streamB
 *   2.new RTCPeerConnection: APeerConnection       | 2.new RTCPeerConnection: BPeerConnection
 *   3.APeerConnection.createOffer:got offerA       |
 *      APeerConnection.setLocalDescription(offerA) |
 *      send offerA ---> ---> ---> --->        ---> |
 *                                                  | ---> 3.got offerA | offerA = new RTCSessionDescription(offerA);
 *                                                  | BPeerConnection.setRemoteDescription(offerA)
 *                                                  |
 *                                                  |
 *                                                  | 4.BPeerConnection.createAnswer: got answerB
 *                                                  | BPeerConnection.setLocalDescription(answerB)
 *                                                  | <---- send answerB
 *                                                  | 5.got answerB <--- <--- <--- <---
 *                                                  | answerB = new RTCSessionDescription(answerB)
 *                                                  |
 * APeerConnection.setRemoteDescription(answerB)    |
 *                                                  |
 * 6.got candidateA ---> --->  ---> --->            | ---> got candidateA
 *                                                  | BPeerConnection.addIceCandidate(new RTCIceCandidate(candidateA))
 *                                                  |
 *                                                  |
 *                                                  | got candidateB <--- <--- <--- <---
 *                                                  | <--- 6.got candidateB APeerConnection.addIceCandidate(candidateB)
 *                                                  |
 *                                                  |
 *                                                  | 7. APeerConnection.addStream(streamA)
 *                                                  | 7. BPeerConnection.addStream(streamB)
 *                                                  |
 *                              streamA >>>>>>>>>>> |  <<<<< see A
 *                              seeB <<<<<<<<<<<    | <<<<< streamB
 *                                                  |
 *
 */



var _util = require('./Util');
var _logger = _util.tagLogger("Webrtc");

var __event = require('./event');

var _SDPSection = {
    headerSection: null,

    audioSection: null,
    videoSection: null,

    _parseHeaderSection: function (sdp) {
        var index = sdp.indexOf('m=audio');
        if (index >= 0) {
            return sdp.slice(0, index);
        }

        index = sdp.indexOf('m=video');
        if (index >= 0) {
            return sdp.slice(0, index);
        }

        return sdp;
    },

    _parseAudioSection: function (sdp) {
        var index = sdp.indexOf('m=audio');
        if (index >= 0) {
            var endIndex = sdp.indexOf('m=video');
            return sdp.slice(index, endIndex < 0 ? sdp.length : endIndex);
        }
    },

    _parseVideoSection: function (sdp) {
        var index = sdp.indexOf('m=video');
        if (index >= 0) {
            return sdp.slice(index);
        }
    },

    spiltSection: function (sdp) {
        var self = this;

        self._preSDP = sdp;

        self.headerSection = self._parseHeaderSection(sdp);
        self.audioSection = self._parseAudioSection(sdp);
        self.videoSection = self._parseVideoSection(sdp);
    },

    updateVCodes: function (vcodes) {
        var self = this;

        if(!vcodes){
            return;
        }
        if(!self.videoSection){
            return;
        }

        if(typeof vcodes === "string"){
            var arr = [];
            arr.push(vcodes);
            vcodes = arr;
        }

        var vcodeMap = {};
        var regexp = /a=rtpmap:(\d+) ([A-Za-z0-9]+)\/.*/ig;
        var arr = self._parseLine(self.videoSection, regexp);
        for(var i = 0; i < arr.length; i++) {
            var codeNum = arr[++i];
            var code = arr[++i];
            vcodeMap[code] = codeNum;
        }

        //H264
        //if(/Firefox/.test(navigator.userAgent) || /Chrome/.test(navigator.userAgent)){ //a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1
            var h264_regexp = /a=fmtp:(\d+) .*profile-level-id=42e01f;?.*/ig;
            var h264_arr = self._parseLine(self.videoSection, h264_regexp);

            if(h264_arr && h264_arr.length >= 2){
                vcodeMap['H264'] = h264_arr[1];
            }
        //}

        var numCodes = []
        for(var i = 0; i < vcodes.length; i++){
            var supportVCode = vcodeMap[vcodes[i]];
            supportVCode && numCodes.push(supportVCode);
        }
        if(numCodes.length == 0){
            _logger.error("Not found vcodes map", vcodes);
            if(self._webrtc){
                _logger.error("Not found vcodes map", vcodes, self._webrtc._rtcId, self._webrtc.__id);
            }
        }

        var codeLineLastIndex = self.videoSection.indexOf('\r');
        var codeLine = self.videoSection.substring(0, codeLineLastIndex);

        var fields = codeLine.split(' ');

        Array.prototype.push.apply(numCodes, fields.slice(3));

        var newNumCodes = [];
        var _map = {};
        _util.forEach(numCodes, function (index, ele) {
            if(newNumCodes.length == 0){
                newNumCodes.push(ele);
                _map[ele] = true;
            } else {
                if(!_map[ele]){
                    newNumCodes.push(ele);
                    _map[ele] = true;
                }
            }
        });
        //alert(numCodes.join(' '));

        //fields.splice(3, 0, numCodes);
        fields.splice(3, fields.length - 3, newNumCodes.join(' '));

        codeLine = fields.join(' ');
        _logger.warn(codeLine);
        if(self._webrtc){
            _logger.warn(codeLine, self._webrtc._rtcId, self._webrtc.__id);
        }

        self.videoSection = codeLine + self.videoSection.substring(codeLineLastIndex);
    },

    removeSSRC: function (section) {
        var arr = [];

        var _arr = section.split(/a=ssrc:[^\n]+/g);
        for (var i = 0; i < _arr.length; i++) {
            _arr[i] != '\n' && arr.push(_arr[i]);
        }
        // arr.push('');

        return arr.join('\n');
    },

    removeField_msid: function (section) {
        var arr = [];

        var _arr = section.split(/a=msid:[^\n]+/g);
        for (var i = 0; i < _arr.length; i++) {
            _arr[i] != '\n' && arr.push(_arr[i]);
        }
        // arr.push('');

        section = arr.join('\n');
        arr = [];

        _arr = section.split(/[\n]+/g);
        for (var i = 0; i < _arr.length; i++) {
            (_arr[i] != '\n') && arr.push(_arr[i]);
        }

        return arr.join('\n');
    },

    updateHeaderMsidSemantic: function (wms) {

        var self = this;

        var line = "a=msid-semantic: WMS " + wms;

        var _arr = self.headerSection.split(/a=msid\-semantic: WMS.*/g);
        var arr = [];
        switch (_arr.length) {
            case 1:
                arr.push(_arr[0]);
                break;
            case 2:
                arr.push(_arr[0]);
                arr.push(line);
                arr.push('\n');
                break;
            case 3:
                arr.push(_arr[0]);
                arr.push(line);
                arr.push('\n');
                arr.push(_arr[2]);
                arr.push('\n');
                break;
        }

        return self.headerSection = arr.join('');
    },

    updateAudioSSRCSection: function (ssrc, cname, msid, label) {
        var self = this;

        self.audioSection && (self.audioSection = self.removeSSRC(self.audioSection));
        self.audioSection && (self.audioSection = self.removeField_msid(self.audioSection));
        self.audioSection && (self.audioSection = self.audioSection + self.ssrcSection(ssrc, cname, msid, label));
    },


    updateVideoSSRCSection: function (ssrc, cname, msid, label) {
        var self = this;

        self.videoSection && (self.videoSection = self.removeSSRC(self.videoSection));
        self.videoSection && (self.videoSection = self.removeField_msid(self.videoSection));
        self.videoSection && (self.videoSection = self.videoSection + self.ssrcSection(ssrc, cname, msid, label))
    },

    getUpdatedSDP: function () {
        var self = this;

        var sdp = "";

        self.headerSection && (sdp += self.headerSection);
        self.audioSection && (sdp += self.audioSection);
        self.videoSection && (sdp += self.videoSection);

        return sdp;
    },

    parseMsidSemantic: function (header) {
        var self = this;

        var regexp = /a=msid\-semantic:\s*WMS (\S+)/ig;
        var arr = self._parseLine(header, regexp);

        arr && arr.length == 2 && (self.msidSemantic = {
            line: arr[0],
            WMS: arr[1]
        });

        return self.msidSemantic;
    },

    ssrcSection: function (ssrc, cname, msid, label) {
        var lines = [
            'a=ssrc:' + ssrc + ' cname:' + cname,
            'a=ssrc:' + ssrc + ' msid:' + msid + ' ' + label,
            'a=ssrc:' + ssrc + ' mslabel:' + msid,
            'a=ssrc:' + ssrc + ' label:' + label,
            ''
        ];

        return lines.join('\n');
    },

    parseSSRC: function (section) {
        var self = this;

        var regexp = new RegExp("a=(ssrc):(\\d+) (\\S+):(\\S+)", "ig");

        var arr = self._parseLine(section, regexp);
        if (arr) {
            var ssrc = {
                lines: [],
                updateSSRCSection: self.ssrcSection
            };

            for (var i = 0; i < arr.length; i++) {
                var e = arr[i];
                if (e.indexOf("a=ssrc") >= 0) {
                    ssrc.lines.push(e);
                } else {
                    switch (e) {
                        case 'ssrc':
                        case 'cname':
                        case 'msid':
                        case 'mslabel':
                        case 'label':
                            ssrc[e] = arr[++i];
                    }
                }
            }

            return ssrc;
        }
    },

    _parseLine: function (str, regexp) {
        var arr = [];

        var _arr;
        while ((_arr = regexp.exec(str)) != null) {
            for (var i = 0; i < _arr.length; i++) {
                arr.push(_arr[i]);
            }
        }

        if (arr.length > 0) {
            return arr;
        }
    }
};

var SDPSection = function (sdp, webrc) {
    _util.extend(this, _SDPSection);
    this._webrtc = webrc;
    this.spiltSection(sdp);
};


window.__rtc_globalCount = 0;

/**
 * Abstract
 * {
 *   onIceStateChange:
 *   onIceCandidate:
 *   onGotRemoteStream:
 *
 *   createRtcPeerConnection:
 *   createOffer:
 *   createPRAnswer:
 *   createAnswer:
 *   addIceCandidate:
 *   close:
 *   iceState:
 *
 *   setLocalStream:
 *   getRtcId:
 * }
 *
 */
/**
 * ICE 通道失败：
 * 1.set sdp 失败
 * 2.set cands 失败
 * 但最终都是 ice fail
 *
 *
 * onSetSessionDescriptionError
 * onCreateSessionDescriptionError
 * onAddIceCandidateError
 *
 * onIceStateChange  ice fail
 *
 */
var _WebRTC = _util.prototypeExtend({
    closed: false,
    sdpConstraints: {
        'mandatory': {
            'OfferToReceiveAudio': true,
            'OfferToReceiveVideo': true
        }
    },
    offerOptions: {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
    },

    optimalVideoCodecs: null,
    optimalAudioCodecs: null,

    __init__: function () {
        var self = this;

        self._rtcId || (self._rtcId = "RTC" + (__rtc_globalCount++));
        self.__id = "_i_" + (__rtc_globalCount++);

        self.__setRemoteSDP = false;
        self.__tmpRemoteCands = [];
        self.__tmpLocalCands = [];
        self._rtcPeerConnection = null;

        _logger.info("Webrtc created. rtcId = ", self._rtcId, ", __id = ", self.__id);
    },

    getRtcId: function(){
        return this._rtcId;
    },

    iceState: function () {
        var self = this;
        return self._rtcPeerConnection.iceConnectionState;
    },

    setSubArgs: function (subArgs) {
        var self = this;
        self.subArgs = subArgs;
    },

    updateRemoteBySubArgs: function (subArgs) {
        var self = this;

        self._remoteStream && self._remoteStream.getVideoTracks().forEach(function (track) {
            track.enabled = !(self.subArgs && self.subArgs.subSVideo === false);
            //_logger.debug("video track. enabled ", track.enabled, track);
        });
        self._remoteStream && self._remoteStream.getAudioTracks().forEach(function (track) {
            track.enabled = !(self.subArgs && self.subArgs.subSAudio === false);
            //_logger.debug("audio track. enabled ", track.enabled, track);
        });
    },

    createRtcPeerConnection: function (iceServerConfig) {
        var self = this;
        _logger.debug('begin create RtcPeerConnection ......', self._rtcId, self.__id, "closed:", self.closed);

        iceServerConfig || (iceServerConfig = self.iceServerConfig);

        if (iceServerConfig){ //reduce icecandidate number:add default value
            !iceServerConfig.iceServers && (iceServerConfig.iceServers = []);

            iceServerConfig.rtcpMuxPolicy = "require";
            iceServerConfig.bundlePolicy = "max-bundle";

            //iceServerConfig.iceTransportPolicy = 'relay';
            if(iceServerConfig.relayOnly){
                iceServerConfig.iceTransportPolicy = 'relay';
            }
        } else {
            iceServerConfig = null;
        }

        // iceServerConfig = {
        //     capAudio: true,
        //     capVideo: true,
        //     iceServers:[{
        //         credential: "+F34cGoWeMmwa+XtvibM7dr4Ccc=",
        //         url: "turn:101.200.76.93:3478",
        //         username: "easemob-demo#chatdemoui_yss000@easemob.com/webim_device_uuid%179310420104847360:1506431735"
        //     }],
        //     recvAudio: true,
        //     recvVideo: true,
        //     relayOnly: false,
        // };
        _logger.debug('RtcPeerConnection config:', iceServerConfig, self._rtcId, self.__id, "closed:", self.closed);

        var rtcPeerConnection = self._rtcPeerConnection = new RTCPeerConnection(iceServerConfig);
        rtcPeerConnection.__peerId = self._rtcId;
        _logger.debug('created local peer connection object', rtcPeerConnection, self._rtcId);


        rtcPeerConnection.onicecandidate = function (event) {
            //reduce icecandidate number: don't deal with tcp, udp only
            if (event.type == "icecandidate" && ((event.candidate == null) || / tcp /.test(event.candidate.candidate))) {
                return;
            }

            if(!event.candidate.candidate){
                throw "Not found candidate. candidate is error, " + event.candidate.candidate;
            }
            if(!self.__setRemoteSDP){
                (self.__tmpLocalCands || (self.__tmpLocalCands = {})).push(event.candidate);
                _logger.debug('On ICE candidate but tmp buffer caused by not set remote sdp: ', event.candidate.candidate,
                    self._rtcId, self.__id, "closed:", self.closed);
                return;
            }else{
                _logger.debug('On ICE candidate: ', event.candidate.candidate,
                    self._rtcId, self.__id, "closed:", self.closed);
            }
            self.onIceCandidate(event.candidate);
        };

        rtcPeerConnection.onicestatechange = function (event) {
            _logger.debug("ice connect state", self.webRtc.iceConnectionState(), "evt.target state", event.target.iceConnectionState,
                self._rtcId, self.__id, "closed:", self.closed);
            self.onIceStateChange(event);
        };

        rtcPeerConnection.oniceconnectionstatechange = function (event) {
            self.onIceStateChange(event);
        };

        rtcPeerConnection.onaddstream = function (event) {
            self._onGotRemoteStream(event);
        };
    },

    setLocalStream: function (localStream) {
        this._localStream = localStream;
        this._rtcPeerConnection.addStream(localStream);
        _logger.debug('Added local stream to RtcPeerConnection', localStream, self._rtcId, self.__id, "closed:", this.closed);
    },

    getLocalStream: function () {
        return this._localStream;
    },
    getRemoteStream: function () {
        return this._remoteStream;
    },

    createOffer: function (onCreateOfferSuccess, onCreateOfferError) {
        var self = this;

        _logger.debug('createOffer start...');

        return self._rtcPeerConnection.createOffer(self.offerOptions).then(
            function (desc) {
                self.offerDescription = desc;

                //_logger.debug('Offer ', desc, "closed:", self.closed);//_logger.debug('from \n' + desc.sdp);
                _logger.debug('setLocalDescription start', self._rtcId, self.__id, "closed:", self.closed, self.optimalVideoCodecs);
                //_logger.debug(desc.sdp);
                //_logger.debug(desc);

                if(self.optimalVideoCodecs && ((typeof self.optimalVideoCodecs === "string") || self.optimalVideoCodecs.length > 0)){
                    var sdpSection = new SDPSection(desc.sdp, self);
                    sdpSection.updateVCodes(self.optimalVideoCodecs);
                    desc.sdp = sdpSection.getUpdatedSDP();
                }
                //_logger.debug(desc.sdp);
                //_logger.debug(desc);
                //_logger.debug(JSON.stringify(desc));


                self._rtcPeerConnection.setLocalDescription(desc).then(
                    self.onSetLocalSessionDescriptionSuccess,
                    self.onSetSessionDescriptionError
                ).then(function () {
                    (onCreateOfferSuccess || self.onCreateOfferSuccess)(desc);
                });
            },
            (onCreateOfferError || self.onCreateSessionDescriptionError)
        );
    },

    createPRAnswer: function (onCreatePRAnswerSuccess, onCreatePRAnswerError) {
        var self = this;

        _logger.info(' createPRAnswer start', "closed:", self.closed);
        // Since the 'remote' side has no media stream we need
        // to pass in the right constraints in order for it to
        // accept the incoming offer of audio and video.
        return self._rtcPeerConnection.createAnswer(self.sdpConstraints).then(
            function (desc) {
                _logger.debug('_____________PRAnswer ', desc.sdp, self._rtcId, self.__id, "closed:", self.closed);//_logger.debug('from :\n' + desc.sdp);

                desc.type = "pranswer";
                desc.sdp = desc.sdp.replace(/a=recvonly/g, 'a=inactive');


                self.__prAnswerDescription = desc;

                _logger.debug('inactive PRAnswer ', desc.sdp, self._rtcId, self.__id, "closed:", self.closed);//_logger.debug('from :\n' + desc.sdp);
                _logger.debug('setLocalDescription start', self._rtcId, self.__id, "closed:", self.closed);

                self._rtcPeerConnection.setLocalDescription(desc).then(
                    self.onSetLocalSuccess,
                    self.onSetSessionDescriptionError
                ).then(function () {
                    var sdpSection = new SDPSection(desc.sdp);
                    sdpSection.updateHeaderMsidSemantic("MS_0000");
                    sdpSection.updateAudioSSRCSection(1000, "CHROME0000", "MS_0000", "LABEL_AUDIO_1000");
                    sdpSection.updateVideoSSRCSection(2000, "CHROME0000", "MS_0000", "LABEL_VIDEO_2000");

                    desc.sdp = sdpSection.getUpdatedSDP();

                    _logger.debug('Send PRAnswer ', desc.sdp, self._rtcId, self.__id, "closed:", self.closed);//_logger.debug('from :\n' + desc.sdp);

                    (onCreatePRAnswerSuccess || self.onCreatePRAnswerSuccess)(desc);
                });
            },
            (onCreatePRAnswerError || self.onCreateSessionDescriptionError)
        );
    },

    createAnswer: function (onCreateAnswerSuccess, onCreateAnswerError) {
        var self = this;

        _logger.info('createAnswer start', "closed:", self.closed);
        // Since the 'remote' side has no media stream we need
        // to pass in the right constraints in order for it to
        // accept the incoming offer of audio and video.
        return self._rtcPeerConnection.createAnswer(self.sdpConstraints).then(
            function (desc) {
                _logger.debug('_____________________Answer ', desc.sdp, self._rtcId, self.__id, "closed:", self.closed);//_logger.debug('from :\n' + desc.sdp);

                desc.type = 'answer';

                if(emedia.supportPRAnswer){
                    var sdpSection = new SDPSection(desc.sdp);
                    var ms = sdpSection.parseMsidSemantic(sdpSection.headerSection);
                    if(ms.WMS == '*') {
                        sdpSection.updateHeaderMsidSemantic(ms.WMS = "MS_0000");
                    }
                    var audioSSRC = sdpSection.parseSSRC(sdpSection.audioSection);
                    var videoSSRC = sdpSection.parseSSRC(sdpSection.videoSection);

                    sdpSection.updateAudioSSRCSection(1000, "CHROME0000", ms.WMS, audioSSRC.label || "LABEL_AUDIO_1000");
                    if(videoSSRC){
                        sdpSection.updateVideoSSRCSection(2000, "CHROME0000", ms.WMS, videoSSRC.label || "LABEL_VIDEO_2000");
                    }
                    // mslabel cname

                    desc.sdp = sdpSection.getUpdatedSDP();
                }


                self.__answerDescription = desc;

                _logger.debug('Answer ', desc.sdp, self._rtcId, self.__id, "closed:", self.closed);//_logger.debug('from :\n' + desc.sdp);
                _logger.debug('setLocalDescription start', self._rtcId, self.__id, "closed:", self.closed);

                self._rtcPeerConnection.setLocalDescription(desc).then(
                    self.onSetLocalSuccess,
                    self.onSetSessionDescriptionError
                ).then(function () {
                    if(emedia.supportPRAnswer){
                        var sdpSection = new SDPSection(desc.sdp);

                        sdpSection.updateHeaderMsidSemantic("MS_0000");
                        sdpSection.updateAudioSSRCSection(1000, "CHROME0000", "MS_0000", "LABEL_AUDIO_1000");
                        sdpSection.updateVideoSSRCSection(2000, "CHROME0000", "MS_0000", "LABEL_VIDEO_2000");

                        desc.sdp = sdpSection.getUpdatedSDP();
                    }

                    _logger.debug('Send Answer ', desc.sdp, self._rtcId, self.__id, "closed:", self.closed);//_logger.debug('from :\n' + desc.sdp);

                    (onCreateAnswerSuccess || self.onCreateAnswerSuccess)(desc);
                });
            },
            (onCreateAnswerError || self.onCreateSessionDescriptionError)
        );
    },

    close: function (remainLocalStream) {
        var self = this;
        _logger.warn("webrtc closing", "closed:", self._rtcId, self.__id, self.closed);

        if(self.closed){
            return;
        }


        self.closed = true;

        try {
            self._rtcPeerConnection && self._rtcPeerConnection.close();
        } catch (e) {
            _logger.error(e);
        } finally {

            // if (!remainLocalStream && self._localStream) {
            //     self._localStream.getTracks().forEach(function (track) {
            //         track.stop();
            //     });
            //     self._localStream = null;
            // }

            if (self._remoteStream) {
                self._remoteStream.getTracks().forEach(function (track) {
                    track.stop();
                });
            }
            self._remoteStream = null;

            self.onClose && self.onClose();

            _logger.warn("webrtc closed. closed:", self._rtcId, self.__id, self.closed);
        }
    },

    addIceCandidate: function (candidate) {
        var self = this;

        if (!self._rtcPeerConnection) {
            return;
        }

        _logger.debug('Add ICE candidate: ', candidate, self._rtcId, self.__id, "closed:", self.closed);

        var _cands = _util.isArray(candidate) ? candidate : [];
        !_util.isArray(candidate) && _cands.push(candidate);

        if(!self.__setRemoteSDP){
            Array.prototype.push.apply((self.__tmpRemoteCands || (self.__tmpRemoteCands = {})), _cands);

            _logger.debug('Add ICE candidate but tmp buffer caused by not set remote sdp: ', candidate, self._rtcId, self.__id, "closed:", self.closed);
            return;
        }

        for (var i = 0; i < _cands.length; i++) {
            candidate = _cands[i];

            self._rtcPeerConnection.addIceCandidate(new RTCIceCandidate(candidate)).then(
                self.onAddIceCandidateSuccess,
                self.onAddIceCandidateError
            );
        }
    },

    setRemoteDescription: function (desc) {
        var self = this;

        _logger.debug('setRemoteDescription start. ', desc, self._rtcId, self.__id, "closed:", self.closed);

        desc.sdp = desc.sdp.replace(/UDP\/TLS\/RTP\/SAVPF/g, "RTP/SAVPF");
        _logger.debug('setRemoteDescription.', desc, "closed:", self.closed);

        desc = new RTCSessionDescription(desc);

        return self._rtcPeerConnection.setRemoteDescription(desc).then(
            function() {
                self.__setRemoteSDP = true;
                self.onSetRemoteSuccess.apply(self, arguments);

                if(self.__tmpLocalCands && self.__tmpLocalCands.length > 0){
                    _logger.debug('After setRemoteDescription. send cands', self._rtcId, self.__id, "closed:", self.closed);
                    self.onIceCandidate(self.__tmpLocalCands);

                    self.__tmpLocalCands = [];
                }

                if(self.__tmpRemoteCands && self.__tmpRemoteCands.length > 0){
                    _logger.debug('After setRemoteDescription. add tmp cands', self._rtcId, self.__id, "closed:", self.closed);
                    self.addIceCandidate(self.__tmpRemoteCands);

                    self.__tmpRemoteCands = [];
                }
            },
            self.onSetSessionDescriptionError
        );
    },

    iceConnectionState: function () {
        var self = this;

        return self._rtcPeerConnection.iceConnectionState;
    },

    isConnected: function () {
        var self = this;

        var state = self._rtcPeerConnection.iceConnectionState;

        return "connected" === state || "completed" === state;
    },

    _onGotRemoteStream: function (event) {
        _logger.debug('onGotRemoteStream.', self._rtcId, self.__id, event);
        this._remoteStream = event.stream;
        this.onGotRemoteStream(this._remoteStream, event);

        _logger.debug('received remote stream, you will see the other.', self._rtcId, self.__id, "closed:", this.closed);
    },

    onSetRemoteSuccess: function () {
        _logger.info('onSetRemoteSuccess complete', self._rtcId);
    },

    onSetLocalSuccess: function () {
        _logger.info('setLocalDescription complete', self._rtcId);
    },

    onAddIceCandidateSuccess: function () {
        _logger.debug('addIceCandidate success', self._rtcId);
    },

    onAddIceCandidateError: function (error) {
        _logger.debug('failed to add ICE Candidate: ' + error.toString(), self._rtcId);
    },

    onIceCandidate: function (candidate) {
        _logger.debug('onIceCandidate : ICE candidate: \n' + candidate, self._rtcId);
    },

    onIceStateChange: function (event) {
        _logger.debug('onIceStateChange : ICE state change event: ', self._rtcId);
    },

    onCreateSessionDescriptionError: function (error) {
        _logger.error('Failed to create session description: ' + error.toString(), self._rtcId);
    },

    onCreateOfferSuccess: function (desc) {
        _logger.debug('create offer success', self._rtcId);
    },

    onCreatePRAnswerSuccess: function (desc) {
        _logger.debug('create answer success', self._rtcId);
    },

    onCreateAnswerSuccess: function (desc) {
        _logger.debug('create answer success', self._rtcId);
    },

    onSetSessionDescriptionError: function (error) {
        _logger.error('onSetSessionDescriptionError : Failed to set session description: ' + error.toString(), self._rtcId);
    },

    onSetLocalSessionDescriptionSuccess: function () {
        _logger.debug('onSetLocalSessionDescriptionSuccess : setLocalDescription complete', self._rtcId);
    },

    onGotRemoteStream: function(remoteStream){
        _logger.debug("Got remote stream. ", remoteStream, self._rtcId);
    }
});

module.exports = _WebRTC;
