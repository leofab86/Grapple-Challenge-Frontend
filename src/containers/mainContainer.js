import React from 'react';
import { connect } from 'react-redux';

import * as AppActions from '../actions/reduxActions';
import {ReactComponent, renderLogging, stateTracker, updateReports} from '../../config';
import Header from '../components/header';
import GlobalPopup from '../components/globalPopup';
import StateTracker from '../stateTracker/stateTracker';
import NewChallenge from '../components//NewChallenge';
import chainHOC from '../helpers/chainHOC';


const mapStateToProps = (appState) => {
	return {appState}
}

const mapDispatchToProps = (dispatch) => {
	let dispatcher = {};
	for (var key in AppActions) {
		const action = AppActions[key];
		dispatcher[key] = (param1, param2, param3) => {
			dispatch(action(param1, param2, param3))
		}
	}
	return {dispatcher}
}

class ViewContainer extends ReactComponent{
	
	render(){
		if(renderLogging) console.log('RENDERING: ViewContainer');				
		
		//Destructure all dispatchable redux functions that components need to use
		const {asyncEditMatch,asyncLogin,asyncSignup,asyncLogout,asyncSaveChallenge,asyncGetUsers,asyncGetMatches,newPopup,closePopup,saveChallenge,resetChallenge 
		} = this.props.dispatcher;

		const { globalPopup, auth, savedChallenge, matches } = this.props.appState;
		const { email, name, isSignedIn, id, affiliation, rank, weight} = auth;
		const Child = this.props.children.type;
		const urlAccount = this.props.children.props.params.account;
		const urlMatchId = this.props.children.props.params.matchId;
		const publicMatch = matches[urlMatchId];
		let props;

		switch( Child.displayName || Child.name ){
			case 'AccountPage':
				props = {
					email, name, isSignedIn, urlAccount,
					asyncLogin, asyncLogout, asyncSignup
				};
				break;
			case 'NewChallenge':
				props = {
					...savedChallenge, name, id, isSignedIn, email, affiliation, rank, weight,
					newPopup, closePopup, saveChallenge, resetChallenge, asyncSaveChallenge, asyncGetUsers
				};
				break;
			case 'HomePage':
				props = {matches}
				break;
			case 'Challenge':
				props = {
					...savedChallenge, urlMatchId, publicMatch
				}
				break;
			case 'EditChallenge':
				props = {urlMatchId, ...publicMatch, asyncEditMatch};
				break;
			case 'Test':
				props = {urlMatchId, asyncEditMatch}
				break;
			case 'ReduxContainer':
				props = {id}
				break;
			default:
				//no op
		}

		return (
			<div >
				{ (stateTracker) ? <StateTracker appState={{...this.props.appState}}/> : null }
				<Header {...{email, name, isSignedIn, asyncLogout, newPopup, closePopup}}/>
				<div className='container'>
					<Child {...props}/>
				</div>
				<GlobalPopup {...{...globalPopup, closePopup, asyncSignup, asyncLogin}}/>
				
			</div>
		);
	}
}

const ViewContainer_HOC = chainHOC(ViewContainer, ['stateTrackerHOC', 'updateReporterHOC']);

const MainContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ViewContainer_HOC)

MainContainer.displayName = 'MainContainer';

export default MainContainer;

