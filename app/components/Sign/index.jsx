import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class Sign extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			name: '',
			nameErr: false,
			password: ''
		}
	}
	render(){
		const nameInputStyle = this.state.nameErr ? {border: '1px solid #ff0000'} : {},
			  nameMarkStyle = this.state.nameErr ? {visibility: 'visible'} : {};
		return(
			<div className='sign'>
				<h2>用户名</h2>
				<input value={this.state.name}
					   style={nameInputStyle}
					   onChange={this.nameChange.bind(this)}
					   onFocus={this.nameFocus.bind(this)}
					   placeholder='请输入用户名' />
				<span className='mark' style={nameMarkStyle}>用户名已存在，请重新输入</span>
				<h2>密码</h2>
				<input value={this.state.password}
					   onChange={this.passwordChange.bind(this)}
					   placeholder='请输入密码'/>
				<span className='mark'>密码错误，请重新输入</span>
				<button className='sign-btn' onClick={this.signHandler.bind(this)}>注册</button>
			</div>
		)
	}
	componentDidMount(){
		this.resultHandler();
	}
	componentDidUpdate(prevProps,prevState){
		if (this.props.controller != prevProps.controller) {
			this.resultHandler();
		}
	}
	resultHandler(){
		this.setState({
			nameErr: this.props.nameErr
		});
	}
	nameChange(e){
		this.setState({
			name: e.target.value
		})
	}
	nameFocus(){
		this.setState({
			nameErr: false
		})
	}
	passwordChange(e){
		this.setState({
			password: e.target.value
		})
	}
	signHandler(){
		if (!this.state.name || !this.state.password) {

		}
		const name = this.state.name,
			  password = this.state.password;
		this.props.addUserFn(name,password);
	}
}

export default Sign