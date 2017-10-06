import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { getCommentList } from '../../../fetch/comment/comment'


import ProductInfo from './subpage/ProductInfo'
import CommentList from './subpage/CommentList'

class Detail extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.listStyle = {
			width: '60%',
			margin: '0 auto'
		}
		this.state = {
			commentId: ''
		}
	}
	render(){
		return(
			<div>
				{
					this.state.commentId
					? <div>
						<ProductInfo commentId={this.state.commentId} />
						<div style={this.listStyle}>
							<CommentList commentId={this.state.commentId} />
						</div>
					  </div>
					: ''
				}
			</div>
		)
	}
	componentDidMount(){
		const id = this.props.params.id;
		this.setState({
			commentId: id
		})
		// this.resultHandler();
	}
	resultHandler(){
		const id = this.props.params.id;
		const result = getCommentList(id);
		result.then(res => {
			return res.json();
		}).then(json => {
			console.log(json);
		})
	}
}

export default Detail