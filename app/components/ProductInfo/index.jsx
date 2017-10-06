import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import ButtonStore from '../../containers/Reception/common/ButtonStore'

import './style.less'
class ProductInfo extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		const data = this.props.data;
		const url = require(`../../static/images/product/${data.alias}`);
		return(
			<div className='product-detail'>
				<img className='pic' src={url} />
				<div className='word'>
					<h1>{data.title}</h1>
					<p>￥{data.price}</p>
					<ButtonStore storeId={data._id} />
				</div>
			</div>
		)
	}
	componentDidMount(){
	}
}

export default ProductInfo