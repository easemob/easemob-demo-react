import React from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import { Input, Button, Row, Col } from 'antd'
import RosterActions from '@/redux/RosterRedux'

class AddFriendsModal extends React.Component {
    constructor(props) {
        super()
    }

    state = {
        userName: ''
    }

    add = () => {
        const value = this.state.userName
        if (!value || !value.trim()) return
        this.props.addContact(value)
        this.props.onCancel && this.props.onCancel()
    }

    onChangeUserName = e => {
        this.setState({ userName: e.target.value })
    }

    render() {
        return (
            <Row>
                <Col span={20}>
                    <Input
                        size="large"
                        placeholder={I18n.t('username')}
                        onChange={this.onChangeUserName}
                        ref={node => (this.userNameInput = node)}
                    />
                </Col>
                <Col span={4}>
                    <Button
                        style={{
                            height: 32
                        }}
                        className="fr"
                        type="primary"
                        onClick={this.add}
                    >
                        {I18n.t('add')}
                    </Button>
                </Col>
            </Row>
        )
    }
}

export default connect(
    ({ state }) => ({}),
    dispatch => ({
        addContact: id => dispatch(RosterActions.addContact(id))
    })
)(AddFriendsModal)
