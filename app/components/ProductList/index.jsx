import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import ProductItem from '../ProductItem'

import './style.less'

class ProductList extends React.Component {
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
									<button onClick={this.updateHanlder.bind(this,item._id)}>更新</button>
									<button onClick={this.delHandler.bind(this,item._id)}>删除</button>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
	delHandler(_id){
		this.props.delFn(_id);
	}
	updateHanlder(_id){
		this.props.updateFn(_id);
	}
}

export default ProductList