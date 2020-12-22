import React from 'react'
import { connect } from 'react-redux'
import WebIM from '@/config/WebIM'
import Draggable from 'react-draggable'
import { message, Row, Col } from 'antd'
import MultiAVActions from '@/redux/MultiAVRedux'
import Immutable from 'seamless-immutable'
import { store } from '@/redux'

let _ = require('lodash')

class MultiAVModal extends React.Component {
    constructor(props) {
        super()
        this.state = {
            interval: null,
            hour: 0,
            minute: 0,
            second: 0,
            
            
            isShareDesktop:false, //共享桌面状态

            streams:[], //流列表 stream 和 member
            own_stream: null,
            micOpen: true,
            videoOpen: true
        }
        this.closeModal = this.closeModal.bind(this)
        this.loadTime = this.loadTime.bind(this)
    }

    componentWillUnmount(){
        WebIM.EMService.onConferenceExit = undefined
        WebIM.EMService.onMemberJoined = undefined
        WebIM.EMService.onMemberExited = undefined
        WebIM.EMService.onRoleChanged = undefined
        WebIM.EMService.onStreamAdded = undefined
        WebIM.EMService.onStreamRemoved = undefined

        clearInterval(this.state.interval)
        this.props.closeModal()
        this.props.resetConfr()
    }

    componentDidMount() {
        let me = this
        if (WebIM.config.isWebRTC && WebIM.WebRTC) {
            this.initEmedia()
        }

        let interval = setInterval(function () {
            let { hour, minute, second } = me.state
            second += 1
            if (second === 60) {
                second = 0
                minute += 1
                if (minute === 60) {
                    minute = 0
                    hour += 1
                    if (hour == 24) {
                        hour = 0
                    }
                }
            }
            me.setState({
                hour: hour,
                minute: minute,
                second: second
            })
        }, 1000)
        this.setState({
            interval: interval
        })
    }

    loadTime() {
        const { hour, minute, second } = this.state
        const n2s = (n) => {
            let s = ''
            if (n >= 0 && n < 10) {
                s = '0' + n
            } else {
                s = n + ''
            }
            return s
        }
        let str = ''
        let hs = n2s(hour), ms = n2s(minute), ss = n2s(second)
        str = hs + ':' + ms + ':' + ss
        return str
    }

    initEmedia() {
        let me = this

        WebIM.EMService = emedia.mgr
        WebIM.EMService.onConferenceExit = function(reason, failed){
            reason = reason || 0
            switch (reason) {
                case 0:
                    reason = "正常挂断"
                    break
                case 1:
                    reason = "没响应"
                    break
                case 2:
                    reason = "服务器拒绝"
                    break
                case 3:
                    reason = "对方忙"
                    break
                case 4:
                    reason = "失败,可能是网络或服务器拒绝"
                    if (failed === -9527) {
                        reason = "失败,网络原因"
                    }
                    if (failed === -500) {
                        reason = "Ticket失效"
                    }
                    if (failed === -502) {
                        reason = "Ticket过期"
                    }
                    if (failed === -504) {
                        reason = "链接已失效"
                    }
                    if (failed === -508) {
                        reason = "会议无效"
                    }
                    break
                case 5:
                    reason = "不支持"
                    break
                case 10:
                    reason = "其他设备登录"
                    break
                case 11:
                    reason = "会议关闭"
                    break
            }
            console.log("Hangup reason " + (reason || 0))
        }

        WebIM.EMService.onMemberJoined = function(member){
            message.success(member.name + " 加入群聊.")
            me.props.setJoinedMembers(member)
        }
        WebIM.EMService.onMemberExited = function(member, reason){

            //用户主动挂断时，不提示退出群聊
            if( reason !== undefined){
                message.warning(member.name + " 退出群聊.")
            }
            me.props.updateJoinedMembers(member)
        }

        WebIM.EMService.onRoleChanged = function(role){ // emedia.mgr.Role
            //TODO 在直播模式下，如果变为主播，请上麦 publish stream
        }
        WebIM.EMService.onStreamAdded = function(member, stream){

            let { streams } = me.state;
            
            if(
                stream.located() &&
                stream.type != emedia.mgr.StreamType.DESKTOP
            ) { // 自己的人像流放到第一位
                streams.unshift({ member, stream });
                me.setState({ own_stream: stream });
            } else {
                streams.push({ member, stream })
            }


            me.setState({ streams }, me.stream_bind_video_tag)

        }
        WebIM.EMService.onStreamRemoved = function(member, stream){

            
            const remove_stream_by_id = id => {
                let { streams } = me.state;
                streams = streams.filter((item) => { // 过滤掉 需删除的元素
                    if(item.stream.id != id) {
                        return true
                    }
                })
                me.setState({ streams }, me.stream_bind_video_tag);
            }

            remove_stream_by_id(stream.id);

        }
    }

    closeModal() {
        clearInterval(this.state.interval)
        WebIM.EMService.exitConference()
        this.props.closeModal()
        this.props.resetConfr()
    }

    addMember(){
        this.props.showConfrModal()
    }
    close_mic() {
        let { own_stream, micOpen } = this.state;
        if (!micOpen) {return}
        emedia.mgr.pauseAudio(own_stream)
        setTimeout(() => {
            this.setState({
                micOpen: false
            })
        }, 1000)
    }
    open_mic() {
        let { own_stream, micOpen} = this.state;
        if (micOpen) {return}
        emedia.mgr.resumeAudio(own_stream)
        setTimeout(() => {
            this.setState({
                micOpen: true
            })
        }, 1000)
    }

    close_camera() {
        let { own_stream } = this.state;
        emedia.mgr.pauseVideo(own_stream)
    }
    open_camera() {
        let { own_stream } = this.state;
        emedia.mgr.resumeVideo(own_stream)
    }

    // 把流绑定video标签
    stream_bind_video_tag() {
        let { streams } = this.state;

        let _this = this;
        streams.map(item => {
            let { stream, member } = item;
            let video_tag = _this.refs[`video-el-${stream.id}`];

            if(stream.located()) {
                emedia.mgr.streamBindVideo(stream, video_tag);
                
            } else {
                emedia.mgr.subscribe(member, stream, true, true, video_tag);
               
            }

            // 监听流的变化
            emedia.mgr.onMediaChanaged(video_tag, (constaints, stream) => {

                // 将流重置
                let { streams } = _this.state;

                streams.forEach((item, index) => { // 找到id 相等的流替换
                    if(item.stream.id == stream.id) { 
                       let new_item = { stream, member:item.member }
                       streams.splice(index,1,new_item) 
                    }
                })

                _this.setState({ streams });

                if(
                    stream.located() && 
                    stream.type != emedia.mgr.StreamType.DESKTOP
                ) { //自己的流 重置本地存储的
                    _this.setState({ own_stream: stream })
                }
            })

        })

    }

    async shareDesktop() {

        try {
             
            var options = {
                confrId: this.props.confr.confrId
            }
            await emedia.mgr.shareDesktopWithAudio(options);
            
            this.setState({ isShareDesktop:true });
        } catch (err) {
            console.error('share desktop error', err);
            
            if( //用户取消也是 -201 所以两层判断
                err.error == -201 &&
                err.errorMessage.indexOf('ShareDesktopExtensionNotFound') > 0
            ){
                message.error('请确认已安装共享桌面插件');
            }
        }
    }

    stopShareDesktop(){

        let { streams } = this.state;

        streams.map((item) => {
            if(
                item &&
                item.stream &&
                item.stream.type == emedia.StreamType.DESKTOP
            ){
                emedia.mgr.unpublish(item.stream);
            }
        })
        
        this.setState({ 
            isShareDesktop:false
        });

    }

    // 是否订阅对方操作
    get_subscribe_action_btn(stream_id) {

        if(!stream_id) {
            return ''
        }

        let { streams } = this.state;
        let current_item = streams.filter(item => {
            if(item.stream.id == stream_id) {
                return true
            }
        })[0]

    
        let subSVideo = true;

        // 会返回不同的参数 结构
        if( current_item.stream.subSVideo !== undefined ){
            subSVideo = current_item.stream.subSVideo;
        } else if(current_item.stream.subArgs !== undefined) {
            subSVideo = current_item.stream.subArgs.subSVideo
        }

        let video_tag = this.refs[`video-el-${stream_id}`];

        if(!video_tag) {
            console.warn( 'get_subscribe_action_btn video_tag is not');
            return ''
        }
        return <div className='user-name remote-ajust'>
                    {/* 是否订阅了 */}
                    { subSVideo ? 
                        <i 
                            className='icon webim icon-s_off_camera camera' 
                            onClick={() => emedia.mgr.triggerPauseVideo(video_tag)}
                        > </i>
                        :
                        <i 
                            className='icon webim icon-s_off_camera camera-shut' 
                            onClick={() => emedia.mgr.triggerResumeVideo(video_tag)}
                        > </i>
                        
                    }
               </div>
    }

    // 底部操作按钮
    get_own_stream_action_btns() {
        let { own_stream } = this.state;

        if(!own_stream) {
            return ''
        }
 
        let { aoff, voff } = own_stream;
        let { isShareDesktop } = this.state;

        return (

            <div className='action-wrap'>
                <div className="tools">
                    <i className='icon iconfont icon-add'
                        onClick={() => this.addMember()}
                    ></i>
                </div>
                <div className="tools">
                    {
                        aoff ? 
                        <i className='icon iconfont icon-mic_off' onClick={() => this.open_mic()}></i> : 
                        <i className='icon iconfont icon-mic_on'  onClick={() => this.close_mic()}></i>
                    }
                </div>
                <div className="tools">
                    {
                        voff ? 
                        <i className='icon iconfont icon-video_off' onClick={() => this.open_camera()}></i> :
                        <i className='icon iconfont icon-video_on'  onClick={() => this.close_camera()}></i>
                    }
                </div>
                <div className="tools">
                    <i className={ "icon iconfont " + 
                                    (isShareDesktop ? "icon-stop-screen-share" : "icon-screen-share") }

                        onClick={(e) => isShareDesktop ? 
                            this.stopShareDesktop() : this.shareDesktop()
                        }

                    ></i>
                </div>
                <div className="tools">
                    <div className="hangup" onClick={this.closeModal}>
                        挂断
                    </div>
                </div>
            </div>
        )
    }
    render() {
        const time = this.loadTime(),
            gid = this.props.gid,
            byId = this.props.byId,
            groupName = byId[gid] && byId[gid].groupName || '群组名称';

        
        let { streams } = this.state;
        let _this = this;

        
        return (
            <Draggable
                defaultPosition={{ x: 300, y: 200 }}
                bounds="parent"
                >
                <div className="multi-webim-rtc">
                    <div className="groupname">{groupName}</div>
                    <div className="time">{time}</div>
                

                    <Row gutter={8}>
                        {
                            streams.map((item, index) => {

                                let { member, stream } = item;

                                return (
                                    <Col span={8} key={index}>
                                        <video ref={`video-el-${stream.id}`} muted autoPlay playsInline/>
                                        <div className="user-name">
                                            <span>{member.name}</span>
                                        </div>
                                        { stream.located() ? '' : _this.get_subscribe_action_btn(stream.id)}
                                    </Col>
                                )
                            })
                        }
                        {/* 占位框 */}
                        {
                            new Array(6 - streams.length).fill(0).map(
                                (item, index) => (
                                    <Col span={8} key={index}> <video className='default'></video></Col>
                                )
                            )
                        }
                    </Row>

                    { this.get_own_stream_action_btns() }
                </div>
            </Draggable>
        )
    }
}

export default connect(
    ({ multiAV, entities }) => ({
        multiAV,
        byId: entities.group.byId,
        gid: multiAV.gid,
        confr: multiAV.confr,
    }),
    dispatch => ({
        closeModal: () => dispatch(MultiAVActions.closeModal()),
        setLocalStream: (stream) => dispatch(MultiAVActions.setLocalStream(stream)),
        resetConfr: () => dispatch(MultiAVActions.resetAll()),
        updateConfrInfo: (gid) => dispatch(MultiAVActions.updateConfrInfoAsync(gid)),
        showConfrModal: () => dispatch(MultiAVActions.showConfrModal()),
        setJoinedMembers: (joined) => dispatch(MultiAVActions.setJoinedMembers(joined)),
        updateJoinedMembers: (removed) => dispatch(MultiAVActions.updateJoinedMembers(removed))
    })
)(MultiAVModal)
