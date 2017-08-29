import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { bindActionCreators } from 'redux'; //redux自带的发起action方法
import { connect } from 'react-redux'; //连接redux
import * as adminInfoActionsFormOtherFile from '../../../../actions/adminInfo'

import AdminInfoComponent from '../../../../components/AdminInfo'

class AdminInfo extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			name: ''
		}
	}
	render(){
		return(
			<div style={{height: '100%'}}>
				{
					this.state.name
					? <AdminInfoComponent data={this.state.name} />
					: ''
				}
			</div>
		)
	}
	componentDidMount(){
		const name = this.props.adminInfo.adminInfo;
		this.setState({
			name
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
		adminInfoActions: bindActionCreators(adminInfoActionsFormOtherFile,dispatch)
	}
}

// 返回出绑定redux的组件，上面两个函数作为参数
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminInfo);