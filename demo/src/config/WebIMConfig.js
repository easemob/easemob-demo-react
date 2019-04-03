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
    var apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1-hsb.easemob.com"
    var xmppUrl = "im-api.easemob.com"
    if(window.location.href.indexOf("webim-h5.easemob.com") !== -1 || window.location.href.indexOf("localhost") !== -1 || window.location.href.indexOf("172.17.2.168") !== -1){
        apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1-hsb.easemob.com"
        xmppUrl = "im-api.easemob.com"
    }
    // else if(window.location.href.indexOf("webim-hsb.easemob.com") !== -1){
    //     apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1-hsb.easemob.com"
    //     xmppUrl = "im-api-hsb.easemob.com"
    // }
    return {
        apiUrl: apiUrl,
        xmppUrl: xmppUrl
    }
}


var config = {
    /*
     * XMPP server
     */
    xmppURL: getUrl().xmppUrl,
    // xmppURL: "im-api.easemob.com",
    // xmppURL: '172.17.2.139:5280',
    /*
     * Backend REST API URL
     */
    // apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
    // ios must be https!!! by lwz
    // apiURL: "https://a1.easemob.com",
    apiURL: getUrl().apiUrl,
    // apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//172.17.3.155:8080',
    /*
     * Application AppKey
     */
    appkey: "easemob-demo#chatdemoui",
    /*
     * Application Host
     */
    Host: "easemob.com",
    /*
     * Whether to use HTTPS
     * @parameter {Boolean} true or false
     */
    https: false,
    isHttpDNS: true,
    /*
     * isMultiLoginSessions
     * true: A visitor can sign in to multiple webpages and receive messages at all the webpages.
     * false: A visitor can sign in to only one webpage and receive messages at the webpage.
     */
    isMultiLoginSessions: false,
    /**
     * Whether to use window.doQuery()
     * @parameter {Boolean} true or false
     */
    isWindowSDK: false,
    /**
     * isSandBox=true:  xmppURL: 'im-api.sandbox.easemob.com',  apiURL: '//a1.sdb.easemob.com',
     * isSandBox=false: xmppURL: 'im-api.easemob.com',          apiURL: '//a1.easemob.com',
     * @parameter {Boolean} true or false
     */
    isSandBox: false,
    /**
     * Whether to console.log in strophe.log()
     * @parameter {Boolean} true or false
     */
    isDebug: true,
    /**
     * Whether to show logs in strophe
     * @parameter {Boolean} true or false
     */
    isStropheLog: false,
    /**
     * will auto connect the xmpp server autoReconnectNumMax times in background when client is offline.
     * won't auto connect if autoReconnectNumMax=0.
     */
    autoReconnectNumMax: 5,
    /**
     * the interval secons between each atuo reconnectting.
     * works only if autoReconnectMaxNum >= 2.
     */
    autoReconnectInterval: 2,
    /**
     * webrtc supports WebKit and https only
     */
    isWebRTC: window.RTCPeerConnection && /^https\:$/.test(window.location.protocol),
    /**
     *  cn: chinese
     *  us: english
     */
    i18n: "cn",
    /*
     * Set to auto sign-in
     */
    isAutoLogin: true,
    /**
     * Size of message cache for person to person
     */
    p2pMessageCacheSize: 500,
    /**
     * When a message arrived, the receiver send an ack message to the
     * sender, in order to tell the sender the message has delivered.
     * See call back function onReceivedMessage
     */
    delivery: true,
    /**
     * Size of message cache for group chating like group, chatroom etc
     */
    groupMessageCacheSize: 200,
    /**
     * 5 actual logging methods, ordered and available:
     * 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR'
     */

    loglevel: "ERROR",

    /**
     * enable localstorage for history messages
     */
    enableLocalStorage: true
}

export default config
