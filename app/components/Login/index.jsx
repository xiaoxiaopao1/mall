import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less';

class Login extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			user: '',
			userErr: false,
			password: '',
			passwordErr: false
		}
	}
	render(){
		const userMarkStyle = this.state.userErr ? {visibility: 'visible'} : {},
			  userInputStyle = this.state.userErr ? {border: '1px solid #ff0000'} : {},
			  passwordMarkStyle = this.state.passwordErr ? {visibility: 'visible'} : {},
			  passwordInputStyle = this.state.passwordErr ? {border: '1px solid #ff0000'} : {};
		return(
			<div className='login'>
				<h2>用户名</h2>
				<input value={this.state.user}
					   style={userInputStyle}
					   onChange={this.userChange.bind(this)}
					   placeholder='请输入用户名、邮箱或者手机号'
					   onFocus={this.userFocus.bind(this)}/>
				<span className='mark'
					  style={userMarkStyle}>用户名错误，请重新输入</span>
				<h2>密码</h2>
				<input value={this.state.password}
					   style={passwordInputStyle}
					   onChange={this.passwordChange.bind(this)}
					   placeholder='请输入密码'
					   onFocus={this.passwordFocus.bind(this)} />
				<span className='mark'
					  style={passwordMarkStyle}>密码错误，请重新输入</span>
				<button className='login-btn' 
						style={passwordMarkStyle}
						onClick={this.loginHandler.bind(this)}>登录</button>
			</div>
		)
	}
	componentDidUpdate(prevProps,prevState){
		// 此处需要父组件传递一个controller作为重定向
		// 因为单纯的判断props，两次输入错误的时候，props没有变化
		// 都会直接触发下面的return
		// 所以props不能作为判断标准，state的话经过多次试验，也不行，所以加重定向
		if (this.props.controller === prevProps.controller) {
			return;
		}
		this.setState({
			userErr: this.props.nameErr,
			passwordErr: this.props.passwordErr
		})
	}
	userChange(e){
		this.setState({
			user: e.target.value
		})
	}
	userFocus(){
		this.setState({
			userErr: false
		})
	}
	passwordChange(e){
		this.setState({
			password: e.target.value
		})
	}
	passwordFocus(){
		this.setState({
			passwordErr: false
		})
	}
	loginHandler(){
		this.props.resultFn(this.state.user,this.state.password);
	}
}

export default Login