import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { getCommentList } from '../../../../fetch/comment/comment'

import CommentListComponent from '../../../../components/CommentList'

class CommentList extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data: null
		}
	}
	render(){
		return(
			<div>
				{
					this.state.data
					? this.state.data.length
					  ? <CommentListComponent data={this.state.data} />
					  : '该商品还没有评论信息'
					: ''
				}
			</div>
		)
	}
	componentDidMount(){
		this.resultHandler();
	}
	resultHandler(){
		const commentId = this.props.commentId;
		const result = getCommentList(commentId);
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

export default CommentList