import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'


import Star from '../Star';

import './style.less';

class StoreItem extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		// commentState为0,1,2	0代表未评价，1代表评价中，2代表已评价
		this.state = {
			count: 1,
			hasCounted: false,
			commentState: 0,
			commentContent: '',
			stars: 0
		}
	}
	render(){
		const data = this.props.data;
		const newData = this.addRouter(data);
		const totalPrice = newData.price * this.state.count;
		return(
			<div className='store-comment'>
				<ul className='store-item'>
					<li>
						<img className='pic' src={newData.url} />
					</li>
					<li>
						<p>{newData.title}</p>
					</li>
					<li>
						<p>￥{newData.price}</p>
					</li>
					<li>
						<span className='reduce-btn' onClick={this.countReduce.bind(this)}>-</span>
						<input className='count-input'
							   value={this.state.count}
							   onChange={this.countHandler.bind(this)} />
						<span className='add-btn' onClick={this.countAdd.bind(this)}>+</span>
					</li>
					<li>
						<p>￥{totalPrice}</p>
					</li>
					<li>
						{
							this.state.hasCounted
							? <button className='settlement-btn'>已结算</button>
							: <button className='settlement-btn' onClick={this.accountsHandler.bind(this)}>结算</button>
						}
					</li>
					<li>
						<button className='del-btn' onClick={this.delHandler.bind(this)}>删除</button>
					</li>
					<li>
						{
							this.state.hasCounted
							? this.state.commentState == 0
							  ? <button className='comment-btn'onClick={this.commentHandler.bind(this)}>评价</button>
							  :	this.state.commentState == 1
							  	? <button className='comment-btn'>评价中</button>
							  	: <button className='comment-btn'>已评价</button>
							: ''
						}
					</li>
				</ul>
				{
					this.state.commentState == 1
					? <div className='comment'>
							<div className='comment-level'>
								<span className='comment-word'>满意程度: </span>
								<span className='comment-star'>
									<Star starClickFn={this.starClickHandler.bind(this)}
										  stars={this.state.stars} />
								</span>
							</div>
							<textarea className='comment-content'
									  value={this.state.commentContent}
									  onChange={this.commentContentHandler.bind(this)} />
							<button onClick={this.confirmHandler.bind(this)}>确定</button>
							<button onClick={this.cancleHandler.bind(this)}>取消</button>
					  </div>
					: ''
				}
			</div>
		)
	}
	componentDidMount(){
		this.setState({
			hasCounted: this.props.storeData.hasCounted
		});
		if (this.props.storeData.hasCommented) {
			this.setState({
				commentState: 2
			})
		}
	}
	componentDidUpdate(prevProps,prevState){
		if (this.props.storeData.hasCounted != prevProps.storeData.hasCounted) {
			this.setState({
				hasCounted: this.props.storeData.hasCounted
			});
		}
	}
	countHandler(e){
		this.setState({
			count: e.target.value
		})
	}
	countReduce(){
		if (this.state.count > 0) {
			this.setState({
				count: this.state.count - 1
			})
		}
	}
	countAdd(){
		this.setState({
			count: this.state.count + 1
		})
	}
	accountsHandler(){
		const data = this.props.data;
		const id = this.props.storeData.storeId,
			  price = data.price,
			  count = this.state.count;
		this.props.countFn(id,price,count);
	}
	delHandler(){
		this.props.delFn(this.props.storeData.storeId);
	}
	commentHandler(){
		this.setState({
			commentState: 1
		});
	}
	starClickHandler(stars){
		this.setState({
			stars
		});
	}
	commentContentHandler(e){
		this.setState({
			commentContent: e.target.value
		});
	}
	confirmHandler(){
		const commentId = this.props.data._id,
			  commentStar = this.state.stars,
			  comment = this.state.commentContent;
		this.props.addToCommentFn(commentId,commentStar,comment,this.confirmCallBack.bind(this));
	}
	confirmCallBack(){
		this.setState({
			commentState: 2
		})
	}
	cancleHandler(){
		this.setState({
			commentState: 0
		})
	}

	//添加图片路径属性
	addRouter(item){
		item.url = require('../../static/images/product/' + item.alias);
		return item;
	}
}

export default StoreItem