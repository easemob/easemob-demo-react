import { Webrtc, Service, util } from "easemob-emedia"

Webrtc.prototype.AVPubstream = Service.prototype.AVPubstream;

Webrtc.prototype._openCamera = function(){
    Service.prototype._openCamera.apply(this, arguments);
}
Webrtc.prototype.__getUserMedia = function(){
    Service.prototype.__getUserMedia.apply(this, arguments);
}
Webrtc.prototype.__controlStream = function(){
    Service.prototype.__controlStream.apply(this, arguments);
}

//callback (rtc, stream)
Webrtc.prototype.createMedia = function(constaints, callback){
    var self = this;

    var pubS = new self.AVPubstream({
        constaints: constaints,
        aoff: 0,
        voff: 0
    });

    var openUserMedia = Service.prototype.openUserMedia.bind(this);
    openUserMedia(pubS).then(function (_service, stream) {
        callback && callback(self, stream)
    }, function fail(evt) {
        util.logger.debug('[WebRTC-API] getUserMedia() error: ', evt);
        self.onError(evt);
    });
}

Webrtc.prototype.setLocalVideoSrcObject = function (stream) {
    var self = this;

    self._localStream = stream;

    self.onGotLocalStream(stream, this.streamType);
    self.setLocalStream(stream);

    util.logger.debug('[WebRTC-API] you can see yourself !');
}

var _setRemoteDescription = Webrtc.prototype.setRemoteDescription;
Webrtc.prototype.setRemoteDescription = function (desc) {
    var self = this;

    if(self.streamType === "VOICE"){ //将remote sdp中 video中改为 a=mid:video -》 a=sendrecv|a=sendonly--recvonly
        function videoSectionReplace(regx, use) {
            var videoSectionIndex = desc.sdp.indexOf("m=video");
            var audioSectionIndex = desc.sdp.indexOf("m=audio");
            var end = audioSectionIndex > videoSectionIndex ? audioSectionIndex : desc.sdp.length;

            desc.sdp = desc.sdp.replace(regx, function (match, offset, string) {
                if(offset >= videoSectionIndex && offset < end){
                    return use;
                }else{
                    return match;
                }
            });
        }

        videoSectionReplace(/a=sendrecv|a=sendonly/g, "a=inactive");
    }
    return _setRemoteDescription.call(self, desc);
}


export default Webrtc