import { signup, login, logout } from './authActions';
import { getUsers, editUser, getMatches, postMatch, editMatch } from './apiActions';
import { AUTH, POPUP, CHALLENGE, MATCHES_GET, MATCHES_ADD } from './constants';

// ------------ Redux Actions -------------
export function newSession(userObj) {
	return {type: AUTH, userObj}
}

export function clearSession() {
	return { type: AUTH, userObj: {
		isSignedIn: false,
		id: '',
		email: '',
		name: '',
		uid: '',
		affiliation: '',
		rank: '',
		weight: ''
	}}
}

export function newPopup(popupObj) {
	return { type: POPUP, popupObj}
}

export function closePopup() {
	return { type: POPUP, popupObj: { visible:false }}
}

export function saveChallenge (challengeObj) {
	return { type: CHALLENGE, challengeObj }
}

export function resetChallenge () {
	return { type: CHALLENGE, challengeObj: { matchName:'', participants: [] } }
}

export function storeMatches (matches) {
	return { type: MATCHES_GET, matches }
}

export function addMatch (match) {
	return { type: MATCHES_ADD, match }
}

//------------- Async Actions ------------
export function asyncLogin (email, password, callback) {
	return function (dispatch) {
		login(email, password, function (session) {
			dispatch(newSession(session));
			getMatches( matches => dispatch(storeMatches(matches))); // <==== TEMPORARY
			if(callback) callback(session)
		})
	}
}

export function asyncSignup (form, callback) {
	return function (dispatch) {
		signup(form, callback);
	}
}

export function asyncLogout () {
	return function (dispatch) {
		dispatch(clearSession());
		logout()
	}
}

export function asyncSaveChallenge (challenge, callback) {
	return function (dispatch) {	
		dispatch(saveChallenge(challenge))
		const match = {
			user_id: challenge.user_id, 
			name: challenge.matchName, 
			users_matches_attributes: challenge.participants
		};
		postMatch(match, function(returnedMatch){
			dispatch(addMatch(returnedMatch));
			dispatch(saveChallenge({...challenge, matchName:returnedMatch.name, matchId:returnedMatch.id}));
			callback(returnedMatch.id);
		})
	}
}

export function asyncGetUsers (callback, id) {
	return function (dispatch) {
		getUsers(users => {
			callback(users)
		}, id)
	}
}

export function asyncEditUser (user, callback) {
	return function (dispatch) {
		editUser( user, returnedUser => {
			dispatch( newSession(returnedUser) );
			callback(returnedUser)
		})
	}
}

export function asyncEditMatch (match, callback) {
	return function (dispatch) {
		editMatch( match, returnedMatch => {
			dispatch( addMatch(returnedMatch) );
			callback(returnedMatch)
		})
	}
}

// export function asyncGetMatches () {
// 	return function (dispatch) {
// 		getMatches( null, function(matches){
// 			console.log('GOT MATCHES, dispatching:');
// 			dispatch(storeMatches(matches))
// 		})
// 	}
// }

// export function asyncGetMatch (matchId) {
// 	return function(dispatch) {
// 		getMatches( matchId, match => {
// 			dispatch(saveChallenge(match))
// 		})
// 	}
// }
