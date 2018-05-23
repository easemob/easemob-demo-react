var _util = require('./Util');

var SoundMeter = require('../_adapter/SoundMeter');

/**
 * {
 *  _located:
 *  _webrtc:
 *
 *  id:
 *  memId:
 *  name:
 *  voff:
 *  aoff:
 *  type: 0 1
 *  ext:
 *  owner: {
 *    id:
 *    nickName:
 *    name:
 *    ext:
 *  }
 *
 *  _localMediaStream:
 * }
 *
 *
 *
 */

emedia.subscribed = function (stream) {
    if(stream._located){
        return true;
    }

    if(stream.type === 2){
        return !!(!stream._located && stream._webrtc);
    }

    return (stream._webrtc !== undefined);
};


var MediaSoundMeter = _util.prototypeExtend({
    voff: 0,
    aoff: 0,

    __init__: function () {
        var self = this;

        if(!self._mediaStream){
            throw "_mediaStream empty";
        }

        if(!self.hasEnabledTracks(self._mediaStream)){
            return;
        }

        if(!self.__audioContext){
            throw "require audioContext";
        }

        self.__soundMeter = new SoundMeter(self.__audioContext);

        self.__soundMeter.connectToSource(self._mediaStream, function(e) {
            if (e) {
                throw e;
            }
            self.__worked = self.__soundMeter.__worked = true;
        });
    },

    hasEnabledTracks: function (mediaStream) {
        return emedia.hasEnabledTracks(mediaStream);
    },

    getSoundMeters: function () {
        var self = this;

        if(!self.__soundMeter || !self.__worked){
            return;
        }

        if(!self._mediaStream.active){
            self.__worked && self._finally();
            return;
        }

        if(!self.hasEnabledTracks(self._mediaStream)){
            return;
        }

        return {
            instant: self.__soundMeter.instant,
            slow: self.__soundMeter.slow,
            clip: self.__soundMeter.clip
        }
    },

    _finally: function () {
        var self = this;

        if(self.__soundMeter){
            self.__soundMeter.stop();
            self.__worked = self.__soundMeter.__worked = false;
        }
    }
});

module.exports = _util.prototypeExtend({ //type 0 AVpub 1 Desktop 2 Sub
    Update: _util.prototypeExtend({

        ifAoff: function (update) {
            this.if("aoff", update);
        },

        ifVoff: function (update) {
            this.if("voff", update);
        },

        ifMediaStream: function (update) {
            this.if("mediaStream", update);
        },
        
        if: function (key, update) {
            if(typeof this[key] === "undefined"){
                return;
            }

            update(this[key]);
        }
    }),


    located: function () {
        return this._located || false;
    },

    webrtc: function (webrtc) {
        webrtc && (this._webrtc = webrtc);
        return this;
    },

    getMediaStream: function () {
        if(typeof this.mediaStream !== "undefined"){
            return this.mediaStream;
        }

        // if(this.type === 2 && this._webrtc && this._webrtc.getRemoteStream()){
        //     return this._webrtc.getRemoteStream();
        // }

        if(this._located){
            return this._localMediaStream;
        }

        return (this._webrtc && (this._webrtc.getRemoteStream() || this._webrtc.getLocalStream()));
    },

    requestFrame: function (){
        this._localMediaStream && this._localMediaStream.getVideoTracks().forEach(function(track) {
            typeof track.requestFrame === "function" && track.requestFrame();
        });
    },

    getLocalMediaStream: function () {
        return this._localMediaStream;
    },

    getRemoteMediaStream: function () {
        if(this._webrtc && (typeof this._webrtc.getRemoteStream() !== "undefined")){
            return this._webrtc.getRemoteStream();
        }
    },

    mutedNeed: function () {
        return this.mutedMuted || false;
    },

    ifMediaStream: function (update) {
        if(typeof this.mediaStream !== "undefined"){
            update(this.mediaStream);
            return;
        }

        // if(this.type === 2 && this._webrtc && this._webrtc.getRemoteStream() !== "undefined"){
        //     update(this._webrtc.getRemoteStream());
        //     return;
        // }

        if(this._located && (typeof this._localMediaStream !== "undefined")){
            update(this._localMediaStream);
            return;
        }

        if(!this._located && this._webrtc && (typeof this._webrtc.getRemoteStream() !== "undefined")){
            update(this._webrtc.getRemoteStream());
            return;
        }
    },

    subscribed: function () {
        return emedia.subscribed(this);
    },

    getHtmlDOMID: function () {
        return "_m_" + this.owner.id + "_s_" + this.id;
    },

    MediaSoundMeter: MediaSoundMeter,

    StreamSoundMeter: _util.prototypeExtend({
        __init__: function () {
            var self = this;

            if(!self._stream || (typeof self._stream.getMediaStream !== 'function')){
                throw "_stream empty or not found method getMediaStream";
            }

            self._streamId = self._stream.id;
            self._streamCreateId = self._stream.__create_id;
            self._mediaStream = self._mediaStream;

            if(self._stream.type === 2 && !self._stream.located() && !self._webrtc){
                throw "require webrtc. when type = 2 and not located";
            }

            self.__mediaSoundMeter = (self.__mediaSoundMeter || new MediaSoundMeter({
                __audioContext: self.__audioContext,
                _mediaStream: self._mediaStream
            }));
            self.__mediaSoundMeter.useCount = (self.__mediaSoundMeter.useCount || 0) + 1;
        },

        onSoundMeters: function (callback) {
            var self = this;

            var emptyResult = {
                instant: 0,
                slow: 0,
                clip: 0
            };

            if(self._stream.aoff){
                self._finally();
                callback(emptyResult);
                return emptyResult;
            }

            if(self._stream.type !== 2
                && self._stream.subArgs
                && self._stream.subArgs.subSAudio !== undefined
                && !self._stream.subArgs.subSAudio){
                self._finally();
                callback(emptyResult);
                return emptyResult;
            }

            if(self._stream.type === 2 && !self._stream.located() && (!self._stream.subArgs || !self._stream.subArgs.subSAudio)){
                var receivers = self._webrtc.getReceiversOfPeerConnection();

                if(!receivers || receivers.length === 0){
                    callback(emptyResult);
                    return emptyResult;
                }

                var audioReceiver;
                for(var i in receivers){
                    if(receivers[i].track.kind === 'audio'){
                        audioReceiver = receivers[i];
                    }
                }

                if(!audioReceiver){
                    callback(emptyResult);
                    return emptyResult;
                }

                if(typeof audioReceiver.getContributingSources === 'function') {
                    var rtpContributingSources = audioReceiver.getContributingSources();
                    if(emedia.config._printSoundData){
                        _util.logger.debug(self._stream.id, self._stream.csrc, "rtpContributingSources ", rtpContributingSources)
                    }

                    if (!rtpContributingSources || rtpContributingSources.length === 0) {
                        callback(emptyResult);
                        return emptyResult;
                    }

                    var source;
                    for (var i in rtpContributingSources) {
                        if (rtpContributingSources[i].source == self._stream.csrc) {
                            source = self._stream.csrc;
                        }
                    }

                    if(emedia.config._printSoundData){
                        _util.logger.debug(self._stream.id, self._stream.csrc, "source ", source)
                    }

                    if (source === undefined) {
                        callback(emptyResult);
                        return emptyResult;
                    }
                }
            }

            var _meter = self.__mediaSoundMeter.getSoundMeters() || emptyResult;

            var webrtc = (self._stream.type === 2) ? self._webrtc : self._stream._webrtc;
            if((emedia.meterWithTrackAudioLevel || _meter.instant === 0)
                && webrtc
                && !webrtc.closed
                && webrtc._rtcPeerConnection){
                webrtc._rtcPeerConnection.getStats().then(function(stats) {
                    if(stats.size > 0){
                        stats.forEach(function(res) {
                            if(res.type === "track" && (res.kind === "audio" || res.trackIdentifier === "audio")){
                                _meter.trackAudioLevel = res.audioLevel;
                                //_meter.trackTotalAudioEnergy = 0;
                                _meter.trackTotalAudioEnergy = res.totalAudioEnergy;
                                callback(_meter);
                            }
                        });
                    }
                });
            }

            callback(_meter);
        },
        
        _finally: function () {
            var self = this;

            if(self._stream.type === 2 && self._stream.located() && self._remoteMediaSoundMeters){
                 self._remoteMediaSoundMeters._finally();
            }

            self.__mediaSoundMeter.useCount--;

            if(self.__mediaSoundMeter.useCount === 0){
                self.__mediaSoundMeter._finally();
            }
        }
    })
});