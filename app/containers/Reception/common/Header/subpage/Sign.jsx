import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { addUser } from '../../../../../fetch/user/user'

import SignComponent from '../../../../../components/Sign'

class Sign extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			nameErr: false,
			controller: false
		}
	}
	render(){
		return(
			<div className='reception-sign-container'>
				<SignComponent nameErr={this.state.nameErr} 
							   controller={this.state.controller}
							   signNull={this.state.signNull}
							   addUserFn={this.addUserHandler.bind(this)} />
			</div>
		)
	}
	addUserHandler(name,password){
		const result = addUser(name,password);
		result.then(res => {
			return res.json();
		}).then(json => {
			if (json.errno == 0) {
				if (json.nameErr) {
					this.setState({
						nameErr: true,
						controller: !this.state.controller
					});
				}else{
					console.log('注册成功');
				}
			}
		})
	}
}

export default Sign