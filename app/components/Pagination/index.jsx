import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Pagination extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			pageNum: [],
			activeNum: 1
		}
	}
	render(){
		return(
			<div className='pagination-container'>
				<div className='pagination'>
					{
						this.state.pageNum.length
						? <div>
							<span className='total-num'>共{this.state.pageNum.length}页</span>
							{
								this.state.pageNum.map((item,index) => {
									return(
										<span className={(this.state.activeNum == index + 1) ? 'item active' : 'item'} 
											  key={index}
											  onClick={this.pageChangeHandler.bind(this,index + 1)}>{item}</span>
									)
								})
							}
						  </div>
						: ''
					}
				</div>
			</div>
		)
	}
	componentDidMount(){
		this.resultHandler();
	}
	componentDidUpdate(prevProps,PrevState){
		if (this.props.count == prevProps.count) {
			return;
		}
		this.resultHandler();
	}
	resultHandler(){
		const pageNum = [];
		const totalNum = Math.ceil(this.props.count / this.props.itemCount);
		for(let i = 0; i < totalNum; i++ ){
			pageNum[i] = i + 1;
		}

		if (pageNum.length < this.state.activeNum) {
			this.setState({
				activeNum: pageNum.length
			})
		}
		this.setState({
			pageNum
		})
	}
	pageChangeHandler(pageNum){
		this.setState({
			activeNum: pageNum
		});
		const pageChangeFn = this.props.pageChangeFn;
		pageChangeFn(pageNum);
	}
}

export default Pagination