import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { I18n } from 'react-redux-i18n'
import { Menu, Dropdown, Card, Tag, message, Modal } from 'antd'
import { renderTime, deepGet } from '@/utils'
import emoji from '@/config/emoji'
import Audio from '@/components/chat/Audio'
import WebIM from '@/config/WebIM'

export default class ChatMessage extends Component {
    static propTypes = {
        bySelf: PropTypes.any,
        from: PropTypes.any,
        time: PropTypes.any,
        body: PropTypes.any,
        status: PropTypes.any,
        id: PropTypes.any,
        toJid: PropTypes.string,
        to: PropTypes.any,
        ok: PropTypes.func,
        type: PropTypes.any,
    }
    state = { showImgModal: false }

    renderTxt = txt => {
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

    imgClick = () => {
        this.setState({ showImgModal: true })
    }
    handleCancel = () => {
        this.setState({ showImgModal: false })
    }


    oncontextmenu = (toJid) => () => {
        WebIM.conn.recallMessage({
            to: this.props.to,
            mid: toJid,
            type: this.props.type,
            success: () => {
                this.props.ok(deepGet(this, 'props.id'))
            },
            fail: (err) => {
                message.error('撤回失败')
            }
        })
    }
    render() {
        const { bySelf, from, time, body, status, toJid, } = this.props
        const cls = classNames('x-message-group', bySelf ? 'x-message-right' : '')
        const localFormat = renderTime(time)
        let useDropdown = true
        if (body.msg == '消息已撤回' || !bySelf) {
            useDropdown = false
        }
        let content = null
        const menu = (
            <Menu onClick={this.oncontextmenu(toJid)}>
                <Menu.Item>
                    撤回
                </Menu.Item>
            </Menu>
        )
        switch (body.type) {
        case 'txt':
            content = useDropdown ? (
                <Dropdown overlay={menu} trigger={[ 'click' ]}>
                    <p className="x-message-text" >
                        {this.renderTxt(body.msg || body.url)}
                    </p>
                </Dropdown>
            ) : (
                <p className="x-message-text" >
                    {this.renderTxt(body.msg)}
                </p>
            )
            break
        case 'img':
            content = useDropdown ? (
                <Dropdown overlay={menu} trigger={[ 'click' ]}>
                    <div className="x-message-img">
                        <img
                            src={body.url}
                            width="100%"
                            style={{ verticalAlign: 'middle' }}
                        />
                    </div>
                </Dropdown>
            ) : (
                <div className="x-message-img">
                    <img
                        onDoubleClick={this.imgClick}
                        src={body.url}
                        width="100%"
                        style={{ verticalAlign: 'middle' }}
                    />
                </div>
            )
            break
        case 'file':
            const readablizeBytes = bytes => {
                let s = [ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB' ]
                var e = Math.floor(Math.log(bytes) / Math.log(1024))
                return (
                    (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + ' ' + s[e]
                )
            }
            content = useDropdown ? (
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
                                    {/* <a href={body.url} download={body.filename}>
                                        {I18n.t('download')}
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </Card>
                </Dropdown>
            ) : (
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
            break
        case 'video':
            content = useDropdown ? (
                <Dropdown overlay={menu} trigger={[ 'click' ]}>
                    <div className="x-message-video">
                        <video src={body.url} width="100%" controls />
                    </div>
                </Dropdown>
            ) : (
                <div className="x-message-video">
                    <video src={body.url} width="100%" controls />
                </div>
            )
            break
        case 'audio':
            content = useDropdown ? (
                <Dropdown overlay={menu} trigger={[ 'click' ]}>
                    <div className="x-message-audio" style={bySelf&&{display:'inline-block'}}>
                        <Audio url={body.url} length={body.length} />
                    </div>
                </Dropdown>
            ) : (
                <div className="x-message-audio">
                    <Audio url={body.url} length={body.length} />
                </div>
            )
            break
        default:
            break
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

        return <div className={cls}>
            <div className="x-message-user">
                {from}
            </div>
            <div className="x-message-content">
                {/* 已读、未读Tag */}
                {/* {bySelf && this.props.type === 'chat' ? statusTag : ''}  */}
                {content}
            </div>
            {bySelf
                ? <div className="x-message-time">
                    <span className="x-message-status" /> {localFormat}
                </div>
                : <div className="x-message-time">
                    {localFormat} <span className="x-message-status" />
                </div>}

            {/* 图片放大弹窗 */}
            <Modal
                title="查看图片"
                visible={this.state.showImgModal}
                onCancel={this.handleCancel}
                footer={null}
                width={'800'}
                bodyStyle={{ textAlign:'center' }}
            >
                <img
                    src={body.url}
                    style={{ maxWidth:'100%' }} />
            </Modal>
        </div>
    }
}