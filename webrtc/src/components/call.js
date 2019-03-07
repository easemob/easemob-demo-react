var Util = (require('./utils').default);
var RTCIQHandler = require('./iq');
var API = require('./api');
var WebRTC = (require('./webrtc').default);
var CommonPattern = require('./p2p');

var RouteTo = API.RouteTo;
var Api = API.Api;
var _logger = Util.logger;


var _Call = {
    api: null,
    caller: '',
    connection: null,

    pattern: null,

    listener: {
        onAcceptCall: function (from, options) {
        },

        onRinging: function (caller) {
        },

        onTermCall: function () {
        },

        onIceConnectionStateChange: function (iceState) {
        }
    },

    mediaStreamConstaints: {
        audio: true,
        video: true
    },

    init: function () {
        var self = this;

        if (typeof self.connection === "undefined") {
            throw "Caller need a instance of Easemob.im.Connection"
        }

        self.api = self.api || new Api({
                imConnection: self.connection,

                rtcHandler: new RTCIQHandler({
                    imConnection: self.connection
                })
            });

        self.api.onInitC = function () {
            self._onInitC.apply(self, arguments);
        },

        self.api.onInvite = function(){
            self.listener.onInvite.apply(self, arguments);
        },

        self.api.onIceConnectionStateChange = function () {
            self.listener.onIceConnectionStateChange.apply(self, arguments);
        }
    },

    createConference: function(pwd, _callback){
        var rt = new RouteTo({
            rtKey: ""
        })
        this.api.reqTkt(
            rt, 
            true,
            undefined,
            pwd, 
            function(from, rtcOptions){
                var ticketStr = rtcOptions.ticket
                rtcOptions.conferenceId = rtcOptions.confrId
                _callback && _callback(from, rtcOptions)
        })
    },

    inviteConference: function(confrId, pwd, to, gid, _callback){
        var rt = new RouteTo({
            to: to,
            rtKey: "",
            rtflag: 0
        })
        this.api.invite(
            rt, 
            confrId, 
            pwd, 
            gid,
            function(from, rtcOptions){
                _callback && _callback(from, rtcOptions)
            }
        );
    },

    getConferenceTkt: function(confrId, pwd, _callback){
        var rt = new RouteTo({
            rtKey: ""
        });
        this.api.reqTkt(
            rt,
            false,
            confrId,
            pwd,
            function(from, rtcOptions){
                _callback && _callback(from, rtcOptions)
            }
        );
    },

    makeVideoCall: function (callee, accessSid) {
        var self = this;

        var mediaStreamConstaints = {};
        Util.extend(mediaStreamConstaints, self.mediaStreamConstaints);
        self.mediaStreamConstaints.video = true;

        this.call(callee, mediaStreamConstaints, accessSid);
    },

    makeVoiceCall: function (callee, accessSid) {
        console.log('ScareCrow');
        var self = this;

        var mediaStreamConstaints = {};
        Util.extend(mediaStreamConstaints, self.mediaStreamConstaints);
        self.mediaStreamConstaints.video = false;

        self.call(callee, mediaStreamConstaints, accessSid);
    },

    acceptCall: function () {
        var self = this;
        self.pattern.accept();
    },

    endCall: function (callee) {
        var self = this;
        self.caller = '';
        self.pattern.termCall();
    },

    call: function (callee, mediaStreamConstaints, accessSid) {
        var self = this;
        this.callee = this.api.jid(callee);

        var rt = new RouteTo({
            rtKey: "",
            sid: accessSid,

            success: function (result) {
                _logger.debug("iq to server success", result);
            },
            fail: function (error) {
                _logger.debug("iq to server error", error);
                self.onError(error);
            }
        });

        this.api.reqP2P(
            rt,
            mediaStreamConstaints.video ? 1 : 0,
            mediaStreamConstaints.audio ? 1 : 0,
            this.api.jid(callee),
            function (from, rtcOptions) {
                if (rtcOptions.online == "0") {
                    self.listener.onError({message: "callee is not online!"});
                    return;
                }
                self._onGotServerP2PConfig(from, rtcOptions);
                self.pattern.initC(self.mediaStreamConstaints, accessSid);
            });
    },

    _onInitC: function (from, options, rtkey, tsxId, fromSid) {
        var self = this;

        self.callee = from;
        self._rtcCfg = options.rtcCfg;
        self._WebRTCCfg = options.WebRTC;

        self.sessId = options.sessId;
        self.rtcId = options.rtcId;

        self.switchPattern(options.streamType == "VIDEO" ? "VIDEO" : "VOICE");
        self.pattern._onInitC(from, options, rtkey, tsxId, fromSid);
    },

    _onInvite: function(){

    },

    _onGotServerP2PConfig: function (from, rtcOptions) {
        var self = this;

        if (rtcOptions.result == 0) {
            self._p2pConfig = rtcOptions;
            self._rtcCfg = rtcOptions.rtcCfg;
            self._rtcCfg2 = rtcOptions.rtcCfg2;

            self.sessId = rtcOptions.sessId;
            self.rtcId = "Channel_webIM";

            self._rtKey = self._rtkey = rtcOptions.rtKey || rtcOptions.rtkey;
            self._rtFlag = self._rtflag = rtcOptions.rtFlag || rtcOptions.rtflag;

            self._WebRTCCfg = rtcOptions.WebRTC;
            self.admtok = rtcOptions.admtok;
            self.tkt = rtcOptions.tkt;


            self.switchPattern(self.mediaStreamConstaints.audio && self.mediaStreamConstaints.video ? "VIDEO" : "VOICE");
        } else {
            //
        }
    },

    switchPattern: function (streamType) {
        var self = this;

        (!self._WebRTCCfg) && (self.pattern = new CommonPattern({
            callee: self.callee,

            _p2pConfig: self._p2pConfig,
            _rtcCfg: self._rtcCfg,
            _rtcCfg2: self._rtcCfg2,

            _rtKey: self._rtKey || self._rtkey,
            _rtFlag: self._rtFlag || self._rtflag,

            _sessId: self.sessId,
            _rtcId: self.rtcId,

            webRtc: new WebRTC({
                streamType: streamType,
                subArgs:{
                    subSVideo: "VIDEO" === streamType,
                    subSAudio: true
                },
                onGotLocalStream: self.listener.onGotLocalStream,
                onGotRemoteStream: function(remoteStream, event){
                    self.listener.onGotRemoteStream(remoteStream, streamType);
                },
                onError: self.listener.onError
            }),

            api: self.api,

            onAcceptCall: (self.listener && self.listener.onAcceptCall) || function () {

            },
            onRinging: (self.listener && self.listener.onRinging) || function () {

            },
            onTermCall: (self.listener && self.listener.onTermCall) || function () {

            },
            onOtherUserOpenVoice: (self.listener && self.listener.onOtherUserOpenVoice) || function () {

            },
            onOtherUserOpenVideo: (self.listener && self.listener.onOtherUserOpenVideo) || function () {

            }
        }));
    }
};


module.exports = function (initConfigs) {
    Util.extend(true, this, _Call, initConfigs || {});

    this.init();
};
