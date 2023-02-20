import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { I18n } from 'react-redux-i18n'
import _ from 'lodash'
import { Button, Row, Form, Input, Icon, Dropdown, Menu, message, Popover, Radio } from 'antd'
import { config } from '@/config'
import ListItem from '@/components/list/ListItem'
import ChatMessage from '@/components/chat/ChatMessage'
import ChatEmoji from '@/components/chat/ChatEmoji'
import styles from './style/index.less'
import LoginActions from '@/redux/LoginRedux'
import MessageActions from '@/redux/MessageRedux'
import GroupActions from '@/redux/GroupRedux'
import GroupMemberActions from '@/redux/GroupMemberRedux'
import StrangerActions from '@/redux/StrangerRedux'
import RosterActions from '@/redux/RosterRedux'
import BlacklistActions from '@/redux/BlacklistRedux'
import VideoCallActions from '@/redux/VideoCallRedux'
import WebIM from '@/config/WebIM'
import { history } from '@/utils'
import utils from '@/utils'
import getTabMessages from '@/selectors/ChatSelector'
import AddAVMemberModal from '@/components/videoCall/AddAVMemberModal'
import ModalComponent from '@/components/common/ModalComponent'
import RecordAudio from '@/components/recorder/index'
import UserInfoModal from '@/components/contact/UserInfoModal'
const rtc = WebIM.rtc;
const { TextArea } = Input
const FormItem = Form.Item
const { PAGE_NUM } = config
const Message = message
const chatType = {
    contact: 'chat',
    group: 'groupchat',
    chatroom: 'chatroom',
    stranger: 'stranger'
}

class Chat extends React.Component {
    input = null // eslint-disable-line
    image = null // eslint-disable-line
    timer = null

    constructor({ match }) {
        super()
        const { selectTab, selectItem = '' } = match.params
        this.state = {
            showWebRTC: false,
            selectTab,
            selectItem,
            value: '',
            isLoaded: false,
            visible: false,
            checkedValue: '',
            showUserInfoMoadl: false,
        }
        this.userInfo = {}
        this.showEdit = false
        this.handleSend = this.handleSend.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.pictureChange = this.pictureChange.bind(this)
        this.fileChange = this.fileChange.bind(this)
        this.handleEmojiSelect = this.handleEmojiSelect.bind(this)
        this.handleEmojiCancel = this.handleEmojiCancel.bind(this)
        this.handleKey = this.handleKey.bind(this)
        this.handleRightIconClick = this.handleRightIconClick.bind(this)
        this.onMenuContactClick = this.onMenuContactClick.bind(this)

        this.logger = WebIM.loglevel.getLogger('chat component')
    }

    scollBottom() {
        if (!this._not_scroll_bottom) {
            setTimeout(() => {
                const dom = this.refs['x-chat-content']
                if (!ReactDOM.findDOMNode(dom)) return
                dom.scrollTop = dom.scrollHeight
            }, 0)
        }
    }

    pictureChange(e) {
        const { match } = this.props
        const { selectItem, selectTab } = match.params
        const isRoom = chatType[selectTab] == 'chatroom' || chatType[selectTab] == 'groupchat'

        let file = WebIM.utils.getFileUrl(e.target)

        if (!file.filename) {
            this.image.value = null
            return false
        }

        if (!config.imgType[file.filetype.toLowerCase()]) {
            this.image.value = null
            // todo i18n
            return message.error(`${I18n.t('invalidType')}: ${file.filetype}`, 1)
        }

        this.props.sendImgMessage(chatType[selectTab], selectItem, { isRoom }, file, () => {
            this.image.value = null
        })
    }

    fileChange(e) {
        const { match } = this.props
        const { selectItem, selectTab } = match.params
        const isRoom = chatType[selectTab] == 'chatroom' || chatType[selectTab] == 'groupchat'

        let file = WebIM.utils.getFileUrl(e.target)

        if (!file.filename) {
            this.file.value = null
            return false
        }

        this.props.sendFileMessage(chatType[selectTab], selectItem, { isRoom }, file, () => {
            this.file.value = null
        })
    }

    handleEmojiSelect(v) {
        this.setState({
            value: (this.state.value || '') + v.key
        }, () => {
            this.logger.info('callback')
            this.logger.info(this.state.value)
        })
        this.logger.info('async')
        this.logger.info(this.state.value)
        this.input.focus()
    }

    handleEmojiCancel() {
        if (!this.state.value) return
        const arr = this.state.value.split('')
        const len = arr.length
        let newValue = ''

        if (arr[len - 1] != ']') {
            arr.pop()
            newValue = arr.join('')
        } else {
            const index = arr.lastIndexOf('[')
            newValue = arr.splice(0, index).join('')
        }

        this.setState({
            value: newValue
        })
    }

    handleChange(e) {
        const v = e.target.value
        const splitValue = this.state.value ? this.state.value.split('') : []
        splitValue.pop()
        if (v == splitValue.join('')) {
            this.handleEmojiCancel()
        } else {
            this.setState({
                value: v
            })
        }
    }

    handleSend(e) {
        const {
            match,
            message
        } = this.props
        const { selectItem, selectTab } = match.params
        const { value } = this.state
        if (!value) return
        this.props.sendTxtMessage(chatType[selectTab], selectItem, {
            msg: value
        })
        this.emitEmpty()
    }

    emitEmpty() {
        this.setState({
            value: ''
            // height: 34
        })
        this.input.value = ''
        this.input.focus()
    }

    handleKey(e) {
        if (e.keyCode == 8 || e.keycode == 46) {
            this.handleEmojiCancel()
        }
    }

    /**
     * click event for button at top-right corner
     *
     * @memberof Chat
     */
    handleRightIconClick() {
        const { match } = this.props
        const { selectTab } = match.params
        // const { selectTab } = this.state
        if (selectTab === 'group') {
            const rightSiderOffset = -1 * config.RIGHT_SIDER_WIDTH
            this.props.switchRightSider({ rightSiderOffset })
        }
    }

    renderContactMenu(selectTab) {
        let tabs = null
        if (selectTab == 'contact') {
            tabs = [
                [ '0', `${I18n.t('block')}`, 'iconfont icon-circle-minus' ],
                [ '1', `${I18n.t('delAFriend')}`, 'iconfont icon-trash' ]
            ]
        } else {
            // stranger
            tabs = [
                [ '2', `${I18n.t('addFriend')}`, 'anticon anticon-user-add' ],
                [ '3', `${I18n.t('delete')}`, 'iconfont icon-trash' ]
            ]
        }

        const tabsItem = tabs.map(([ key, name, icon ]) =>
            <Menu.Item key={key}>
                <i className={icon} style={{ fontSize: 20, marginRight: 12, verticalAlign: 'middle' }} />
                <span>
                    <span>
                        {name}
                    </span>
                </span>
            </Menu.Item>
        )
        const menuSettings = (
            <Menu className="x-header-ops__dropmenu" onClick={this.onMenuContactClick}>
                {tabsItem}
            </Menu>
        )

        return menuSettings
    }

    onMenuContactClick({ key }) {
        const { match } = this.props
        const { selectItem, selectTab } = match.params
        const search = history.location.search
        switch (key) {
        case '0':
            // block a friend
            this.props.doAddBlacklist(selectItem)
            history.push('/contact' + search)
            break
        case '1':
            // delete a friend
            this.props.removeContact(selectItem)
            history.push('/contact' + search)
            break
        case '2':
            // add a friend
            this.props.addContact(selectItem)
            message.success(`${I18n.t('addFriendMessage')}`)
            break
        case '3':
            // delete
            this.props.deleteStranger(selectItem)
            history.push('/stranger' + search)
            break
        default:
        }
    }

    onClearMessage = () => {
        const { selectItem, selectTab } = _.get(this.props, [ 'match', 'params' ], {})
        const chatTypes = { 'contact': 'chat', 'group': 'groupchat', 'chatroom': 'chatroom', 'stranger': 'stranger' }
        const chatType = chatTypes[selectTab]
        this.props.clearMessage(chatType, selectItem)
    }

    componentWillReceiveProps(nextProps) {
        // setTimeout(this.scollBottom, 0)
        // this.scollBottom()
    }

    componentDidUpdate() {
        this.scollBottom()
    }

    /**
     * componentDidMount
     *
     * @memberof Chat
     *
     * Note: get group members, muted members and group admins when in a group.
     * Especially recommend get muted members here.
     * Because, it will check current user in or not in muted list when sending a group message.
     */
    componentDidMount() {
        this.scollBottom()
    }

    componentWillUnmount() {
        if (this.timer) clearTimeout(this.timer)
    }

    callVideo = () =>{
        if (this.props.callStatus > 0) {
            console.log(this.props.callStatus)
            return Message.error('正在通话中')
        }
        const {
            match,
            message
        } = this.props
        const { selectItem, selectTab } = match.params
        const value = '邀请您进行视频通话'
        const callId = WebIM.conn.getUniqueId().toString();
        const channelName = Math.uuid(8)
        if (selectTab === 'contact') {
            this.props.sendTxtMessage(chatType[selectTab], selectItem, {
                msg: value,
                ext: {
                    action: 'invite',
                    channelName: channelName,
                    type: 1, //0为1v1音频，1为1v1视频，2为多人通话
                    callerDevId: WebIM.conn.context.jid.clientResource, // 主叫方设备Id
                    callId: callId, // 随机uuid，每次呼叫都不同，代表一次呼叫
                    ts: Date.now(),
                    msgType: 'rtcCallWithAgora'
                }
            })
            this.props.updateConfr({
                ext:{
                    channelName: channelName,
                    type: 1,
                    callerDevId: WebIM.conn.context.jid.clientResource,
                    callId: callId
                },
                to: selectItem,
                callerIMName: WebIM.conn.context.jid.name,
                calleeIMName: selectItem
            })
        }else  if (selectTab === 'group'){
            this.props.showInviteModal()
            this.props.setGid(selectItem)
            // this.props.updateConfrInfo(selectItem, false, false)
        }
        const inviteStatus = 1
        this.props.setCallStatus(inviteStatus)
        let to = selectItem
        rtc.timer && clearTimeout(rtc.timer)
        rtc.timer = setTimeout(() => {
            if (selectTab === 'contact') {
                this.props.cancelCall(to)
                this.props.hangup()
            }else{
                // 多人不做超时
            }
        }, 30000)
    }

    handleModalClose = () => {
        this.props.closeInviteModal()
    }

    callVoice = () => {
        const {
            match,
            message
        } = this.props
        if (this.props.callStatus > 0) {
            console.log(this.props.callStatus)
            return Message.error('正在通话中')
        }
        const { selectItem, selectTab } = match.params
        const value = '邀请您进行语音通话'

        const callId = WebIM.conn.getUniqueId().toString();
        const channelName = Math.uuid(8)
        this.props.sendTxtMessage(chatType[selectTab], selectItem, {
            msg: value,
            ext: {
                action: 'invite',
                channelName: channelName,
                type: 0, //0为1v1音频，1为1v1视频，2为多人通话
                callerDevId: WebIM.conn.context.jid.clientResource, // 主叫方设备Id
                callId: callId, // 随机uuid，每次呼叫都不同，代表一次呼叫
                ts: Date.now(),
                msgType: 'rtcCallWithAgora',
                callerIMName: WebIM.conn.context.jid.name
            }
        })
        this.props.updateConfr({
            ext:{
                channelName: channelName,
                token: null,
                type: 0,
                callerDevId: WebIM.conn.context.jid.clientResource,
                callId: callId
            },
            to: selectItem,
            calleeIMName: selectItem,
            callerIMName: WebIM.conn.context.jid.name
        })
        const inviteStatus = 1
        this.props.setCallStatus(inviteStatus)
        let to = selectItem
        rtc.timer && clearTimeout(rtc.timer)
        rtc.timer = setTimeout(() => {
            if (selectTab === 'contact') {
                this.props.cancelCall(to)
                this.props.hangup()
            }else{
                // 多人不做超时
            }
        }, 30000)
    }

    handleScroll = (e) => {
        const _this = this
        if (e.target.scrollTop === 0) {
            // TODO: optimization needed
            setTimeout(function () {
                const offset = _this.props.messageList ? _this.props.messageList.length : 0
                const { selectItem, selectTab } = _.get(_this.props, [ 'match', 'params' ], {})
                const chatTypes = { 'contact': 'chat', 'group': 'groupchat', 'chatroom': 'chatroom', 'stranger': 'stranger' }
                const chatType = chatTypes[selectTab]

                // load more history message
                _this.props.fetchMessage(selectItem, chatType, offset, (res) => {

                    // no more history when length less than 20
                    if (res < PAGE_NUM) {
                        _this.setState({
                            isLoaded: true
                        })

                        _this._not_scroll_bottom = false
                    }
                })

                _this._not_scroll_bottom = true
            }, 500)
        }
    }
    ok = (id) => {
        this.props.deleteMessage(id, true)
    }

    handleHoverChange = (visible)=>{
        this.setState({
            visible
        })
    }

    onChange = e => {
        this.setState({
          checkedValue: e.target.value,
        });
    };

    sendIdCardMsg = async ()=>{
        const { selectItem, selectTab } = this.props.match.params
        let chatType
        if (selectTab === 'contact') {
            chatType = 'singleChat'
        } else if(selectTab === 'group'){
            chatType = 'groupchat'
        } else {
            chatType = 'chatroom'
        }


        let userId = this.state.checkedValue
        
        let info = await this.props.getUserInfo(userId)
        info = info.data[userId]
        let msg = {
            userId: userId,
            nick: info.nickname || '',
            avatar: info.avatarurl || ''
        }
        this.props.sendCustomMsg(chatType, selectItem, msg)
         this.setState({
            visible: false
        })
    }
    onClickIdCard = async (data) =>{
        let res  = await this.props.getUserInfo(data.uid)
        let info = res.data[data.uid]
        this.userInfo = info
        this.userInfo.userId = data.uid
        // this.showEdit = data.uid == WebIM.conn.context.userId
        this.setState({
            showUserInfoMoadl: true
        })
    }
    handleInfoModalClose = () => {
        this.setState({
            showUserInfoMoadl: false
        })
    }
    render() {
        this.logger.info('chat component render')
        let {
            collapsed,
            match,
            history,
            location,
            messageList,
            messageListByMid,
            confrModal,
            inviteModal,
            entities
        } = this.props
        const { selectItem, selectTab } = match.params
        

        const back = () => {
            const redirectPath = '/' + [ selectTab ].join('/') + location.search
            history.push(redirectPath)
        }

        let name = selectItem
        let webrtcButtons = []
        let userinfos = {}

        let isShowDeleteGroupNotice = selectTab === 'group' && entities?.group?.currentGroupCustom !== 'default'
        if (selectTab === 'contact') {
            let withInfoUsers = this.props.entities.roster.byName
            userinfos = name = withInfoUsers ? withInfoUsers[selectItem]?.info?.nickname: name
        }
        if (selectTab === 'group') {
            userinfos = this.props.entities.groupMember[selectItem]?.byName || {}
        }

        if (WebIM.config.isWebRTC) {
            if (selectTab === 'contact') {
                // webrtc video button
                webrtcButtons.push(<label key="video" htmlFor="clearMessage" className="x-chat-ops-icon ib"
                    onClick={this.callVideo}>
                    <i className="icon iconfont icon-camera-video"></i>
                </label>)
                // webrtc audio button
                webrtcButtons.push(<label key="audio" htmlFor="clearMessage" className="x-chat-ops-icon ib"
                    onClick={this.callVoice}>
                    <Icon type="phone" style={{ verticalAlign: 'unset', fontSize: '15px' }} />
                </label>)
            }
            if (selectTab === 'group') {
                // webrtc video button
                webrtcButtons.push(<label key="video" htmlFor="clearMessage" className="x-chat-ops-icon ib"
                    onClick={this.callVideo}>
                    <i className="icon iconfont icon-camera-video"></i>
                </label>)
            }
        }

        const { showWebRTC } = this.state

        const content = ()=>{
            const radioStyle = {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
            };

            const container = {
                height: '150px',
                overflowY: 'scroll'
            }
            let users = []
            let list = []
            let withInfoUsers = {}
            users = this.props.entities.roster.names || []
            withInfoUsers = this.props.entities.roster.byName
            users.forEach((item, index) => {
                list.push(
                    <Radio style={radioStyle} value={item} key={item}>
                      {withInfoUsers[item]?.info?.nickname || item}
                    </Radio>
                )
            })

            return (
                <div>
                    <div style={container}>
                        <Radio.Group onChange={this.onChange} value={this.state.checkedValue}>
                            {list}
                        </Radio.Group>
                    </div>
                    <Button onClick={this.sendIdCardMsg}>发送</Button>
                </div>
            )
        }
        return (
            <div className="x-chat">
                <div className="x-list-item x-chat-header">
                {collapsed
                            ? <Icon
                                type="arrow-left"
                                onClick={back}
                                style={{
                                    cursor: 'pointer',
                                    fontSize: 20,
                                    verticalAlign: 'middle',
                                    marginRight: 10,
                                    float: 'left',
                                    lineHeight: '50px'
                                }}
                            />
                            : null}
                    <div className={`fl ${isShowDeleteGroupNotice?"notice":''}`}>
                        
                        <span>{name}</span>
                        {isShowDeleteGroupNotice ?<span>该群仅供试用，72小时后将被删除</span>: ''}
                    </div>
                    <div className="fr">
                        <span style={{ color: '#8798a4', cursor: 'pointer' }}>
                            {selectTab === 'contact' || selectTab === 'stranger'
                                ? <Dropdown
                                    overlay={this.renderContactMenu(selectTab)}
                                    placement="bottomRight"
                                    trigger={[ 'click' ]}
                                >
                                    <Icon type="ellipsis" />
                                </Dropdown>
                                : <Icon type="ellipsis" onClick={this.handleRightIconClick} />}
                        </span>
                    </div>
                </div>
                <div className="x-chat-content" ref="x-chat-content" onScroll={this.handleScroll}>
                    {/* fixed bug of messageList.map(...) */}
                    {this.state.isLoaded && <div style={{ width: '150px', height: '30px', lineHeight: '30px', backgroundColor: '#888', color: '#fff', borderRadius: '15px', textAlign: 'center', margin: '10px auto' }}>{I18n.t('noMoreMessage')}</div>}
                    {_.map(messageList, (message, i) => {
                        if (i > 0) {
                            if (message.id != messageList[i - 1].id) {
                                return <ChatMessage key={i} fromNick={selectTab=='contact'?userinfos:userinfos[message.from]?.info.nickname} onClickIdCard={this.onClickIdCard} ok={this.ok}{...message} />
                            }
                        } else {
                            return <ChatMessage key={i} fromNick={selectTab=='contact'?userinfos:userinfos[message.from]?.info.nickname} onClickIdCard={this.onClickIdCard} ok={this.ok} {...message} />
                        }
                    })}
                </div>
                <div className="x-chat-content-tip">
                    本应用仅用于环信产品功能开发测试，请勿用于非法用途。任何涉及转账、汇款、裸聊、网恋、网购退款、投资理财等统统都是诈骗，请勿相信！
                </div>
                <div className="x-chat-footer">
                    <div className="x-list-item x-chat-ops">
                        {/* emoji */}
                        <div className="x-chat-ops-icon ib">
                            <ChatEmoji onClick={this.handleEmojiSelect} />
                        </div>
                        {/* image upload */}
                        <label
                            htmlFor="uploadImage"
                            className="x-chat-ops-icon ib"
                            onClick={() => this.image && this.image.focus()&&this.image.click()}>
                            <i className="iconfont icon-picture" />
                            <input
                                id="uploadImage"
                                ref={node => (this.image = node)}
                                onChange={this.pictureChange}
                                type="file"
                                className="hide"
                            />
                        </label>
                        {/*  file upload*/}
                        <label
                            htmlFor="uploadFile"
                            className="x-chat-ops-icon ib"
                            onClick={() => this.file && this.file.focus() &&this.file.click()}>
                            <i className="icon iconfont icon-file-empty" />
                            <input
                                id="uploadFile"
                                ref={node => (this.file = node)}
                                onChange={this.fileChange}
                                type="file"
                                className="hide"
                            />
                        </label>
                        {/* webrtc video && audio && 发送音频 */}
                        {webrtcButtons}
                        {WebIM.config.isWebRTC && <RecordAudio match={match}/>}
                        {/* clear */}
                        <label htmlFor="clearMessage" className="x-chat-ops-icon ib" onClick={this.onClearMessage}>
                            <i className="icon iconfont icon-trash"></i>
                        </label>

                        
                        <Popover 
                            content={content()} 
                            title="" 
                            trigger="click"
                            visible={this.state.visible}
                            onVisibleChange={this.handleHoverChange}
                        >
                            <Icon type="idcard" style={{padding:'0 15px'}} className="icon iconfont icon-trash"/>
                        </Popover>
                    </div>
                    <div className="x-list-item x-chat-send">
                        <Input
                            value={this.state.value}
                            onChange={this.handleChange}
                            onPressEnter={this.handleSend}
                            placeholder={I18n.t('message')}
                            addonAfter={
                                <i
                                    className="fontello icon-paper-plane"
                                    onClick={this.handleSend}
                                    style={{ cursor: 'pointer' }}
                                />
                            }
                            ref={node => (this.input = node)}
                        />
                        {/*<TextArea rows={2} />*/}
                    </div>
                </div>
                {/* <WebRTCModal collapsed={collapsed} visible={showWebRTC} /> */}
                <ModalComponent
                    closable={false}
                    width={460}
                    /* title={I18n.t("addAFriend")} */
                    // title={'选择成员'}
                    visible={inviteModal === true}
                    maskClosable={false}
                    component={AddAVMemberModal}
                    onModalClose={this.handleModalClose}
                />

                <ModalComponent
                    width={360}
                    title="个人名片"
                    visible={this.state.showUserInfoMoadl}
                    userInfos={this.userInfo}
                    showEdit={this.showEdit}
                    component={UserInfoModal}
                    onModalClose={this.handleInfoModalClose}
                />
            </div>
        )
    }
}

export default connect(
    (state, props) => ({
        messageList: getTabMessages(state, props).TabMessageArray,
        messageListByMid: state.entities.message.byMid,
        inviteModal: state.callVideo.inviteModal,
        callStatus: state.callVideo.callStatus,
        entities: state.entities,
        state: state
    }),
    dispatch => ({
        switchRightSider: ({ rightSiderOffset }) => dispatch(GroupActions.switchRightSider({ rightSiderOffset })),
        sendTxtMessage: (chatType, id, message) => dispatch(MessageActions.sendTxtMessage(chatType, id, message)),
        deleteMessage: (id) => dispatch(MessageActions.deleteMessage(id, true)),
        sendImgMessage: (chatType, id, message, source, callback) => dispatch(MessageActions.sendImgMessage(chatType, id, message, source, callback)),
        sendFileMessage: (chatType, id, message, source, callback) => dispatch(MessageActions.sendFileMessage(chatType, id, message, source, callback)),
        sendCustomMsg: (chatType, id, message) => dispatch(MessageActions.sendCustomMsg(chatType, id, message)),
        clearMessage: (chatType, id) => dispatch(MessageActions.clearMessage(chatType, id)),
        listGroupMemberAsync: opt => dispatch(GroupMemberActions.listGroupMemberAsync(opt)),
        getMutedAsync: groupId => dispatch(GroupMemberActions.getMutedAsync(groupId)),
        getGroupAdminAsync: groupId => dispatch(GroupMemberActions.getGroupAdminAsync(groupId)),
        removeContact: id => dispatch(RosterActions.removeContact(id)),
        addContact: id => dispatch(RosterActions.addContact(id)),
        getUserInfo: id => dispatch(RosterActions.getUserInfo(id)),
        deleteStranger: id => dispatch(StrangerActions.deleteStranger(id)),
        doAddBlacklist: id => dispatch(BlacklistActions.doAddBlacklist(id)),
        fetchMessage: (id, chatType, offset, cb) => dispatch(MessageActions.fetchMessage(id, chatType, offset, cb)),
        showInviteModal: () => dispatch(VideoCallActions.showInviteModal()),
        closeInviteModal: () => dispatch(VideoCallActions.closeInviteModal()),
        updateConfr: (msg) => dispatch(VideoCallActions.updateConfr(msg)),
        setCallStatus: (status) => dispatch(VideoCallActions.setCallStatus(status)),
        cancelCall: (to) => dispatch(VideoCallActions.cancelCall(to)),
        setGid: (gid) => dispatch(VideoCallActions.setGid(gid)),
        hangup: () => dispatch(VideoCallActions.hangup())
    })
)(Chat)
