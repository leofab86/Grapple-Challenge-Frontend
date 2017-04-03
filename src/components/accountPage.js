import React, { PropTypes as is } from 'react';

import {ReactComponent, routerType, renderLogging, stateTracker, updateReports, debugging} from '../../config';
import Login from './loginForm';
import MyAccountContainer from '../containers/myAccountContainer';
import Tabs from './common/tabs';
import chainHOC from '../helpers/chainHOC';


class AccountPage extends ReactComponent{
	static propTypes = {	
		isSignedIn: is.bool,
		email: is.string,
		name: is.string,
		urlAccount: is.string,
		asyncLogin: is.func,
		asyncSignup: is.func,
		asyncLogout: is.func
	};

	componentWillMount(){
		const { email, urlAccount, popupProps, isSignedIn } = this.props;
		if(popupProps) return;	
		if(isSignedIn === true && urlAccount !== email) {
			routerType.push(`/account/${email}`)
		} else if (
			urlAccount && 
			urlAccount !== 'signup' &&
			urlAccount !== 'login' &&
			urlAccount !== email
		){
			routerType.push(`/account/login`)
		}
	}

	componentWillReceiveProps (nextProps) {
		if(this.props.isSignedIn == true && nextProps.isSignedIn == false)
			routerType.push(`/account/login`)
		if(this.props.isSignedIn == false && nextProps.isSignedIn == true)
			routerType.push(`/account/${nextProps.email}`)
	}

	render() {
		if(renderLogging) console.log('RENDERING AccountPage');
		const { popupProps, urlAccount, asyncLogin, asyncSignup, isSignedIn, email } = this.props;
		const { loginCallback, signupCallback, type, successUrl } = (popupProps) ? popupProps: {};
		const activeTab = (urlAccount === 'signup' || type === 'signup' ) ? 1 : 0;
		const grid = (popupProps) ? null 
		:	"col-xs-8 col-sm-8 col-md-6 col-lg-4 col-xs-offset-2 col-sm-offset-2 col-md-offset-3 col-lg-offset-4";

		return ( 
			(popupProps || isSignedIn !== true) ?
				<div className={grid}>
					<br/><br/>
					<Tabs activeTab={activeTab} tabs={['Login', 'Sign Up']} childProps={[
						{type:'login', label:'Please Login', asyncLogin, loginCallback}, 
						{type:'signup', label:'Please Signup', asyncSignup, signupCallback}
					]}>
						<Login successUrl={ successUrl || `http://${window.GCCONF.host}:${window.GCCONF.port}/` } />
					</Tabs>
				</div>
			: 
				<div className={grid}>
					<MyAccountContainer />
				</div> 
		)
	}
}

export default chainHOC(AccountPage, ['stateTrackerHOC', 'updateReporterHOC']);

