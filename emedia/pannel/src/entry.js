var emedia = window.emedia = window.emedia || {};
var pannel = emedia.pannel = {};

;(function (root, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.pannel = factory();
    }
}(this, function () {
    'use strict';

    return pannel;
}));


pannel.Mouse = require('./components/Mouse');
pannel.MouseTrigger = require('./components/MouseTrigger');
pannel.Keyboard = require('./components/Keyboard');

pannel.KeyboardTrack = require('./components/KeyboardTrack');
pannel.MouseTrack = require('./components/MouseTrack');
pannel.DefaultMouseTrack = require('./components/DefaultTrack');

pannel.TrackBuffer = require('./components/TrackBuffer');
pannel.EventBuffer = require('./components/EventBuffer');

pannel.TotalBuffer = require('./components/TotalBuffer');

pannel.util = require('../../webrtc/src/components/Util');
pannel.logger = pannel.util.tagLogger("Pannel");
