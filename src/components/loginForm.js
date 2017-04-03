import React, { PropTypes as is } from 'react';

import validator from '../helpers/validator';
import {ReactComponent, routerType, renderLogging, stateTracker, updateReports} from '../../config';
import TextInput from './common/textInput';
import chainHOC from '../helpers/chainHOC';


class Login extends ReactComponent{
	static propTypes = {
		callback: is.func,
		successUrl: is.string.isRequired,
		asyncLogin: is.func,
		asyncSignup: is.func,
		type: is.string,
		label: is.string
	};

	state = {
		name: '',
		email:'', 
		password: '',
		password_confirmation: '',
		confirm_success_url: this.props.successUrl,
		errors: {},
	}		

	inputHandler = (event) => {
		const { value, name } = event.target;
		this.setState({[name]: value, errors: {}});
	}

	submit = (event) => {
		event.preventDefault();
		const { state, props } = this;
		let validation = validator.loginForm(state, props.type);
		if(validation !== true) {
			this.setState({errors: validation});
		} else {
			const loginCallback = user => {
				(props.loginCallback) ? props.loginCallback(user) : routerType.push(`/account/${user.email}`)
			};
			const signupCallback = () => {
				(props.signupCallback) ? props.signupCallback() : routerType.push('/')
			}
			(props.type === 'signup') ? props.asyncSignup(state, signupCallback)
				: props.asyncLogin(state.email, state.password, loginCallback);
		}
	}

	render(){
		if(renderLogging) console.log('RENDERING Login form');
		let state = this.state;
		let label = this.props.label ? <h4>{this.props.label}</h4> : null;
		let submitLabel = 'Login';
		let passwordConfirm;
		let name;
		if(this.props.type === 'signup') {
			submitLabel = 'Sign Up';
			name =
				<TextInput 
					name="name"  
					placeholder="Name"
					type='text'  
					value={state.name} 
					onChange={this.inputHandler}
					error={state.errors.name}/>
			passwordConfirm =
				<TextInput 
					name="password_confirmation"  
					placeholder="Confirm Password"
					type='password'  
					value={state.password_confirmation}
					onChange={this.inputHandler}
					error={state.errors.password_confirmation}/>				
		}

		return(
			<div>
				<form>
					{label}
					{name}
					<TextInput 
						name="email"  
						placeholder="Email"
						type='email'  
						value={state.email} 
						onChange={this.inputHandler}
						error={state.errors.email}/>					
					<TextInput 
						name="password"  
						placeholder="Password"
						type='password'  
						value={state.password}
						onChange={this.inputHandler}
						error={state.errors.password}/>
					{passwordConfirm}
					<br/>
						
					<div className="centerButton">
						<input 
							type='submit' 
							value={submitLabel} 
							className='btn btn-success' 
							onClick={this.submit}/>
					</div>
				</form>	
			</div>
		);
	}
}

export default chainHOC(Login, ['stateTrackerHOC', 'updateReporterHOC']);