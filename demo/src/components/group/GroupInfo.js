import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Immutable from 'seamless-immutable'
import { I18n } from 'react-redux-i18n'
import { Button, Card, Col, Dropdown, Form, Icon, Input, Menu, Modal, Popconfirm, Row, Table, Tooltip } from 'antd'
import GroupActions from '@/redux/GroupRedux'
import GroupMemberActions from '@/redux/GroupMemberRedux'
import './style/index.less'
import { history } from '@/utils'

const iconStyle = { fontSize: 16 }

const GroupInfoForm = Form.create()(props => {
    const { visible, onCancel, onCreate, form, loading } = props
    const { getFieldDecorator } = form
    return (
        <Modal
            visible={visible}
            title={I18n.t('modifyGroupInfo')}
            okText={I18n.t('modify')}
            confirmLoading={loading}
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form>
                <Form.Item label={I18n.t('groupName')}>
                    {getFieldDecorator('name', {
                        rules: [ { required: true, message: I18n.t('groupName') } ]
                    })(<Input />)}
                </Form.Item>
            </Form>
        </Modal>
    )
})

class GroupInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            visible: false,
            blackListVisible: false,
            showInviteToGroupModal: false
        }
    }
    componentDidMount(){
        const { room } = this.props
        let groupId = room.groupId
        this.props.newGetGroupInfoAsync(groupId)
    }

    handleSiderClick = () => this.props.switchRightSider({ rightSiderOffset: 0 })

    handleCreate = () => {
        const form = this.form
        form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return
            }
            const { room } = this.props
            const info = {
                groupId: room.groupId,
                groupName: values.name
            }
            if (!_.isEmpty(values.description)) _.merge(info, { description: values.description })
            this.setState({ visible: false })
            this.props.updateGroupInfoAsync(info)
        })
    }

    showModal = () => this.setState({ visible: true })

    handleModalOk = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
        })
    }

    handleCloseBlacklistModal = () => this.setState({ blackListVisible: false })

    handleCancel = () => this.setState({ visible: false })

    saveFormRef = form => (this.form = form)

    handleDissolveGroup = () => this.props.dissolveGroupAsync(this.props.room.groupId)

    handleMenuClick = ({ item, key, selectedKeys }) => {
        switch (key) {
            case '1':
                break
            case '2':
                this.setState({ showInviteToGroupModal: true })
                break
            case '3':
                this.showModal()
                break
            case '4':
                this.props.getGroupBlackListAsync(this.props.room.groupId)
                this.setState({ blackListVisible: true })
                break
            case '5':
                const search = history.location.search
                const { groupId, groupName } = this.props.room
                this.props.switchRightSider({ rightSiderOffset: 0 })
                this.props.dissolveGroupAsync({ groupId: groupId, groupName: groupName })
                history.push('/group' + search)
                break
            case '6':
                const { login } = this.props
                const username = _.get(login, 'username')
                this.props.quitGroupAsync(this.props.room.groupId, username)
                break
            default:
                break
        }
    }

    handleGetBlackList = () => {
        const { room } = this.props
        this.props.getGroupBlackListAsync(room.groupId)
        this.setState({ blackListVisible: true })
    }

    onChangeUsers = e => this.setState({ users: [ e.target.value ] })

    add = () => {
        const value = this.state.users
        if (!value || value.length === 0) return
        this.props.inviteToGroupAsync(this.props.room.groupId, value)
        // this.props.listGroupMemberAsync({ groupId: this.props.room.groupId })
        this.closeInviteModal()
    }

    closeInviteModal = () => {
        this.setState({ showInviteToGroupModal: false })
    }

    onRemoveGroupBlockSingle = user =>
        this.props.removeGroupBlockSingleAsync(this.props.room.groupId, user)

    renderGroupOperationMenu = () => {
        const { login, groupMember, room } = this.props
        const user = _.get(groupMember, [room.groupId, 'byName', _.get(login, 'username').toLowerCase()], {
            name: null,
            affiliation: null
        })
        const isAdmin = user.affiliation === 'owner'
        // TOOD 代码结构需优化
        if (isAdmin) {
            return <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="2">
                    <Tooltip placement="left">
                        <i className="iconfont icon-users" /> {I18n.t('inviteToGroup')}
                    </Tooltip>
                </Menu.Item>
                <Menu.Item key="3">
                    <Tooltip placement="left">
                        <i className="iconfont icon-pencil" /> {I18n.t('modifyGroupInfo')}
                    </Tooltip>
                </Menu.Item>
                <Menu.Item key="4">
                    <Tooltip placement="left">
                        <Icon type="frown" /> {I18n.t('groupBlacklist')}
                    </Tooltip>
                </Menu.Item>
                <Menu.Item key="5">
                    <Tooltip placement="left">
                        <Icon type="poweroff" /> {I18n.t('dissovleGroup')}
                    </Tooltip>
                </Menu.Item>
            </Menu>
        } else if (this.props.group.allowinvites) { //成员邀请判断
            return <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="6">
                    <Tooltip title={I18n.t('quitGroup')} placement="left">
                        <i className="iconfont icon-exit" /> {I18n.t('quitGroup')}
                    </Tooltip>
                </Menu.Item>
            </Menu>
        } else {
            return <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="2">
                    <Tooltip placement="left">
                        <i className="iconfont icon-users" /> {I18n.t('inviteToGroup')}
                    </Tooltip>
                </Menu.Item>
                <Menu.Item key="6">
                    <Tooltip title={I18n.t('quitGroup')} placement="left">
                        <i className="iconfont icon-exit" /> {I18n.t('quitGroup')}
                    </Tooltip>
                </Menu.Item>
            </Menu>
        }
    }
    render() {
        const {
            title,
            name,
            description,
            joinPermission,
            room,
            groupMember
            // login,
            // entities
        } = this.props
        const isLoading = _.get(this.props, 'entities.group.isLoading', false)
        const blacklist = _.get(groupMember, [ room.groupId, 'blacklist' ], [])

        const menu = this.renderGroupOperationMenu()

        const ds = _.map(blacklist, val => {
            return { name: val, key: val }
        })

        const columns = [
            {
                title: 'Name',
                key: 'name',
                dataIndex: 'name'
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => {
                    return ds.length > 0
                        ? <Popconfirm
                            title={I18n.t('confirm') + ' ' + I18n.t('removeFromGroupBlackList')}
                            onConfirm={() => this.onRemoveGroupBlockSingle(record.name)}
                        >
                            <a href="#" className="fr">
                                {I18n.t('removeFromGroupBlackList')}
                            </a>
                        </Popconfirm>
                        : null
                }
            }
        ]

        const table = <Table columns={columns} dataSource={ds} rowKey="name" showHeader={false} size="small" />

        return (
            <Card
                title={title}
                extra={
                    <Tooltip title={I18n.t('close')} placement="left">
                        <Icon type="close-circle-o" onClick={this.handleSiderClick} style={iconStyle} />
                    </Tooltip>
                }
                bordered={false}
                noHovering={true}
            >
                <h3>
                    {I18n.t('groupName')}
                    <span className="fr">
                        <Dropdown overlay={menu} trigger={[ 'click' ]}>
                            <Icon type="setting" style={iconStyle} />
                        </Dropdown>
                    </span>
                </h3>
                <p className="gray fs-117em">
                    {this.props.room.groupName}
                </p>
                {/* <h3>Group Description</h3>
            <p className='gray fs-117em'>{this.props.room.description}</p> */}

                <GroupInfoForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <Modal
                    title={I18n.t('groupBlacklist')}
                    visible={this.state.blackListVisible}
                    okText={I18n.t('close')}
                    onOk={this.handleCloseBlacklistModal}
                    onCancel={this.handleCloseBlacklistModal}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleCloseBlacklistModal}>
                            {I18n.t('close')}
                        </Button>
                    ]}
                >
                    {table}
                </Modal>
                <Modal
                    width={460}
                    title={I18n.t('inviteToGroup')}
                    visible={this.state.showInviteToGroupModal}
                    footer={null}
                    onCancel={this.closeInviteModal}
                >
                    <Row>
                        <Col span={20}>
                            <Input size="large" placeholder={I18n.t('username')} onChange={this.onChangeUsers} />
                        </Col>
                        <Col span={4}>
                            <Button style={{ height: 32 }} className="fr" type="primary" onClick={this.add}>
                                {I18n.t('invite')}
                            </Button>
                        </Col>
                    </Row>
                </Modal>
            </Card>
        )
    }
}

export default connect(
    ({ entities, login }) => ({ login, groupMember: entities.groupMember, group: entities.group }),
    dispatch => ({
        listGroupMemberAsync: opt => dispatch(GroupMemberActions.listGroupMemberAsync(opt)),
        updateGroupInfoAsync: info => dispatch(GroupActions.updateGroupInfoAsync(info)),
        dissolveGroupAsync: ({ groupId, groupName }) => dispatch(GroupActions.dissolveGroupAsync({ groupId, groupName })),
        getGroupBlackListAsync: groupId => dispatch(GroupMemberActions.getGroupBlackListAsync(groupId)),
        removeGroupBlockSingleAsync: (groupId, username) => dispatch(GroupMemberActions.removeGroupBlockSingleAsync(groupId, username)),
        inviteToGroupAsync: (groupId, users) => dispatch(GroupMemberActions.inviteToGroupAsync(groupId, users)),
        quitGroupAsync: (groupId, username) => dispatch(GroupMemberActions.quitGroupAsync(groupId, username)),
        switchRightSider: ({ rightSiderOffset }) => dispatch(GroupActions.switchRightSider({ rightSiderOffset })),
        newGetGroupInfoAsync: options => dispatch(GroupActions.newGetGroupInfoAsync(options))
    })
)(GroupInfo)
