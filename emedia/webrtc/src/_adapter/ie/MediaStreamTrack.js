var _util = require('../../components/Util');
var _logger = _util.tagLogger("IE");

var MediaStreamTrack = _util.prototypeExtend({
    //contentHint
    //enabled
    //id
    //kind "audio|video"
    //label
    //muted
    //readonly
    //readyState
    //remote

    //stop()
    //onmute
    //onunmute
    //onended
});

module.exports = MediaStreamTrack;