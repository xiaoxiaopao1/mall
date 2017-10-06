import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Star from '../Star';

import './style.less'

class CommentList extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);	
	}
	render(){
		const data = this.props.data;
		return(
			<div className='comment-list'>
				{
					data.map((item,index) => {
						return(
							<li className='comment-item' key={index}>
								<span className='user'>{item.name}</span>
								<span className='star-container'><Star stars={item.commentStar} /></span>
								<p className='comment-word'>{item.comment}</p>
							</li>
						)
					}) 
				}
			</div>
		)
	}
}

export default CommentList