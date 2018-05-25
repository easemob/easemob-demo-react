var _util = require('../../../webrtc/src/components/Util');
var _logger = _util.tagLogger("TotalBuffer");

var EventBuffer = require("./EventBuffer");
var TrackBuffer = require("./TrackBuffer");

var MouseTrigger = require("./MouseTrigger");

module.exports = _util.prototypeExtend({
    trackBufferSize: 100,
    _trackBufferCompRadio: 0.25,

    _sn: 1,

    __init__: function () {
        this._eventBuffer = new EventBuffer({
            _nextsn: this._nextsn.bind(this)
        });
        this._trackBuffer = new TrackBuffer({
            _nextsn: this._nextsn.bind(this),
            _compRadio: this._trackBufferCompRadio,
            mouseTrackBufferSize: this.trackBufferSize
        });
    },

    _nextsn: function () {
        return this._sn ++;
    },

    put: function (event) {
        if(!event || event.oper === undefined){
            return;
        }

        event.oper === MouseTrigger.BTN.MOVE ?
            this._trackBuffer.put(event) : this._eventBuffer.put(event);
    },


    getUnread1: function (length) {
        function sortby(a, b) {
            return a._time - b.time;
        }

        var result;
        if(!length){
            var events = this._eventBuffer.getUnread();
            var tracks = this._trackBuffer.getUnread();

            Array.prototype.push.apply(events, tracks);
            result = events;

            result.sort(sortby);
            return result;
        }

        result = [];

        var events = this._eventBuffer._getUnread(length);
        var tracks = this._trackBuffer._getUnread(length);

        Array.prototype.push.apply(result, events);
        Array.prototype.push.apply(result, tracks);

        result.sort(sortby);

        result = result.slice(0, length > result.length ? result.length : length);
        for(var i = 0; i < result.length; i++){
            if(result[i].oper === MouseTrigger.BTN.MOVE){
                this._trackBuffer.getUnread(1);
            }else{
                this._eventBuffer.getUnread(1);
            }
        }

        return result;
    },

    getUnread: function (length) {
        function sortby(a, b) {
            return a.sn - b.sn;
        }

        if(!length){
            length = this._eventBuffer.getUnreadSize() + this._trackBuffer.getUnreadSize();
        }

        var result = [];
        while(result.length !== length){
            var event = this._eventBuffer._getUnread(1);
            var track = this._trackBuffer._getUnread(1);

            if(event === undefined && track){
                result.push(this._trackBuffer.getUnread(1));
            } else if(track === undefined && event){
                result.push(this._eventBuffer.getUnread(1));
            } else if(track === undefined && event === undefined){
                return result;
            } else {
                if(event.sn < track.sn){
                    result.push(this._eventBuffer.getUnread(1));
                }else{
                    result.push(this._trackBuffer.getUnread(1));
                }
            }
        }

        return result;
    },

    getUnreadSize: function () {
        return this._trackBuffer.getUnreadSize() + this._eventBuffer.getUnreadSize();
    },

    getUnclearSize: function () {
        return this._trackBuffer.getUnclearSize() + this._eventBuffer.getUnclearSize();
    },

    clearRead: function (limitSN) { // <=
        return this._eventBuffer.clearRead(limitSN) + this._trackBuffer.clearRead(limitSN);
    }
});
