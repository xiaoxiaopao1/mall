import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class ProductItem extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		const data = this.props.data;
		const url = require(`../../static/images/product/${data.alias}`);
		return(
			<div className='product-item'>
				<img src={url} />
				<p className='title'>{data.title}</p>
				<p className='price'>￥{data.price}</p>
			</div>
		)
	}
}

export default ProductItem