/* eslint-disable */
//import "script-loader!easemob-websdk/dist/strophe-1.2.8.js"
/* eslint-enable */

// add dataReport sdk
import websdk from './Easemob-chat-4.1.4'
// import websdk from './Easemob-chat'

// import websdk from 'easemob-websdk'
// import webrtc from 'easemob-webrtc'
// import emedia from './EMedia_sdk-dev'
import config from 'WebIMConfig'
import emoji from './emoji'
import Api from 'axios'
import { message } from 'antd'
import loglevel from '@/utils/loglevel'
import AgoraRTC from 'agora-rtc-sdk-ng'



const rtc = {
    // 用来放置本地客户端。
    client: null,
    // 用来放置本地音视频频轨道对象。
    localAudioTrack: null,
    localVideoTrack: null,
}

console = console || {}
console.group = console.group || function () {}
console.groupEnd = console.groupEnd || function () {}

// init DOMParser / document for strophe and sdk
let WebIM = window.WebIM = {}
WebIM.config = config
WebIM.loglevel = loglevel
WebIM.message = websdk.message
WebIM.statusCode = websdk.statusCode
WebIM.utils = websdk.utils
WebIM.logger = websdk.logger
let options = {
    isReport: true,
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    isDebug: WebIM.config.isDebug,
    // isReport: true,
    https: WebIM.config.https,
    isAutoLogin: false,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    delivery: WebIM.config.delivery,
    appKey: WebIM.config.appkey,
    useOwnUploadFun: WebIM.config.useOwnUploadFun,
    deviceId: WebIM.config.deviceId,
    //公有云 isHttpDNS 默认配置为true
    isHttpDNS: WebIM.config.isHttpDNS,
    onOffline: () => {console.log('onOffline')},
    onOnline: () => {console.log('onOnline')}
}

// 内部沙箱测试环境
// if (window.location.href.indexOf('webim-hsb-ly.easemob.com') !== -1) {
//     WebIM.config.isSandBox = true
// }
if (WebIM.config.isSandBox) {
    options.url =  WebIM.config.socketServer // (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//im-api-v2-hsb.easemob.com/ws'
    options.apiUrl = WebIM.config.restServer // (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//a1-hsb.easemob.com'
    // options.url = `${window.location.protocol}//172.17.2.47:8280/ws`;
    // options.apiUrl = `${window.location.protocol}//172.17.2.47:8080`;
    options.isHttpDNS = false
    // WebIM.config.restServer = (window.location.protocol === "https:" ? "https:" : "http:") + '//a1-hsb.easemob.com';
}

// WebIM.logger.setConfig({
//     useCache: true,
//     maxCache: 3 * 1024 * 1024
// })
WebIM.conn = new websdk.connection(options)
// websdk.debug(true)



const appKeyPair = WebIM.config.appkey.split('#')
export let api = Api.create({
    baseURL: `${WebIM.config.restServer}/${appKeyPair[0]}/${appKeyPair[1]}`,
    validateStatus: function (status) {
        return true
    }
})

function requestFail(data) {
    if (data.data && data.data.error_description) {
        data.msg = data.data.error_description
    } else if (data.data && data.data.data && data.data.data.error_description) {
        data.msg = data.data.data.error_description
    }
    message.error('Error:' + data.status + ', ' + data.msg)
    return Promise.reject(data)
}

api.interceptors.response.use(
    function (resp) {
        if (resp.status >= 300) {
            return requestFail(resp)
        }
        if (resp.data && resp.data.status && resp.data.status !== 200) {
            return requestFail(resp.data)
        }
        if (resp.data && resp.data.data) {
            resp.data = resp.data.data
        }
        return resp
    },
    function (error) {
        console.log(error)
    }
)


WebIM.api = api
WebIM.emoji = emoji

WebIM.rtc = rtc
WebIM.AgoraRTC = AgoraRTC
export default WebIM



