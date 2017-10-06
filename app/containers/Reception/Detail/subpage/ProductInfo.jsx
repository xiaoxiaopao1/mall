import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { getSingleProductData } from '../../../../fetch/product/product'

import ProductInfoComponent from '../../../../components/ProductInfo'

class ProductInfo extends React.Component {
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
					? <ProductInfoComponent data={this.state.data} />
					: ''
				}
			</div>
		)
	}
	componentDidMount(){
		this.resultHandler();
	}
	resultHandler(){
		const id = this.props.commentId;
		const result = getSingleProductData(id);
		result.then(res => {
			return res.json();
		}).then(json => {
			const data = json.data;
			this.setState({
				data
			})
		})
	}
}

export default ProductInfo
