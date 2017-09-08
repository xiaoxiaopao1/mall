import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import SessionStore from '../../util/sessionStore'; //缓存(里面有getItem和setItem方法)
import { ADMININFO } from '../../config/sessionStoreKey';//存放关键字常量
import { bindActionCreators } from 'redux'; //redux自带的发起action方法
import { connect } from 'react-redux'; //连接redux
import * as adminInfoActionsFormOtherFile from '../../actions/adminInfo'


import AdminInfo from './common/AdminInfo'
import Login from './common/Login'

import './style.less'

class BackStage extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			initDone: false
		}
	}
	render(){
		return(
			<div className='backstage'>
				{
					this.state.initDone
					? <div className='clear-fix'>
						<div className='adminInfo-container'>
							<AdminInfo />
						</div>
						<div className='main-container'>
							{this.props.children}
						</div>	
					  </div>
				    : <Login loginFn={this.loginHandler.bind(this)} />
				}	
			</div>	
		)
	}
	componentDidMount(){
		//从缓存SessionStore中获取用户信息
		// const adminInfo = SessionStore.getItem(ADMININFO);
		// if (adminInfo) {
		// 	this.props.adminInfoActions.update({
		// 		adminInfo: adminInfo
		// 	});

		// 	this.setState({
		// 		initDone: true
		// 	})
		// }
	}
	loginHandler(hasLogined){
		if (hasLogined) {
			this.setState({
				initDone: true
			})
		}
	}
}

//--------------redux react 绑定----------------------

// 此处绑定的是把当前状态绑定到redux中
// 从redux中获取信息
function mapStateToProps(state){
	return {
		adminInfo: state.adminInfo
	}
}
// 从redux获取操控方法
function mapDispatchToProps(dispatch){
	return {
		adminInfoActions: bindActionCreators(adminInfoActionsFormOtherFile,dispatch)
	}
}

// 返回出绑定redux的组件，上面两个函数作为参数
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BackStage);