
import WebIM from "easemob-websdk"

const location = window.location

class Connection {

    constructor(options) {
        options = options || {}
        
        this.https = options.https || location.protocol === "https:"
        this.url = options.url
        this.appkey = options.appkey
        this.apiUrl = options.apiUrl || ""
        this.context = { status: 400 }

    }

    listen(options) {
        WebIM.connection.prototype.listen.call(this, options)
    }

    setPresence() {}

    _onTextMessage(message) {
        this.onTextMessage(JSON.parseJSON(message))
    }

    _onPictureMessage(message) {
        this.onPictureMessage(JSON.parseJSON(message))
    }

    send(message) {
        const params = JSON.stringify({
            "type": "sendMessage",
            "to": message.to,
            "message_type": message.type,
            "msg": encodeURI(message.msg),
            "chatType": message.chatType
        })

        WebIM.doQuery(params, res => {
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

        WebIM.doQuery(params, res => {
            this.onOpened()
        }, (errCode, errMessage) => {
            options.error(errMessage)
        })
    }

    isOpened() {}

    close(reason) {
        const params = JSON.stringify({
            "type": "logout"
        })
        WebIM.doQuery(params, res => {
            this.onClosed(res)
        }, (errCode, errMessage) => {

        })
    }

    getRoster(options) {
        const params = JSON.stringify({
            "type": "getRoster"
        })
        WebIM.doQuery(params, res => {
            res = JSON.parseJSON(res)
            options.success(res)
        }, (errCode, errMessage) => {
            options.error(errMessage)
        })
    }

    removeRoster(options) {
        const params = JSON.stringify({
            "type": "delFriend",
            "to": options.to
        })
        WebIM.doQuery(params, res => {
            options.success(res)
        }, (errCode, errMessage) => {
            options.error()
        })
    }

    getGroup(options) {
        const params = JSON.stringify({
            "type": "getGroup"
        })
        WebIM.doQuery(params, res => {
            options.success(JSON.parse(res))
        }, (errCode, errMessage) => {
            options.error(errMessage)
        })
    }

    destoryGroup(options) {

    }

    onTextMessage(msg) {
        

    }

    // chatroom
    joinChatRoom(options) {

    }

    // group

    // groupmember

    // grouprequest

    // login

    // message
    
    // roster

    // subscribe

    getChatRooms(options) {
        const params = JSON.stringify({
            "type": "getChatroom"
        })
        WebIM.doQuery(params, res => {
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
