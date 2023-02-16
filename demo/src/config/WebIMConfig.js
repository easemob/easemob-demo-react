/**
 * git do not control webim.config.js
 * everyone should copy webim.config.js.demo to webim.config.js
 * and have their own configs.
 * In this way , others won't be influenced by this config while git pull.
 */

// 沙箱调试
const isSandBox = true

var config = {
    /*
   * websocket server
   * im-api-v2.easemob.com/ws 线上环境
   * im-api-v2-hsb.easemob.com/ws 沙箱环境
   */
    socketServer:
    (window.location.protocol === 'https:' ? 'https:' : 'http:') +
    // '//im-api-v2-hsb.easemob.com/ws',
    '//msync-api-a1-test.easemob.com/ws',
    /*
   * Backend REST API URL
   * a1.easemob.com 线上环境
   * a1-hsb.easemob.com 沙箱环境
   */
    restServer:
    (window.location.protocol === 'https:' ? 'https:' : 'http:') +
    // '//a1-hsb.easemob.com',
    '//a1-test.easemob.com',
    /*
   * Application AppKey
   */
    // easemob-demo#easeim
    appkey: isSandBox ? 'easemob-demo#easeim' : 'easemob#easeim',
    /*
   * Application Host
   */
    Host: 'easemob.com',
    /*
   * Whether to use HTTPS
   * @parameter {Boolean} true or false
   */
    https: true,

    /*
   * 公有云配置默认为 true，
   * 私有云配置请设置 isHttpDNS = false , 详细文档：http://docs-im.easemob.com/im/web/other/privatedeploy
   */

    isHttpDNS: true,
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
    isSandBox: isSandBox, //rest.imServer && rest.restServer ? true : false, //内部测试环境，集成时设为false
    /**
   * Whether to console.log
   * @parameter {Boolean} true or false
   */
    isDebug: true,
    /**
   * will auto connect the websocket server autoReconnectNumMax times in background when client is offline.
   * won't auto connect if autoReconnectNumMax=0.
   */
    autoReconnectNumMax: 10,
    /**
   * webrtc supports WebKit and https only
   */
    isWebRTC:
    window.RTCPeerConnection && /^https\:$/.test(window.location.protocol),
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
    enableLocalStorage: true,

    deviceId: 'webim',

    AgoraAppId: '15cb0d28b87b425ea613fc46f7c9f974' // 需要替换成自己的声网 appId，此 appId 有限量，仅供参考使用，同时获取声网 token 的接口仅能供此 appId 使用，换成自己的 appId 后需要自己去实现 app server 获取声网token。
}
export default config
