import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import moment from 'moment'
import { I18n } from 'react-redux-i18n'
import { Badge, Button, Menu, Dropdown, Icon } from 'antd'
import { renderTime } from '@/utils'
import emoji from '@/config/emoji'
import { Card, Tag, message } from 'antd'
import Audio from '@/components/chat/Audio'
import WebIM from '@/config/WebIM'

const renderTxt = txt => {
    let rnTxt = []
    let match = null
    const regex = /(\[.*?\])/g
    let start = 0
    let index = 0
    while ((match = regex.exec(txt))) {
        index = match.index
        if (index > start) {
            rnTxt.push(txt.substring(start, index))
        }
        if (match[1] in emoji.map) {
            const v = emoji.map[match[1]]
            rnTxt.push(
                <img
                    key={WebIM.conn.getUniqueId()}
                    src={require(`../../themes/faces/${v}`)}
                    width={20}
                    height={20}
                />
            )
        } else {
            rnTxt.push(match[1])
        }
        start = index + match[1].length
    }
    rnTxt.push(txt.substring(start, txt.length))

    return rnTxt
}

export default ({ bySelf, from, time, body, status, id, toJid, to, ok, type, ...other }) => {
    // x-message-right

    const cls = classNames('x-message-group', bySelf ? 'x-message-right' : '')
    const localFormat = renderTime(time)

    let content = null
    function oncontextmenu(toJid){
        WebIM.conn.recallMessage({
            to: to,
            mid: toJid,
            group: type,
            success: function(){
                ok(id)
            },
            fail: function(err){
                message.error('撤回失败')
            }
        })
    }
    const menu = (
        <Menu onClick={oncontextmenu.bind(this, toJid)}>
            <Menu.Item>
                撤回
            </Menu.Item>
        </Menu>
    )
    if (body.type == 'txt') {
        content = bySelf?(
            <Dropdown overlay={menu} trigger={[ 'click' ]}>
                <p className="x-message-text" >
                    {renderTxt(body.msg||body.url)}
                </p>
            </Dropdown>
        ):(
            <p className="x-message-text" >
                {renderTxt(body.msg)}
            </p>
        )
    } else if (body.type == 'img') {
        content = bySelf?(
            <Dropdown overlay={menu} trigger={[ 'click' ]}>
                <div className="x-message-img">
                    <img
                        src={body.url}
                        width="100%"
                        style={{ verticalAlign: 'middle' }}
                    />
                </div>
            </Dropdown>
        ):(
            <div className="x-message-img">
                <img
                    src={body.url}
                    width="100%"
                    style={{ verticalAlign: 'middle' }}
                />
            </div>
        )
    } else if (body.type == 'file') {
        const readablizeBytes = bytes => {
            let s = [ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB' ]
            var e = Math.floor(Math.log(bytes) / Math.log(1024))
            return (
                (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + ' ' + s[e]
            )
        }
        content = bySelf?(
            <Dropdown overlay={menu} trigger={[ 'click' ]}>
                <Card
                    title={I18n.t('file')}
                    style={{ width: 240, margin: '2px 2px 2px 0' }}
                >
                    <div className="x-message-file">
                        <h3 title={body.filename}>
                            {body.filename}
                        </h3>
                        <div className="ant-row">
                            <div className="ant-col-12">
                                <p>
                                    {readablizeBytes(body.file_length)}
                                </p>
                            </div>
                            <div className="ant-col-12">
                                <a href={body.url} download={body.filename}>
                                    {I18n.t('download')}
                                </a>
                            </div>
                        </div>
                    </div>
                </Card>
            </Dropdown>
        ):(
            <Card
                title={I18n.t('file')}
                style={{ width: 240, margin: '2px 2px 2px 0' }}
            >
                <div className="x-message-file">
                    <h3 title={body.filename}>
                        {body.filename}
                    </h3>
                    <div className="ant-row">
                        <div className="ant-col-12">
                            <p>
                                {readablizeBytes(body.file_length)}
                            </p>
                        </div>
                        <div className="ant-col-12">
                            <a href={body.url} download={body.filename}>
                                {I18n.t('download')}
                            </a>
                        </div>
                    </div>
                </div>
            </Card>
        )
    } else if (body.type == 'video') {
        content = bySelf?(
            <Dropdown overlay={menu} trigger={[ 'click' ]}>
                <div className="x-message-video">
                    <video src={body.url} width="100%" controls />
                </div>
            </Dropdown>
        ):(
            <div className="x-message-video">
                <video src={body.url} width="100%" controls />
            </div>
        )
    } else if (body.type == 'audio') {
        content = bySelf?(
            <Dropdown overlay={menu} trigger={[ 'click' ]}>
                <div className="x-message-audio">
                    <Audio url={body.url} length={body.length} />
                </div>
            </Dropdown>
        ):(
            <div className="x-message-audio">
                <Audio url={body.url} length={body.length} />
            </div>
        )
    }

    let statusTag
    switch (status) {
    case 'sent':
        statusTag = <Tag color="#f39c12">{I18n.t('unread')}</Tag>
        break
    case 'muted':
        statusTag = <Tag color="#f50">{I18n.t('muted')}</Tag>
        break
    case 'fail':
        statusTag = <Tag color="#f50">{I18n.t('sentFailed')}</Tag>
        break
    default:
        statusTag = ''
        break
    }

    return (
        <div className={cls}>
            <div className="x-message-user">
                {from}
            </div>
            <div className="x-message-content">
                {bySelf ? statusTag : '' } {content}
            </div>
            {bySelf
                ? <div className="x-message-time">
                    <span className="x-message-status" /> {localFormat}
                </div>
                : <div className="x-message-time">
                    {localFormat} <span className="x-message-status" />
                </div>}
        </div>
    )
}
