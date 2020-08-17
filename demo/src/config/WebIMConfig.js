/**
 * git do not control webim.config.js
 * everyone should copy webim.config.js.demo to webim.config.js
 * and have their own configs.
 * In this way , others won't be influenced by this config while git pull.
 *
 */

// for react native
// var location = {
//     protocol: "https"
// }

function getUrl(){
    var apiUrl = (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com'
    var socketUrl = '//im-api-v2.easemob.com/ws'
    if(window.location.href.indexOf('webim-h5.easemob.com') !== -1 ){
        apiUrl = (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com'
        socketUrl = (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//im-api-v2.easemob.com/ws'
    }
    else if(window.location.href.indexOf('webim-hsb-ly.easemob.com') !== -1){
        apiUrl = (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//a1-hsb.easemob.com'
        socketUrl = (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//im-api-v2-hsb.easemob.com/ws'
    }
    else if(window.location.href.indexOf('localhost') !== -1){
        apiUrl = (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com'
        socketUrl = (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//im-api-v2.easemob.com/ws'
    }
    return {
        apiUrl: apiUrl,
        socketUrl: socketUrl,
        // sandBoxApiUrl: 'https://a1-hsb.easemob.com',
        // sandboxSocketUrl: 'https://im-api-v2-hsb.easemob.com/ws'
        sandBoxApiUrl: 'https://a1.easemob.com',
        sandboxSocketUrl: 'https://im-api-v2.easemob.com/ws'
    }
}


var config = {
    /*
     * websocket server
     * im-api-v2.easemob.com/ws 线上环境
     * im-api-v2-hsb.easemob.com/ws 沙箱环境
     */
    socketServer: getUrl().sandboxSocketUrl,//(window.location.protocol === "https:" ? "https:" : "http:") + "//im-api-v2.easemob.com/ws",
    /*
     * Backend REST API URL
     * a1.easemob.com 线上环境
     * a1-hsb.easemob.com 沙箱环境
     */
    // ios must be https!!! by lwz
    restServer: getUrl().sandBoxApiUrl, //(window.location.protocol === "https:" ? "https:" : "http:") + "//a1.easemob.com",
    /*
     * Application AppKey
     */
    appkey: 'easemob-demo#chatdemoui',
    /*
     * Application Host
     */
    Host: 'easemob.com',
    /*
     * Whether to use HTTPS
     * @parameter {Boolean} true or false
     */
    https: true,

    isHttpDNS: false,
    /*
     * isMultiLoginSessions
     * true: A visitor can sign in to multiple webpages and receive messages at all the webpages.
     * false: A visitor can sign in to only one webpage and receive messages at the webpage.
     */
    isMultiLoginSessions: true,
    /**
     * isSandBox=true:  socketURL: 'im-api.sandbox.easemob.com',  apiURL: '//a1.sdb.easemob.com',
     * isSandBox=false: socketURL: 'im-api.easemob.com',          apiURL: '//a1.easemob.com',
     * @parameter {Boolean} true or false
     */
    isSandBox: false,
    /**
     * Whether to console.log
     * @parameter {Boolean} true or false
     */
    isDebug: false,
    /**
     * will auto connect the websocket server autoReconnectNumMax times in background when client is offline.
     * won't auto connect if autoReconnectNumMax=0.
     */
    autoReconnectNumMax: 5,
    /**
     * webrtc supports WebKit and https only
     */
    isWebRTC: window.RTCPeerConnection && /^https\:$/.test(window.location.protocol),
    /*
     * Upload pictures or file to your own server and send message with url
     * @parameter {Boolean} true or false
     * true: Using the API provided by SDK to upload file to huanxin server
     * false: Using your method to upload file to your own server
     */
    useOwnUploadFun: false,
    /**
     *  cn: chinese
     *  us: english
     */
    i18n: 'cn',
    /*
     * Set to auto sign-in
     */
    isAutoLogin: false,
    /**
     * Size of message cache for person to person
     */
    p2pMessageCacheSize: 500,
    /**
     * When a message arrived, the receiver send an ack message to the
     * sender, in order to tell the sender the message has delivered.
     * See call back function onReceivedMessage
     */
    delivery: false,
    /**
     * Size of message cache for group chating like group, chatroom etc. For use in this demo
     */
    groupMessageCacheSize: 200,
    /**
     * 5 actual logging methods, ordered and available:
     * 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR'
     */
    loglevel: 'ERROR',

    /**
     * enable localstorage for history messages. For use in this demo
     */
    enableLocalStorage: true
}
export default config
