import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { I18n } from 'react-redux-i18n'
import { Menu, Dropdown, Card, Tag, message, Modal,Input, Avatar, Select } from 'antd'
import { renderTime, deepGet } from '@/utils'
import emoji from '@/config/emoji'
import Audio from '@/components/chat/Audio'
import WebIM from '@/config/WebIM'
const defaultAvatar = 'https://download-sdk.oss-cn-beijing.aliyuncs.com/downloads/IMDemo/avatar/Image1.png'
const { TextArea } = Input
const { Option } = Select
let reportMsgId = ''
const ReportType = [
    {
        key: '1',
        value: '涉政'
    },
    {
        key: '2',
        value: '涉黄'
    },
    {
        key: '3',
        value: '广告'
    },
    {
        key: '4',
        value: '辱骂'
    },
    {
        key: '5',
        value: '暴恐'
    },
    {
        key: '6',
        value: '违禁'
    },
    {
        key: '7',
        value: '其他'
    }
]
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
    state = { showImgModal: false, reportMsgVisible: false, reportReason: '', reportType: '涉政' }

    renderTxt = txt => {
        if (txt === undefined) {return []}
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

    onReportReasonChange = ({ target: { value } }) => {
        this.setState({ reportReason: value })
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
        }).then((res)=>{
            console.log('撤回消息成功',res)
        })
    }

    handleIdCardClick = (data) => {
        let userId = data.uid
        this.props.onClickIdCard(data)
    }
    // 举报消息
    reportMsg = ()=>{
        const reason = this.state.reportReason
        let self = this
        if(reason){
            Modal.confirm({
                title: '确认举报该消息吗？',
                okText:'确认',
                cancelText:'取消',
                onOk() {
                    WebIM.conn.reportMessage({
                        reportType: self.state.reportType,// 举报类型
                        reportReason: reason, // 举报原因。
                        messageId: reportMsgId
                    }).then(()=>{
                        message.success('举报成功')
                        self.setState({ reportMsgVisible: false })
                    }).catch(()=>{
                        message.error('举报失败')
                        self.setState({ reportMsgVisible: false })
                    })
                },
            })
          
        } else {
            message.info('请填写举报原因！')
        }
       
    }
    handleClick = (e)=>{
        e.stopPropagation()
    }

    render() {
        const { bySelf, from, time, body, status, toJid, fromNick, id } = this.props
        const cls = classNames('x-message-group', bySelf ? 'x-message-right' : '')
        const localFormat = renderTime(time)
        let useDropdown = true
        if (body.isRecall) {
            useDropdown = false
        }
        let content = null
        const menu = bySelf? (
            <Menu onClick={this.oncontextmenu(toJid)}>
                <Menu.Item>
                    撤回
                </Menu.Item>
            </Menu>
        ): <Menu onClick={()=>{
            // 服务器消息id
            reportMsgId = id
            this.setState({ reportMsgVisible: true })
        }}>
            <Menu.Item>
                    举报
            </Menu.Item>
        </Menu>
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
                                    {!bySelf && <a href={body.url} download={body.filename} onClick={this.handleClick}>
                                        {I18n.t('download')}
                                    </a>}
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
                    <div className="x-message-audio" style={{ display: bySelf?'inline-block':'block' }}>
                        <Audio url={body.url} length={body.length} />
                    </div>
                </Dropdown>
            ) : (
                <div className="x-message-audio">
                    <Audio url={body.url} length={body.length} />
                </div>
            )
            break
        case 'custom':
            content = useDropdown ? (
                <div className={classNames('x-message-idCard', bySelf ? 'x-message-idCard-right' : '')} data={body.customExts} onClick={this.handleIdCardClick.bind(this,body.customExts)}>
                    <div>
                        <Avatar style={{ width:'100%', height:'100%' }} src={body.customExts.avatar||defaultAvatar}></Avatar>
                    </div>
                    <div>{body.customExts.nickname||body.customExts.uid}</div>
                </div>
            ):(
                <div className="x-message-idCard" data={body.customExts} onClick={this.handleIdCardClick.bind(this,body.customExts)}>
                    <div>
                        <Avatar style={{ width:'100%', height:'100%' }} src={body.customExts.avatar||defaultAvatar}></Avatar>
                    </div>
                    <div>{body.customExts.nickname||body.customExts.uid}</div>
                </div>
            )
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

        return <div className={cls} uid={from}>
            <div className="x-message-user">
                {fromNick}
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

            <Modal
                title="消息举报"
                visible={this.state.reportMsgVisible}
                onCancel={()=>{reportMsgId = '';this.setState({ reportMsgVisible: false })}}
                destroyOnClose={true}
                okText="确认"
                cancelText="取消"
                onOk = {()=>{
                    this.reportMsg()
                }}
            >   
                <p>请选择举报类型：</p>
                <Select style={{ width: '100%', marginBottom: '10px' }} onSelect={(e)=>{this.setState({ reportType: e })}} value={this.state.reportType}>
                    {
                        ReportType.map((item)=>{ 
                            return <Option key={item.value}>{item.value}</Option>
                        })
                    }
                </Select>
                <p>请输入举报原因：</p>
                <TextArea 
                    value={this.state.reportReason}
                    onChange={this.onReportReasonChange}
                    placeholder="请输入举报原因"
                    autoSize={{ minRows: 3, maxRows: 5 }}/>
            </Modal>
        </div>
    }
}