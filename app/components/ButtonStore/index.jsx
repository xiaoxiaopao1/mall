import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class ButtonStore extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return(
			<button className='store-btn' onClick={this.clickHandler.bind(this)}>加入购物车</button>
		)
	}
	clickHandler(){
		this.props.addToStoreFn();
	}
}

export default ButtonStore