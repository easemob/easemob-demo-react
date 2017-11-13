import React from "react"
import { Button, Checkbox, Form } from "antd"
import { I18n } from "react-redux-i18n"
import GroupMemberActions from "@/redux/GroupMemberRedux"
import MultiAVActions from "@/redux/MultiAVRedux"
import { connect } from "react-redux"
import WebIM from "@/config/WebIM"
import _ from "lodash"

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
        let gm = groupMember.getIn([gid, "byName"])
        let options = []
        for (var index in gm) {
            options.push({ label: index, value: index })
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
                    const pub = new WebIM.EMService.AVPubstream({
                        constaints: {
                            audio: true,
                            video: true
                        },
                        aoff: 0,
                        voff: 0,
                        name: "video",
                        ext: {
                            hello: "Hello"
                        }
                    })
                    const tkt = this.props.confr.rtcOptions.ticket
                    WebIM.EMService.setup(tkt)
                    WebIM.EMService.openUserMedia(pub).then(function () {
                        WebIM.EMService.withpublish(pub).join();
                    }, function fail(evt) {
                        console.error("打开Media失败", evt.message());
                    });
                }, 0)

                const { members } = values
                me.props.setSelected(members)
                let jids = []
                const appkey = WebIM.config.appkey, spHost = WebIM.config.xmppURL.split(".")
                const host = spHost[1] + '.' + spHost[2]
                if (members) {
                    for (let elem of members) {
                        jids.push(appkey + '_' + elem + '@' + host)
                    }
                }
                const { confrId, password } = me.props.confr.rtcOptions
                for (let jid of jids) {
                    WebIM.call.inviteConfr(confrId, password, jid)
                }
            }
        })
    }

    onChange = checkedValues => {
        const len = checkedValues.length
        let options = _.cloneDeep(this.state.options)
        if (len >= this.state.maxUsers) {
            this.setState({
                disabled: true
            })
            for (let [index, elem] of options.entries()) {
                if (!checkedValues.includes(elem.label)) {
                    options[index].disabled = true
                }
            }
        } else {
            const disabled = this.state.disabled
            if (disabled) {
                for (let [index, elem] of options.entries()) {
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
            for (let [index, elem] of options.entries()) {
                options[index].disabled = true
            }
        } else {
            const disabled = this.state.disabled
            if (disabled) {
                for (let [index, elem] of options.entries()) {
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

        return (
            <Form onSubmit={this.handleSubmit} className="x-add-group">
                <div className="x-add-group-members">
                    <FormItem>
                        {getFieldDecorator("members", { initialValue: selected })(
                            <CheckboxGroup
                                style={{ display: "block" }}
                                options={options}
                                onChange={this.onChange}
                            />
                        )}
                    </FormItem>
                </div>
                <div style={{ overflow: "hidden" }}>
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
        selected: multiAV.selectedMembers
    }),
    dispatch => ({
        showMultiAVModal: () => dispatch(MultiAVActions.showModal()),
        setSelected: (selected) => dispatch(MultiAVActions.setSelectedMembers(selected))
    })
)(Form.create()(AddAVMemberModal))
