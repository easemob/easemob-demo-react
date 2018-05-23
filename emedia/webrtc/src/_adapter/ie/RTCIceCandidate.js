var _util = require('../../components/Util');
var _logger = _util.tagLogger("IE.cand");

var RTCIceCandidate =  _util.prototypeExtend({
    // candidate: cands[i].candidate,
    // sdpMLineIndex: cands[i].sdpMLineIndex,
    // sdpMid: cands[i].sdpMid

    toJSON: function () {
        return JSON.stringify(this);
    }
});

module.exports = RTCIceCandidate;