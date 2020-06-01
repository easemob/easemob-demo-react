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
            localAV: {
                stream: "",
                localStreamId: "",
                openVideo: false,
                openAudio: false,
            },
            localVideo: {
                stream: '',
                localStreamId: '',
                openVideo: true,
                openAudio: true,
            },
            isShareDesktop:false, //共享桌面状态
            rv: new Array(5).fill({
                nickName: '',
                streamId: '',
                openVideo: false,
                video: <div className="default"></div>
            }),
            rvCount: 0,
            toolsColor: [ '', '', '','','']
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

    removeVideo(nickName) {
        let rv = this.state.rv, temp = [], rvCount = this.state.rvCount
        for (let [ index, elem ] of rv.entries()) {
            if (elem.nickName === nickName) {
                // for (let i = index; i < 4; i++) {
                //     rv[i] = rv[i + 1]
                // }
                let ref_ = 'rv_' + index
                rv[index] = {
		            nickName: '',
		            streamId: '',
		            video: <video autoPlay playsInline className="default" ref={ref_}/>
		        }
                break
            }
        }
        this.setState({
            rvCount: --rvCount,
            rv: rv
        })
        console.log('RemoveRV2: ', rv)
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
            me.removeVideo(member.name)

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
            const located = stream.located()
            if (located) {
                let localVideo = me.refs.local

                let lv = {
                    stream: stream,
                    localStreamId: stream.id,
                    openVideo: true,
                    openAudio: true,
                }

                if(stream.type === 1){
                    me.setState({
                        localVideo: lv,
                    });
                }else{
                    me.setState({
                        localAV: lv,
                        localVideo: lv
                    });
                }

                emedia.mgr.onMediaChanaged(localVideo, function (constaints){
                    let lv = {
                        stream: stream,
                        localStreamId: stream.id,
                        openVideo: constaints.video,
                        openAudio: constaints.audio,
                    }

                    if(stream.type === 1){
                        me.setState({
                            localVideo: lv
                        });
                    }else{
                        me.setState({
                            localAV: lv,
                            localVideo: lv
                        });
                    }

                    console.warn(stream.id, "voff:", this.getAttribute("voff"))
                    console.warn(stream.id, "aoff:", this.getAttribute("aoff"))
                });
                
                emedia.mgr.streamBindVideo(stream, localVideo)

            } else {
                let remoteVideos = me.state.remoteVideos
                let remoteUsernames = me.state.remoteUsernames
                let rv = me.state.rv, rvCount = me.state.rvCount
                const nickName = member.name,
                    streamId = stream.id
                const contains = (nickName, arr) => {
                    for (let [ index, elem ] of arr.entries()) {
                        if (elem.nickName === nickName) {
                            return index
                        }
                    }
                    return false
                }

                const ifContain = contains(nickName, rv)
                if (ifContain === false) {
                    var index
                    // 从0～5看哪个位置空着，就往哪里添加
                    for (let i = 0; i < 5; i++) {
                        if(rv[i].nickName == ""){
                            index = i
                            if(index || index == 0){
                                break
                            }
                        }
                    }
                    rvCount++
                    let video = me.refs["rv_" + index]
                    const elem = {
                        nickName: nickName,
                        streamId: streamId,
                        openVideo: true,
                        video: rv[index].video
                    }
                    rv[index] = elem
                    me.setState({
                        rv: rv,
                        rvCount: rvCount
                    })

                    if(stream.type !== 1){
                        me.setState({
                            lastrv: rv,
                        })
                    }

                    emedia.mgr.onMediaChanaged(video, function (constaints){
                        const elem = {
                            nickName: nickName,
                            streamId: streamId,
                            openVideo: constaints.video,
                            video: rv[index].video
                        }
                        rv[index] = elem
                        me.setState({
                            rv: rv,
                            rvCount: me.state.rvCount
                        })

                        console.warn(streamId, "voff:", this.getAttribute("voff"))
                        console.warn(streamId, "aoff:", this.getAttribute("aoff"))
                    })
                    //emedia.mgr.streamBindVideo(stream, video);
                    emedia.mgr.subscribe(member, stream, true, true, video)
                }else{
                    let lastVideo = me.refs["rv_" + ifContain]
                    const elem = {
                        nickName: nickName,
                        streamId: streamId,
                        openVideo: true,
                        video: rv[ifContain].video
                    }
                    rv[ifContain] = elem
                    if(stream.type !== 1){
                        me.setState({
                            lastrv: rv,
                        })
                        emedia.mgr.subscribe(member, stream, true, true)
                    }else{
                        me.setState({
                            rv: rv
                        })
                        emedia.mgr.subscribe(member, stream, true, true, lastVideo)
                    }
                }
            }
        }
        WebIM.EMService.onStreamRemoved = function(member, stream){
            if(stream.type === 1){
                let rv = me.state.rv;
                let lastrv = me.state.lastrv;

                const nickName = member.name,
                    streamId = stream.id
                const contains = (nickName, arr) => {
                    for (let [ index, elem ] of arr.entries()) {
                        if (elem.nickName === nickName) {
                            return index
                        }
                    }
                    return false
                }

                const ifContain = contains(nickName, rv)
                let lastVideo = me.refs["rv_" + ifContain]
                if (ifContain === false) {
                    return;
                }

                rv[ifContain] = lastrv[ifContain];
                me.setState({
                    rv: rv
                })
                emedia.mgr.streamBindVideo(rv[ifContain].streamId, lastVideo)
            }
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

    localMic() {
        if(!this.state.localAV){
            return;
        }

        let me = this;
        let { stream, localStreamId, openAudio, openVideo } = this.state.localAV

        let { isShareDesktop } = this.state;
        if(isShareDesktop){
            if(openAudio){
                emedia.mgr.pauseAudio(stream).then(function () {
                    me.setState({
                        localAV: { stream, localStreamId, openAudio: false, openVideo }
                    });
                });
            }else{
                emedia.mgr.resumeAudio(stream).then(function () {
                    me.setState({
                        localAV: { stream, localStreamId, openAudio: true, openVideo }
                    });
                });
            }
            return;
        }

        let localVideo = this.refs.local
        
        if(openAudio){
            emedia.mgr.triggerPauseAudio(localVideo)
        }else{
            emedia.mgr.triggerResumeAudio(localVideo)
        }
    }

    // remoteSound(id) {
    //     console.log('remoteSound')

    // }

    localVideo() {
        if(!this.state.localAV){
        return;
        }

        let me = this;
        let { stream, localStreamId, openAudio, openVideo } = this.state.localAV

        let { isShareDesktop } = this.state;
        if(isShareDesktop){
            if(openVideo){
                emedia.mgr.pauseVideo(stream).then(function () {
                    me.setState({
                        localAV: { stream, localStreamId, openAudio, openVideo: false }
                    });
                });
            }else{
                emedia.mgr.resumeVideo(stream).then(function () {
                    me.setState({
                        localAV: { stream, localStreamId, openAudio, openVideo: true }
                    });
                });
            }
            return;
        }

        let localVideo = this.refs.local
        if(openVideo){
            emedia.mgr.triggerPauseVideo(localVideo)
        }else{
            emedia.mgr.triggerResumeVideo(localVideo)
        }
    }

    remoteVideo(id) {
        let rv = _.cloneDeep(this.state.rv)
        let elem = rv[id]
        if (elem.streamId === '') {
            return
        }

        let video = this.refs['rv_' + id]
        if(elem.openVideo){
            emedia.mgr.triggerPauseVideo(video)
        }else{
            emedia.mgr.triggerResumeVideo(video)
        }
    }

    async shareDesktop() {
        try {
            let _this = this; 

            var options = {
                stopSharedCallback: () => _this.stopShareDesktop()
            }
            await emedia.mgr.shareDesktopWithAudio(options);
            
            this.setState({ isShareDesktop:true });
        } catch (err) {
            if( //用户取消也是 -201 所以两层判断
                err.error == -201 &&
                err.errorMessage.indexOf('ShareDesktopExtensionNotFound') > 0
            ){
                message.error('请确认已安装共享桌面插件');
            }
        }
    }

    stopShareDesktop(){

        let localVideo = this.refs.local
        let { stream } = this.state.localVideo
        if(!stream){
            return;
        }
        // return;
        
        if(stream.type === 1){
            emedia.mgr.triggerHungup(localVideo);
            this.displayAVStream();
            this.setState({ isShareDesktop:false })
        }
    }
    displayAVStream(){
        let me = this;
        let { stream, localStreamId, openAudio, openVideo } = me.state.localAV;
        let lv = {
            stream: stream,
            localStreamId: localStreamId,
            openVideo: openAudio,
            openAudio: openVideo,
        }
        me.setState({
            localVideo: lv
        })

        let localVideo = this.refs.local
        emedia.mgr.onMediaChanaged(localVideo, function (constaints){

            
            let lv = {
                stream: stream,
                localStreamId: stream.id,
                openVideo: constaints.video,
                openAudio: constaints.audio,
            }
            me.setState({
                localAV: lv,
                localVideo: lv
            })

            console.warn(stream.id, "voff:", this.getAttribute("voff"))
            console.warn(stream.id, "aoff:", this.getAttribute("aoff"))
        })
        emedia.mgr.streamBindVideo(stream, localVideo)
    }

    render() {
        const time = this.loadTime(),
            gid = this.props.gid,
            byId = this.props.byId,
            // toolsColor = this.state.toolsColor,
            rvCount = this.state.rvCount,
            groupName = byId[gid] && byId[gid].groupName || '群组名称',
            remoteUsernames = this.state.remoteUsernames

        let rv = this.state.rv;

        for (let i = 0; i < 5; i++) {
            let ref_ = 'rv_' + i
            rv[i] = {
                nickName: rv[i].nickName || '',
                streamId: rv[i].streamId || '',
                openVideo:	rv[i].openVideo || false,
                video: <video autoPlay playsInline className="default" ref={ref_}/>,
            }
        }


        let { openAudio, openVideo } = this.state.localAV || {
            openVideo: false,
            openAudio: false,
        };
        let { isShareDesktop } = this.state;
        
        
        return (
            <Draggable
                defaultPosition={{ x: 300, y: 200 }}
                bounds="parent"
                >
                <div className="multi-webim-rtc">
                    <div className="groupname">{groupName}</div>
                    <div className="time">{time}</div>
                

                    <Row gutter={8}>
                        {/* 自己画面 */}
                        <Col span={8}>
                            <video ref="local" muted autoPlay playsInline/>
                            <div className="user-name">
                                <span>{WebIM.conn.context.userId}</span>
                            </div>
                        </Col>

                        {/* 对方画面 */}
                        {rv.map((item, index) => {
                            let icon_camera = '';
                            if(item.streamId){
                                icon_camera = item.openVideo ? 
                                'icon webim icon-s_off_camera camera' : 
                                'icon webim icon-s_off_camera camera-shut'
                            }
                            return(
                                <Col span={8}>
                                    {item && item.video}
                                    <div className={item.streamId ? 'user-name' : 'user-name remote-ajust'}>
                                        <span>{item.nickName}</span>

                                        <i className={ icon_camera }
                                            onClick={this.remoteVideo.bind(this, index)}
                                        >
                                        </i>
                                    </div>
                                </Col>
                            )
                            
                        })}
                    </Row>

                    <div className='action-wrap'>
                        <div className="tools">
                            <i className='icon iconfont icon-add'
                                onClick={() => this.addMember()}
                            ></i>
                        </div>
                        <div className="tools">
                            <i className={ 'icon iconfont ' + (openAudio ? 'icon-mic_on' : 'icon-mic_off') }
                                onClick={() => this.localMic()}
                            ></i>
                        </div>
                        {/* <div className="tools">
                            <i className='icon iconfont icon-speaker_on'
                                onClick={() => this.remoteSound()}
                            >
                            </i>
                        </div> */}
                        <div className="tools">
                            <i className={ 'icon iconfont ' + (openVideo ? 'icon-video_on' : 'icon-video_off') }
                                onClick={() => this.localVideo()}

                            ></i>
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
