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

var SDPUtils = require('sdp'); //希望使用 SDPUtils 取代 SDPSection

var _SDPSection = {
    headerSection: null,

    audioSection: null,
    videoSection: null,

    _parseHeaderSection: function (sdp, audioIndex, videoIndex) {
        var index = audioIndex;

        if(videoIndex === -1){ //保持不变
        }else if(audioIndex === -1){
            index = videoIndex;
        }else{
            index = Math.min(audioIndex, videoIndex);
        }

        if (index >= 0) {
            return sdp.slice(0, index);
        }
        return sdp;
    },

    _parseAudioSection: function (sdp, audioIndex, videoIndex) {
        var index = audioIndex;
        if (index >= 0) {
            return sdp.slice(index, videoIndex < index ? sdp.length : videoIndex);
        }
    },

    _parseVideoSection: function (sdp, audioIndex, videoIndex) {
        var index = videoIndex;
        if (index >= 0) {
            return sdp.slice(index, audioIndex < index ? sdp.length : audioIndex);
        }
    },

    spiltSection: function (sdp) {
        var self = this;

        self._preSDP = sdp;

        var audioIndex = self._preAudioIndex = sdp.indexOf('m=audio');
        var videoIndex = self._preVideoIndex = sdp.indexOf('m=video');

        self.headerSection = self._parseHeaderSection(sdp, audioIndex, videoIndex);
        self.audioSection = self._parseAudioSection(sdp, audioIndex, videoIndex);
        self.videoSection = self._parseVideoSection(sdp, audioIndex, videoIndex);
    },

    updateVideoSendonly: function () {
        var self = this;

        if(!self.videoSection){
            return;
        }

        self.videoSection = self.videoSection.replace(/sendrecv/g, "sendonly");
    },

    updateVideoRecvonly: function () {
        var self = this;

        if(!self.videoSection){
            return;
        }

        self.videoSection = self.videoSection.replace(/sendrecv/g, "recvonly");
    },

    updateAudioSendonly: function () {
        var self = this;

        if(!self.audioSection){
            return;
        }

        self.audioSection = self.audioSection.replace(/sendrecv/g, "sendonly");
    },

    updateAudioRecvonly: function () {
        var self = this;

        if(!self.audioSection){
            return;
        }

        self.audioSection = self.audioSection.replace(/sendrecv/g, "recvonly");
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
            _logger.warn("Not found vcodes map", vcodes);
            if(self._webrtc){
                _logger.warn("Not found vcodes map", vcodes, self._webrtc._rtcId, self._webrtc.__id);
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
        //_logger.info(codeLine);
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

    getUpdatedSDP: function (audioVideo) {
        var self = this;

        var sdp = "";

        self.headerSection && (sdp += self.headerSection);

        if(audioVideo === true
            || (audioVideo === undefined && self._preAudioIndex < self._preVideoIndex)){
            self.audioSection && (sdp += self.audioSection);
            self.videoSection && (sdp += self.videoSection);
        }else{
            self.videoSection && (sdp += self.videoSection);
            self.audioSection && (sdp += self.audioSection);
        }

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

SDPSection.isAudioVideo = function (sdp) {
    var audioIndex = sdp.indexOf('m=audio');
    var videoIndex = sdp.indexOf('m=video');

    return audioIndex < videoIndex;
}

SDPSection.isVideoPreAudio = function (sdp) {
    var audioIndex = sdp.indexOf('m=audio');
    var videoIndex = sdp.indexOf('m=video');

    return audioIndex >= 0 && videoIndex>=0 && videoIndex < audioIndex;
}


var __rtc_globalCount = emedia.__rtc_globalCount = 0;

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

    /**
     * offerToReceiveAudio false sendonly, or sendrecv
     * offerToReceiveVideo false sendonly, or sendrecv
     *
     */
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

        self.cctx = self.__id;

        _logger.info("Webrtc created.", self._rtcId, self.__id);
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

    getReceiversOfPeerConnection: function () {
        var self = this;

        if(!self._rtcPeerConnection){
            return;
        }

        if(self._rtcPeerConnection.iceConnectionState == 'closed'){
            return;
        }

        return self._rtcPeerConnection.getReceivers();
    },

    updateRemoteBySubArgs: function () {
        var self = this;

        if(!self.subArgs){
            return;
        }
        if(!self._remoteStream){
            return;
        }

        emedia.enableVideoTracks(self._remoteStream, !(self.subArgs && self.subArgs.subSVideo === false));
        emedia.enableAudioTracks(self._remoteStream, !(self.subArgs && self.subArgs.subSAudio === false));

        _logger.info("enable tracks remote stream", self._remoteStream, self._rtcId, self.__id,  self.closed);
    },

    createRtcPeerConnection: function (iceServerConfig) {
        var self = this;
        _logger.debug('begin create peer connection ......', self._rtcId, self.__id,  self.closed);

        iceServerConfig || (iceServerConfig = self.iceServerConfig);

        if (iceServerConfig || emedia.isEdge){ //reduce icecandidate number:add default value
            iceServerConfig || (iceServerConfig = {});
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
        _logger.info('create pc, set config:', iceServerConfig, self._rtcId, self.__id,  self.closed);

        var rtcPeerConnection = self._rtcPeerConnection = new RTCPeerConnection(iceServerConfig);
        rtcPeerConnection.__peerId = self._rtcId;
        _logger.debug('created local peer connection object', rtcPeerConnection, self._rtcId);


        rtcPeerConnection.onicecandidate = function (event) {
            var candidate = event.candidate;

            //reduce icecandidate number: don't deal with tcp, udp only
            if (event.type == "icecandidate"
                && ((!candidate)
                    || (typeof candidate.protocol === 'string' && candidate.protocol.toLowerCase() === 'tcp')
                    || / TCP /.test(candidate.candidate))) {
                _logger.debug("On ICE candidate: drop", candidate, self._rtcId, self.__id,  self.closed);
                return;
            }

            if(!candidate.candidate){
                throw "Not found candidate. candidate is error, " + event.candidate.candidate;
            }

            candidate.cctx = self.cctx;
            if(!self.__setRemoteSDP){
                (self.__tmpLocalCands || (self.__tmpLocalCands = {})).push(candidate);
                _logger.debug('On ICE candidate ok: but tmp buffer caused by not set remote sdp: ', candidate,
                    self._rtcId, self.__id,  self.closed);
                return;
            }else{
                _logger.debug('On ICE candidate ok: ', candidate, self._rtcId, self.__id,  self.closed);
            }
            self._onIceCandidate(candidate);
        };

        function stateChange(event) {
            _logger.info("states: conn", (rtcPeerConnection.connectionState || rtcPeerConnection.iceConnectionState),
                ", ice", rtcPeerConnection.iceConnectionState, "@", self._rtcId, self.__id,  self.closed);
            try {
                self.onIceStateChange(rtcPeerConnection.iceConnectionState);
            }finally{

            }
        }

        rtcPeerConnection.onconnectionstatechange = stateChange.bind(self);
        rtcPeerConnection.onicestatechange =  stateChange.bind(self);
        rtcPeerConnection.oniceconnectionstatechange =  stateChange.bind(self);
        rtcPeerConnection.onsignalingstatechange = function (event) {
            _logger.info("states: signaling", rtcPeerConnection.signalingState, "@", self._rtcId, self.__id,  self.closed);
        }

        if(rtcPeerConnection.ontrack === null){
            self._onTrack && (rtcPeerConnection.ontrack = function (event) {
                self._onTrack(event);
            });
        }

        rtcPeerConnection.onaddstream = function (event) {
            self._onGotRemoteStream(event);
        };
    },

    addTrack: function(tracks, stream){
        var self = this;

        tracks.forEach(function(track) {
            self._rtcPeerConnection.addTrack(track, stream);
        });
    },
    setLocalStream: function (localStream) {
        var self = this;

        self._localStream = localStream;

        if(self._rtcPeerConnection.addTrack){
            localStream.getTracks().forEach(function(track) {
                self._rtcPeerConnection.addTrack(track, localStream);
            });
        }else{
            self._rtcPeerConnection.addStream(localStream);
        }
        _logger.debug('Added local stream to RtcPeerConnection', localStream, self._rtcId, self.__id, this.closed);
    },

    removeStream: function (mediaStream) {
        this._rtcPeerConnection.removeStream(mediaStream);
        _logger.debug('Remove stream from RtcPeerConnection', mediaStream, self._rtcId, self.__id, this.closed);
    },

    getLocalStream: function () {
        return this._localStream;
    },
    getRemoteStream: function () {
        return this._remoteStream;
    },

    createOffer: function (onCreateOfferSuccess, onCreateOfferError) {
        var self = this;

        _logger.debug('createOffer start...', self.offerOptions);

        var offerOptions = _util.extend({}, self.offerOptions);

        //offerToReceiveAudio = false时，chrome没有video段；safari却这个块。需要将sendrecv改为sendonly
        //由于手机没有视频发布时，sdp中有video字段，而 web以offerToReceiveVideo = false去订阅时，导致订阅流中没有video块，会引发重协商。进而导致 始终无法看到对方视频
        //所以 订阅流时 无论offerToReceiveVideo = false，都生成offer sdp；其中都有video块。即 offerToReceiveVideo = true；但要将sdp修改为recvonly
        if(self.subArgs){
            offerOptions = {
                offerToReceiveAudio: true,
                offerToReceiveVideo: true
            }
        }

        return self._rtcPeerConnection.createOffer(offerOptions).then(
            function (desc) {
                self.offerDescription = desc;

                if(emedia.isEdge){
                    desc.sdp = desc.sdp.replace(/profile-level-id=[^;]+/, "profile-level-id=42e01f");
                }
                if(emedia.isFirefox){
                    //需要交换 cand answer
                    self.fireFoxOfferVideoPreAudio = SDPSection.isVideoPreAudio(desc.sdp);
                }
                desc.sdp = desc.sdp.replace(/m=video 0/g, "m=video 9");
                _logger.warn("setLocalDescription. modify offer. if 'm=video 0' -> 'm=video 9'; if H264, 'profile-level-id=42e01f'", self._rtcId, self.__id);

                var updateVCodes;
                if((updateVCodes = (self.optimalVideoCodecs && ((typeof self.optimalVideoCodecs === "string") || self.optimalVideoCodecs.length > 0)))
                    || (self.offerOptions && (self.offerOptions.offerToReceiveVideo === false || self.offerOptions.offerToReceiveAudio === false))
                ){
                    var sdpSection = new SDPSection(desc.sdp, self);
                    updateVCodes && sdpSection.updateVCodes(self.optimalVideoCodecs);

                    if(!emedia.isSafari && self.subArgs){ //订阅流
                        // self.offerOptions && self.offerOptions.offerToReceiveVideo === false && sdpSection.updateVideoRecvonly();
                        // self.offerOptions && self.offerOptions.offerToReceiveAudio === false && sdpSection.updateAudioRecvonly();
                    }else{
                        emedia.isSafari && self.offerOptions && self.offerOptions.offerToReceiveVideo === false && sdpSection.updateVideoSendonly();
                        emedia.isSafari && self.offerOptions && self.offerOptions.offerToReceiveAudio === false && sdpSection.updateAudioSendonly();
                    }

                    desc.sdp = sdpSection.getUpdatedSDP();
                }

                _logger.debug('setLocalDescription start', desc, self._rtcId, self.__id,  self.closed, self.optimalVideoCodecs);
                self._rtcPeerConnection.setLocalDescription(desc).then(
                    self._onSetLocalSessionDescriptionSuccess.bind(self),
                    self._onSetSessionDescriptionError.bind(self)
                ).then(function () {
                    desc.cctx = self.cctx;
                    (onCreateOfferSuccess || self.onCreateOfferSuccess.bind(self))(desc);
                });
            },
            (onCreateOfferError || self._onCreateSessionDescriptionError.bind(self))
        );
    },

    createPRAnswer: function (onCreatePRAnswerSuccess, onCreatePRAnswerError) {
        var self = this;

        _logger.info(' createPRAnswer start',  self.closed, self.sdpConstraints);
        // Since the 'remote' side has no media stream we need
        // to pass in the right constraints in order for it to
        // accept the incoming offer of audio and video.
        return self._rtcPeerConnection.createAnswer(self.sdpConstraints).then(
            function (desc) {
                _logger.debug('_____________PRAnswer ', desc.sdp, self._rtcId, self.__id,  self.closed);//_logger.debug('from :\n' + desc.sdp);

                desc.type = "pranswer";
                desc.sdp = desc.sdp.replace(/a=recvonly/g, 'a=inactive');


                self.__prAnswerDescription = desc;

                _logger.debug('inactive PRAnswer ', desc.sdp, self._rtcId, self.__id,  self.closed);//_logger.debug('from :\n' + desc.sdp);
                _logger.debug('setLocalDescription start', desc, self._rtcId, self.__id,  self.closed);

                self._rtcPeerConnection.setLocalDescription(desc).then(
                    self._onSetLocalSessionDescriptionSuccess.bind(self),
                    self._onSetSessionDescriptionError.bind(self)
                ).then(function () {
                    var sdpSection = new SDPSection(desc.sdp);
                    sdpSection.updateHeaderMsidSemantic("MS_0000");
                    sdpSection.updateAudioSSRCSection(1000, "CHROME0000", "MS_0000", "LABEL_AUDIO_1000");
                    sdpSection.updateVideoSSRCSection(2000, "CHROME0000", "MS_0000", "LABEL_VIDEO_2000");

                    desc.sdp = sdpSection.getUpdatedSDP();

                    _logger.debug('Send PRAnswer ', desc.sdp, self._rtcId, self.__id,  self.closed);//_logger.debug('from :\n' + desc.sdp);

                    self.cctx && (desc.cctx = self.cctx);
                    (onCreatePRAnswerSuccess || self.onCreatePRAnswerSuccess.bind(self))(desc);
                });
            },
            (onCreatePRAnswerError || self._onCreateSessionDescriptionError.bind(self))
        );
    },

    createAnswer: function (onCreateAnswerSuccess, onCreateAnswerError) {
        var self = this;

        _logger.info('createAnswer start',  self.closed, self.sdpConstraints);
        // Since the 'remote' side has no media stream we need
        // to pass in the right constraints in order for it to
        // accept the incoming offer of audio and video.
        return self._rtcPeerConnection.createAnswer(self.sdpConstraints).then(
            function (desc) {
                _logger.debug('_____________________Answer ', self._rtcId, self.__id,  self.closed);//_logger.debug('from :\n' + desc.sdp);

                desc.type = 'answer';

                function updateSDP() {
                    var sdpSection = new SDPSection(desc.sdp);
                    var ms = sdpSection.parseMsidSemantic(sdpSection.headerSection);
                    if(!ms){
                        return;
                    }

                    if(ms.WMS == '*') {
                        sdpSection.updateHeaderMsidSemantic(ms.WMS = "MS_0000");
                    }
                    var audioSSRC = sdpSection.parseSSRC(sdpSection.audioSection);
                    var videoSSRC = sdpSection.parseSSRC(sdpSection.videoSection);

                    audioSSRC && sdpSection.updateAudioSSRCSection(1000, "CHROME0000", ms.WMS, audioSSRC.label || "LABEL_AUDIO_1000");
                    if(videoSSRC){
                        sdpSection.updateVideoSSRCSection(2000, "CHROME0000", ms.WMS, videoSSRC.label || "LABEL_VIDEO_2000");
                    }
                    // mslabel cname

                    desc.sdp = sdpSection.getUpdatedSDP();
                }

                if(emedia.supportPRAnswer){
                    updateSDP();
                }

                self.__answerDescription = desc;

                _logger.debug('Answer ', self._rtcId, self.__id,  self.closed);//_logger.debug('from :\n' + desc.sdp);
                _logger.debug('setLocalDescription start', desc, self._rtcId, self.__id,  self.closed);

                self._rtcPeerConnection.setLocalDescription(desc).then(
                    self._onSetLocalSessionDescriptionSuccess.bind(self),
                    self._onSetSessionDescriptionError.bind(self)
                ).then(function () {
                    if(emedia.supportPRAnswer){
                        var sdpSection = new SDPSection(desc.sdp);

                        sdpSection.updateHeaderMsidSemantic("MS_0000");
                        sdpSection.updateAudioSSRCSection(1000, "CHROME0000", "MS_0000", "LABEL_AUDIO_1000");
                        sdpSection.updateVideoSSRCSection(2000, "CHROME0000", "MS_0000", "LABEL_VIDEO_2000");

                        desc.sdp = sdpSection.getUpdatedSDP();
                    }

                    _logger.debug('Send Answer ', self._rtcId, self.__id,  self.closed);//_logger.debug('from :\n' + desc.sdp);

                    self.cctx && (desc.cctx = self.cctx);
                    (onCreateAnswerSuccess || self.onCreateAnswerSuccess.bind(self))(desc);
                });
            },
            (onCreateAnswerError || self._onCreateSessionDescriptionError.bind(self))
        );
    },

    close: function (remainLocalStream, onlyPeerConnectionClosed) {
        var self = this;
        _logger.warn("webrtc closing",  self._rtcId, self.__id, self.closed);

        if(self.closed){
            return;
        }

        onlyPeerConnectionClosed = (onlyPeerConnectionClosed === true);

        self.closed = true;

        try {
            self._rtcPeerConnection && self._rtcPeerConnection.close();
        } catch (e) {
            _logger.warn(e);
        } finally {
            if (self._remoteStream) {
                emedia.stopTracks(self._remoteStream);
            }
            self._remoteStream = null;

            if(!onlyPeerConnectionClosed){
                self.onClose && self.onClose();
            }

            _logger.warn("webrtc closed. closed:", self._rtcId, self.__id, self.closed);
        }
    },

    addIceCandidate: function (candidate) {
        var self = this;

        if (!self._rtcPeerConnection) {
            return;
        }

        _logger.debug('Add ICE candidate: ', candidate, self._rtcId, self.__id,  self.closed);

        var _cands = _util.isArray(candidate) ? candidate : [];
        !_util.isArray(candidate) && _cands.push(candidate);

        if(!self.__setRemoteSDP){
            Array.prototype.push.apply((self.__tmpRemoteCands || (self.__tmpRemoteCands = {})), _cands);

            _logger.debug('Add ICE candidate but tmp buffer caused by not set remote sdp: ', candidate, self._rtcId, self.__id,  self.closed);
            return;
        }

        for (var i = 0; i < _cands.length; i++) {
            candidate = _cands[i];

            if(candidate.cctx && candidate.cctx != self.cctx){
                _logger.warn('addIceCandidate fail drop. cctx not equal. ', candidate, self._rtcId, self.__id,  self.closed);
                continue;
            }

            //candidate.candidate = candidate.candidate.replace("172.17.2.130", "10.121.63.1");
            if(self.fireFoxOfferVideoPreAudio === true){
                //candidate.sdpMid = "sdparta_0";
                var oldLineIndex = candidate.sdpMLineIndex;
                candidate.sdpMLineIndex = parseInt(candidate.sdpMid.replace(/[^0-9]*/, ''));
                _logger.warn("Firefox sdp section video pre audio, sdp mline index update ", oldLineIndex, "->", candidate.sdpMLineIndex);
            }

            if(candidate.candidate && candidate.candidate !== ""){
                self._rtcPeerConnection.addIceCandidate(new RTCIceCandidate(candidate)).then(
                    self.onAddIceCandidateSuccess.bind(self),
                    self._onAddIceCandidateError.bind(self)
                );
            }else{
                _logger.warn("Add ICE candidate fail. drop it ", candidate, self._rtcId, self.__id,  self.closed);
            }
        }
    },

    setRemoteDescription: function (desc) {
        var self = this;

        _logger.debug('setRemoteDescription start. ', self._rtcId, self.__id,  self.closed);

        // 生成offer的
        // 会议模式，也是设置的是 pranswer 和 answer 会有服务器传回。
        // p2p模式下的主叫。此时设置的是 pranswer 和 answer。这个应该有p2p模式下传回。因此，需要如果有的话，需要判断
        if(self.offerDescription){
            if(desc.cctx && desc.cctx != self.cctx){
                _logger.warn('setRemoteDescription fail drop. cctx not equal. ', desc, self._rtcId, self.__id,  self.closed);
                return;
            }

            if(self.fireFoxOfferVideoPreAudio === true){
                //_logger.debug("Remote sdp.1", desc.sdp);

                var sdpSection = new SDPSection(desc.sdp, self);
                desc.sdp = sdpSection.getUpdatedSDP(false);
                _logger.info("Remote sdp.2. switch audio video", desc.sdp);
            }
        }else{//被叫 p2p模式，覆盖
            desc.cctx && (self.cctx = desc.cctx);
        }

        desc.sdp = desc.sdp.replace(/UDP\/TLS\/RTP\/SAVPF/g, "RTP/SAVPF");
        _logger.warn('setRemoteDescription. UDP/TLS/RTP/SAVPF -> RTP/SAVPF; if firefox: switch audio video;', self._rtcId, self.__id);
        _logger.debug('setRemoteDescription.', desc, self._rtcId, self.__id);

        desc = self.__remoteDescription = new RTCSessionDescription(desc);

        return self._rtcPeerConnection.setRemoteDescription(desc).then(
            function() {
                self.__setRemoteSDP = true;
                self._onSetRemoteSuccess.apply(self, arguments);

                if(self.__tmpLocalCands && self.__tmpLocalCands.length > 0){
                    _logger.debug('After setRemoteDescription. send cands', self._rtcId, self.__id,  self.closed);
                    self._onIceCandidate(self.__tmpLocalCands);

                    self.__tmpLocalCands = [];
                }

                if(self.__tmpRemoteCands && self.__tmpRemoteCands.length > 0){
                    _logger.debug('After setRemoteDescription. add tmp cands', self._rtcId, self.__id,  self.closed);
                    self.addIceCandidate(self.__tmpRemoteCands);

                    self.__tmpRemoteCands = [];
                }
            },
            self._onSetSessionDescriptionError.bind(self)
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
        var self = this;

        _logger.debug('onGotRemoteStream.', self._rtcId, self.__id, event);
        this._remoteStream = event.stream || event.streams[0];
        this._remoteStream._rtcId = this._rtcId;
        this._remoteStream.__rtc_c_id = this.__id;

        self.updateRemoteBySubArgs();

        this.onGotRemoteStream(this._remoteStream, event);

        _logger.debug('received remote stream, you will see the other.', self._rtcId, self.__id,  this.closed);
    },

    _onSetRemoteSuccess: function () {
        _logger.info('onSetRemoteSuccess success', this._rtcId, this.__id);
        this.onSetRemoteSuccess.apply(this, arguments);

        if(this.offerDescription && this.__remoteDescription && this.__remoteDescription.sdp){
            this._onAnswerCodes(this.__remoteDescription.sdp);
        }
    },

    _onAnswerCodes: function (sdp) {
        var self = this;
        var section = new SDPSection(sdp, this);
        if(section.videoSection){
            var rtpParams = SDPUtils.parseRtpParameters(section.videoSection);

            if(!rtpParams.codecs || rtpParams.codecs.length === 0){
                _logger.info("not found any video codes. @ ", self._rtcId, self.__id);
                return;
            }

            var vcodes = [];
            _util.forEach(rtpParams.codecs, function (_i, _param) {
                vcodes.push(_param.name);
            });

            self.finalVCodeChoices = vcodes;

            self.onVCodeChoices && self.onVCodeChoices(vcodes);
        }
    },

    onSetRemoteSuccess: function () {
    },

    onAddIceCandidateSuccess: function () {
        _logger.debug('addIceCandidate success', this._rtcId, this.__id);
    },

    _onAddIceCandidateError: function (error) {
        _logger.error('failed to add ICE Candidate: ' + error.toString(), this._rtcId, this.__id);
        this.onAddIceCandidateError(error);
    },
    onAddIceCandidateError: function (error) {
    },

    _onIceCandidate: function (candidate) {
        _logger.debug('onIceCandidate:', candidate, this._rtcId, this.__id);
        this.onIceCandidate(candidate);
    },
    onIceCandidate: function (candidate) {
    },

    onIceStateChange: function (state) {
        _logger.debug('onIceStateChange : ICE state ', state);
    },

    _onCreateSessionDescriptionError: function (error) {
        _logger.error('Failed to create session description: ' + error.toString(), this._rtcId, this.__id);
        this.onCreateSessionDescriptionError(error);
    },
    onCreateSessionDescriptionError: function (error) {
    },

    onCreateOfferSuccess: function (desc) {
        _logger.debug('create offer success', this._rtcId, this.__id);
    },

    onCreatePRAnswerSuccess: function (desc) {
        _logger.debug('create answer success', this._rtcId, this.__id);
    },

    onCreateAnswerSuccess: function (desc) {
        _logger.debug('create answer success', this._rtcId, this.__id);
    },

    _onSetSessionDescriptionError: function (error) {
        _logger.error('onSetSessionDescriptionError : Failed to set session description: ' + error.toString(), this._rtcId, this.__id);
        this.onSetSessionDescriptionError(error);
    },
    onSetSessionDescriptionError: function (error) {
    },
    _onSetLocalSessionDescriptionSuccess: function () {
        _logger.debug('onSetLocalSessionDescriptionSuccess : setLocalDescription complete', this._rtcId, this.__id);
        this.onSetLocalSessionDescriptionSuccess();

        if(this.__answerDescription && this.__answerDescription.sdp){
            this._onAnswerCodes(this.__answerDescription.sdp);
        }
    },
    onSetLocalSessionDescriptionSuccess: function () {

    },

    onGotRemoteStream: function(remoteStream){
        _logger.debug("Got remote stream. ", remoteStream, this._rtcId, this.__id);
    }
});

module.exports = _WebRTC;
