import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { bindActionCreators } from 'redux'; //redux自带的发起action方法
import { connect } from 'react-redux'; //连接redux
import * as userInfoActionsFormOtherFile from '../../../actions/userInfo'

import { getStoreList,countToStore,delToStore } from '../../../fetch/store/store'
import { addToComment } from '../../../fetch/comment/comment'

import StoreList from '../../../components/StoreList'

class Store extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data: null,
			storeData: []
		}
	}
	render(){
		return(
			<div>
				{
					this.state.data
					? this.state.data.length
						? <StoreList data={this.state.data}
									 storeData={this.state.storeData}
									 countFn={this.countHandler.bind(this)}
									 delFn={this.delHandler.bind(this)}
									 addToCommentFn={this.addToCommentHandler.bind(this)} />
						: '还没有购物信息'
					: ''
				}
			</div>
		)
	}
	componentDidMount(){
		this.resultHandler();
	}
	resultHandler(){
		const name = this.props.userInfo.name;
		if (name) {
			const result = getStoreList(name);
			result.then(res => {
				return res.json();
			}).then(json => {
				if (json.errno == 0) {
					const data = json.data,
						  storeData = json.storeData;
					console.log(json);
					this.setState({
						data,
						storeData
					})
				}
			})
		}
	}
	countHandler(_id,price,count){
		const name = this.props.userInfo.name;
		const result = countToStore(name,_id);
		result.then(res => {
			return res.json();
		}).then(json => {
			if (json.errno == 0) {
				alert(`共付款: ￥${price * count}`);
				this.resultHandler();
			}
		})

	}
	delHandler(_id){
		const name = this.props.userInfo.name;
		if (name) {
			const result = delToStore(name,_id);
			result.then(res => {
				return res.json();
			}).then(json => {
				if (json.errno == 0) {
					this.resultHandler();
				}
			})
		}
	}
	addToCommentHandler(commentId,commentStar,comment,callback){
		const name = this.props.userInfo.name;
		const result = addToComment(name,commentId,commentStar,comment);
		result.then(res => {
			return res.json();
		}).then(json => {
			if (json.errno == 0) {
				alert('评论成功');
				callback();
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
)(Store);