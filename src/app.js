import React from 'react';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute } from 'react-router';

const {routerType, renderLogging, reduxDevtools} = document.devConfig;
import {AUTH, POPUP, CHALLENGE, MATCHES_GET, MATCHES_ADD} from './actions/constants';
import { newSession, storeMatches } from './actions/reduxActions';
import { getMatches } from './actions/apiActions';
import MainContainer from './containers/mainContainer';
import HomePage from './components/homePage';
import AccountPage from './components/accountPage';
import NewChallenge from './components/newChallenge';
import Challenge from './components/challenge';
import EditChallenge from './components/editChallenge';
import Test from './components/test/component';
import ReduxContainer from './components/test/reduxContainer';


const mainReducer = combineReducers({
	auth: authReducer,
	globalPopup: popupReducer,
	savedChallenge: challengeReducer,
	matches: matchesReducer
})

function authReducer ( state = { isSignedIn: false }, action) {
	switch (action.type) {
		case AUTH:
			return {...state, ...action.userObj}
		default:
			return state
	}
}

function popupReducer ( state = {
	visible: false,
	wide: false,
	label: '',
	component: () => {},
	componentProps: {}
}, action) {
	switch (action.type) {
		case POPUP:
			return {...state, ...action.popupObj}
		default:
			return state
	}
}

function challengeReducer ( state = {
	matchName: '',
	city: '',
	state: '',
	ruleset: '',
	participants: []
}, action) {
	switch (action.type) {
		case CHALLENGE:
			return {...state, ...action.challengeObj}
		default:
			return state
	}
}

function matchesReducer ( state = {}, action ) {
	switch (action.type) {
		case MATCHES_GET: {
			let matches = {};
			action.matches.map(match => {
				matches[match.id] = match
			})
			return matches
		}
		case MATCHES_ADD:
			return { ...state, [action.match.id]:action.match }

		default:
			return state
	}
}

let store;
if (reduxDevtools) {
	store = createStore(
		mainReducer,
		composeWithDevTools( 
			applyMiddleware(thunk),
	));
} else {
	store = compose(
		applyMiddleware(thunk)
	)(createStore)(mainReducer);
}

class AppRouter extends React.Component{
	render() {
		if(renderLogging) console.log('RENDERING ROUTER');
		return(
			<Router history={routerType}>
				<Route path='/' component={MainContainer}>
					<IndexRoute component={HomePage} />
					<Route path='/newChallenge' component={NewChallenge} />
					<Route path='/account/:account' component={AccountPage} />
					<Route path='/challenge/:matchId' component={Challenge} />
					<Route path='/challenge/edit/:matchId' component={EditChallenge} />
					<Route path='/test' component={Test} />
					<Route path='/redux' component={ReduxContainer} />
				</Route>
			</Router>
		);
	}
}

export function renderApp(user) {
	store.dispatch(newSession(user));
	getMatches(matches => store.dispatch(storeMatches(matches)));

	return (
		<Provider store={store} key="provider">
			<AppRouter />
		</Provider>
	);
}



//--------------TEST DISPATCH ACTIONS-------------------

// console.log(store.getState())
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// );

//store.dispatch(AppActions.newPopup({visible:true}))



