var _util = require('../../components/Util');
var _logger = _util.tagLogger("IE.sdp");

var RTCSessionDescription = _util.prototypeExtend({
    // sdp:
    // type:

    toJSON: function () {
        return JSON.stringify(this);
    }
});

module.exports = RTCSessionDescription;