import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { hashHistory } from 'react-router'

import ProductItem from '../ProductItem'
import ButtonStore from '../../containers/Reception/common/ButtonStore'


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
									<button onClick={this.goDetailHandler.bind(this,item._id)}>查看详情</button>
									<ButtonStore storeId={item._id}/>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
	goDetailHandler(_id){
		hashHistory.push(`/detail/${_id}`);
	}
}

export default ReceptionProductList