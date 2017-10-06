import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import SearchComponent from '../../../components/Search'
import ProductList from './subpage/ProductList'

class Search extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			keyword: ''
		}
	}
	render(){
		return(
			<div>
				<SearchComponent keyword={this.state.keyword} />
				{
					this.state.keyword
					? <ProductList keyword={this.state.keyword} />
					: '没有找到相关产品'
				}
			</div>
		)
	}
	componentDidMount(){
		this.resultHandler();
	}
	componentDidUpdate(){
		const keyword = this.props.params.keyword;
		if (keyword === this.state.keyword) {
			return;
		}
		this.resultHandler();
	}
	resultHandler(){
		const keyword = this.props.params.keyword;
		this.setState({
			keyword
		})
	}
}

export default Search