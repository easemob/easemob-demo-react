import React from 'react'
import { Input, Button, Icon, message } from 'antd'
export default class EditInput extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			showEdit: true,
			spanValue: props.value || '',
			inputValue: props.value || ''
		}
	}

	handleChange = (e) => {
		const value = e.target.value || "";
		this.setState({
			inputValue: value
		});
	};

	handleClick = () => {
		let verifyResult = true
		let reg
		switch(this.props.type){
			case 'birth':
				reg = /^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/
				verifyResult = reg.test(this.state.inputValue)
				break;
			case 'gender':
				reg = /^(男|女|未知)$/
				verifyResult = reg.test(this.state.inputValue)
				break;
			case 'phone':
				reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
				verifyResult = reg.test(this.state.inputValue)
				break;
			case 'mail':
				reg=/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
				verifyResult = reg.test(this.state.inputValue)
				break
			default:
				break;
		}
		if (!verifyResult) {
			return message.error('输入内容不合法')
		}
		this.setState({
			spanValue: this.state.inputValue,
			showEdit: true
		})
		this.props.onCommit(this.state.inputValue)
	}

	render(){
		return(
			<div style={{display: "flex", justifyContent: "left", alignItems: "center",height: 32}}>
				<span style={{marginRight: 5}}>{this.props.label}</span>
				<span
					style={{display: (this.state.showEdit) ? "inline" : "none"}}
				>
					{this.state.spanValue}
					<Icon type="edit" style={{ marginLeft: 5, display: this.props.isSelf? "inline" : "none"}} onClick={ () => {this.setState({ showEdit: !this.state.showEdit });}} />
				</span>
				<Input
					style={{width: 200, marginRight: 10, display: this.state.showEdit ? "none" : "inline"}}
					value={ this.state.inputValue }
					maxLength={ this.props.maxLength }
					onChange={ this.handleChange }
					placeholder={this.props.placeholder}
				/>

				<Button
					style={{display: this.state.showEdit ? "none" : "inline"}}
					onClick={this.handleClick}
				>确定</Button>
			</div>
		)
	}
}


