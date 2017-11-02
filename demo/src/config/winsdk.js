// winsdk fro demo2.0 run in window
// methods like _xxxxx are for c++，others are for demo code

import WebIM from "easemob-websdk"

const _doQuery = WebIM.doQuery
const location = window.location
const { listen, getUniqueId } = WebIM.connection.prototype

class Connection {

    constructor(options) {
        options = options || {}

        this.https = options.https || location.protocol === "https:"
        this.url = options.url
        this.appkey = options.appkey
        this.apiUrl = options.apiUrl || ""
        this.context = { status: 400 }

    }

    _onPresence(msg) {
        this.onPrecence(msg)
    }

    _onReceivedMessage(message) {
        this.onReceivedMessage(JSON.parse(message))
    }

    _onTextMessage(message) {
        message = JSON.parse(message)
        message.data = decodeURI(message.data)
        this.onTextMessage(message)
    }

    _onPictureMessage(message) {
        this.onPictureMessage(JSON.parse(message))
    }

    _onAudioMessage(message) {
        this.onAudioMessage(JSON.parse(message))
    }

    _onVideoMessage(message) {
        this.onVideoMessage(JSON.parse(message))
    }

    _onReadMessage(message) {
        this.onReadMessage(JSON.parse(message))
    }

    _onDeliveredMessage(message) {
        this.onDeliveredMessage(JSON.parse(message))
    }

    listen(options) {
        listen.call(this, options)
    }

    getUniqueId() {
        return getUniqueId.call(this)
    }

    setPresence() {}

    send(message) {
        console.log(message)
        if (message.ackId) {
            return
        }

        const params = JSON.stringify({
            "type": "sendMessage",
            "to": message.to,
            "message_type": message.type,
            "msg": encodeURI(message.msg),
            "chatType": message.roomType,
            "id": message.id
        })

        _doQuery(params, res => {
            message.success(res)
        }, (errCode, errMsg) => {
            message.fail(errMsg)
        })
    }

    sendFile(message) {
        console.log(message)
        if (message.ackId) {
            return
        }

        const params = JSON.stringify({
            "type": "sendFileMessage",
            "to": message.to,
            "message_type": message.type,
            "msg": encodeURI(message.msg),
            "chatType": message.roomType,
            "id": message.id
        })

        _doQuery(params, res => {
            message.success(res)
        }, (errCode, errMsg) => {
            message.fail(errMsg)
        })
    }

    open(options) {
        const params = JSON.stringify({
            "type": "login",
            "id": options.user,
            "password": options.pwd
        })

        this.appkey = options.appKey

        _doQuery(params, res => {
            this.onOpened()
            options.success(res)
        }, (errCode, errMessage) => {
            options.error(errMessage)
        })
    }

    isOpened() {}

    close(reason) {
        const params = JSON.stringify({
            "type": "logout"
        })
        _doQuery(params, res => {
            this.onClosed(res)
        }, (errCode, errMessage) => {

        })
    }

    getRoster(options) {
        const params = JSON.stringify({
            "type": "getRoster"
        })
        _doQuery(params, res => {
            res = JSON.parse(res)
            options.success(res)
        }, (errCode, errMessage) => {
            options.error(errMessage)
        })
    }

    getBlacklist(options) {
        const params = JSON.stringify({
            "type": "getBlacklist"
        })
        _doQuery(params, res => {
            res = JSON.parse(res)
            options.success(res)
        }, (errCode, errMessage) => {
            options.error(errMessage)
        })
    }

    addFriend(options) {
        const params = JSON.stringify({
            "type": "addFriend",
            "to": options.to,
            "message": options.message
        })
        _doQuery(params, res => {
            res = JSON.parse(res)
            options.success(res)
        }, (errCode, errMessage) => {
            options.error()
        })
    }

    removeRoster(options) {
        const params = JSON.stringify({
            "type": "delFriend",
            "to": options.to
        })
        _doQuery(params, res => {
            options.success(res)
        }, (errCode, errMessage) => {
            options.error()
        })
    }

    getGroup(options) {
        const params = JSON.stringify({
            "type": "getGroup"
        })
        _doQuery(params, res => {
            options.success(JSON.parse(res))
        }, (errCode, errMessage) => {
            options.error(errMessage)
        })
    }

    destoryGroup(options) {

    }

    // chatroom
    joinChatRoom(options) {

    }

    getChatRooms(options) {
        const params = JSON.stringify({
            "type": "getChatroom"
        })
        _doQuery(params, res => {
            const _res = {
                data: JSON.parse(res)
            }
            options.success(_res)
        }, (errCode, errMessage) => {
            options.error(errMessage)
        })
    }

    // blacklist

}

export default { connection: Connection }