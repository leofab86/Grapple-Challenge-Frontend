import cookie from 'react-cookie';
import querystring from 'querystring';

import { ajaxLogging } from '../../config';
import ajax from '../helpers/ajax';
import { toastrMsg, errorHandler } from '../helpers/appHelpers';

export function updateHeaders (xhr, action) {
	const newToken = xhr.getResponseHeader('access-token');
	if (newToken === null) return;
	let badTokens = cookie.load('badTokens');
	if (!badTokens) {
		if(ajaxLogging) console.log('FIRST TIME, STARTING BATCH TIMER');
		cookie.save('batchTimer', {}, { path: '/', maxAge: 5 });
		badTokens = {};
	} else if (badTokens[action] == newToken) {
		if(ajaxLogging) console.log('BAD TOKEN!'); return;
	} else if (cookie.load('batchTimer')) {
		console.log('BATCH TIMER, SAVING BAD TOKEN');
		badTokens[action] = newToken;
		cookie.save('badTokens', badTokens, { path: '/' });
		return;
	}
	badTokens[action] = newToken;
	cookie.save('badTokens', badTokens, { path: '/' });
	cookie.save('authHeaders', {
		'access-token': newToken,
		client: xhr.getResponseHeader('client'),
		uid: xhr.getResponseHeader('uid'),
		expiry: xhr.getResponseHeader('expiry'),
		'token-type': xhr.getResponseHeader('token-type')
	}, { path: '/' });
	if(ajaxLogging) console.log(newToken);
}

export function signup (form, callback) {
	cookie.remove('batchTimer', { path: '/' });
	ajax.post('/auth/', form, form).then( argumentArray => {
		const email = argumentArray[0].data.email;
		toastrMsg('success', `An email confirmation has been sent to ${email}`);
		if (callback) callback();
	}).catch( e => errorHandler(e) )
}

export function login (email, password, callback){
	cookie.remove('batchTimer', { path: '/' });
	ajax.post('/auth/sign_in', {email, password}).then( argumentArray => {
		const xhr = argumentArray[2];
		const user = {...argumentArray[0].data, isSignedIn: true};
		updateHeaders(xhr, 'login');
		if (callback) callback(user);
	}).catch( e => errorHandler(e) )
}

export function logout () {
	const headers = cookie.load('authHeaders');
	cookie.remove('authHeaders', { path: '/' });
	cookie.remove('batchTimer', { path: '/' });
	ajax.delete('/auth/sign_out', headers).catch( e => errorHandler(e) )
}

export function authenticate (authTokens, callback) {
	const authHeaders = (authTokens) ? authTokens : cookie.load('authHeaders');
	if(!authHeaders) return callback();
	ajax.get('/auth/validate_token', authHeaders)
	.then( argumentArray => {
		const xhr = argumentArray[2];
		const user = {...argumentArray[0].data, isSignedIn: true};
		updateHeaders(xhr, 'authenticate');
		callback(user)
	}).catch( e => {
		console.error(e);
		cookie.remove('authHeaders', { path: '/' });
		callback({isSignedIn: false})
	})
}

export function getAuthFromUrl() {
	const parsedUrl = querystring.parse(window.location.href);
	const authHeaders = (parsedUrl.token) ? {
		client: parsedUrl.client_id,
		'access-token': parsedUrl.token,
		uid: parsedUrl.uid
	} : null;
	return authHeaders
}
