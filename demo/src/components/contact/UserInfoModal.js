import React from 'react'
import { connect } from 'react-redux'
import EditInput from '../common/EditInput'
import {Avatar, Collapse, message} from 'antd'
import RosterActions from '@/redux/RosterRedux'
import LoginActions from '@/redux/LoginRedux'
const { Panel } = Collapse;
class UserInfoModal extends React.Component{
	constructor(props) {
        super()
        this.baseAvatarUrl = 'https://download-sdk.oss-cn-beijing.aliyuncs.com/downloads/IMDemo/avatar/'
        this.defaultAvatar = `${this.baseAvatarUrl}Image${1}.png`
    }

    state = {
        userName: '',
        collapsible: '',
        avatarUrl: ''
    }

    componentDidMount(){
        this.setState({
            avatarUrl: this.props.userInfos.avatarurl || this.defaultAvatar
        })
    }

    handleCommit = (type, value) => {
        if (type === 'gender') {
            if (value == '男') {
                value = 1
            }else if (value == '女') {
                value = 2
            }else{
                value = 0
            }
        }
        this.props.updateUserInfo(type, value)
        let infos = JSON.parse(JSON.stringify(this.props.userInfos))
        infos[type] = value
        this.props.setOwnInfo(infos)
    }

    callback(){
        return false
    }

    changeAvatar = (i) => {
        let url = `${this.baseAvatarUrl}Image${i}.png`
        this.setState({
            avatarUrl: url
        })
        this.props.updateUserInfo('avatarurl', url)
        let infos = JSON.parse(JSON.stringify(this.props.userInfos))
        infos.avatarurl = url
        this.props.setOwnInfo(infos)
    }
    render(){
        let { userInfos, showEdit } = this.props
        let optionalAvatars = []
        for (var i = 0; i < 9; i++) {
            let url = `${this.baseAvatarUrl}Image${i+1}.png`
            optionalAvatars.push(<Avatar style={{margin: '0 5px', cursor: 'pointer'}} src={url} key={i+1} onClick={this.changeAvatar.bind(this, i+1)}/>)
        }
        let gender = '未知'
        if (userInfos.gender == 1) {
            gender = '男'
        }else if (userInfos.gender == 2) {
            gender = '女'
        }
    	return (
    		<div>
    			<div style={{textAlign: "center", marginBottom: 10}}>
    				<Collapse defaultActiveKey={['0']} collapsible="disabled" onChange={this.callback} style={{border:'none', background: '#fff'}}>
					    <Panel showArrow={false} header={<Avatar size="large" src={this.state.avatarUrl}/>} key="2" disabled={!showEdit}>
					      {optionalAvatars}
					    </Panel>
					</Collapse>
    			</div>
                <div>
                    <EditInput label="用户id" value={userInfos.userId} isSelf={false}/>
                </div>
    			<div>
    				<EditInput label="昵称" placeholder="昵称" value={userInfos.nickname||''} isSelf={showEdit} maxLength={10} onCommit={this.handleCommit.bind(this, 'nickname')}/>
    			</div>
    			<div>
    				<EditInput label="生日" type="birth" placeholder="2000-1-1" value={userInfos.birth||''} isSelf={showEdit} maxLength={10} onCommit={this.handleCommit.bind(this, 'birth')}/>
    			</div>
    			<div>
    				<EditInput label="性别" type="gender" placeholder="男、女、未知" value={gender} isSelf={showEdit} maxLength={1} onCommit={this.handleCommit.bind(this, 'gender')}/>
    			</div>
    			<div>
    				<EditInput label="电话" type="phone" placeholder="手机号" value={userInfos.phone||''} isSelf={showEdit} maxLength={11} onCommit={this.handleCommit.bind(this, 'phone')}/>
    			</div>
    			<div>
    				<EditInput label="邮箱" type="mail" placeholder="邮箱" value={userInfos.mail||''} isSelf={showEdit} maxLength={25} onCommit={this.handleCommit.bind(this, 'mail')}/>
    			</div>
    			<div>
    				<EditInput label="签名" placeholder="签名" value={userInfos.sign || ''} isSelf={showEdit} maxLength={20} onCommit={this.handleCommit.bind(this, 'sign')}/>
    			</div>
    		</div>
    	)
    }
}

export default connect(
    ({ state, props }) => ({
    	userInfo: state
    }),
    dispatch => ({
        addContact: id => dispatch(RosterActions.addContact(id)),
        updateUserInfo: (key, value) => dispatch(RosterActions.updateUserInfo(key, value)),
        getAvatarList: () => dispatch(RosterActions.getAvatarList()),
        setOwnInfo: (info) => dispatch(LoginActions.setOwnInfo(info))
    })
)(UserInfoModal)


