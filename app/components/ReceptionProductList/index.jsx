import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import ProductItem from '../ProductItem'


class ReceptionProductList extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		
	}
	render(){
		return(
			<div className='product-list-container'>
				<div className='product-list'>
					{
						this.props.data.map((item,index) => {
							return (
								<div className='item-container' key={index}>
									<ProductItem data={item} />
									<button onClick={this.clickHandler.bind(this,item._id)}>加入购物车</button>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
	clickHandler(storeId){
		this.props.addToStoreFn(storeId);
	}
}

export default ReceptionProductList