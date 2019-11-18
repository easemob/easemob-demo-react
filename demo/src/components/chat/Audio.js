/**
 * Created by clock on 2017/8/28.
 */
import React from 'react'
import { Button, Icon } from 'antd'

class Audio extends React.Component {
    constructor() {
        super()
        this.play = this.play.bind(this)
    }
    state = {
        length: 0
    }
    play() {
        this.refs.aud.play()
    }
    componentDidMount() {
        if (this.props.length === 0) {
            let audio = this.refs.aud
            audio.oncanplay = () => {
                this.setState({ length: audio.duration })
            }
        }

    }
    render() {
        let url = this.props.url
        return (
            <Button type="primary" onClick={this.play} icon="icon-volume-up">
                <Icon type="sound" />
                {this.props.length === 0 ? parseInt(this.state.length) + '\'\'' : this.props.length + '\'\''}
                <audio src={url} ref="aud" />
            </Button>
        )
    }
}

export default Audio
