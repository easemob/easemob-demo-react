import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu, Dropdown, Icon } from 'antd'
import { I18n } from 'react-redux-i18n'
import ListItem from '@/components/list/ListItem'
import History from '@/utils/history'
import WebIM from '@/config/WebIM'
import WebIMActions from '@/redux/WebIMRedux'
import CommonActions from '@/redux/CommonRedux'
import './style/HeaderOps.less'
import _ from 'lodash'

import AddFriendsModal from '@/components/friend/AddFriendsModal'
import FriendsRequestModal from '@/components/friend/FriendsRequestModal'
import ModalComponent from '@/components/common/ModalComponent'
import AddGroupModal from '@/components/group/AddGroupModal'
import BlacklistModal from '@/components/blacklist/BlacklistModal'
import JoinGroupModal from '@/components/group/JoinGroupModal'
import GroupRequestModal from '@/components/group/GroupRequestModal'
import GroupInviteModal from '@/components/group/GroupInviteModal'
import VideoSetting from '@/components/videoSetting/videoSettingModal'

class HeaderOps extends Component {
    constructor(props) {
        super()

        this.state = {
            modal: '',
        }

        // showAddFriendsModal: false,
        // showBlacklistModal: false,
        // showAddGroupModal: false,
        // showJoinGroupModal: false
        this.onMenuSettingsClick = this.onMenuSettingsClick.bind(this)
        this.onMenuRightClick = this.onMenuRightClick.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
    }

    handleLogout() {

        this.props.doLogout()
    }

    onMenuSettingsClick({ key }) {
        switch (key) {
        case '0':
            this.setState({
                modal: 'showBlacklistModal'
            })
            break
        case '1':
            this.handleLogout()
            break
        case '2':
            this.setState({
                modal: "showVideoSettingModal"
            })
        }
    }

    onMenuRightClick({ key }) {
        switch (key) {
        case '0':
            this.setState({
                modal: 'showAddFriendsModal'
            })
            break
        case '1':
            this.setState({
                modal: 'showJoinGroupModal'
            })
            break
        case '2':
            this.setState({
                modal: 'showAddGroupModal'
            })
            break
        default:
            break
        }
    }

    handleModalClose(e) {
        this.setState({ modal: '' })
        this.props.setShowGroupRequestModal(false)
        this.props.setShowGroupInviteModal(false)
    }

    render() {
        const { title, doLogout, subscribes, groupRequests, showGroupRequestModal, showGroupInviteModal } = this.props
        const { modal } = this.state

        const tabsLeft = [
            [ '2', `音视频会议设置`, 'video-camera'],
            [ '0', `${I18n.t('friends')}${I18n.t('blacklist')}`, 'minus-circle-o' ],
            [ '1', `${I18n.t('quit')}(${title})`, 'logout' ]
        ]

        const tabsRight = [
            [ '0', I18n.t('addAFriend'), 'user-add' ],
            [ '1', I18n.t('joinGroup'), 'plus-circle-o' ],
            [ '2', I18n.t('createGroup'), 'usergroup-add' ]
        ]

        const tabsLeftItem = tabsLeft.map(([ key, name, icon ]) =>
            <Menu.Item key={key}>
                <span>
                    <Icon type={icon} /> <span>{name}</span>
                </span>
            </Menu.Item>
        )

        const tabsRightItem = tabsRight.map(([ key, name, icon ]) =>
            <Menu.Item key={key}>
                <span>
                    <Icon type={icon} /> <span>{name}</span>
                </span>
            </Menu.Item>
        )

        const menuSettings = (
            <Menu className="x-header-ops__dropmenu" onClick={this.onMenuSettingsClick}>
                {tabsLeftItem}
            </Menu>
        )

        const menuRight = (
            <Menu className="x-header-ops__dropmenu" onClick={this.onMenuRightClick}>
                {tabsRightItem}
            </Menu>
        )
        // console.log("subscribes", _.isEmpty, subscribes)

        return (
            <div id="x-header-ops" className="x-list-item headerBg">
                <div
                    className="fl"
                    style={{
                        margin: '0 12px 0 0',
                        fontSize: 24,
                        lineHeight: '50px',
                        color: '#fff',
                        cursor: 'pointer'
                    }}
                >
                    <Dropdown overlay={menuSettings} trigger={[ 'click' ]} style={{ position: 'absolute' }}>
                        <Icon type="setting" />
                    </Dropdown>
                </div>
                <div className="fl" style={{ lineHeight: '50px', color: '#fff' }}>
                    {title}
                </div>
                <div
                    className="fr"
                    style={{
                        fontSize: 24,
                        lineHeight: '50px',
                        color: '#fff',
                        cursor: 'pointer'
                    }}
                >
                    <Dropdown overlay={menuRight} placement="bottomRight" trigger={[ 'click' ]}>
                        <Icon type="plus-circle-o" />
                    </Dropdown>
                </div>
                {
                    <ModalComponent
                        width={460}
                        title={I18n.t('addAFriend')}
                        visible={modal === 'showAddFriendsModal'}
                        component={AddFriendsModal}
                        onModalClose={this.handleModalClose}
                    />
                }
                {
                    <ModalComponent
                        width={460}
                        title={I18n.t('request')}
                        visible={!_.isEmpty(subscribes)}
                        component={FriendsRequestModal}
                        onModalClose={this.handleModalClose}
                    />
                }
                {
                    <ModalComponent
                        width={460}
                        title={I18n.t('createGroup')}
                        visible={modal === 'showAddGroupModal'}
                        component={AddGroupModal}
                        onModalClose={this.handleModalClose}
                    />
                }
                {
                    <ModalComponent
                        width={460}
                        title={I18n.t('blacklist')}
                        visible={modal === 'showBlacklistModal'}
                        component={BlacklistModal}
                        onModalClose={this.handleModalClose}
                    />
                }
                {
                    <ModalComponent
                        width={460}
                        title={I18n.t('joinGroup')}
                        visible={modal === 'showJoinGroupModal'}
                        component={JoinGroupModal}
                        onModalClose={this.handleModalClose}
                    />
                }
                {
                    <ModalComponent
                        width={460}
                        title={I18n.t('joinGroup')}
                        visible={showGroupRequestModal}
                        component={GroupRequestModal}
                        onModalClose={this.handleModalClose}
                    />
                }
                {
                    <ModalComponent
                        width={460}
                        title={I18n.t('groupInvite')}
                        visible={showGroupInviteModal}
                        component={GroupInviteModal}
                        onModalClose={this.handleModalClose}
                    />
                }
                {
                    <ModalComponent
                        width={460}
                        title="发起音视频会议设置"
                        visible={modal === 'showVideoSettingModal'}
                        component={VideoSetting}
                        onModalClose={this.handleModalClose}
                    />
                }
            </div>
        )
    }
}

HeaderOps.propTypes = {
    collapse: PropTypes.bool
    // menuOptions: PropTypes.array.isRequired,
}

export default connect(
    (state) => ({
        subscribes: state.entities.subscribe.byFrom,
        groupRequests: state.entities.groupRequest.byGid,
        showGroupRequestModal: state.common.showGroupRequestModal,
        showGroupInviteModal: state.common.showGroupInviteModal
    }),
    dispatch => ({
        doLogout: () => dispatch(WebIMActions.logout()),
        setShowGroupRequestModal: (status) => dispatch(CommonActions.setShowGroupRequestModal(status)),
        setShowGroupInviteModal: (status) => dispatch(CommonActions.setShowGroupInviteModal(status))
    })
)(HeaderOps)
