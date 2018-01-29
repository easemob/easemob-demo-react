var adapter = require('./Temasys.wrapper'); //6.0.3
// var adapter = require('./adapter'); //6.0.3

adapter.__browser = adapter.__browser || adapter.browserDetails.browser; // firefox chrome safari
adapter.__browserVersion = adapter.__browserVersion || adapter.browserDetails.version;

console && console.warn("Current browser", adapter.__browser, adapter.__browserVersion);

if("Not a supported browser." === adapter.__browser){
    throw "Not a supported browser";
}

module.exports = adapter;
