import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Swiper from './subpage/Swiper'
import Search from '../../../components/Search'
import ProductList from './subpage/ProductList'



class Home extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return(
			<div>
				<Swiper />
				<Search />
				<ProductList />
			</div>
		)
	}
}

export default Home;