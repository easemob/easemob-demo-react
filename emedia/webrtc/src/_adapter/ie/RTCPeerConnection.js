var _util = require('../../components/Util');
var _logger = _util.tagLogger("IE.peer");

var globalPCSeqno = 0;

//iceConnectionState new checking connected completed failed disconnected closed
//onicecandidate ++
//onaddstream    ++
//onremovestream --
//oniceconnectionstatechange ++
//ontrack  --
//getLocalStreams()
//getRemoteStreams()
//getStats() --
// currentLocalDescription ++
// currentRemoteDescription ++
// peerIdentity ++

// https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection
function RTCPeerConnection(plugin, pcConfig, constraints) {
    this._xobjCallSeqno = 0;
    this.plugin = plugin;
    var xplugin = this._xobj = plugin._xobj;
    var pcId = this.peerIdentity = this._id = _util.list("__pc_", globalPCSeqno++).join("");

    var xpc = this._xpc = xplugin.CreateRtcPeerConnections(pcId, pcConfig && JSON.stringify(pcConfig));
    plugin[pcId] = xpc;

    this.iceConnectionState = "new";
}
RTCPeerConnection.prototype.getLocalStreams = function () {
    return this.remoteStreams;
}
RTCPeerConnection.prototype.getRemoteStreams = function () {
    return this.localStreams;
}

RTCPeerConnection.prototype.nextCallSeqno = function () {
    return this._xobjCallSeqno++;
}

function _on(type, seqno, evt,  cb) {
    //var callname = "on" + evt + type, callname = callname.toLowerCase()+ "_" + seqno;
    var callname = "on" + type, callname = callname.toLowerCase()+ "_" + seqno;
    cb._evtname = evt;
    this[callname] = cb;
}

function _cb(type, seqno) {
    var callname = "on" + type, callname = callname.toLowerCase()+ "_" + seqno;
    var cb = this[callname];

    return (function () {
        var args = [];
        for(var i = 1; i < arguments.length; i++){
            args.push(arguments[i]);
        }
        cb.apply(this, args);
    }).bind(this);
}

RTCPeerConnection.prototype._onSuccess = function (seqno, evt, cb) {
    _on.call(this, "success", seqno, evt, cb);
}
RTCPeerConnection.prototype._onError = function (seqno, evt, cb) {
    _on.call(this, "error", seqno, evt, cb);
}

RTCPeerConnection.prototype._success = function (seqno) {
    _cb.call(this, "success", seqno)(arguments);
}
RTCPeerConnection.prototype._error = function (seqno) {
    _cb.call(this, "error", seqno)(arguments);
}


// arg0 success
// arg1 error
// arg2 arg
['createOffer', 'createAnswer'].forEach(function(method) {
    RTCPeerConnection.prototype[method] = function() {
        var seqno = this.nextCallSeqno();

        this._onSuccess(seqno, method, arguments.length < 1 ? undefined : arguments[0]);
        this._onError(seqno, method, arguments.length < 2  ? undefined : arguments[1]);

        var options = arguments.length < 3 ? undefined : arguments[2],
            options = options && JSON.stringify(options);
        switch (method){
            case "createOffer":
                // RTCOfferOptions{
                //      offerToReceiveAudio
                //      offerToReceiveVideo
                // }
                this._xobj.CreateOffer(this._id, seqno, JSON.stringify(options));

                break;
            case "createAnswer":
                // RTCAnswerOptions{
                //     'mandatory': {
                //          'OfferToReceiveAudio': true,
                //          'OfferToReceiveVideo': true
                //     }
                // }
                this._xobj.CreateAnswer(this._id, seqno, JSON.stringify(options));

                break;
            default:
        }
    };
});

// onaddicecandidatesuccess|onaddicecandidateerror
// setlocaldescriptionsuccess|setlocaldescriptionerror
// setremotedescriptionsuccess|setremotedescriptionerror
//
// arg1 success
// arg2 error
// arg0 arg
['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function(method) {
    RTCPeerConnection.prototype[method] = function() {
        var seqno = this.nextCallSeqno();

        this._onSuccess(seqno, method, arguments.length < 2 ? undefined : arguments[1]);
        this._onError(seqno, method, arguments.length < 3 ? undefined : arguments[2]);

        var arg = arguments.length < 1 ? undefined : arguments[0];
        switch (method){
            case "setLocalDescription":
                this.currentLocalDescription = rtcSessionDescription;
                var rtcSessionDescription = arg; //RTCSessionDescription
                this._xobj.SetLocalDescription(this._id, seqno, JSON.stringify(rtcSessionDescription));

                break;
            case "setRemoteDescription":
                this.currentRemoteDescription = rtcSessionDescription;
                var rtcSessionDescription = arg; //RTCSessionDescription
                this._xobj.SetRemoteDescription(this._id, seqno, JSON.stringify(rtcSessionDescription));

                break;
            case "addIceCandidate":
                var candidate = arg; //RTCIceCandidate
                this._xobj.AddIceCandidate(this._id, seqno, JSON.stringify(candidate));

                break;
            default:
        }
    };
});

RTCPeerConnection.prototype.addStream = function (stream) {
    this.localStreams = [stream];
    this._xobj.AddLocalStream(this._id, stream._xobj);
}

RTCPeerConnection.prototype.close = function () {
    this.iceConnectionState = "closed";
}


RTCPeerConnection.prototype.removeStream = function (stream) {

}

// RTCPeerConnection.prototype.addTrack = function (track, stream) {
//
// }
// RTCPeerConnection.prototype.getReceivers = function () {
//
// }


module.exports = RTCPeerConnection;