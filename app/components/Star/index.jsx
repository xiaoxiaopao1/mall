import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

/*
*	@props
*	stars	Number	
*/



class Star extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		const totalStars = this.totalStars(5);
		return(
			<div className='star'>
				{
					totalStars.map((item,index) => {
						const activeClass = item <= this.props.stars ? 'light' : '';
						const clickable = this.props.starClickFn ? 'clickable' : ''
						return (
							<i key={index} 
							   className={`icon-star ${activeClass} ${clickable}`}
							   onClick={this.clickHandler.bind(this,index + 1)} />
						)
					})
				}
			</div>
		)
	}
	componentDidMount(){
	}
	totalStars(count){
		const totalNum = new Array();
		for(let i = 0; i < count; i++){
			totalNum[i] = i + 1;
		};
		return totalNum;
	}
	clickHandler(stars){
		if (this.props.starClickFn) {
			this.props.starClickFn(stars);
		}
		
	}
}

export default Star