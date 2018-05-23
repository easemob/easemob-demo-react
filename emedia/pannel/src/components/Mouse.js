var _util = require('../../../webrtc/src/components/Util');
var _logger = _util.tagLogger("Mouse");


var MouseTrigger = require("./MouseTrigger");

/**
 * { target:
 *   onMouseButton:
 *   onMouseMove:
 * }
 *
 */

module.exports = _util.prototypeExtend({
    __init__: function () {
        var self = this;

        this._handlers = _util.extend({
            mousedown: this._handleMouseDown.bind(this),
            mouseup: this._handleMouseUp.bind(this),
            mousemove: this._handleMouseMove.bind(this),
            mousewheel: this._handleMouseWheel.bind(this),
            mousedisable: this._handleMouseDisable.bind(this),
            mouseover: this._handleMouseOver.bind(this),
            mouseout: this._handleMouseOut.bind(this)
        }, this._handlers || {});
    },

    //target: n,

    /**
     *
     * @param posX
     * @param posY
     * @param oper 1按下 0up
     * @param button 1左键单击 2滚轮按下 4右键 8滚轮向底端滑 16滚轮向顶端滑
     */
    onMouseButton: function(trigger, lastTrigger) {

    },

    onMouseMove: function(eventXY, lastTrigger) {

    },

    onMouseEnter: function () {

    },

    onMouseExit: function () {

    },

    _onMouseButton: function (eventXY, oper, button) {
        var _time = (new Date().getTime());

        var trigger = new MouseTrigger({
            xy: eventXY,
            oper: oper,
            btn: button,
            _time: _time
        });

        this.onMouseButton && this.onMouseButton(trigger, this._lastTrigger);

        this._lastTrigger = trigger;
    },

    _onMouseMove: function (eventXY) {
        this.onMouseMove && this.onMouseMove(eventXY, this._lastTrigger);
    },

    _captureMouse: function() {
        this._target.setCapture && this._target.setCapture();
        this._mouseCaptured = true;
    },
    _releaseMouse: function() {
        this._target.releaseCapture && this._target.releaseCapture();
        this._mouseCaptured = false;
    },
    _resetDoubleClickTimer: function() {
        this._doubleClickTimer = null;
    },

    _handleMouseOver:function (event) {
        if(this._mouseExit !== false){
            this._mouseExit = false;
            this.onMouseEnter && this.onMouseEnter();
        }
    },
    _handleMouseOut:function (event) {
        if(this._mouseExit !== true){
            this._mouseExit = true;
            this.onMouseExit && this.onMouseExit();
        }

        this._lastTrigger = undefined;
    },
    _handleMouseDown: function(event) {
        this._captureMouse();
        this._handleMouseButton(event, MouseTrigger.BTN.KEY_DOWN);
    },
    _handleMouseUp: function(event) {
        this._mouseCaptured && (this._handleMouseButton(event, MouseTrigger.BTN.KEY_UP), this._releaseMouse());
    },

    _handleMouseWheel: function(event) {
        if (!this._focused){
            return;
        }

        var event = event || window.event, eventXY = _util.getEventElementXY(event, this._target, this._scale);

        // 8up 16down
        var wheel = (event.detail ? -1 * event.detail : event.wheelDelta / 40) > 0 ? MouseTrigger.BTN.WHEEL_ROLL_UP : MouseTrigger.BTN.WHEEL_ROLL_DOWN;
        this._onMouseButton(eventXY, MouseTrigger.BTN.KEY_DOWN, wheel);
        _util.stopEvent(event);
    },

    _handleMouseMove: function(event) {
        if (!this._focused){
            return;
        }

        var event = event || window.event, eventXY = _util.getEventElementXY(event, this._target, this._scale);
        this._onMouseMove(eventXY);
        _util.stopEvent(event);
    },

    _handleMouseDisable: function(event) {
        if (!this._focused){
            return;
        }

        var event = event || window.event, eventXY = _util.getEventElementXY(event, this._target, this._scale);

        try{
            return !(eventXY.realX >= 0 && eventXY.realY >= 0 && eventXY.realX < this._target.offsetWidth && eventXY.realY < this._target.offsetHeight);
        } finally{
            _util.stopEvent(event);
        }
    },

    /**
     *
     * @param event
     * @param oper 1鼠标按下
     * @private
     */
    _handleMouseButton: function(event, oper) {
        if (!this._focused){
            return;
        }

        var button, event = event || window.event, eventXY = _util.getEventElementXY(event, this._target, this._scale);
        if (event.touches || event.changedTouches) {
            if (oper == MouseTrigger.BTN.KEY_DOWN) {
                if (this._doubleClickTimer === null)
                    this._lastTouchPos = eventXY;
                else {
                    clearTimeout(this._doubleClickTimer);
                    var distanceX = this._lastTouchPos.x - eventXY.x, distanceY = this._lastTouchPos.y - eventXY.y;
                    (Math.sqrt(distanceX * distanceX + distanceY * distanceY) < 20 * window.devicePixelRatio) && (eventXY = this._lastTouchPos)
                }
                this._doubleClickTimer = setTimeout(this._resetDoubleClickTimer.bind(this), 500);
            }
            button = MouseTrigger.BTN.LEFT;
        } else
            button = event.which ? 1 << event.button : (1 & event.button) + 2 * (2 & event.button) + (4 & event.button) / 2;

        this._onMouseButton(eventXY, oper, button);
        _util.stopEvent(event);
    },

    grab: function() {
        var element = this._target;

        _util.addEvent(element, "mouseover", this._handlers.mouseover);
        _util.addEvent(element, "mouseout", this._handlers.mouseout);

        _util.addEvent(element, "touchstart", this._handlers.mousedown);
        //_util.addEvent(window, "touchend", this._handlers.mouseup);
        _util.addEvent(element, "touchend", this._handlers.mouseup);
        _util.addEvent(element, "touchmove", this._handlers.mousemove);
        _util.addEvent(element, "mousedown", this._handlers.mousedown);
        //_util.addEvent(window, "mouseup", this._handlers.mouseup);
        _util.addEvent(element, "mouseup", this._handlers.mouseup);
        _util.addEvent(element, "mousemove", this._handlers.mousemove);
        _util.addEvent(element, _util.layoutEngine.gecko ? "DOMMouseScroll" : "mousewheel", this._handlers.mousewheel);
        _util.addEvent(element, "contextmenu", this._handlers.mousedisable);
        //_util.addEvent(document, "click", this._handlers.mousedisable);
        //_util.addEvent(document.body, "contextmenu", this._handlers.mousedisable);
    },
    ungrab: function() {
        var element = this._target;

        _util.removeEvent(element, "mouseover", this._handlers.mouseover);
        _util.removeEvent(element, "mouseout", this._handlers.mouseout);

        _util.removeEvent(element, "touchstart", this._handlers.mousedown);
        //_util.removeEvent(window, "touchend", this._handlers.mouseup);
        _util.removeEvent(element, "touchend", this._handlers.mouseup);
        _util.removeEvent(element, "touchmove", this._handlers.mousemove);
        _util.removeEvent(element, "mousedown", this._handlers.mousedown);
        //_util.removeEvent(window, "mouseup", this._handlers.mouseup);
        _util.removeEvent(element, "mouseup", this._handlers.mouseup);
        _util.removeEvent(element, "mousemove", this._handlers.mousemove);
        _util.removeEvent(element, _util.layoutEngine.gecko ? "DOMMouseScroll" : "mousewheel", this._handlers.mousewheel);
        _util.removeEvent(element, "contextmenu", this._handlers.mousedisable);
        //_util.removeEvent(document, "click", this._handlers.mousedisable);
        //_util.removeEvent(document.body, "contextmenu", this._handlers.mousedisable);
    }
});