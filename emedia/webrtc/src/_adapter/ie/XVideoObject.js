var _util = require('../../components/Util');
var _logger = _util.tagLogger("IE.Video");

var globalVideoSeqno = 0;

var Video = _util.prototypeExtend({
    id: _util.list("video", globalVideoSeqno++).join("_"),
    classid: 'clsid:10b0eb8e-ed8b-48bd-9881-60e3fa79eb85',
    width: 200,
    height: 150,

    // params: {},
    param: function (name, value) {
        (this.params || (this.params = {}))[name] = value;

        return this;
    },
    
    replace: function (videoTag) {
        var tag = createVideoObject(this);

        var parentNode = videoTag ? videoTag.parentNode : document.body;

        tag.style = videoTag.style;
        parentNode.appendChild(tag);

        videoTag.style.display = "none";
        this._rtag = videoTag;

        return tag;
    },

    remove: function () {
        this._rtag.style.display = "block";
        removeVideo(this);
    }
});

Video.factory = function (cfg) {
    return new Video(cfg || {});
}

function paramsHTMLTag(params) {
    var html = "";
    _util.forEach(params, function (param, value) {
        html += _util.list("<param name='", param, "'", "value='", value, "'", "/>").join(" ");
    });

    return html;
}

function createVideoObject(video) {
    // only inject once the page is ready
    if (document.readyState !== 'interactive' && document.readyState !== 'complete') {
        return;
    }

    var tag = document.getElementById("#" + video.id);
    if(tag){
        return video._xobj = video.tag = tag;
    }

    //"<object id=\"pc1LocalWindow\" classid=\"clsid:10b0eb8e-ed8b-48bd-9881-60e3fa79eb85\" width=\"200\" height=\"150\"><param name=\"WebRtcWindowName\" value=\"testWindow\"/></object>"
    video.tag = tag = document.createElement('object');
    tag.id = video.id;
    tag.classid =video.classid;
    tag.width = video.width;
    tag.height = video.height;

    if(plugin.params){
        tag.innerHTML = paramsHTMLTag(plugin.params);
    }

    tag._videoTag = video;

    return video._xobj = video.tag;
}

function removeVideo(video) {
    var id = video;
    if(typeof video !== 'string'){
        id = video.id;
    }

    var tag = document.getElementById("#" + id);
    document.removeChild(tag);
}

module.exports = Video;