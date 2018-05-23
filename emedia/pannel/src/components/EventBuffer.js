var _util = require('../../../webrtc/src/components/Util');
var _logger = _util.tagLogger("EventBuffer");


module.exports = _util.prototypeExtend({
    _buffer: [],

    _sn: 1,

    _beginIndex: 0,
    _readIndex: 0,
    _endIndex: 0,

    _nextsn: function () {
        return this._sn ++;
    },

    put: function (event) {
        if(!event){
            return;
        }

        event.sn = this._nextsn();

        this._buffer.push(event);
        this._endIndex++;
    },

    _getUnread: function (length) {
        if(this._readIndex === this._endIndex){
            return length === 1 ? undefined : [];
        }

        return this._buffer[this._readIndex];

        var end = this._readIndex + (length || this._endIndex),
            end = (end > this._endIndex ? this._endIndex : end);

        return this._buffer.slice(this._readIndex, end);
    },

    getUnread: function (length) {
        var result;
        try{
            result = this._getUnread(length);
            return result;
        } finally {
            result && (this._readIndex += (length === 1 ? 1 : result.length));
        }
    },

    getUnreadSize: function () {
        return this._endIndex - this._readIndex;
    },

    getUnclearSize: function () {
        return this._readIndex - this._beginIndex;
    },

    clearRead: function (limitSN) { // <=
        if(this._readIndex === this._beginIndex){
            return;
        }

        var count = 0;
        for(var i = this._beginIndex; i < this._readIndex; i++){
            if(this._buffer[i].sn <= limitSN){
                count++;
            }else{
                break;
            }
        }

        if(count === 0){
            return 0;
        }

        for(var i = 0; i < count; i++){
            this._buffer.shift();
        }

        this._beginIndex = 0;
        this._readIndex -= count;
        this._endIndex -= count;

        return count;
    }
});