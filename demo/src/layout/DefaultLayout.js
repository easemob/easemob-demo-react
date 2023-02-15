import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Icon } from 'antd'
import Layout from './Layout'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import { withRouter, Route } from 'react-router-dom'
import _ from 'lodash'
import classNames from 'classnames'
//import ContactItem from "@/components/contact/ContactItem"
import ChatRoomActions from '@/redux/ChatRoomRedux'
import Contact from '@/containers/contact/Contact'
import Chat from '@/containers/chat/Chat'
import HeaderTab from '@/components/header/HeaderTab'
import HeaderOps from '@/components/header/HeaderOps'
import MultiAVModal from '@/components/videoCall/MultiAVModal'
import GroupActions from '@/redux/GroupRedux'
import GroupMemberActions from '@/redux/GroupMemberRedux'
import MessageActions from '@/redux/MessageRedux'
import { config } from '@/config'
import getCurrentContacts from '@/selectors/ContactSelector'
import PtopCallModdal from '@/components/videoCall/PtopCallModal'
import AlertModal from '@/components/videoCall/AlertModal'
import MiniModal from '@/components/videoCall/MiniModal'
import ModalComponent from '@/components/common/ModalComponent'
import UserInfoModal from '@/components/contact/UserInfoModal'

const { SIDER_COL_BREAK, SIDER_COL_WIDTH, SIDER_WIDTH, RIGHT_SIDER_WIDTH } = config
const { Header, Content, Footer, Sider, RightSider } = Layout

let chat_message_status = {}

class DefaultLayout extends Component {
    constructor({ breakpoint, match , entities }) {
        super()
        const { selectTab, selectItem = '' } = match.params

        this.state = {
            collapsed: breakpoint[SIDER_COL_BREAK],
            selectTab: selectTab,
            selectItem: selectItem,
            entities: entities,
            headerTabs: [
                {
                    key: 'contact',
                    name: `${I18n.t('friends')}`,
                    icon: 'fontello icon-comment'
                },
                {
                    key: 'group',
                    name: `${I18n.t('groups')}`,
                    icon: 'fontello icon-chat'
                },
                {
                    key: 'chatroom',
                    name: `${I18n.t('chatrooms')}`,
                    icon: 'fontello icon-users-1'
                },
                {
                    key: 'stranger',
                    name: `${I18n.t('strangers')}`,
                    icon: 'fontello icon-address-book-1'
                }
            ],
            rightSiderOffset: -1 * RIGHT_SIDER_WIDTH,
            roomId: NaN,
            contactItems: [],
            showUserInfoMoadl: false
        }
        this.userInfo = {}
        this.changeItem = this.changeItem.bind(this)
        this.changeTab = this.changeTab.bind(this)
        this.handleCloseRightSiderClick = this.handleCloseRightSiderClick.bind(this)
    }

    toggle = collapsed => {
        this.setState({
            collapsed
        })
    }

    // switch chat type
    changeTab(e,opt) {
        var info = {}
        opt = opt || {}


        const { history, location , entities } = this.props
        const { selectItem, selectTab } = this.state
        const redirectPath = '/' + [ e.key ].join('/')
        if (selectTab == e.key) return

        // quite previous chatroom
        if (selectItem && selectTab == 'chatroom') this.props.quitChatRoom(selectItem)

        this.props.switchRightSider({ rightSiderOffset: 0 })
        history.push(redirectPath + location.search)

        // 多人视频
        // if(opt.multiAV){
        //     var gid = this.props.multiAV.gid
        //     var byId = entities.group.byId
        //     var groupId = byId[gid] && byId[gid].groupId
        //     info.key = groupId
        //     info.tab = "group"
        //     this.changeItem(info,{ defaultItem:true })
        // }
        // 选择tab时，默认打开第一个item
        if(e.key == 'contact'){
            var contacts = entities.roster.friends.toString()
            var newcontacts = contacts.split(',')
            if(newcontacts && newcontacts[0]){
                this.defaultSelectItem = newcontacts[0]
                info.key = newcontacts[0]
                info.tab = 'contact'
                this.changeItem(info,{ defaultItem:true })
            }
        }else if(e.key == 'group'){
            var obj = entities.group.names
            if(obj && obj[0]){
                this.defaultGroupItem = obj[0].split('_#-#_')[1]
                info.key = this.defaultGroupItem
                info.tab = 'group'
                this.changeItem(info,{ defaultItem:true })
            }
        }else if(e.key == 'chatroom'){
            var obj = entities.chatroom.names
            if(obj && obj[0]){
                this.defaultChatroomItem = obj[0].split('_#-#_')[1]
                info.key = this.defaultChatroomItem
                info.tab = 'chatroom'
                this.changeItem(info,{ defaultItem:true })
            }
        }else if(e.key == 'stranger'){
            var obj = entities.stranger.names
            if(obj && obj[0]){
                this.defaultStrangerItem = obj[0].split('_#-#_')[1]
                info.key = this.defaultStrangerItem
                info.tab = 'stranger'
                this.changeItem(info,{ defaultItem:true })
            }
        }
    }

    // switch contact
    changeItem(e, opt) {
        var selectTab
        opt = opt || {}
        if(opt.defaultItem){
            this.setSelectStatus(e,{ defaultItem:true })
        }
        const { history, location, group } = this.props
        const { selectItem } = this.state
        if(opt.defaultItem){
            selectTab = e.tab
        }else{
            selectTab = this.state.selectTab
        }
        const redirectPath = '/' + [ selectTab, e.key ].join('/')
        const typeMap = { contact: 'chat', group: 'groupchat', chatroom: 'chatroom', stranger: 'stranger' }

        // chatroom will push recent messages automatically
        if (!chat_message_status[e.key] && typeMap[selectTab] !== 'chatroom') {
            this.props.fetchMessage(e.key, typeMap[selectTab])
            chat_message_status[e.key] = true
        }

        this.props.clearUnread(typeMap[selectTab], e.key)

        if (selectItem == e.key) {
            return
        }


        if (selectTab === "contact") {
            this.props.sendChannel({
                from: WebIM.conn.context.jid.name,
                to: e.key,
                type: 'contact'
            })
            console.log('发送channel ack')
        }

        if (selectTab === 'group') {
            const groupId = e.key
            if (groupId) {
                this.setState({ roomId: groupId })
                // const room = _.get(group, `byId.${groupId}`, {})
                // this.setState({ room })
                // const { selectItem, selectTab } = _.get(this.props, [ "match", "params" ], {})
                // if (selectItem && selectTab === "group") {
                // const groupId = selectItem
                this.props.listGroupMemberAsync({ groupId })
                this.props.getMutedAsync(groupId)
                this.props.getGroupAdminAsync(groupId)
                // }
                this.props.sendChannel({
                    from: WebIM.conn.context.jid.name,
                    to: e.key,
                    type: 'groupchat'
                })
            }
        }

        if (selectTab == 'chatroom') {
            // moved to changeTab
            //quit previous chatroom
            if (selectItem) {
                if (!(selectItem in group.byId)) {
                    this.props.quitChatRoom(selectItem)
                }
            }
            // join chatroom
            this.props.joinChatRoom(e.key)
            this.props.sendChannel({
                    from: WebIM.conn.context.jid.name,
                    to: e.key,
                    type: 'chatroom'
                })
        }

        history.push(redirectPath + location.search)
    }
    onClickAvatar(userId){
        let userInfos = this.props.entities.roster.byName || {}
        this.userInfo = JSON.parse(JSON.stringify(userInfos[userId].info))
        this.userInfo.userId = userId
        this.setState({
            showUserInfoMoadl: true
        })
    }
    setSelectStatus(defaultItem,opt) {
        const { history, location, match } = this.props
        const { selectTab, selectItem = '' } = match.params
        opt = opt || {}
        if(!opt.defaultItem){
	        this.setState({
	            selectTab,
	            selectItem
	        })
        }else{
            this.setState({
	            selectTab :defaultItem.tab,
	            selectItem:defaultItem.key
	        })
        }
    }

    handleCloseRightSiderClick(e) {
        e.preventDefault()
        this.props.switchRightSider({ rightSiderOffset: 0 })
    }

    componentDidMount() {
        // this.setSelectStatus()
        const { entities } = this.props
        //解决在群组页面进行刷新，获取不到群成员的情况。聊天室要类似处理
        var reg = /\/group\/\d+\?username=/
        var hash = location.hash
        if(reg.test(hash)){

            var groupId = hash.slice(hash.indexOf('group')+6,hash.indexOf('?'))

            const { group } = this.props
            this.setState({ roomId: groupId })
            // const room = _.get(group, `byId.${groupId}`, {})
            // this.setState({ room })
            this.props.listGroupMemberAsync({ groupId })
            this.props.getMutedAsync(groupId)
            this.props.getGroupAdminAsync(groupId)
        }        
    }


    componentWillReceiveProps(nextProps) {
        var info = {}
        const { breakpoint, location , entities ,match } = this.props
        const nextBeakpoint = nextProps.breakpoint

        this.toggle(nextBeakpoint[SIDER_COL_BREAK])

        if (location.pathname != nextProps.location.pathname) {
            this.props = nextProps
            this.setSelectStatus()
        }
        // 刷新时，默认打开第一个item
        if(!match.params.selectItem){
            var selectTab
            if(nextProps && nextProps.match.params.selectTab){
                selectTab = nextProps.match.params.selectTab
            }else{
                selectTab = match.params.selectTab
            }
            if(selectTab == 'contact' && entities.roster && !this.defaultSelectItem){
	            var contacts = entities.roster.friends.toString()
	            var newcontacts = contacts.split(',')
	            if(newcontacts && newcontacts[0]){
	                this.defaultSelectItem = newcontacts[0]
	                info.key = newcontacts[0]
	                info.tab = 'contact'
	                this.changeItem(info,{ defaultItem:true })
	            }
	        }else if(selectTab == 'group' && !this.defaultGroupItem){
	            var obj = entities.group.names
	            if(obj && obj[0]){
	                this.defaultGroupItem = obj[0].split('_#-#_')[1]
	                info.key = this.defaultGroupItem
	                info.tab = 'group'
	                //this.changeItem(info,{ defaultItem:true })
	            }
	        }else if(selectTab == 'chatroom' && !this.defaultChatroomItem){
	            var obj = entities.chatroom.names
	            if(obj && obj[0]){
	                this.defaultChatroomItem = obj[0].split('_#-#_')[1]
	                info.key = this.defaultChatroomItem
	                info.tab = 'chatroom'
	                //this.changeItem(info,{ defaultItem:true })
	            }
	        }else if(selectTab == 'stranger' && !this.defaultStrangerItem){
	            var obj = entities.stranger.names
	            if(obj && obj[0]){
	                this.defaultStrangerItem = obj[0].split('_#-#_')[1]
	                info.key = this.defaultStrangerItem
	                info.tab = 'stranger'
	                this.changeItem(info,{ defaultItem:true })
	            }
	        }
        }

        // 多人视频打开时
        // if(this.props.multiAV.ifShowMultiAVModal){
        //     const { match } = this.props
        //     var gid = this.props.multiAV.gid
        //     var byId = entities.group.byId
        //     var groupId = byId[gid] && byId[gid].groupId
        //     if(groupId && !this.multiGroupSelectItem){
        //         this.multiGroupSelectItem = groupId
        //         info.tab = 'group'
	       //      info.key = groupId
	       //      this.changeItem(info,{ defaultItem:true })
        //     }
        //     if(!groupId && match.params.selectTab != 'group'){
        //         info.key = 'group'
        //         this.changeTab(info,{ multiAV:true })
        //     }
        // }

    }


    handleInfoModalClose = ()=>{
        this.setState({
            showUserInfoMoadl: false
        })
    }

    render() {
        const { collapsed, selectTab, selectItem, headerTabs, roomId } = this.state
        const { login, rightSiderOffset, entities, group, callVideo} = this.props
        const room = _.get(group, `byId.${roomId}`, {})

        let { confr, callStatus, minisize } = callVideo
        // idle: 0,
        // inviting: 1,
        // alerting: 2,
        // confirmRing: 3, // caller
        // receivedConfirmRing: 4, // callee
        // answerCall: 5,
        // receivedAnswerCall: 6,
        // confirmCallee: 7
        const status = {
            idle: 0,
            confirmRing: 3,
            answerCall: 5,
            receivedAnswerCall: 6,
            confirmCallee: 7
        }
        let showConfr = (confr.type === 2 && [status.idle,status.confirmRing,status.answerCall,status.receivedAnswerCall,status.confirmCallee].includes(callStatus)) ? true: false

        let showAlert = callStatus == 4
        let multiAVModal = showConfr ? <MultiAVModal/> : null
        let alertModal = showAlert ? <AlertModal/> : null
        let miniModal = minisize ? <MiniModal/> : null
        // if(this.props.multiAV.ifShowMultiAVModal && !this.multiAVSelectItem){
        //     var info = {}
        //     var gid = multiAV.gid
	       //  var byId = entities.group.byId
	       //  var groupId = byId[gid] && byId[gid].groupId
        //     if(groupId){
        //         this.multiAVSelectItem = groupId
        //         info.key = groupId
		      //   info.tab = 'group'
		      //   this.changeItem(info,{ defaultItem:true })
        //     }
        // }

        return (
            <Layout>
                <Header className="header">
                    <HeaderOps title={login.username} />
                    <HeaderTab
                        collapsed={collapsed}
                        items={headerTabs}
                        selectedKeys={[ selectTab ]}
                        onClick={this.changeTab}
                    />
                </Header>
                <Content className="x-layout-main">
                    <div
                        className="x-layout-sider"
                        style={{
                            // sider full display when breakpoint
                            width: collapsed ? '100%' : SIDER_WIDTH,
                            // sider display to left when breakpoint and has selectItem
                            left: selectItem && collapsed ? '-100%' : 0
                        }}
                    >
                        <Contact collapsed={false} onClickAvatar={this.onClickAvatar.bind(this, selectItem)} onClick={this.changeItem} selectedKeys={[ selectItem ]}
                        />
                    </div>
                    <div className="x-layout-video"
                        style={{
                            position: 'absolute',
                            zIndex: '100'
                        }}
                    >
                        
                    </div>
                    <Content
                        className="x-layout-chat"
                        style={{
                            margin: collapsed ? '0' : `0 0 0 ${SIDER_WIDTH}px`
                        }}
                    >
                        <Route
                            path="/:selectTab/:selectItem"
                            render={props => <Chat collapsed={collapsed} {...props} />}
                        />
                    </Content>
                    <div
                        className={classNames('x-layout-right-sider', { 'hide': this.props.rightSiderOffset === 0 })}
                        style={{
                            width: `${RIGHT_SIDER_WIDTH}px`,
                            marginLeft: `${rightSiderOffset}px`
                        }}
                    >
                        {   roomId ? 
                            <RightSider roomId={roomId} room={room} ref="rightSider" />
                            : null
                        }
                    </div>
                    {multiAVModal}
                    <PtopCallModdal visible={true}/>
                    {/*<Footer style={{ textAlign: "center" }}>
                     Ant Design ©2016 Created by Ant UED
                     </Footer>*/}

                     {alertModal}
                     {miniModal}
                     <ModalComponent
                        width={360}
                        title="个人名片"
                        visible={this.state.showUserInfoMoadl}
                        userInfos={this.userInfo}
                        showEdit={false}
                        component={UserInfoModal}
                        onModalClose={this.handleInfoModalClose}
                    />
                </Content>
            </Layout>
        )
    }
}

export default withRouter(
    connect(
        ({ breakpoint, entities, login, common, rightSiderOffset, callVideo }) => ({
            breakpoint,
            group: entities.group,
            login,
            common,
            rightSiderOffset: entities.group.rightSiderOffset,
            entities,
            callVideo
        }),
        dispatch => ({
            getGroupMember: id => dispatch(GroupMemberActions.getGroupMember(id)),
            listGroupMemberAsync: opt => dispatch(GroupMemberActions.listGroupMemberAsync(opt)),
            switchRightSider: ({ rightSiderOffset }) => dispatch(GroupActions.switchRightSider({ rightSiderOffset })),
            joinChatRoom: roomId => dispatch(ChatRoomActions.joinChatRoom(roomId)),
            quitChatRoom: roomId => dispatch(ChatRoomActions.quitChatRoom(roomId)),
            clearUnread: (chatType, id) => dispatch(MessageActions.clearUnread(chatType, id)),
            getGroups: () => dispatch(GroupActions.getGroups()),
            getChatRooms: () => dispatch(ChatRoomActions.getChatRooms()),
            getMutedAsync: groupId => dispatch(GroupMemberActions.getMutedAsync(groupId)),
            getGroupAdminAsync: groupId => dispatch(GroupMemberActions.getGroupAdminAsync(groupId)),
            fetchMessage: (id, chatType, offset) => dispatch(MessageActions.fetchMessage(id, chatType, offset)),
            sendChannel: (msg) => dispatch(MessageActions.sendChannel(msg))
        })
    )(DefaultLayout)
)
