
/*
  // Get the same API for browser and c# runtime

  // Usage example:
  WebIM.conn = new webdk.connection(options)
  const connection = new ProxyConn(WebIM, WebIM.config.isWindowSDK)
  
  // You can use the api, ingnor broswer runtime or c# runtime
  connection.open(options)
  connection.getRoster(options)
  connection.joinChatRoom(options)
  ...
  ...

  // That's all
*/

// map websdk api to window action type
const API_MAP_WIN = {
    "listGroupMember": "groupMembers",
    "joinChatRoom": "joinChatroom",
    "quitChatRoom": "quitChatroom",
    "registerUser": "createAccount",
    "subscribe": "addFriend",
    "unsubscribed": "declineInvitation",
    "createGroupNew": "createGroup",
    "queryRoomMember": "groupMembers",
    "queryRoomInfo": "groupSpecification",
    "getGroupBlacklistNew": "getBlacklist",
    "removeGroupMemberFromBlacklist": "unblockGroupMembers",
    "addToGroupBlackList": "blockGroupMembers",
    "open": "login",
    "close": "logout",
    "getChatRooms": "getChatroom",
    "removeRoster": "delFriend",
    "dissolveGroup": "destroyGroup",
    "quitGroup": "leaveGroup",
    "leaveGroup": "removeGroupMembers",
    "modifyGroup": "changeGroupSubject"
}


function isFunction(param) {
    return typeof param === "function"
}

// ProxyConn class 
class ProxyConn {
  
    constructor(webim, isWindowSDK = false) {
        this.WebIM = webim
        this.isWindowSDK = isWindowSDK
    }
  
    exec(method, options, winKeys = []) {
  
        if (this.isWindowSDK) {
    
            // doQuery type: if not foud in maps, same as websdk api name
            let winParams = {
                type: API_MAP_WIN[method] || method
            }
    
            // add params for doQuery from options
            winKeys.forEach((key) => {
                winParams[key] = options[key]
            })
      
            // turn params to string for doQuery
            winParams = JSON.stringify(winParams)
            alert(winParams)

            // use doQuery in c# runtime      
            isFunction(this.WebIM.doQuery)
                && this.WebIM.doQuery(winParams, (res) => options.success(res) , (errCode, errMessage) => options.error(errCode, errMessage) )
      
        } else {
    
            // use websdk api in broswer runtime    
            isFunction(this.WebIM.conn[method])
                && this.WebIM.conn[method](options)
        }
    }
    
    open(options) {
        options.id = options.user 
        options.password = options.pwd
        this.exec("open", options, [ "id", "password" ])
    }
  
    close(reason) {
        this.exec("close", reason)
    }
    
    getRoster(options) {
        this.exec("getRoster", options)
    }
  
    removeRoster(options) {
        this.exec("removeRoster", options, [ "to" ])
    }
  
    getGroup(options) {
        this.exec("getGroup", options)
    }
  
    joinChatRoom(options) {
        options.id = options.roomId
        this.exec("joinChatRoom", options, [ "id" ])
    }
  
    getChatRooms(options) {
        this.exec("getChatRooms", options)
    }
  
    quitChatRoom(options) {
        options.id = options.roomId
        this.exec("quitChatRoom", options, [ "id" ])
    }
  
    queryRoomInfo(options) {
        options.id = options.roomId
        this.exec("queryRoomInfo", options, [ "id" ])
    }
  
    
    listGroupMember(options) {
        this.exec("listGroupMember", options, [ "id" ])
    }
  
    removeFromBlackList(options) {
    //options.username = options.list;
        this.exec("removeFromBlackList", options, [ "username" ])
    }
    
    registerUser(options) {
        const keys = [ "appDir", "appKey", "imIP", "imPort", "restIPandPort" ]
        options.id = options.username 
        options.password = options.password
        keys.forEach(key => {
            options[key] = this.WebIM.config[key]
        })
        this.exec("register", options, [ "id", "password", ...keys ])
    }
  
    subscribe(options) {
        this.exec("subscribe", options, [ "to", "message" ])
    }
  
    createGroupNew(options) {
        options.subject = options.data.groupname
        options.description = options.data.desc
        options.members = options.data.members
        options.welcomeMessage = ""
        options.maxUserCount = 200
        this.exec("createGroupNew", options, [ "subject", "description", "welcomeMessage", "style", "maxUserCount", "members" ])
    }
  
    // TODO: doQuery exec 2 times
    modifyGroup(options) {
        options.id = options.groupId
        options.subject = options.groupName
        this.exec("modifyGroup", options, [ "id", "subject", "description" ])
    }
  
    addGroupMembers(options) {
        options.welcomeMessage = ""
        options.id = options.roomId
        options.members = options.list
        this.exec("addGroupMembers", options, [ "welcomeMessage", "id", "members" ])
    }
  
    leaveGroup(options) {
        options.welcomeMessage = ""
        options.id = options.roomId
        options.members = options.list
        this.exec("leaveGroup", options, [ "welcomeMessage", "id", "members" ])
    }
  
    // 
    queryRoomMember(options) {
        options.id = options.roomId
        this.exec("queryRoomMember", options, [ "id" ])
    }
  
    // not support in browser
    loadMoreMessages(options) {
        this.exec("loadMoreMessages", [ "id", "chatType" ])
    }
  
    unsubscribed(options) {
        this.exec("unsubscribed", [ "to" ])
    }
  
    getBlacklist(options){
        this.exec("getBlacklist", [ "id" ])
    }
  
    addToBlackList(options) {
        this.exec("addToBlackList", options, [ "username" ])
    }
  
    getGroupBlacklistNew(options){
        this.exec("getGroupBlacklistNew", options, [ "id" ])
    }
  
    removeGroupMemberFromBlacklist(options) {
        this.exec("removeGroupMemberFromBlacklist", options, [ "id", "members" ])
    }
  
    addToGroupBlackList(options) {
        this.exec("addToGroupBlackList", options, [ "rease", "id", "members" ])
    }
  
    dissolveGroup(options) {
        options.id = options.groupId
        this.exec("dissolveGroup", options, [ "id" ])
    }
  
    quitGroup(options) {
        options.id = options.groupId
        this.exec("quitGroup", options, [ "id" ])
    }
  
}

export default ProxyConn
