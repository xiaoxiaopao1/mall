import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import SessionStore from '../../../../util/sessionStore'; //缓存(里面有getItem和setItem方法)
import { ADMININFO } from '../../../../config/sessionStoreKey';//存放关键字常量
import { bindActionCreators } from 'redux'; //redux自带的发起action方法
import { connect } from 'react-redux'; //连接redux
import * as userInfoActionsFormOtherFile from '../../../../actions/userinfo'



import { postAdminData } from '../../../../fetch/admin/admin'

import LoginComponent from '../../../../components/Login'

class Login extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			nameErr: false,
			passwordErr: false
		}
	}
	render(){
		return(
			<div>
				{
					<LoginComponent data={this.state.data} 
									nameErr={this.state.nameErr}
									passwordErr={this.state.passwordErr}
									resultFn={this.resultHandler.bind(this)} />
				}
			</div>
		)
	}
	resultHandler(name,password){
		const result = postAdminData(name,password);
		result.then(res => {
			return res.json();
		}).then(json => {
			if (json.errno == 0) {
				this.setState({
					nameErr: json.nameErr,
					passwordErr: json.passwordErr
				});

				if (this.state.nameErr == false && this.state.passwordErr == false) {
					this.props.adminInfoActions.update({
						adminInfo: name
					});

					SessionStore.setItem(ADMININFO,name);

					window.location.reload();
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
)(Login);