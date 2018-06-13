var adapter;

if (!!document.documentMode) { // Detect IE (6-11)
    var hasMatch = /\brv[ :]+(\d+)/g.exec(navigator.userAgent) || [];

    var webrtcDetectedBrowser   = 'IE';
    var webrtcDetectedVersion   = parseInt(hasMatch[1], 10);
    var webrtcMinimumVersion    = 9;
    var webrtcDetectedType      = 'plugin';
    var webrtcDetectedDCSupport = 'SCTP';

    if (!webrtcDetectedVersion) {
        hasMatch = /\bMSIE[ :]+(\d+)/g.exec(navigator.userAgent) || [];

        webrtcDetectedVersion = parseInt(hasMatch[1] || '0', 10);
    }

    adapter = require('./IE.adapter');

    adapter.__browser = webrtcDetectedBrowser;
    adapter.__browserVersion = webrtcDetectedVersion;

    //adapter = require('./Temasys.wrapper'); //6.0.3
}else{
    adapter = require('./adapter'); //6.2.0
}


adapter.__browser = adapter.__browser || adapter.browserDetails.browser; // firefox chrome safari
adapter.__browserVersion = adapter.__browserVersion || adapter.browserDetails.version;

console && console.info("Current browser", adapter.__browser, adapter.__browserVersion);

if("Not a supported browser." === adapter.__browser){
    throw "Not a supported browser";
}


function _attachMediaStream(element, stream) {
    element.srcObject = stream;
}

/**
 * muted undefined, stream _located true 时muted
 *
 * @param element
 * @param stream
 * @param muted
 * @returns {*}
 */
function easemobAttachMediaStream(element, stream, muted, _fun) {
    function mute() {
        muted = !!(muted === undefined ? stream._located : muted);

        //为了解决某些手机mute造成本地图像卡的问题
        element.muted = false;
        if(muted !== element.muted){
            element.muted = true;
        }
    }

    _fun || (_fun = window.__attachMediaStream) || (_fun = _attachMediaStream);

    if(!element){
        return;
    }

    if(!stream){
        _fun(element, stream);
        return;
    }

    if(!element.srcObject){
        mute();
        _fun(element, stream);
        return element;
    }

    if(element.srcObject._located //old stream 也是 _located
            && stream._located
            && element.srcObject.id === stream.id){
        return element.srcObject;
    }

    mute();
    _fun(element, stream);

    return element;
}

if(window.attachMediaStream){
    window.__attachMediaStream = window.attachMediaStream;
}

window.attachMediaStream = easemobAttachMediaStream;

module.exports = adapter;
