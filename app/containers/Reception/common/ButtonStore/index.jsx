import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'; //redux自带的发起action方法
import { connect } from 'react-redux'; //连接redux
import * as userInfoActionsFormOtherFile from '../../../../actions/userInfo'

import { addToStore } from '../../../../fetch/store/store'

import ButtonStoreComponent from '../../../../components/ButtonStore'

class ButtonStore extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return(
			<ButtonStoreComponent addToStoreFn={this.addToStoreHandler.bind(this)}/>
		)
	}
	addToStoreHandler(){
		const name = this.props.userInfo.name;
		if (name) {
			const result = addToStore(name,this.props.storeId);
			result.then(res => {
				return res.json();
			}).then(json => {
				if (json.errno == 0) {
					console.log('添加成功');
				}
			})
		}else{
			console.log('请先登录');
		}
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
)(ButtonStore);