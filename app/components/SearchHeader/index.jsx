import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { hashHistory } from 'react-router';

class SearchHeader extends React.Component {
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
				<span>搜索商品</span>
				<input value={this.state.value}
					   onChange={this.changeHandler.bind(this)} />
				<span onClick={this.clickHandler.bind(this)}><i className='icon-search' /></span>
			</div>
		)
	}
	changeHandler(e){
		this.setState({
			keyword: e.target.value
		})
	}
	clickHandler(){
		hashHistory.push(`/search/all/${encodeURIComponent(this.state.keyword)}`);
	}
}

export default SearchHeader