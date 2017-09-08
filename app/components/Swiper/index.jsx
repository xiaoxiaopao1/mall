import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import ReactSwipe from 'react-swipe';



class Swiper extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		const data = this.props.data,
			  opt = {
					auto: 3000,
					continuous: true
				};

		// 往图片信息中添加图片路径属性
		// 路径属性这样添加，是为了不改变props
		const newData = data.map((item,index) => {
			const newItem = {};
			newItem.title = item.title;
			newItem.url = require(`../../static/images/poster/${item.title}`);
			return newItem ;
		})
		return(
			<div>
				<ReactSwipe swipeOptions={opt}>
					{
						newData.map((item,index) => {
							return(
								<div className='carousel-item' key={index}>
									<img src={item.url} alt={item.title} style={{width: '100%'}} />
								</div>
							)
						})
					}
				</ReactSwipe>
			</div>
		)
	}
}	

export default Swiper