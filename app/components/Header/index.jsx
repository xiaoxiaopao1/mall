import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'


import './style.less';

class LoginHeader extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return(
			<div className='login-header'>
				{
					this.props.userInfo.name
					? <div className='login-out-container'>
					  		<span className="userinfo">Hello {this.props.userInfo.name}</span>
					  		<span className="login-out" onClick={this.loginOut.bind(this)}>登出</span>
				  	  </div>
					: <span className='login-in' onClick={this.loginClick.bind(this)}>登录</span>
					
				}
				<span className='store'
					  onClick={this.goStore.bind(this)}>购物车</span>
			</div>
		)
	}
	loginClick(){
		const changeFn = this.props.showFormFn;
		changeFn();
	}
	loginOut(){
		const loginOutFn = this.props.loginOutFn;
		loginOutFn();
	}
	goStore(){
		const goStoreFn = this.props.goStoreFn;
		goStoreFn();
	}
}

export default LoginHeader