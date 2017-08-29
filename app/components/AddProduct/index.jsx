import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class AddProduct extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			title: '',
			alias: '',
			price: ''
		}
	}
	render(){
		return(
			<div className='product-add'>
				<h2>请输入产品名称: <span>（如：“小钢炮蓝牙音箱”）</span></h2>
				<input value={this.state.title}
					   onChange={this.titleChange.bind(this)} />
				<h2>请输入图片名称：<span>（目前图片只有1.jpg -- 16.jpg,请输入区间内的图片）</span></h2>
				<input value={this.state.alias}
					   onChange={this.aliasChange.bind(this)} />
				<h2>请输入产品价格：<span>（单位：元）</span></h2>
				<input value={this.state.price}
					   onChange={this.priceChange.bind(this)} />
				{
					this.props.oldData.data
					? <button onClick={this.updateHandler.bind(this)}>更新</button>
					: <button onClick={this.addHandler.bind(this)}>添加</button>
				}
			</div>
		)
	}
	componentDidMount(){
		const oldData = this.props.oldData;
		if (oldData.data) {
			this.setState({
				title: oldData.data.title,
				alias: oldData.data.alias,
				price: oldData.data.price
			})
		}
	}
	componentDidUpdate(prevProps,prevState){
		if (this.props.oldData == prevProps.oldData) {
			return;
		}
		const oldData = this.props.oldData;
		this.setState({
			title:'',
			alias:'',
			price: ''
		})
	}
	titleChange(e){
		this.setState({
			title: e.target.value
		});
	}
	aliasChange(e){
		this.setState({
			alias: e.target.value
		});
	}
	priceChange(e){
		this.setState({
			price: e.target.value
		})
	}
	addHandler(){
		const addFn = this.props.addFn;
		addFn(this.state.title,this.state.alias,this.state.price);
		this.setState({
			title: '',
			alias: '',
			price: ''
		})
	}
	updateHandler(){
		this.props.updateFn(this.state.title,
							this.state.alias,
							this.state.price);
	}
}

export default AddProduct