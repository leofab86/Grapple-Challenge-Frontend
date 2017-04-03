import React, { PropTypes as is } from 'react';
import { Link } from 'react-router';

import {ReactComponent, renderLogging, stateTracker, updateReports} from '../../config';
import chainHOC from '../helpers/chainHOC';
import AccountPage from './accountPage';


class Header extends ReactComponent{
	static propTypes = {
		email: is.string,
		name: is.string,
		isSignedIn: is.bool.isRequired,
		asyncLogout: is.func.isRequired,
		newPopup: is.func.isRequired,
		closePopup: is.func.isRequired
	}

	loginPopup = () => {
		this.props.newPopup({
			visible: true,
			wide: false,
			label: '',
			component: AccountPage,
			componentProps: {
				loginCallback: () => this.props.closePopup(),
				successUrl: window.location.href
			}
		})
	}

	signupPopup = () => {
		this.props.newPopup({
			visible: true,
			wide: false,
			label: '',
			component: AccountPage,
			componentProps: {
				type: 'signup',
				signupCallback: () => this.props.closePopup(),
				successUrl: window.location.href
			}
		})
	}

	render() {
		if(renderLogging) console.log('RENDERING Header');
		const accountLinks = (this.props.isSignedIn) ?
			<ul className="nav navbar-nav navbar-right">
				<li className="dropdown">
					<a 
						className="dropdown-toggle" 
						data-toggle="dropdown" 
						role="button" 
						aria-haspopup="true" 
						aria-expanded="false"
						>{this.props.name} <span className="caret"></span>
					</a>
					<ul className="dropdown-menu">
						<li><Link to={`/account/${this.props.email}`}>My Account</Link></li>
						<li role="separator" className="divider"></li>
						<li><a className='cursorPointer' onClick={this.props.asyncLogout}>Logout</a></li>
					</ul>
				</li>
			</ul>
		:
			<ul className="nav navbar-nav navbar-right">
				<li className="dropdown">
					<a 
						className="dropdown-toggle" 
						data-toggle="dropdown" 
						role="button" 
						aria-haspopup="true" 
						aria-expanded="false"
						>Account
					</a>
					<ul className="dropdown-menu">
						<li><a className='cursorPointer' onClick={this.loginPopup}>Login</a></li>
						<li><a className='cursorPointer' onClick={this.signupPopup}>Signup</a></li>
					</ul>
				</li>
			</ul>

		const header =
			<nav className="navbar navbar-default" role="navigation">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						
					</div>
					<Link to='/' className='navbar-brand'>Grapple Challenge</Link>
					<div className="collapse navbar-collapse" id="navbar-collapse-1">
						<ul className="nav navbar-nav navbar-left">
							<li><Link to='/'>Challenges</Link></li>
							<li><Link to='/newChallenge'>Create a Challenge</Link></li>
						</ul>
						{accountLinks}
					</div>
			</nav>

		return(header);
	}
}

export default chainHOC(Header, ['stateTrackerHOC', 'updateReporterHOC']);



