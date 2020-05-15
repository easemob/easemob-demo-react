import React from 'react'
import { Button, Checkbox, Form } from 'antd'
import { I18n } from 'react-redux-i18n'
import GroupMemberActions from '@/redux/GroupMemberRedux'
import MultiAVActions from '@/redux/MultiAVRedux'
import { connect } from 'react-redux'
import WebIM from '@/config/WebIM'
import _ from 'lodash'
import { store } from '@/redux'

const CheckboxGroup = Checkbox.Group
const FormItem = Form.Item

class AddAVMemberModal extends React.Component {

    state = {
        options: [],
        maxUsers: 6,
        disabled: false
    }

    componentDidMount() {
        const { groupMember, gid, selected } = this.props
        let gm = groupMember.getIn([ gid, 'byName' ])
        let options = []
        let joined = this.props.joined
        const username = store.getState().login.username
        for (var index in gm) {
            if(_.indexOf(joined,index) != -1 || index == username){
                options.push({ label: index, value: index, disabled:true })
            }else{
                options.push({ label: index, value: index })
            }
        }
        this.setOptionsEnabled(selected, options)

        // this.setState({
        //     options: options
        // })
    }

    handleSubmit = e => {
        let me = this
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                /* 
                 *  关闭modal，（Done）
                 *  打开多人音视频界面，（Done）
                 *  推流，（Done）
                 *  向成员发出邀请
                 */
                /* ------ 1 ------ */
                this.props.onCancel()
                /* ------ 2 ------ */
                this.props.showMultiAVModal()

                /* ------ 3 ------ */
                setTimeout(() => {
                    const tkt = this.props.confr.ticket
                    WebIM.EMService.joined(this.props.confr.confrId) || WebIM.EMService.joinConferenceWithTicket(this.props.confr.confrId, tkt, 'user ext field').then(function () {
                        WebIM.EMService.publish({ audio: true, video: true }, 'user ext field').catch(function (e) {
                            console.error(e)
                        })
                    }).catch(function (e) {
                        console.error(e)
                    })
                }, 0)

                const { members } = values

                const { groupMember, gid, selected, joined } = this.props

                let seleted_members = _.difference(members,joined)
                
                this.props.setSelected(seleted_members)
                this.props.setGid(gid)
                let jids = []
                const appkey = WebIM.config.appkey, spHost = WebIM.config.Host
                if (seleted_members) {
                    for (let elem of seleted_members) {
                        jids.push(appkey + '_' + elem + '@' + spHost)
                    }
                }
                let { confrId, password } = me.props.confr
                for (let jid of jids) {
                    WebIM.call.inviteConference(confrId, password='', jid, gid)
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

    render() {
        let options = this.state.options
        const { getFieldDecorator } = this.props.form
        const selected = this.props.selected
        const joined = this.props.joined

        return (
            <Form onSubmit={this.handleSubmit} className="x-add-group">
                <div className="x-add-group-members">
                    <FormItem>
                        {getFieldDecorator('members', { initialValue: joined })(
                            <CheckboxGroup
                                style={{ display: 'block' }}
                                options={options}
                                onChange={this.onChange}
                            />
                        )}
                    </FormItem>
                </div>
                <div style={{ overflow: 'hidden' }}>
                    <Button
                        style={{
                            width: 100,
                            height: 32
                        }}
                        className="fr"
                        type="primary"
                        htmlType="submit"
                    >
                        开始
                    </Button>
                </div>
            </Form>
        )
    }
}

export default connect(
    ({ entities, multiAV }) => ({
        groupMember: entities.groupMember,
        gid: multiAV.gid,
        confr: multiAV.confr,
        selected: multiAV.selectedMembers,
        joined: multiAV.joinedMembers
    }),
    dispatch => ({
        showMultiAVModal: () => dispatch(MultiAVActions.showModal()),
        setSelected: (selected) => dispatch(MultiAVActions.setSelectedMembers(selected)),
        setGid: (gid) => dispatch(MultiAVActions.setGid(gid)),
    })
)(Form.create()(AddAVMemberModal))
