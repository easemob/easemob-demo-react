import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Modal, Input, Button, Row, Col } from 'antd'
import WebIM from '@/config/WebIM'
import { I18n } from 'react-redux-i18n'
import _ from 'lodash'
import GroupInviteActions from '@/redux/GroupInviteRedux'
import GroupActions from '@/redux/GroupRedux'
class GroupInviteModal extends React.Component {
    state = {
        toNick: '',
        groupName: '',
        reason: ''
    }
    onRefuse = (gid) => {
        var me = this
        var options = {
            invitee: WebIM.conn.user,
            groupId: gid,
            success: function(resp) {
                me.props.upDateGroupList()
            },
            error: function(e) {}
        }
        this.props.rejectInviteIntoGroup(gid, options)
    }

    onAgree = (gid) => {
        var me = this
        var options = {
            groupId: gid,
            invitee: WebIM.conn.user,
            success: function(resp) {
                me.props.upDateGroupList()
            },
            error: function(e) {}
        }
        this.props.agreeInviteIntoGroup(gid, options)
    }

    render() {
        console.log('this.props.groupRequests', this.props.groupRequests)
        // 过滤一下groupRequests的id，防止相同的进群邀请
        const requests = []
        _.forEach(this.props.groupRequests, val => {
            _.forEach(val, ({ from, status, toNick, reason, gid }) => {
                requests.push(
                    <Row key={from}>
                        <Col span={14}>
                            {`${from}${I18n.t('inviteIntoGroup')}${gid}`}
                            <p>
                                {reason}
                            </p>
                        </Col>
                        <Col span={10}>
                            <Button
                                style={{
                                    height: 32,
                                    marginLeft: 10
                                }}
                                className="fr"
                                type="primary"
                                onClick={() => this.onAgree(gid, from)}
                            >
                                {I18n.t('agree')}
                            </Button>
                            <Button
                                style={{
                                    height: 32
                                }}
                                className="fr"
                                type="danger"
                                onClick={() => this.onRefuse(gid, from)}
                            >
                                {I18n.t('reject')}
                            </Button>
                        </Col>
                    </Row>
                )
            })
        })

        return (
            <div>
                {requests}
            </div>
        )
    }
}

export default connect(
    ({ entities }) => ({
        groupRequests: entities.groupRequest.byGid
    }),
    dispatch => ({
        agreeInviteIntoGroup: (gid, options) => dispatch(GroupInviteActions.agreeInviteIntoGroup(gid, options)),
        rejectInviteIntoGroup: (gid, options) => dispatch(GroupInviteActions.rejectInviteIntoGroup(gid, options)),
        upDateGroupList: (gid, options) => dispatch(GroupActions.getGroups())
    })
)(GroupInviteModal)
