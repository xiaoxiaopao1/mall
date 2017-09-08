import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { getProductCount } from '../fetch/product/product'

import PaginationComponent from '../components/Pagination'

class Pagination extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			count: 0
		}
	}
	render(){
		return(
			<div>
				{
					this.state.count
					? <PaginationComponent data={this.props.data}
										   itemCount={this.props.itemCount}
										   count={this.state.count}
										   pageChangeFn={this.props.pageChangeFn} />
				    : ''
				}
			</div>
		)
	}
	componentDidMount(){
		this.resultHanlder();
	}
	componentDidUpdate(prevProps,prevState){
		if (this.props.data == prevProps.data) {
			return;
		}
		this.resultHanlder();
	}
	resultHanlder(){
		const result = getProductCount();
		result.then(res => {
			return res.json();
		}).then(json => {
			const count = json;
			this.setState({
				count
			})
		})
	}
}

export default Pagination