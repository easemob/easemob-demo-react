import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { I18n } from 'react-redux-i18n'
import GroupMemberActions from '@/redux/GroupMemberRedux'
import MultiAVActions from '@/redux/MultiAVRedux'
import MessageActions from '@/redux/MessageRedux'
import VideoCallActions from '@/redux/VideoCallRedux'
import { connect } from 'react-redux'
import WebIM from '@/config/WebIM'
import _ from 'lodash'
import { store } from '@/redux'
import avatar from '@/themes/img/avatar-big@2x.png'
const { Search } = Input;
const CheckboxGroup = Checkbox.Group
const FormItem = Form.Item

class AddAVMemberModal extends React.Component {

    state = {
        options: [],
        maxUsers: 15,
        disabled: false,
        groupName: ''
    }

    componentDidMount() {
        const { groupMember, gid, selected,group } = this.props
        let gm = groupMember.getIn([ gid, 'byName' ])
        let options = []
        let joined = this.props.joined
        let groupName = group.getIn(['byId', gid])?group.getIn(['byId', gid]).groupName:gid;
        const username = store.getState().login.username

        let joinedName = joined.map(item => item.name)
        for (var index in gm) {
            if(_.indexOf(joinedName,index) != -1 || index == username){
                options.push({ label: index, value: index, disabled:true, checked: true })
            }else{
                options.push({ label: index, value: index })
            }
        }
        this.setOptionsEnabled(selected, options)

        this.setState({
            options: options,
            groupName: groupName
        })
    }

    conponentWillUnmount(){
        this.setState({
            options: []
        })
        this.props.setInvitedMembers([])
    }

    handleSubmit = e => {
        let me = this

        let {selected, joined, gid } = this.props
        if (selected.length + joined.length<1) {
            message.error('没邀请任何人员');
            return
        }
        this.props.onCancel()
        this.props.setGid(gid)

        this.props.showMultiAVModal()

        const callId = this.props.confr.callId || WebIM.conn.getUniqueId().toString();
        const channelName = this.props.confr.channel || Math.uuid(8)
        const confr = {
                channelName: channelName,
                type: 2,
                callerDevId:  WebIM.conn.context.jid.clientResource,
                callId: callId
            }
        this.props.updateConfr({
            ext:confr,
            to: gid
        })

        selected.forEach((item) => {
            this.sendInviteMsg(item, confr)
        })

        this.props.setInvitedMembers(selected)

        setTimeout(() => {
            this.props.setInvitedMembers([])
        }, 60000)
    }

    sendInviteMsg = (to, confr) => {
        const { gid } = this.props
        const value = '邀请您进行视频通话'
        this.props.sendTxtMessage('singleChat', to.value, {
            msg: value,
            ext: {
                action: 'invite',
                channelName: confr.channelName,
                type: 2, //0为1v1音频，1为1v1视频，2为多人通话
                callerDevId: confr.callerDevId, // 主叫方设备Id
                callId: confr.callId, // 随机uuid，每次呼叫都不同，代表一次呼叫
                ts: Date.now(),
                msgType: 'rtcCallWithAgora',
                ext: {
                    groupId: gid
                }
            }
        })
    }

    onChange = checkedValues => {
        const len = checkedValues.length
        let options = _.cloneDeep(this.state.options)
        console.log('options',options)
        if (len >= this.state.maxUsers) {
            this.setState({
                disabled: true
            })
            for (let [ index, elem ] of options.entries()) {
                if (!checkedValues.includes(elem.label)) {
                    options[index].disabled = true
                }
            }
        } else {
            const disabled = this.state.disabled
            if (disabled) {
                for (let [ index, elem ] of options.entries()) {
                    if (!checkedValues.includes(elem.label)) {
                        options[index].disabled = false
                    }
                }
                this.setState({ disabled: false })
            }
        }
        
        this.setState({
            options: options
        })
    }

    handleChange(e){
        let item = e.target
        let options = _.cloneDeep(this.state.options)
        console.log('options', options)
        let seleted_members =  _.cloneDeep(this.props.selected)
        // let seleted_members = _.difference(members,joined)
        //this.props.setSelected(seleted_members)
        console.log('item', item)
        if (item.checked) {
            seleted_members.push({label: item.name, value: item.name})
        }else{
            seleted_members.forEach((user, index) => {
                if (user.value == item.name) {
                    seleted_members.splice(index, 1)
                }
            })
        }

        console.log('seleted_members', seleted_members)
        this.props.setInvitedMembers(seleted_members)
        if (seleted_members.length >=3) {

            let stringArr = seleted_members.map( item => JSON.stringify(item))
            let members = options.map((item) => {
                if (!stringArr.includes(JSON.stringify(item))) {
                    item.disabled = true
                }
                return item
            })

            this.setState({
                options: members
            })
        }else{
            this.setState({
                options
            })
        }
    }

    setOptionsEnabled = (checkedValues, opt) => {
        const len = checkedValues.length
        let options = _.cloneDeep(opt || this.state.options)
        if (len >= this.state.maxUsers) {
            this.setState({
                disabled: true
            })
            for (let [ index, elem ] of options.entries()) {
                options[index].disabled = true
            }
        } else {
            const disabled = this.state.disabled
            if (disabled) {
                for (let [ index, elem ] of options.entries()) {
                    if (!checkedValues.includes(elem.label)) {
                        options[index].disabled = false
                    }
                }
                this.setState({ disabled: false })
            }
        }
        this.setState({
            options: options
        })
    }

    oncancel(){
        this.props.onCancel()
    }

    search(value){
        let optionsSearch = this.state.options.filter((item) => {
            if (item.value.indexOf(value) > -1) {
                return item
            }
        })
        this.setState({
            options: optionsSearch
        })
    }
    onClear(e){
        console.log(e.target)
        let value = e.target.value
        if (value == '') {
            const { groupMember, gid, selected } = this.props
            let gm = groupMember.getIn([ gid, 'byName' ])
            let options = []
            let joined = this.props.joined
            let joinedName = joined.map(item => item.name)
            const username = store.getState().login.username
            for (var index in gm) {
                if(_.indexOf(joinedName,index) != -1 || index == username){
                    options.push({ label: index, value: index, disabled:true, checked: true})
                }else{
                    options.push({ label: index, value: index })
                }
            }
            this.setOptionsEnabled(selected, options)

            let stringSelected = selected.map(item => JSON.stringify(item))
            options.forEach( item => {
                if (stringSelected.includes(JSON.stringify(item))) {
                    item.checked = true
                }
            })
            this.setState({
                options: options
            })
        }
    }
    render() {
        let options = this.state.options
        const { getFieldDecorator } = this.props.form
        const selected = this.props.selected
        const joined = this.props.joined
        const username = store.getState().login.username
        let invitedMem = selected.concat(joined).filter((index) => {
            if (index.name != username) {return index}
        });
        return (
            <div className="a-add">
            <div className="x-add-container">

            <div className='x-add-header'>
                <Search
                    placeholder="input search text"
                    onSearch={value => {this.search(value)}}
                    onChange={value => {this.onClear(value)}}
                    style={{ width: 200, borderRadius: '16px !important'}}
                    allowClear={true}
                />
            </div>

            <div className="x-add-title">
                {this.state.groupName}
            </div>

            
            <ul className="a-add-members">
                {
                    options.map((item) => {
                        return(
                            <li key={item.value}>
                                <div>
                                    <img src={avatar} alt=""/ >
                                    <span>{item.value}</span>
                                </div>
                                <Checkbox name={item.value} disabled={item.disabled} defaultChecked={item.checked} onChange={(e)=>{this.handleChange(e)}}/>
                            </li>
                        )
                    })
                }
               
            </ul>

            {
                // <Form onSubmit={this.handleSubmit} className="x-add-group">

                // <div className="x-add-group-members">
                //     <FormItem>
                //         {getFieldDecorator('members', { initialValue: joined })(
                //             <div>
                //             <CheckboxGroup
                //                 style={{ display: 'block' }}
                //                 options={options}
                //                 onChange={this.onChange}
                //             >
                //             <div>123</div>
                //             </CheckboxGroup>
                //             <div>45</div>
                //             </div>
                //         )}
                //     </FormItem>
                // </div>

                // <div></div>
                // <div style={{ overflow: 'hidden' }}>
                //     <Button
                //         style={{
                //             width: 100,
                //             height: 32
                //         }}
                //         className="fr"
                //         type="primary"
                //         htmlType="submit"
                //     >
                //         开始
                //     </Button>
                // </div>

                // </Form>

            }
            </div>


            <div className="x-add-selected">
                <div className="x-add-selected-text">
                    <span>已邀请{invitedMem.length}/15人</span>
                </div>
                <ul className="a-add-members selected-members">
                    {
                        invitedMem.map((item) => {
                            return(
                                <li key={item.name || item.value}>
                                    <div>
                                        <img src={avatar} alt=""/ >
                                        <span>{item.name || item.value}</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>

                <div className="btn-container">
                    <Button onClick={() => {this.oncancel()}}>取消</Button>
                    <Button type="primary" onClick={() => {this.handleSubmit()}}>发起视频</Button>
                </div>
            </div>
            </div>
        )
    }
}

export default connect(
    ({ entities, multiAV, callVideo }) => ({
        groupMember: entities.groupMember,
        gid: callVideo.gid,
        confr: callVideo.confr,
        selected: callVideo.invitedMembers,
        joined: callVideo.joinedMembers,
        roster: entities.roster.byName,
        group: entities.group
    }),
    dispatch => ({
        showMultiAVModal: () => dispatch(MultiAVActions.showModal()),
        setSelected: (selected) => dispatch(MultiAVActions.setSelectedMembers(selected)),
        setGid: (gid) => dispatch(MultiAVActions.setGid(gid)),
        sendTxtMessage: (chatType, id, message) => dispatch(MessageActions.sendTxtMessage(chatType, id, message)),
        updateConfr: (msg) => dispatch(VideoCallActions.updateConfr(msg)),
        setInvitedMembers: (members) => dispatch(VideoCallActions.setInvitedMembers(members))
    })
)(Form.create()(AddAVMemberModal))



