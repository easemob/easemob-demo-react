import Cookie from 'js-cookie'
import qs from 'qs'
import moment from 'moment'
import _ from 'lodash'

const lo = window.location

export { default as history } from './history'

const { username } = qs.parse(lo.hash.split('?')[1])

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
        return username
    },
    getLatestMessage(messageList) {
        let latestMessage = ''
        let latestTime = ''
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
        }
        return {
            latestMessage,
            latestTime
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
