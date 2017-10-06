import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'; //redux自带的发起action方法
import { connect } from 'react-redux'; //连接redux
import * as userInfoActionsFormOtherFile from '../../../../actions/userInfo'


import { getProductListData } from '../../../../fetch/product/product'

import ReceptionProductList from '../../../../components/ReceptionProductList'
import Pagination from './Pagination'

class ProductList extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data: null,
			pageNum: 1,
			itemCount: 3
		}
	}
	render(){
		return(
			<div>
				{
					this.state.data
					? this.state.data.length
					  ? <div>
						  <ReceptionProductList data={this.state.data} />
					  	  <Pagination data={this.state.data}
					  	  			  itemCount={this.state.itemCount}
					  	  			  pageChangeFn={this.pageChangeHandler.bind(this)} />
					  	</div>
					  	: '还没有添加产品'
					: ''
				}
			</div>
		)
	}
	componentDidMount(){
		this.resultHandler();
	}
	componentDidUpdate(prevProps,prevState){
		if (this.state.pageNum == prevState.pageNum) {
			return;
		}
		this.resultHandler();
	}
	pageChangeHandler(pageNum){
		this.setState({
			pageNum
		})
	}
	resultHandler(){
		const result = getProductListData(this.state.pageNum,this.state.itemCount);
		result.then(res => {
			return res.json();
		}).then(json => {
			if (json.errno == 0) {
				const data = json.data;
				if (!data.length && this.state.pageNum != 1) {
					this.setState({
						pageNum: this.state.pageNum - 1
					})
				}else{
					this.setState({
						data
					})
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
)(ProductList);