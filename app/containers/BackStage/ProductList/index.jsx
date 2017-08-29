import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { hashHistory } from 'react-router'

import { getProductListData,delProductData } from '../../../fetch/product/product'

import ProductListComponent from '../../../components/ProductList'
import Pagination from './subpage/Pagination'

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
						  <ProductListComponent data={this.state.data}
						  						  delFn={this.delHandler.bind(this)}
						  						  updateFn={this.updateHandler.bind(this)} />
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
	delHandler(_id){
		const result = delProductData(_id);
		result.then(res => {
			return res.json();
		}).then(json => {
			if (json.errno == 0) {
				this.resultHandler();
			}
		})
	}
	updateHandler(_id){
		hashHistory.push(`/admin/addProduct/${_id}`);
	}
}

export default ProductList