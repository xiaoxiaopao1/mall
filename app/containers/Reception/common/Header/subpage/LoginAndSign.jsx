import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { bindActionCreators } from 'redux'; //redux自带的发起action方法
import { connect } from 'react-redux'; //连接redux
import * as loginFormActionsFormOtherFile from '../../../../../actions/loginForm'



import Login from './Login';
import Sign from './Sign';

import './style.less';

class LoginAndSign extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			isLogin: true
		}
	}
	render(){
		const loginClass = this.state.isLogin ? 'active' : '',
			  signClass = this.state.isLogin ? '' : 'active';
		return(
			<div className='login-and-sign'>
				<div className='close'>
					<span onClick={this.hideFormHandler.bind(this)}>关闭</span>
				</div>
				<div className='nav'>
					<span className={loginClass} onClick={this.loginHandler.bind(this)}>登录</span>
					<span className={signClass} onClick={this.signHandler.bind(this)}>注册</span>
				</div>

				{
					this.state.isLogin
					? <Login hideFormFn={this.hideFormHandler.bind(this)} />
					: <Sign />
				}
			</div>
		)
	}
	loginHandler(){
		this.setState({
			isLogin: true
		})
	}
	signHandler(){
		this.setState({
			isLogin: false
		})
	}
	hideFormHandler(){
		this.props.loginFormActions.update({
			showForm: false
		})
	}
}

//--------------redux react 绑定----------------------

// 此处绑定的是把当前状态绑定到redux中
// 从redux中获取信息
function mapStateToProps(state){
	return {
		loginForm: state.loginForm,
	}
}
// 从redux获取操控方法
function mapDispatchToProps(dispatch){
	return {
		loginFormActions: bindActionCreators(loginFormActionsFormOtherFile,dispatch)
	}
}

// 返回出绑定redux的组件，上面两个函数作为参数
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginAndSign);