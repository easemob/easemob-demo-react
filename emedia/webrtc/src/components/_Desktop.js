
var _util = require('./Util');
var _logger = _util.tagLogger("Desktop");

var __event = require('./event');


window.__shareDesktopMessageCount__ = 0;

module.exports = _util.prototypeExtend({

    __RTC_PAGE_MSG_TYPE__: 'RTC-SD-PAGE',
    __RTC_EXT_MSG_TYPE__: 'RTC-SD-EXT',



    __init__: function () {
        var self = this;

        self.__extLoaded = self.rsdExtLoaded();
        if(self.__extLoaded){
            self.__onRsdExtLoad();
        }

        window.addEventListener("load", function(event) {
            if(self.__extLoaded){
                return;
            }

            var exist = self.rsdExtLoaded();
            // console.log('exist=', exist, ', ev4detect=', ev4detect);

            self.__extLoaded = exist;
        });

        window.addEventListener('message', function (event) {
            if(!event.data) {
                return;
            }

            var msg = event.data;
            if(!msg.type || msg.type !== self.__RTC_EXT_MSG_TYPE__ || !msg.evname) {
                return;
            }
            _logger.info('got ext-msg: ', msg);


            if(msg.evname === 'extLoaded'){
                if(!self.__extLoaded){
                    self.__extLoaded = true;

                    setTimeout(self.__onRsdExtLoad(), 50);
                }

                return;
            }

            self.__onMessage(msg);
        });
    },

    rsdExtLoaded: function(){
        var existele = document.getElementById('RTC-Share-Deskto-installed-ele-rat1abrr');
        return existele ? true : false;
    },

    __sendMessage: function(msg, callback){
        var self = this;

        var tsxId = 'tsx_' + (__shareDesktopMessageCount__++) + '_' +  Math.random().toString(36).substr(2,4);

        if(!self.__extLoaded){
            throw "Rtc share desktop not loaded";
        }

        msg.tsxId = tsxId;

        self["on_" + tsxId] = function () {
            callback && callback.apply(self, arguments);

            delete self["on_" + tsxId];
        }

        window.postMessage && window.postMessage(msg, '*');
    },

    __onMessage: function (msg) {
        var self = this;

        var tsxId = msg.tsxId;

        self["on_" + tsxId] && self["on_" + tsxId](msg);
        //self["on_" + tsxId] || _logger.info(msg);
    },

    __onRsdExtLoad: function () {
        var self = this;

        self.onExtLoaded && self.onExtLoaded();
    },

    openDesktopMedia: function (screenOptions, callback){
        var self = this;

        if(!self.__extLoaded || !self.rsdExtLoaded()){
            callback(new __event.ShareDesktopExtensionNotFound());
            return;
        }

        var msg = {type:self.__RTC_PAGE_MSG_TYPE__, evname: 'chooseDesktopMedia', screenOptions: screenOptions};
        self.__sendMessage(msg, function(m){
            if(m.evname === 'onAccessApproved' && m.streamId){
                callback(new __event.OpenDesktopMedia({desktopStreamId: m.streamId}));
            }else{
                callback(new __event.OpenDesktopMediaAccessDenied());
            }
        });
    }
});