import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { I18n } from 'react-redux-i18n'
import _ from 'lodash'
import { Button, Row, Form, Input, Icon, Dropdown, Menu, message } from 'antd'
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
import MultiAVActions from '@/redux/MultiAVRedux'
import WebIM from '@/config/WebIM'
import { history } from '@/utils'
import utils from '@/utils'
import getTabMessages from '@/selectors/ChatSelector'
import WebRTCModal from '@/components/webrtc/WebRTCModal'
import AddAVMemberModal from '@/components/webrtc/AddAVMemberModal'
import ModalComponent from '@/components/common/ModalComponent'
import RecordAudio from '@/components/recorder/index'

const { TextArea } = Input
const FormItem = Form.Item
const { PAGE_NUM } = config

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
            isLoaded: false
        }
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

        // console.log(e, e.target)
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
        //
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

    callVideo = () => {
        if (WebIM.WebRTC.isCalling) {return message.info('通话中...')}
        if (utils.isIOSWebview() || !emedia.isWebRTC) {
            // 现在IOS webview还不支持webrtc，给出提示
            message.info('当前环境不支持音视频功能,可以在chrome上尝试使用')
            return
        }
        const { selectItem, selectTab } = _.get(this.props, [ 'match', 'params' ], {})
        const { confrModal, avModal } = this.props
        const videoSetting = JSON.parse(localStorage.getItem('videoSetting'))
        const recMerge = videoSetting && videoSetting.recMerge || false
        const rec = videoSetting && videoSetting.rec || false
        const config = {
            push: true,
            timeoutTime: 30000,
            txtMsg: 'I gave you a video call.', //发送给对方的文本消息
            pushMsg: `${WebIM.conn.context.userId}正在呼叫你...` //发送给对方的推送消息（只有手机端会显示）
        }
        if (selectTab === 'contact') {
            this.setState({
                showWebRTC: true
            })
            WebIM.WebRTC.isCalling = true;
            WebIM.call.caller = WebIM.conn.context.userId
            WebIM.call.makeVideoCall(selectItem, null, rec, recMerge, config)
            setTimeout(() => {
                var confrId = WebIM.call.getServerRecordId()
            }, 1000)

        } else if (selectTab === 'group') {
            // Create Confrence
            if (avModal) {
                message.info('您正在进行视频通话，不能新建其它视频')
                return
            }
            if (confrModal) {
                message.info('您正在创建视频通话，不能重复创建')
                return
            }
            this.props.showConfrModal()
            const pwd = Math.random().toString(36).substr(2)
            this.props.updateConfrInfo(selectItem, rec, recMerge)
        }
    }

    handleModalClose = () => {
        this.props.closeConfrModal()
    }

    callVoice = () => {
        if (WebIM.WebRTC.isCalling) {return message.info('通话中...')}
        if (utils.isIOSWebview() || !emedia.isWebRTC) {
            // 现在IOS webview还不支持webrtc，给出提示
            message.info('当前环境不支持音视频功能,可以在chrome上尝试使用')
            return
        }
        const { selectItem, selectTab } = _.get(this.props, [ 'match', 'params' ], {})
        console.log('sendWrapper::callVoice', WebIM.conn.context.userId/*当前登录用户*/, selectItem/*聊天对象*/, selectTab/*当前标签*/)

        const videoSetting = JSON.parse(localStorage.getItem('videoSetting'))
        const recMerge = videoSetting && videoSetting.recMerge || false
        const rec = videoSetting && videoSetting.rec || false
        this.setState({
            showWebRTC: true
        })
        WebIM.WebRTC.isCalling = true;
        const config = {
            push: true,
            timeoutTime: 30000,
            txtMsg: 'I gave you a voice call.', //
            pushMsg: `${WebIM.conn.context.userId}正在呼叫你...`
        }
        WebIM.call.caller = WebIM.conn.context.userId
        WebIM.call.makeVoiceCall(selectItem, null, rec, recMerge, config)
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
    render() {
        this.logger.info('chat component render')
        let {
            collapsed,
            match,
            history,
            location,
            messageList,
            messageListByMid,
            confrModal
        } = this.props
        const { selectItem, selectTab } = match.params
        

        const back = () => {
            const redirectPath = '/' + [ selectTab ].join('/') + location.search
            history.push(redirectPath)
        }

        let name = selectItem
        let webrtcButtons = []

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

        return (
            <div className="x-chat">
                <div className="x-list-item x-chat-header">
                    <div className="fl">
                        {collapsed
                            ? <Icon
                                type="arrow-left"
                                onClick={back}
                                style={{
                                    cursor: 'pointer',
                                    fontSize: 20,
                                    verticalAlign: 'middle',
                                    marginRight: 10
                                }}
                            />
                            : null}
                        {name}
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
                                return <ChatMessage key={i} ok={this.ok}{...message} />
                            }
                        } else {
                            return <ChatMessage key={i} ok={this.ok} {...message} />
                        }
                    })}
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
                    width={460}
                    /* title={I18n.t("addAFriend")} */
                    title={'选择成员'}
                    visible={confrModal === true}
                    component={AddAVMemberModal}
                    onModalClose={this.handleModalClose}
                />
            </div>
        )
    }
}

export default connect(
    (state, props) => ({
        messageList: getTabMessages(state, props).TabMessageArray,
        messageListByMid: state.entities.message.byMid,
        confrModal: state.multiAV.confrModal,
        avModal: state.multiAV.ifShowMultiAVModal
    }),
    dispatch => ({
        switchRightSider: ({ rightSiderOffset }) => dispatch(GroupActions.switchRightSider({ rightSiderOffset })),
        sendTxtMessage: (chatType, id, message) => dispatch(MessageActions.sendTxtMessage(chatType, id, message)),
        deleteMessage: (id) => dispatch(MessageActions.deleteMessage(id, true)),
        sendImgMessage: (chatType, id, message, source, callback) => dispatch(MessageActions.sendImgMessage(chatType, id, message, source, callback)),
        sendFileMessage: (chatType, id, message, source, callback) => dispatch(MessageActions.sendFileMessage(chatType, id, message, source, callback)),
        clearMessage: (chatType, id) => dispatch(MessageActions.clearMessage(chatType, id)),
        listGroupMemberAsync: opt => dispatch(GroupMemberActions.listGroupMemberAsync(opt)),
        getMutedAsync: groupId => dispatch(GroupMemberActions.getMutedAsync(groupId)),
        getGroupAdminAsync: groupId => dispatch(GroupMemberActions.getGroupAdminAsync(groupId)),
        removeContact: id => dispatch(RosterActions.removeContact(id)),
        addContact: id => dispatch(RosterActions.addContact(id)),
        deleteStranger: id => dispatch(StrangerActions.deleteStranger(id)),
        doAddBlacklist: id => dispatch(BlacklistActions.doAddBlacklist(id)),
        fetchMessage: (id, chatType, offset, cb) => dispatch(MessageActions.fetchMessage(id, chatType, offset, cb)),
        updateConfrInfo: (gid, rec, recMerge) => dispatch(MultiAVActions.updateConfrInfoAsync(gid, rec, recMerge)),
        showConfrModal: () => dispatch(MultiAVActions.showConfrModal()),
        closeConfrModal: (gid) => dispatch(MultiAVActions.closeConfrModal()),
        showP2pModal: () => dispatch(MultiAVActions.showP2pModal())
    })
)(Chat)
