import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'antd'
import recording from './recordAudio.js'
import './index.less'
import PropTypes from 'prop-types'
import WebIM from '@/config/WebIM'

import MessageActions from '@/redux/MessageRedux'
const chatType = {
    contact: 'chat',
    group: 'groupchat',
    chatroom: 'chatroom',
    stranger: 'stranger'
}
const mapDispatchToProps = (dispatch, props) => ({
    sendRecorder: (obj) => dispatch(MessageActions.sendRecorder(obj)),
})
@connect(
    null,
    mapDispatchToProps
)

export default class RecordAudio extends Component {
    static propTypes = {
        sendRecorder: PropTypes.func,
        match: PropTypes.object
    }
    state = {
        randomheight: [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
        recoderVisible: false,
        runAnimation: false,
        num: 60, // 按住说话时间
        recorder: null,
        interval: '',
        startTime: '', // 语音开始时间
        endTime: '', // 语音结束
    }
    componentWillMount() {
        this.mounted = true
    }
    componentWillUnmount() {
        this.mounted = false
        clearInterval(this.state.interval)
    }

    // 清除定时器
    clearTimer = () => {
        if (this.state.interval) {
            this.setState({ num: 60 })
            clearInterval(this.state.interval)
        }
    }
    onRandom = () => {
        let me = this
        let _randomheight = this.state.randomheight.concat([])
        let i = 0
        this.setState({ randomheight: _randomheight })
        if (this.state.runAnimation) {
            for (i; i < this.state.randomheight.length; i++) {
                _randomheight[i] = (60 * Math.random().toFixed(2)) + 10
            }
            setTimeout(function () { me.onRandom() }, 500)
        }
    }
    hide = () => {
        this.setState({
            recoderVisible: false,
            runAnimation: false
        })
    }
    show = () => {
        this.setState({
            recoderVisible: true
        })
    }
    // 长按说话
    mouseStart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let _startTime = new Date().getTime()
        this.setState({ runAnimation: true, startTime: _startTime }, () => this.onRandom())
        this.clearTimer()


        recording.get(rec => {
            // 当首次按下时，要获取浏览器的麦克风权限，所以这时要做一个判断处理
            if (rec) {
                // 首次按下，只调用一次
                if (this.flag) {
                    this.mouseEnd()
                    this.flag = false
                }
                else {
                    this.setState({ recorder: rec })
                    let _interval = setInterval(() => {
                        if (this.state.num <= 0 && this.mounted) {
                            this.state.recorder.stop()
                            this.setState({ num: 60 })
                            this.clearTimer()
                        }
                        else {
                            this.setState((state) => {
                                return { num: state.num-- }
                            })
                            this.state.recorder.start()
                        }
                    }, 1000)
                    this.setState({ interval: _interval })
                }
            }
        })
    }

    // 松开时上传语音
    mouseEnd = (type) => (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ runAnimation: false })
        let ary = this.state.randomheight.map(i => i = 30)
        this.setState({ randomheight: ary })
        this.hide()
        this.clearTimer()
        let _endTime = new Date().getTime()
        this.setState({ endTime: _endTime })
        let duration = (_endTime - this.state.startTime) / 1000
        if (this.state.recorder) {
            this.state.recorder.stop()
            // 重置说话时间
            this.setState({ num: 60 })
            // 获取语音二进制文件
            let blob = this.state.recorder.getBlob()
            // 发送语音功能
            if (type === 'audio') {
                const { selectItem, selectTab } = this.props.match.params
                let uri = {
                    url: WebIM.utils.parseDownloadResponse.call(WebIM.conn, blob),
                    filename: 'audio.wav',
                    filetype: 'audio',
                    data: blob,
                    length: duration
                }
                this.props.sendRecorder({
                    chatType: chatType[selectTab],
                    chatId: selectItem,
                    file: uri,
                    duration: duration
                })
            }
        }
    }

    render() {
        const { recoderVisible } = this.state
        return (
            <div className="recorderWraper">
                <Modal
                    width={300}
                    title={null}
                    visible={recoderVisible}
                    centered
                    closable={false}
                    onCancel={this.hide}
                    footer={null}>
                    <div className="tipText">按住开始录音</div>
                    <div className="sound-waves">
                        {this.state.randomheight.map((iheight, index) => {
                            return <div
                                key={index}
                                className="wavesItem"
                                style={{ height: `${iheight}px` }}
                            ></div>
                        })}
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <Button
                            type="primary"
                            className="holdBtn"
                            onTouchStart={this.mouseStart}
                            onTouchEnd={this.mouseEnd('audio')}
                            onMouseDown={this.mouseStart}
                            onMouseUp={this.mouseEnd('audio')}
                        >
                            <svg className="icon microphone" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M714 605.9v-338c0-111.4-90.6-202-202-202s-202 90.6-202 202v338c0 104.6 80 190.9 182 201v111.2H379c-11 0-20 9-20 20s9 20 20 20h266c11 0 20-9 20-20s-9-20-20-20H532V806.9c102-10.1 182-96.4 182-201z m-202-500c89.3 0 162 72.7 162 162v318H350v-318c0-89.4 72.7-162 162-162z m-160.8 520h321.5c-9.9 79.9-78.2 142-160.8 142s-150.8-62.1-160.7-142z" fill="#565656"></path><path d="M455.4 193.8m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656"></path><path d="M455.4 303.5m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656"></path><path d="M455.4 413.2m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656" ></path><path d="M455.4 522.9m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656" ></path><path d="M398.9 248.7m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656" ></path><path d="M398.9 358.4m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656" ></path><path d="M398.9 468.1m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656" ></path><path d="M512 248.7m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656" ></path><path d="M512 358.4m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656" ></path><path d="M512 468.1m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656" ></path><path d="M568.6 193.8m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656" ></path><path d="M568.6 303.5m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656" ></path><path d="M568.6 413.2m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656" ></path><path d="M568.6 522.9m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656" ></path><path d="M625.1 248.7m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656" ></path><path d="M625.1 358.4m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656" ></path><path d="M625.1 468.1m-18.4 0a18.4 18.4 0 1 0 36.8 0 18.4 18.4 0 1 0-36.8 0Z" fill="#565656" ></path></svg>
                        </Button>
                    </div>
                </Modal>

                <div
                    onClick={this.show}>
                    <i className="icon iconfont icon-mic"></i>
                </div>

            </div>
        )
    }
}
