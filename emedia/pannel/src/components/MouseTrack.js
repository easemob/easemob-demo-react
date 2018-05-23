var _util = require('../../../webrtc/src/components/Util');
var _logger = _util.tagLogger("MouseTrack");

var MouseTrigger = require("./MouseTrigger");

module.exports = _util.prototypeExtend({
    _scale: 1,

    __init__: function () {
        var self = this;
    },

    getTargetPageXY: function () {
        var self = this;
        return self._target && _util.extend({}, (_util.getDomPageRect(self._target)));
    },

    onMouseTrack: function (position, lastPosition, lastTrigger) {
        //_logger.warn(position.x, position.y);
    },

    onMouseTrigger: function (trigger, _lastTrigger) {
    },

    _onMouseTrack: function (position, lastPosition, _lastTrigger) {
        this.onMouseTrack && this.onMouseTrack(position, lastPosition, _lastTrigger);
    },
    _onMouseTrigger: function (trigger, _lastTrigger) {
        this.onMouseTrigger && this.onMouseTrigger(trigger, _lastTrigger);
    },
    
    track: function(pos) {
        var self = this;

        var pageXY = pos = _util.extend({}, pos);

        var _elementPageXY = self.getTargetPageXY();
        _elementPageXY && (pos = self._calPosition(pos), pageXY = {
            x: pos.x,
            y: pos.y,
            pageX: (_elementPageXY.x + pos.x),
            pageY: (_elementPageXY.y + pos.y)
        });

        self._onMouseTrack(pageXY, self._lastPageXY, self._lastTrigger);
        self._lastPageXY = pageXY;
    },
    
    trigger: function (trigger) {
        var self = this;

        trigger = new MouseTrigger(trigger);

        var _elementPageXY = self.getTargetPageXY();

        var pos;
        _elementPageXY && (pos = self._calPosition(trigger.xy), trigger.xy = {
            x: pos.x,
            y: pos.y,
            pageX: (_elementPageXY.x + pos.x),
            pageY: (_elementPageXY.y + pos.y)
        });
        trigger._time || (trigger._time = (new Date()).getTime());

        self._onMouseTrigger(trigger, self._lastTrigger);
        self._lastTrigger = trigger;
    },

    releaseTrigger: function () {
        this._lastTrigger = undefined;
        this._lastPageXY = undefined;

        this.onReleaseTrigger && this.onReleaseTrigger(this._lastTrigger);
    },

    /**
     *
     *
     * @param mousePos
     * @private
     */
    _calPosition: function (mousePos) {
        var self = this;

        var _elementPageXY = self.getTargetPageXY();
        if(!_elementPageXY){
            return mousePos;
        }

        if(_util.isFloat(mousePos.x) && mousePos.width !== undefined){ //比率
            mousePos.x = (mousePos.x * mousePos.width) * self._scale * (_elementPageXY.width / mousePos.width);
        }
        if(_util.isFloat(mousePos.y) && mousePos.height !== undefined){ //比率
            mousePos.y = (mousePos.y * mousePos.height) * self._scale * (_elementPageXY.height / mousePos.height);
        }

        if(_util.isFloat(mousePos.x) && mousePos.width === undefined){ //比率
            mousePos.x = mousePos.x * self._scale * _elementPageXY.width;
        }
        if(_util.isFloat(mousePos.y) && mousePos.height === undefined){ //比率
            mousePos.y = mousePos.y * self._scale * _elementPageXY.height;
        }

        if(_util.isInt(mousePos.x) && mousePos.width !== undefined){
            mousePos.x = mousePos.x * self._scale * (_elementPageXY.width / mousePos.width);
        }
        if(_util.isInt(mousePos.y) && mousePos.height !== undefined){
            mousePos.y = mousePos.y * self._scale * (_elementPageXY.height / mousePos.height);
        }

        if(_util.isInt(mousePos.x) && mousePos.width === undefined){
            mousePos.x = mousePos.x * self._scale;
        }
        if(_util.isInt(mousePos.y) && mousePos.height === undefined){
            mousePos.y = mousePos.y * self._scale;
        }

        var x = Math.floor(mousePos.x);
        var y = Math.floor(mousePos.y);

        if(x < 0){
            x = _elementPageXY.width + x;
        }
        if(y < 0){
            y = _elementPageXY.width + y;
        }

        return {x: x, y: y, width: _elementPageXY.width, height: _elementPageXY.height};
    }
});