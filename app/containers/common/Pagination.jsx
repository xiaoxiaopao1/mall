import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import PaginationComponent from '../../components/Pagination'

/*
*	分页组件
*	@props 
*	resultMethod	因为分页组件需要获取总数量，获取哪个列表的总数量不确定
*	pageChangeFn	用来向父组件反馈变化页码
*	itemCount 		单页产品个数
*/



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
					? <PaginationComponent itemCount={this.props.itemCount}
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
		const result = this.props.resultMethod(this.props.keyword || '');
		result.then(res => {
			return res.json();
		}).then(json => {
			if (json) {
				const count = json.count ? json.count : json;
				this.setState({
					count
				})
			}
		})
	}
}

export default Pagination