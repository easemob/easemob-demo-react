/* eslint-disable no-unused-expressions */
/* eslint-disable indent */
import React, { useRef } from 'react'
import './style/ReplyMessage.less'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import WebIM from '@/config/WebIM'
const ReplyMessage = (props) => {
    const { message, onClick, onCancel, close = false, allMsgs = {}, roster = {}, myInfo = {}, groupMember = {} } = props
    const { bySelf, ext = {}, type, from, to } = message
    let { msgQuote = {} } = ext
    if (typeof msgQuote === 'string') {
        msgQuote = JSON.parse(msgQuote)
    }
    let content = ''
    let cvsId = ''
    if (type === 'chat') {
        cvsId = bySelf ? to : from
    } else {
        cvsId = to
    }
    let msgs = allMsgs[type][cvsId] || []
    let msg = msgs.filter((item) => {
        // 收到的消息用 id， 自己发出的消息用 toJid（消息的服务端id） 
        return item.id === msgQuote.msgID || item.toJid === msgQuote.msgID
    })
    if (msg.length > 0) {
        // 去掉重复的消息
        msg = msg[0]
    }
    if (!msg || msg.length === 0) {
        msg = {
            body: {
                type: msgQuote.msgType
            },
            from: msgQuote.msgSender
        }

        if (message.id === msgQuote.msgID || message.toJid === msgQuote.msgID) {
            msg.body = message.body
            msg.from = message.from
        }
    }

    let fromNick = roster.byName?.[msgQuote.msgSender]?.info?.nickname || msgQuote.msgSender
    if (!fromNick || fromNick === WebIM.conn.user) {
        fromNick = myInfo.nickname || WebIM.conn.user
    }
    if (type !== 'chat') {
        fromNick = groupMember[msg.to]?.byName?.[msg.from]?.info?.nickname || msg.from
        if (!fromNick) {
            fromNick = groupMember[msg.to]?.byName?.[WebIM.conn.user]?.info?.nickname || WebIM.conn.user
        }
    }
    const audioRef = useRef(null)
    const play = () => {
        audioRef.current.play()
    }

    switch (msg.body.type) {
        case 'txt':
            content = <span className='reply-txt'>{msgQuote.msgPreview}</span>
            break
        case 'img':
            content = close ? '[图片消息]' :
                <img width={40} height={40} src={msg.body.url}></img>
            break
        case 'file':
            content = close ? `[文件] ${msg.body.filename}` : <span>
                <a href={msg.body.url} download={msg.body.filename} className="msg-file">
                    <i className="icon iconfont icon-file-empty" />
                    {msg.body.filename}
                </a>
            </span>
            break
        case 'custom':
            if (msg.body.customEvent === 'userCard') {
                content = <span>
                    <i className="icon iconfont icon-user" />
                    {msg.body.customExts.nickname}
                </span>
            }
            break
        case 'audio':
        case 'voice': // 移动端用voice
            content = close ? `[语音] ${msg.body.length + '\'\''}` : <span onClick={play}>
                <Icon type="sound" />
                {msg.body.length + '\'\''}
                <audio src={msg.body.url} ref={audioRef}></audio>
            </span>
            break
        default:
            content = '[暂不支持的引用]'
            break
    }
    return (
        <div className='message-reply-container' style={{ flexDirection: bySelf ? 'row-reverse' : 'row' }}
        >
            <div className='message-reply' onClick={(e) => {
                onClick?.(e, message)
            }} >
                <span style={{ fontWeight: 500 }}>{fromNick}: </span>
                {content}
                {close && <i className="icon iconfont icon-plus-circle message-close" onClick={() => onCancel?.()} />}
            </div >
        </div >
    )
}

export default connect((state, props) => ({
    allMsgs: state.entities.message,
    roster: state.entities.roster,
    myInfo: state.login.info,
    groupMember: state.entities.groupMember,
    state: state

}))(ReplyMessage)
