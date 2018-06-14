var _util = require('./Util');
var _logger = _util.tagLogger("PCStats");

/**
 * outbound-rtp
 *  bytesSent
 *  packetsSent
 *  qpSum
 *  pliCount
 * inbound-rtp
 *  bytesReceived
 *  framesDecoded
 *  packetsLost
 *  packetsReceived
 *  pliCount
 * track
 *  framesDecoded
 *  framesReceived
 *  framesDropped
 * transport
 *  bytesReceived
 *  bytesSent
 * candidate-pair
 *  bytesReceived
 *  bytesSent
 *  totalRoundTripTime
 *  requestsReceived
 *  responsesSent
 *  requestsSent
 *  responsesReceived
 * local-candidate
 *  networkType
 *  protocol
 *  port
 * remote-candidate
 *  ip
 * codec
 *  clockRate
 *  mimeType
 *
 *
 */

var PCStats;
module.exports = PCStats = _util.prototypeExtend({
    //_webrtc:
    //_stream:

    __init__: function () {
        if(!this._webrtc){
            this._stream && (this._webrtc = this._stream._webrtc);
        }

        this.samplesDatas = {};
        this.gatherResults = {};

        this._bysamples = {};
        if(this._inbound_ !== false){
            this._bysamples["inbound-rtp"] = ["bytesReceived", "framesDecoded", "packetsLost", "packetsReceived", "pliCount"];
        }
        if(this._outbound_ !== false){
            this._bysamples["outbound-rtp"] = ["bytesSent", "packetsSent", "qpSum", "pliCount"];
        }
    },

    onGatherResult: function (trackId, type, subtype, data) {
        _logger.info(trackId, type, subtype, data);
    },

    stats: function (selector) {
        if(!this._webrtc || !this._webrtc._rtcPeerConnection){
            _logger.warn("not found webrtc or peer connection").
            return;
        }

        return this._webrtc._rtcPeerConnection.getStats(selector);
    },

    statsOfTrack: function (selector) {
        if(!selector instanceof window.MediaStreamTrack){
            throw "selector not a MediaStreamTrack";
        }

        return this.stats(selector);
    },

    audioTrack: function (mediaStream) {
        var tracks = mediaStream && mediaStream.getAudioTracks();
        return tracks && tracks.length ? tracks[0] : undefined;
    },

    videoTrack: function (mediaStream) {
        var tracks = mediaStream && mediaStream.getVideoTracks();
        return tracks && tracks.length ? tracks[0] : undefined;
    },

    // samplingTrack: function (track) {
    //     var self = this;
    //
    //     var trackId = track.id;
    //     this.statsOfTrack(track).then(function(_stats){
    //         self._trackSamples[trackId] || (self._trackSamples[trackId] = []);
    //
    //         var statsParms = self._trackSamples[trackId];
    //
    //         _stats.forEach(function(_stat, name){
    //             var samplings = _bysamples[_stat.type];
    //
    //             var tmp;
    //             if(samplings && samplings.length){
    //                 var statParms = (tmp || (tmp = {}))[_stat.type] = {type:_stat.type, timestamp: _stat.timestamp};
    //
    //                 samplings.forEach(function(_param){
    //                     statParms[_param] = _stat[_param];
    //                 });
    //             }
    //             tmp && statsParms.push(tmp);
    //         });
    //     });
    // },

    gatherTrack: function (track, mediaType) {
        var self = this;

        mediaType = track.kind || mediaType;
        mediaType = mediaType && mediaType.toLowerCase();

        var trackId = track.id;
        this.statsOfTrack(track).then(function(_stats){
            self.samplesDatas[trackId] || (self.samplesDatas[trackId] = {});

            var statsParms = self.samplesDatas[trackId];

            _stats.forEach(function(_stat, name){
                var samplings = self._bysamples[_stat.type];

                var statMediaType = _stat.mediaType
                    || (name.indexOf("ideo") >= 0 && "video")
                    || (name.indexOf("udio") >= 0 && "audio")
                    || undefined;

                if(samplings && samplings.length){
                    if(emedia.config._printDebugStats === true){
                        _logger.debug(name, _stat, track, statMediaType, mediaType);
                    }

                    if(!statMediaType || statMediaType === mediaType){
                        var tmp = statsParms[_stat.type] || (statsParms[_stat.type] = {});

                        samplings.forEach(function(_param){
                            var items = (tmp[_param] || (tmp[_param] = []));

                            var item = {timestamp: _stat.timestamp, kind: _stat.mediaType || track.kind || mediaType};
                            item[_param] = _stat[_param];
                            items.push(item);
                        });
                    }
                }
            });
        });
    },

    gatherWebrtcMediaStream: function (_mediaStream, type) {
        var self = this;

        if(!type){
            _mediaStream.getTracks().forEach(function (track) {
                self.gatherTrack(track);
            });
            return;
        }

        if("audio" === type.toLowerCase()){
            _mediaStream.getAudioTracks().forEach(function (track) {
                self.gatherTrack(track, track.kind || type.toLowerCase());
            });
            return;
        }

        if("video" === type.toLowerCase()){
            _mediaStream.getVideoTracks().forEach(function (track) {
                self.gatherTrack(track, track.kind || type.toLowerCase());
            });
            return;
        }
    },

    gatherWebrtc: function () {
        this._webrtc._localStream && this.gatherWebrtcMediaStream(this._webrtc._localStream);
        this._webrtc._remoteStream && this.gatherWebrtcMediaStream(this._webrtc._remoteStream);
    },

    _gather_inbound_rtp_pliCount: function (dataArray) {
        var data = dataArray.shift();
        return data.pliCount;
    },

    _gather: function (type, subtype, dataArray) {
        type = type.replace(/[^\w]/g, "_");
        subtype = subtype.replace(/[^\w]/g, "_");

        var func = _util.list("_gather", type, subtype).join("_");
        if(typeof this[func] === "function"){
            return this[func](dataArray);
        }

        var count = 3;
        if(dataArray.length < count){
            return 0;
        }

        var data = dataArray[count - 1][subtype] - dataArray[0][subtype];
        var time = dataArray[count - 1].timestamp - dataArray[0].timestamp;

        dataArray.shift();

        return (time === 0) ? 0 : (parseFloat(data * 1000 / time).toFixed(2));
    },

    _statsCount: function () {
        var self = this;

        function gatherByTrack() {
            _util.forEach(self.samplesDatas, function (trackId, _samples) {
                var trackGathers = self.gatherResults[trackId] = self.gatherResults[trackId] || {};
                gatherByType(trackId, trackGathers, _samples);
            });
        }

        function gatherByType(trackId, trackGathers, _trackSamples) {
            _util.forEach(_trackSamples, function (type, _data) {
                var typeGathers = (trackGathers[type] || (trackGathers[type] = {}));
                gatherBySubtype(trackId, typeGathers, type, _data);
            });
        }

        function gatherBySubtype(trackId, typeGathers, type, _data) {
            _util.forEach(_data, function (subtype, dataArray) {
                var result = typeGathers[subtype] = self._gather(type, subtype, dataArray);
                self.onGatherResult(trackId, type, subtype, result);
            });
        }

        gatherByTrack();
    },

    gather: function () {
        this.gatherWebrtc();
        this._statsCount();
    },

    intervalGather: function (intervalMillis) {
        this._intervalId && clearInterval(this._intervalId);
        this._intervalId = setInterval(this.gather.bind(this), intervalMillis || 1000);
    },

    stopIntervalGather: function () {
        this._intervalId && clearInterval(this._intervalId);
    }
});

var statsMap = {};
var echo = PCStats.echo = function(easemobStreams){
    _util.forEach(easemobStreams, function (_k, _stream) {
        if(!statsMap[_stream.id]
            && _stream._webrtc
            && !_stream._webrtc.closed
            && _stream.getMediaStream()){

            var pcstats;
            statsMap[_stream.id] = pcstats = new PCStats({_webrtc: _stream._webrtc});
            pcstats._mediaStream = _stream.getMediaStream();
        }else if(statsMap[_stream.id] && (!_stream._webrtc || _stream._webrtc.closed || !_stream.getMediaStream())){
            _util.removeAttribute(statsMap, _stream.id);
        }
    });

    var clearStats = [];
    _util.forEach(statsMap, function (_sid, stats) {
        if(!easemobStreams || !easemobStreams[_sid]){
            clearStats.push(_sid);
        }else{
            stats.gatherWebrtcMediaStream(stats._mediaStream);
            stats._statsCount();
        }
    })

    _util.forEach(clearStats, function (_index, _sid) {
        _util.removeAttribute(statsMap, _sid);
    });
}

PCStats.intervalEcho = function(easemobStreams, intervalMillis){
    return setInterval(function () {
        echo(easemobStreams);
    }, intervalMillis)
}


_util.forEach(["inbound", "outbound"], function (_typeIndex, gatherType) {
    _util.forEach(["Audio", "Video"], function (_trackTypeIndex, trackType) {
        (function (gatherType, trackType) {
            var gatherTrack;
            PCStats[gatherType + trackType] = gatherTrack = function (easemobStream, onNotify, intervalMillis) {
                intervalId && clearInterval(intervalId);

                var intervalId = setInterval(function () {
                    var pcstats = gatherTrack[easemobStream.id];
                    if(!pcstats
                        && easemobStream
                        && easemobStream._webrtc
                        && !easemobStream._webrtc.closed
                        && easemobStream.getMediaStream()){

                        gatherTrack[easemobStream.id] = pcstats = new PCStats({
                            _webrtc: easemobStream._webrtc,
                            _inbound_: gatherType === "inbound",
                            _outbound_: gatherType === "outbound"
                        });
                        onNotify && (pcstats.onGatherResult = onNotify);
                        pcstats._mediaStream = easemobStream.getMediaStream();

                    } else if(pcstats
                        && (!easemobStream
                            || !easemobStream._webrtc
                            || easemobStream._webrtc.closed
                            || !easemobStream.getMediaStream()
                            || !pcstats._mediaStream
                            || pcstats._mediaStream.id !== easemobStream.getMediaStream().id
                        )){
                        _util.removeAttribute(gatherTrack, easemobStream.id);
                        pcstats = null;
                    }

                    if(!pcstats){
                        intervalId && clearInterval(intervalId);
                        return;
                    }

                    pcstats.gatherWebrtcMediaStream(pcstats._mediaStream, trackType);
                    pcstats._statsCount();
                }, intervalMillis);

                return intervalId;
            }
        })(gatherType, trackType);
    });
})