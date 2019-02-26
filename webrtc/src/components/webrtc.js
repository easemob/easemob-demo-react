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
Webrtc.prototype.__sysGetUserMedia = function(){
    Service.prototype.__sysGetUserMedia.apply(this, arguments);
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
        WebIM.__alreadyOpenMedias.push(stream);
        callback && callback(self, stream)
    }, function fail(evt) {
        util.logger.debug('[WebRTC-API] getUserMedia() error: ', evt);
        self.onError(evt);
    });
}

var createMedia;
Webrtc.prototype.createMedia =
    createMedia = function(constaints, callback){
    var self = this;

    var mediaStream = new MediaStream();

    function __callback() {
        if(--__callback.count === 0){
            WebIM.__alreadyOpenMedias.push(mediaStream);
            callback && callback(self, mediaStream);
        }
    }

    function __cloneTrack(destStream) {
        destStream && destStream.getTracks().forEach(function(track) {
            mediaStream.addTrack(track);
        });
    }

    var audio = !constaints || constaints.audio;
    var video = !constaints || constaints.video;

    if(!audio && !video){
        __callback.count = 0;
        return __callback();
    }

    if(!!audio && !!video){ //两个true
        __callback.count = 2;
        createMedia.call(this, {video: constaints.video, audio: false}, function (obj, stream) {
            __cloneTrack(stream);
            __callback();
        });
        createMedia.call(this, {video: false, audio: constaints.audio}, function (obj, stream) {
            __cloneTrack(stream);
            __callback();
        });

        return;
    }

    __callback.count = 1;

    var pubS = new self.AVPubstream({
        constaints: constaints
    });

    var openUserMedia = Service.prototype.openUserMedia.bind(this);
    openUserMedia(pubS).then(function (_service, stream) {
        __cloneTrack(stream);
        __callback();
    }, function fail(evt) {
        __callback();
        util.logger.debug('[WebRTC-API] getUserMedia() error: ', evt);

        if(typeof evt.message === 'function'){
            evt.message = evt.message();
        }else if(typeof evt.message === 'string' && evt.message !== ""){
            evt.message = evt.message;
        }else{
            evt.message = "open media error. " + evt.name;
        }

        evt.message = evt.message + " when get " + (video ? "carma" : "microphone");

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