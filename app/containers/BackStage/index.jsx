import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import SessionStore from '../../util/sessionStore'; //缓存(里面有getItem和setItem方法)
import { ADMININFO } from '../../config/sessionStoreKey';//存放关键字常量
import { bindActionCreators } from 'redux'; //redux自带的发起action方法
import { connect } from 'react-redux'; //连接redux
import * as userInfoActionsFormOtherFile from '../../actions/userinfo'


import AdminInfo from './common/AdminInfo'
import Login from './common/Login'

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
			<div>
				{
					this.state.initDone
					? <div>
						<AdminInfo />
						{this.props.children}	
					  </div>
				    : <Login />
				}	
			</div>	
		)
	}
	componentDidMount(){
		//从缓存localStoreage中获取用户信息
		const adminInfo = SessionStore.getItem(ADMININFO);
		if (adminInfo) {
			this.props.adminInfoActions.update({
				adminInfo: adminInfo
			});

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
		adminInfoActions: bindActionCreators(userInfoActionsFormOtherFile,dispatch)
	}
}

// 返回出绑定redux的组件，上面两个函数作为参数
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BackStage);