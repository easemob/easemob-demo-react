
var _BitrateEstimater = {
  bitrate: 0,
  lastBytes: null,
  lastTimestamp: null,
  updateBytes: function(bytes, now){
    var self = this;
        if (self.lastTimestamp && (now - self.lastTimestamp)>=300) {
          self.bitrate = 8 * (bytes - self.lastBytes) / (now - self.lastTimestamp);
          self.bitrate = Math.floor(self.bitrate);
        }
        self.lastBytes = bytes;
        self.lastTimestamp = now;
    return self.bitrate;
  }
};

var BitrateEstimater = function () {
    emedia.util.extend(this, _BitrateEstimater);
};

var FpsEstimator = function() {
  this._currentFPS = 0;
  this._lastFrames = 0;
  this._lastTimestamp = 0;
  this.update = function(frames, timestamp) {
      if (this._lastTimestamp) {
        this._currentFPS = Math.floor((frames - this._lastFrames) / (timestamp - this._lastTimestamp) * 1000);
      }
      if (this._lastTimestamp == 0 || timestamp - this._lastTimestamp > 1000) {
        this._lastFrames = frames;
        this._lastTimestamp = timestamp;
      }
      return this._currentFPS;
    }.bind(this);
};
// var FpsEstimator = function() {
//     emedia.util.extend(this, _FpsEstimator);
// };

var _WebrtcStatistics = {
  audioRecvBpsEst: null,
  audioSentBpsEst: null,
  videoRecvBpsEst: null,
  videoSentBpsEst: null,
  audioRecvFpsEst: null,
  audioSentFpsEst: null,
  videoRecvFpsEst: null,
  videoSentFpsEst: null,

  reset: function () {
    var self = this;
    self.audioRecvBpsEst = new BitrateEstimater();
    self.audioSentBpsEst = new BitrateEstimater();
    self.videoRecvBpsEst = new BitrateEstimater();
    self.videoSentBpsEst = new BitrateEstimater();
    self.audioRecvFpsEst = new FpsEstimator();
    self.audioSentFpsEst = new FpsEstimator();
    self.videoRecvFpsEst = new FpsEstimator();
    self.videoSentFpsEst = new FpsEstimator();
  },

    parseInboundRTP: function (now, report, bpsEst, fpsEst, callbackRecv, keyName) {
      // firefox reports rtcp as well
      if (report.id.search(/rtp/i) === -1) {
        return;
      }
      if (report.bytesReceived) {
        var bps = bpsEst.updateBytes(report.bytesReceived, now);
        callbackRecv(keyName + '-bps', bps + ' kbps');
      }
      if (report.framesDecoded) {
        var fps = fpsEst.update(report.framesDecoded, now);
        callbackRecv(keyName + '-fps', fps);
      }
    },

    parseOutboundRTP: function (now, report, bpsEst, fpsEst, callbackSent, keyName) {
      // firefox reports rtcp as well
      if (report.id.search(/rtp/i) === -1) {
        return;
      }
      if (report.bytesSent) {
        var bps = bpsEst.updateBytes(report.bytesSent, now);
        callbackSent(keyName + '-bps', bps + ' kbps');
      }
      if (report.framesEncoded) {
        var fps = fpsEst.update(report.framesEncoded, now);
        callbackSent(keyName + '-fps', fps);
      }
    },

  parseReport: function(self, results, report, callbackRecv, callbackSent){
      var now = report.timestamp;
      // var milliseconds = now.getUTCMilliseconds();
      var milliseconds = (new Date()).valueOf();

      // if(report.type === 'ssrc' ){
      //   console.log("report=", report);
      // }
      
      
      if (report.type === 'inbound-rtp' || report.type === 'inboundrtp') {
        // firefox calculates the bitrate for us
        // https://bugzilla.mozilla.org/show_bug.cgi?id=951496

        if(report.mediaType === 'video'){
          self.parseInboundRTP(now, report, self.videoRecvBpsEst, self.videoRecvFpsEst, callbackRecv, 'video');
        }else if(report.mediaType === 'audio'){
          self.parseInboundRTP(now, report, self.audioRecvBpsEst, self.audioRecvFpsEst, callbackRecv, 'audio');
        }
      }else if (report.type === 'outbound-rtp' || report.type === 'outbound-rtp') {
        if(report.mediaType === 'video'){
          self.parseOutboundRTP(now, report, self.videoSentBpsEst, self.videoSentFpsEst, callbackSent, 'video');
        }else if(report.mediaType === 'audio'){
          self.parseOutboundRTP(now, report, self.audioSentBpsEst, self.audioSentFpsEst, callbackSent, 'audio');
        }
      }else if (report.type === 'track' && report.kind === 'video') {
        if (report.frameWidth){
            if (report.remoteSource === true) {
                callbackRecv('video-size', report.frameWidth + 'x' + report.frameHeight);
            } else {
                callbackSent('video-size', report.frameWidth + 'x' + report.frameHeight);
            }
        }
      }

      if ((report.type === 'candidate-pair' || report.type === 'candidatepair') && (report.nominated || report.selected) ||
          report.type === 'googCandidatePair' &&
          report.googActiveConnection === 'true') {
        if(report.remoteCandidateId){
          var remoteCandidate;
          if(results.get){
            remoteCandidate = results.get(report.remoteCandidateId);
          }else{
            remoteCandidate = results[report.remoteCandidateId];
          }
          
          if (remoteCandidate && remoteCandidate.ipAddress &&
              remoteCandidate.portNumber) {
            callbackRecv('peer', remoteCandidate.ipAddress + ':' + remoteCandidate.portNumber 
              + "," + remoteCandidate.candidateType
              + "," + remoteCandidate.transport
              );
          }
        }
      }
  },

  parseRecvStatistics: function (results, callbackRecv, callbackSent) {
    var self = this;

    if(results.forEach){
      results.forEach(function(report){
        self.parseReport(self, results, report, callbackRecv, callbackSent);
      });
    }else{
      Object.keys(results).forEach(function(result) {
        var report = results[result];
        self.parseReport(self, results, report, callbackRecv, callbackSent);
      });
    }

  }
}

var WebrtcStatisticsSection = module.exports = function () {
    var obj = emedia.util.extend(this, _WebrtcStatistics);
    obj.reset();
    return obj;
};
