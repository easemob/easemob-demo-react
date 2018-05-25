var _util = require('../../../webrtc/src/components/Util');
var _logger = _util.tagLogger("MouseTrigger");

var BTN = {
    LEFT: 1,
    WHEEL: 2,
    RIGHT: 4,

    WHEEL_ROLL_UP: 8,
    WHEEL_ROLL_DOWN: 16,

    KEY_UP: 0,
    KEY_DOWN: 1,
    MOVE: 2,

    KEYBOARD_DOWN: 3,
    KEYBOARD_UP: 4,
}

/**
 *
 * {
 *  xy: eventXY,
 *  oper: oper,
 *  btn: button,
 *  _time: _time
 * }
 *
 *
 */
module.exports = _util.prototypeExtend({
    _timeoutMillis: 500,
    _time: (new Date()).getTime(),

    isKeyup: function () {
        return BTN.KEY_UP == this.oper;
    },
    isKeydown: function () {
        return BTN.KEY_DOWN == this.oper;
    },
    isWheelup: function () {
        return BTN.WHEEL_ROLL_UP == this.btn;
    },
    isWheeldown: function () {
        return BTN.WHEEL_ROLL_DOWN == this.btn;
    },
    isLeftKey: function () {
        return BTN.LEFT == this.btn;
    },
    isRightKey: function () {
        return BTN.RIGHT == this.btn;
    },
    isWheelKey: function () {
        return BTN.WHEEL == this.btn;
    },
    isWheelRoll: function () {
        return this.isWheeldown() || this.isWheelup();
    },
    
    timeout: function () {
        var cur = (new Date()).getTime();
        return cur - this._time >= this._timeoutMillis;
    },

    _toString: function () {
        return _util.list("btn:", this.btn, ", oper:", this.oper, ", timeout:", this.timeout(), ", at (", this.xy.x, ", ", this.xy.y, ")").join("");
    }
});

module.exports.BTN = BTN;