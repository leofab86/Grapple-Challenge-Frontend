import cookie from 'react-cookie';

import ajax from '../helpers/ajax';
import { errorHandler } from '../helpers/appHelpers';
import { updateHeaders } from './authActions';

export function getUsers (callback, id = '') {
	ajax.get(`/api/users/${id}`, cookie.load('authHeaders')).then(argumentArray =>{
		const [ users, , xhr ] = argumentArray;
		updateHeaders(xhr, 'getUsers');
		callback(users)
	}).catch( e => {
		updateHeaders(e, 'getUsers');
		errorHandler(e)
	})
}

export function editUser (user, callback) {
	ajax.put(`/api/users/${user.id}`, cookie.load('authHeaders'), {user}).then(argumentArray=>{
		const [ user, , xhr ] = argumentArray;
		updateHeaders(xhr, 'editUser');
		callback(user)
	}).catch( e => {
		updateHeaders(e, 'editUser');
		errorHandler(e)
	})
}

export function getMatches (callback, matchId = '') {
	ajax.get(`/api/matches/${matchId}`, cookie.load('authHeaders')).then(argumentArray =>{
		const [ matches, , xhr ] = argumentArray;
		updateHeaders(xhr, 'getMatches');
		callback(matches)
	}).catch( e => {
		updateHeaders(e, 'getMatches');
		errorHandler(e)
	})
}

export function postMatch (match, callback) {
	ajax.post('/api/matches', cookie.load('authHeaders'), {match}).then(argumentArray => {
		const [ newMatch, , xhr ] = argumentArray;
		updateHeaders(xhr, 'postMatch');
		callback(newMatch)
	}).catch( e => {
		updateHeaders(e, 'postMatch');
		errorHandler(e)
	})
}

export function editMatch (match, callback) {
	ajax.put(`/api/matches/${match.id}`, cookie.load('authHeaders'), {match}).then(argumentArray => {
		const [ match, , xhr ] = argumentArray;
		updateHeaders(xhr, 'editMatch');
		callback(match)
	}).catch( e => {
		updateHeaders(e, 'editMatch');
		errorHandler(e)
	})
}