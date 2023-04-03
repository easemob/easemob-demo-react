import Cookie from 'js-cookie'
import qs from 'qs'
import moment from 'moment'
import _ from 'lodash'

const lo = window.location

export { default as history } from './history'

const { username } = qs.parse(lo.hash.split('?')[1]);

(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            if (docEl.clientWidth > 750) {
                docEl.style.fontSize = '100px'
            } else {
                var width = docEl.clientWidth / 7.5
                docEl.style.fontSize = width + 'px'
            }
        }
    if (!doc.addEventListener) return
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)

Math.uuid = function (len, radix) {
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    var chars = CHARS, uuid = [], i 
    radix = radix || chars.length

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
        // rfc4122, version 4 form
        var r

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'

        // Fill in random data. At i==19 set the high bits of clock sequence
        // as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
            }
        }
    }

    return uuid.join('')
}



export function renderTime(time) {
    const nowStr = new Date()
    const nowMoment = moment(nowStr)
    const localStr = time ? new Date(time) : nowStr
    const localMoment = moment(localStr)
    const localFormat = localMoment.format('MM-DD hh:mm A')
    return localFormat
}

export default {
    getHash() {
        return lo.hash
    },
    getToken() {
        return Cookie.get('web_im_' + username)
    },
    hasToken() {
        return Cookie.get('web_im_' + username)
    },
    getUserName() {
        const webImLogout = JSON.parse(window.localStorage.getItem('webImLogout')) === null ? true : JSON.parse(window.localStorage.getItem('webImLogout'))
        return webImLogout && username
    },
    getLatestMessage(messageList) {
        let latestMessage = ''
        let latestTime = ''
        let ext = null
        if (messageList.length > 0) {
            const latestData = messageList[messageList.length - 1]
            const latestType = _.get(latestData, 'body.type', '')
            // if (latestData.body.type == "txt") {
            // 	latestMessage = latestData.body.msg
            // } else if (latestData.body.type == "img") {
            // 	latestMessage = "[image]"
            // }
            if (latestType === 'txt') {
                latestMessage = _.get(latestData, 'body.msg', '')
            } else if (latestType === 'img') {
                latestMessage = '[image]'
            }

            latestTime = renderTime(latestData.time)
            ext = latestData.ext
        }
        return {
            latestMessage,
            latestTime,
            ext,
        }
    },
    isDescendant(parent, child) {
        let node = child.parentNode
        while (node) {
            if (node === parent) {
                return true
            }
            node = node.parent
        }
        return false
    },
    // isWeixi(){
    //     const ua = navigator.userAgent.toLowerCase();
    //     if(ua.match(/MicroMessenger/i)=="micromessenger") {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // },
    isIOSWebview(){
        const ua = navigator.userAgent
        const ischrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)
        const iswebview = !ischrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/)
        return iswebview
    }
}

/**
 * 取值函数，避免出现undefined后再点出现的error
 * object 数据源
 * path 取值的path
 * defaultValue 默认值
 * */
export const deepGet = (object, path, defaultValue) => {
    const res = (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/]/g, '').split('.') : path)
        .reduce((o, k) => (o || {})[k], object)
    return (res !== undefined && res !== null) ? res : defaultValue
}
