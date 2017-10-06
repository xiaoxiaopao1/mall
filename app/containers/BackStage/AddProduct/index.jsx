import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { addProductData,updateProductData,getSingleProductData } from '../../../fetch/product/product'

import AddProductComponent from '../../../components/AddProduct'

class AddProduct extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data: null
		}
	}
	render(){
		return(
			<div>
				{
					this.state.data
					? <AddProductComponent addFn={this.addProductHandler.bind(this)}
										   updateFn={this.updateProductHandler.bind(this)}
										   oldData={this.state.data} />
					: ''
				}
			</div>
		)
	}
	componentDidMount(){
		this.initDone();
	}
	componentDidUpdate(prevProps,prevState){
		if (this.props.params.id == prevProps.params.id) {
			return;
		}
		this.initDone();
	}
	initDone(){
		const id = this.props.params.id;
		if (id) {
			this.resultHanlder(id);
		}else{
			this.setState({
				data: {}
			})
		}	
	}
	resultHanlder(id){
		const result = getSingleProductData(id);
		result.then(res => {
			return res.json();
		}).then(json => {
			const data = json;
			this.setState({
				data
			})
		})
	}
	addProductHandler(title,alias,price){
		const result = addProductData(title,alias,price);
		result.then(res => {
			return res.json();
		}).then(json => {
			switch (json.errno){
				case 0:
					alert('添加成功');
					break;
				case 1:
					alert('价格请输入数字');
					break;
				default:
					alert('图片不存在');
			}
		})
	}
	updateProductHandler(title,alias,price){
		const id = this.props.params.id;
		const result = updateProductData(id,title,alias,price);
		result.then(res => {
			return res.json();
		}).then(json => {
			switch (json.errno){
				case 0:
					alert('更新成功');
					break;
				case 1:
					alert('价格请输入数字');
					break;
				default:
					alert('图片不存在');
			}
		})
	}
}

export default AddProduct