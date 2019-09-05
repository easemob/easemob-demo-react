import React from 'react'
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;


class VideoSetting extends React.Component {
    constructor() {
        super()
        this.state={
            checkedList: []
        }
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
        const videoSetting = JSON.parse(localStorage.getItem('videoSetting'))
        const checkedList = videoSetting&&Object.keys(videoSetting).filter(( key ) => {
            if(videoSetting[key]){
                return key
            }
        })
        this.setState({
            checkedList
        })
    }

    onChange(checkedList) {
        this.setState({
            checkedList,
        });

        const videoSettingObj = {
            recMerge: checkedList.indexOf('recMerge') != -1,
            rec: checkedList.indexOf('rec') != -1,
        }

        localStorage.setItem("videoSetting", JSON.stringify(videoSettingObj))
    }

    render() {
        return (
            <div>
                <span>服务端录制以及录制合并设置</span>
                <br/>
                <br/>
                <CheckboxGroup
                    value={this.state.checkedList}
                    onChange={this.onChange}
                >
                    <Checkbox value="rec">启用录制</Checkbox>
                    <br/>
                    <br/>
                    <Checkbox value="recMerge">启用合并</Checkbox>
                </CheckboxGroup>
            </div>
        )
    }
}

export default VideoSetting
