var _util = require('../../../webrtc/src/components/Util');
var _logger = _util.tagLogger("TrackBuffer");


module.exports = _util.prototypeExtend({
    mouseTrackBufferSize: 1000,

    _sn: 1,
    _compRadio: 0.25,

    _beginIndex: 0,
    _readIndex: 0,
    _endIndex: 0, //不包含end

    __init__: function () {
        this._mouseTrackBuffer = new Array(this.mouseTrackBufferSize);
    },

    _nextsn: function () {
        return this._sn ++;
    },

    _index: function (_index) {
        return _index % this.mouseTrackBufferSize;
    },

    comp1: function(compRadio){ //compRadio 压缩原来的compRadio，如0.25，就是删除其中0.25个元素
        if(compRadio >= 1){
            return;
        }

        var span = Math.floor(1 / compRadio);

        var _nextIndex = this._beginIndex;
        var _currentIndex = _nextIndex + 1;

        while (_nextIndex < this._endIndex){
            for(var i = 2; i < span && (_nextIndex + i) < this._endIndex; i++){
                this._mouseTrackBuffer[this._index(_currentIndex++)] = this._mouseTrackBuffer[this._index(_nextIndex + i)];
            }

            _nextIndex += span;
        }

        this._endIndex = _currentIndex;
    },

    put1: function (track) {
        if(!track){
            return;
        }

        track.sn = this._nextsn();


        if(this._endIndex - this._readIndex === this.mouseTrackBufferSize){
            //此时 begin = read, buffer）将原有数组(未发送队列)压缩为原先的0.75
            this.comp1(this._compRadio);
            this._readIndex = this._beginIndex;
        }

        var begin = this._index(this._beginIndex),
            read = this._index(this._readIndex),
            end = this._index(this._endIndex);

        var next = end;
        if(next <= begin && next >= 0 && this._endIndex > this._beginIndex){ // buffer不足后，首先覆盖已经发送的
            this._beginIndex++;
        }

        this._mouseTrackBuffer[next] = track;
        this._endIndex++;
    },

    compHalfOfUnread: function(){ //compRadio 压缩原来的compRadio，如0.25，就是删除其中0.25个元素
        var _nextIndex = this._readIndex + 2;
        var _currentIndex = this._readIndex + 1;

        while (_nextIndex < this._endIndex){
            this._mouseTrackBuffer[this._index(_currentIndex++)] = this._mouseTrackBuffer[this._index(_nextIndex)];

            _nextIndex += 2;
        }

        this._endIndex = _currentIndex;
    },

    put: function (track) {
        if(!track){
            return;
        }

        track.sn = this._nextsn();


        if(this._endIndex - this._beginIndex === this.mouseTrackBufferSize){
            // begin->read 待清除区，read->end 待发送，如果待清除区+待发送区满，压缩待发送区
            this.compHalfOfUnread();
        }

        var end = this._index(this._endIndex);

        this._mouseTrackBuffer[end] = track;
        this._endIndex++;
    },

    _interval: function (startIndex, endIndex) {
        var read = this._index(startIndex), end = this._index(endIndex);

        if(read < end){
            return this._mouseTrackBuffer.slice(read, end);
        }

        var result = this._mouseTrackBuffer.slice(read);
        Array.prototype.push.apply(result, this._mouseTrackBuffer.slice(0, end));

        return result;
    },

    _getUnread: function (length) {
        if(this._readIndex === this._endIndex){
            return length === 1 ? undefined : [];
        }

        return this._mouseTrackBuffer[this._index(this._readIndex)];

        var end = this._readIndex + (length || this._endIndex),
            end = (end > this._endIndex ? this._endIndex : end);

        return this._interval(this._readIndex, end);
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
            var index = this._index(i);

            if(this._mouseTrackBuffer[index].sn <= limitSN){
                this._beginIndex++;
                count++;
            }else{
                break;
            }
        }

        return count;
    }
});