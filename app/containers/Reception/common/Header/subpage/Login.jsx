import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SessionStore from '../../../../../util/sessionStore'; //缓存(里面有getItem和setItem方法)
import { USERINFO } from '../../../../../config/sessionStoreKey';//里面有userinfo常量，缓存关键字
import { bindActionCreators } from 'redux'; //redux自带的发起action方法
import { connect } from 'react-redux'; //连接redux
import * as userInfoActionsFormOtherFile from '../../../../../actions/userInfo'

import { postLoginData } from '../../../../../fetch/user/user'

import LoginComponent from '../../../../../components/Login'

import './style.less'

class Login extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			nameErr: false,
			passwordErr: false,
			controller: false
		}
	}
	render(){
		return(
			<div className='reception-login-container'>
				{
					<LoginComponent data={this.state.data} 
									nameErr={this.state.nameErr}
									passwordErr={this.state.passwordErr}
									controller={this.state.controller}
									resultFn={this.resultHandler.bind(this)} />
				}
			</div>
		)
	}
	resultHandler(name,password){
		const result = postLoginData(name,password);
		result.then(res => {
			return res.json();
		}).then(json => {
			if (json.errno == 0) {
				this.setState({
					nameErr: json.nameErr,
					passwordErr: json.passwordErr,
					controller: !this.state.controller
				});

				// 如果用户名和密码都正确，则把用户名更新到redux中去
				// 由于setState是异步操作，此处需要使用json.nameErr进行判定
				if (json.nameErr == false && json.passwordErr == false) {
					this.props.userInfoActions.update({
						name: name
					})

					// 把用户名存入会话缓存
					SessionStore.setItem(USERINFO,name);
					
					// 登录成功后，执行hideForm
					this.props.hideFormFn();

				}
			}
		})
	}
}

//--------------redux react 绑定----------------------

// 此处绑定的是把当前状态绑定到redux中
// 从redux中获取信息
function mapStateToProps(state){
	return {
		userInfo: state.userInfo
	}
}
// 从redux获取操控方法
function mapDispatchToProps(dispatch){
	return {
		userInfoActions: bindActionCreators(userInfoActionsFormOtherFile,dispatch)
	}
}

// 返回出绑定redux的组件，上面两个函数作为参数
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);