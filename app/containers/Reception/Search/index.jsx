import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { getSearchResult } from '../../../fetch/search/search'

import SearchComponent from '../../../components/Search'
import ProductList from './subpage/ProductList'

class Search extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			keyword: '',
			currentKeyword: '',
			data: null
		}
	}
	render(){
		return(
			<div>
				<SearchComponent currentKeyword={this.state.currentKeyword} />
				{
					this.state.data
					? this.state.data.length
					  ?  <ProductList />
					  : '没有找到相关产品'
					: ''
				}
			</div>
		)
	}
	componentDidMount(){
		this.resultHandler();
	}
	componentDidUpdate(){
		const keyword = this.props.params.keyword;
		if (keyword === this.state.currentKeyword) {
			return;
		}
		this.setState({
			currentKeyword: keyword
		})
		this.resultHandler();
	}
	resultHandler(){
		const keyword = this.props.params.keyword;
		this.setState({
			currentKeyword: keyword
		})
		const result = getSearchResult(keyword);
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

export default Search