var _util = require('../../../webrtc/src/components/Util');
var _logger = _util.tagLogger("Keyboard");

var KeyboardUtil = require("./KeyboardUtil");
var KeyEventDecoder = require("./KeyEventDecoder");
var KeyboardUtil = require("./KeyboardUtil");

var keyboardUtil = new KeyboardUtil();

module.exports = _util.prototypeExtend({
    _skipKeys: [["ctrl", 27], ["alt", 9]],

    __init__: function () {
        var self = this;

        this._eventHandlers = {
            keyup: this._handleKeyUp.bind(this),
            keydown: this._handleKeyDown.bind(this),
            keypress: this._handleKeyPress.bind(this),
            blur: this._allKeysUp.bind(this)
        }

        this._keyHandler = (new KeyEventDecoder({
            keyboardUtil: keyboardUtil,
            modifierSync: keyboardUtil.ModifierSync(),
            onKey: this._handleRfbEvent.bind(this)
        })).decoder();
    },

    onKeyPress: function(keyValue, isPressed) {
    },

    _onKeyPress: function(keyValue, isPressed) {
        this.onKeyPress && this.onKeyPress(keyValue, isPressed);
    },

    _handleRfbEvent: function(event) {
        this._onKeyPress(event.keysym.keysym, "keydown" == event.type);
    },

    _handleKeyDown: function(event) {
        var skipKeys = this._skipKeys;

        if (skipKeys && skipKeys.length){
            for (var skipLength = skipKeys.length, evtKeycode = event.keyCode, i = 0; i < skipLength; i++) {
                for (var l = skipKeys[i] || [], s = l.length, flag = true, j = 0; j < s; j++) {
                    var keyname = l[j];
                    if ("ctrl" === keyname || "alt" === keyname || "shift" === keyname || "meta" === keyname) {
                        if (!event[keyname + "Key"]) {
                            flag = false;
                            break
                        }
                    } else if (keyname !== evtKeycode) {
                        flag = false;
                        break
                    }
                }
                if (flag){
                    return _util.stopEvent(event), false;
                }
            }
        }

        return !this._focused || !this._keyHandler.keydown(event) || (_util.stopEvent(event), false);
    },
    _handleKeyPress: function(event) {
        return !this._focused || !this._keyHandler.keypress(event) || (_util.stopEvent(event), false)
    },
    _handleKeyUp: function(event) {
        return !this._focused || !this._keyHandler.keyup(event) || (_util.stopEvent(event), false);
    },

    _allKeysUp: function() {
        this._keyHandler.releaseAll();
    },
    sync: function(e) {
        this._keyHandler.syncModifiers(e);
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


