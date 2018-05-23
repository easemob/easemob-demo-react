var _util = require('../../components/Util');
var _logger = _util.tagLogger("IE");

var MediaDevicesInfo = require("./MediaDevicesInfo");

var MediaDevices = function (plugin) {
    this.plugin = plugin;
    var xplugin = this._xobj = plugin._xobj;
}

//https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia
MediaDevices.prototype.getUserMedia = function (constraints, successCallback, errorCallback) {
    constraints || (constraints = {audio: true, video: true});

    constraints.audio = !!constraints.audio;
    !constraints.video && (constraints.video = !!constraints.video);

    try{
        var xstream = this._xobj.GetUserMedia(JSON.stringify(constraints));
        var ms = new MediaStream({
            id: pcId + "_s" + xstream.id,
            _xobj: xstream
        });

        successCallback && successCallback(ms);

        return ms;
    } catch (e){
        errorCallback && errorCallback(e);
    }
}

//https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/enumerateDevices
MediaDevices.prototype.enumerateDevices = function (successCallback, errorCallback) {
    try{
        var xdevices = this._xobj.EnumerateDevices();

        xdevices && (xdevices = JSON.parse(xdevices));

        var mediaDevicesInfos = [];
        _util.forEach(xdevices, function (_index, device) {
            mediaDevicesInfos = new MediaDevicesInfo(device);
        });

        successCallback && successCallback(mediaDevicesInfos);

        return mediaDevicesInfos;
    } catch (e){
        errorCallback && errorCallback(e);
    }
}

module.exports = MediaDevices;