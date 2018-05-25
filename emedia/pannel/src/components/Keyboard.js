var _util = require('../../../webrtc/src/components/Util');
var _logger = _util.tagLogger("Keyboard");

module.exports = _util.prototypeExtend({

    __init__: function () {
        var self = this;

        this._eventHandlers = {
            keyup: this._handleKeyUp.bind(this),
            keydown: this._handleKeyDown.bind(this),
            keypress: this._handleKeyPress.bind(this),
            blur: this._allKeysUp.bind(this)
        }
    },

    getKey: function(event) {
        return "keyCode"in event && "key"in event ?
            (event.key + ":" + event.keyCode) : ("keyCode" in event ? event.keyCode : event.key)
    },

    onKeyPress: function(keyValue, isPressed) {
    },

    _onKeyPress: function(keyValue, isPressed) {
        this.onKeyPress && this.onKeyPress(keyValue, isPressed);
    },

    _handleRfbEvent: function(event, type) {
        var shift = event.shiftKey,
            ctrl = event.ctrlKey,
            alt = event.altKey,
            ascii = event.keyCode || event.which;

        this._onKeyPress(ascii, "keydown" == type);
    },

    _handleKeyDown: function(event) {
        return !this._focused || !this._handleRfbEvent(event, "keydown") || (_util.stopEvent(event), false);
    },
    _handleKeyPress: function(event) {
        return !this._focused || (_util.stopEvent(event), false)
        //return !this._focused || !this._handleRfbEvent.keypress(event) || (_util.stopEvent(event), false);
    },
    _handleKeyUp: function(event) {
        return !this._focused || !this._handleRfbEvent(event, "keyup") || (_util.stopEvent(event), false);
    },

    _allKeysUp: function() {
    },
    sync: function(e) {
    },

    grab: function() {
        var element = this._target;

        _util.addEvent(element, "keydown", this._eventHandlers.keydown);
        _util.addEvent(element, "keyup", this._eventHandlers.keyup);
        _util.addEvent(element, "keypress", this._eventHandlers.keypress);
        _util.addEvent(element, "blur", this._eventHandlers.blur);
        //_util.addEvent(window, "blur", this._eventHandlers.blur);

        _logger.info("keyboard grab at element");
    },
    ungrab: function() {
        var element = this._target;

        _util.removeEvent(element, "keydown", this._eventHandlers.keydown);
        _util.removeEvent(element, "keyup", this._eventHandlers.keyup);
        _util.removeEvent(element, "keypress", this._eventHandlers.keypress);
        _util.removeEvent(element, "blur", this._eventHandlers.blur);
        //_util.removeEvent(window, "blur", this._eventHandlers.blur);

        this._allKeysUp();

        _logger.info("keyboard upgrab at element");
    }
});


