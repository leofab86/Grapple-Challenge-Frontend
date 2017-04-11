import React from 'react';
import { connect } from 'react-redux';

import * as AppActions from '../actions/reduxActions';
const {ReactComponent, renderLogging, stateTracker, updateReports} = document.devConfig;
import Header from '../components/header';
import GlobalPopup from '../components/globalPopup';
import StateTracker from '../stateTracker/stateTracker';
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
		const urlAccount = this.props.children.props.params.account;
		const urlMatchId = this.props.children.props.params.matchId;
		const publicMatch = matches[urlMatchId];
		
		const Child = this.props.children.type;
		const childName = Child.displayName || Child.name;

		const props = {
			AccountPage: {
				urlAccount, email, name, isSignedIn, asyncLogin, asyncLogout, asyncSignup
			},
			NewChallenge: {
				...savedChallenge, ...auth, 
				newPopup, closePopup, saveChallenge, resetChallenge, asyncSaveChallenge, asyncGetUsers
			},
			HomePage: {
				matches
			},
			Challenge: {
				urlMatchId, publicMatch, ...savedChallenge
			},
			EditChallenge: {
				urlMatchId, ...publicMatch, asyncEditMatch
			},
			Test: {
				urlMatchId: this.props.children.props.params.matchId,
				asyncEditMatch
			},
			ReduxContainer: {id}
		}

		return (
			<div >
				{ (stateTracker) ? <StateTracker appState={{...this.props.appState}}/> : null }
				<Header {...{email, name, isSignedIn, asyncLogout, newPopup, closePopup}}/>
				<div className='container'>
					<Child {...props[childName]}/>
				</div>
				<GlobalPopup {...{...globalPopup, closePopup, asyncSignup, asyncLogin}}/>
				
			</div>
		);
	}
}

const MainContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(chainHOC(ViewContainer, ['stateTrackerHOC', 'updateReporterHOC']))

MainContainer.displayName = 'MainContainer';

export default MainContainer;

