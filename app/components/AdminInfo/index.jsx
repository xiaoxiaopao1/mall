import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { Link } from 'react-router';

import adminHeader from '../../static/images/adminHeader/site.jpg'

import './style.less'

class AdminInfo extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			isDark: true,
			activeCircle: ''
		}
	}
	render(){
		const isDarkClass = this.state.isDark ? 'dark' : 'light'
		return(
			<div className={`adminInfo ${isDarkClass}`}>
				<div className='author-container'>
					<img src={adminHeader} />
					<span>{this.props.data}</span>
				</div>
				<ul className='nav-list'>
					<li className='nav-item'>
						<Link to='/admin'>产品列表</Link>
					</li>
					<li className='nav-item'>
						<Link to='/admin/addProduct'>添加产品</Link>
					</li>
				</ul>
				<div className='switch-btn' onClick={this.clickHandler.bind(this)}>
					<span className={`circle ${this.state.activeCircle}`}></span>
					<span className='word'>{this.state.isDark ? 'Light' : 'Dark'}</span>
				</div>
			</div>
		)
	}
	clickHandler(){
		if (this.state.isDark) {
			this.setState({
				activeCircle: 'left-to-right'
			})
		}else{
			this.setState({
				activeCircle: 'right-to-left'
			})
		}

		this.setState({
			isDark: !this.state.isDark
		})

	}
}

export default AdminInfo