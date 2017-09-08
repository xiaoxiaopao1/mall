import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { bindActionCreators } from 'redux'; //redux自带的发起action方法
import { connect } from 'react-redux'; //连接redux
import * as userInfoActionsFormOtherFile from '../../../../actions/userInfo'
import * as loginFormActionsFormOtherFile from '../../../../actions/loginForm'

import { hashHistory} from 'react-router'

import HeaderComponent from '../../../../components/Header'

import LoginAndSign from './subpage/LoginAndSign'

class Header extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			userInfo: null,
			showForm: false
		}
	}
	render(){
		return(
			<div>
				{
					this.state.userInfo
					? <HeaderComponent userInfo={this.state.userInfo}
									   showFormFn={this.showFormHandler.bind(this)}
									   loginOutFn={this.loginOutHandler.bind(this)}
									   goStoreFn={this.goStoreHandler.bind(this)} />
					: ''
				}
				{
					this.state.showForm
					? <LoginAndSign hideFormFn={this.hideFormHandler.bind(this)} />
					: ''
				}
			</div>
		)
	}
	componentDidMount(){
		const userInfo = this.props.userInfo;
		this.setState({
			userInfo
		});
	}
	componentDidUpdate(prevProps,prevState){
		if (this.props.loginForm.showForm == false && this.props.loginForm.showForm != prevProps.loginForm.showForm) {
			this.setState({
				showForm: false
			})
		}
		if (this.props.userInfo.name != prevProps.userInfo.name) {
			this.setState({
				userInfo: this.props.userInfo
			})
		}
	}

	showFormHandler(){
		this.props.loginFormActions.update({
			showForm: true
		})
		this.setState({
			showForm: true
		})
	}
	hideFormHandler(){
		this.setState({
			showForm: false
		})
	}
	loginOutHandler(){
		this.props.userInfoActions.update({});
	}
	goStoreHandler(){
		const name = this.props.userInfo.name;
		if (name) {
			hashHistory.push(`/store/${encodeURIComponent(name)}`)
		}else{
			console.log('请先登录')
		}
	}
}

//--------------redux react 绑定----------------------

// 此处绑定的是把当前状态绑定到redux中
// 从redux中获取信息
function mapStateToProps(state){
	return {
		userInfo: state.userInfo,
		loginForm: state.loginForm,
	}
}
// 从redux获取操控方法
function mapDispatchToProps(dispatch){
	return {
		userInfoActions: bindActionCreators(userInfoActionsFormOtherFile,dispatch),
		loginFormActions: bindActionCreators(loginFormActionsFormOtherFile,dispatch)
	}
}

// 返回出绑定redux的组件，上面两个函数作为参数
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);