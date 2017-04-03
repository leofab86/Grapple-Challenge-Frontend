import cookie from 'react-cookie';

import ajax from '../helpers/ajax';
import { errorHandler } from '../helpers/appHelpers';
import { updateHeaders } from './authActions';

export function getUsers (callback, id = '') {
	ajax.get(`/api/users/${id}`, cookie.load('authHeaders')).then(argumentArray =>{
		const [ users, , xhr ] = argumentArray;
		updateHeaders(xhr);
		callback(users)
	}).catch( e => {
		updateHeaders(e);
		errorHandler(e)
	})
}

export function editUser (user, callback) {
	ajax.put(`/api/users/${user.id}`, cookie.load('authHeaders'), {user}).then(argumentArray=>{
		const [ user, , xhr ] = argumentArray;
		updateHeaders(xhr);
		callback(user)
	}).catch( e => {
		updateHeaders(e);
		errorHandler(e)
	})
}

export function getMatches (callback, matchId = '') {
	ajax.get(`/api/matches/${matchId}`, cookie.load('authHeaders')).then(argumentArray =>{
		const [ matches, , xhr ] = argumentArray;
		updateHeaders(xhr);
		callback(matches)
	}).catch( e => {
		updateHeaders(e);
		errorHandler(e)
	})
}

export function postMatch (match, callback) {
	ajax.post('/api/matches', cookie.load('authHeaders'), {match}).then(argumentArray => {
		const [ newMatch, , xhr ] = argumentArray;
		updateHeaders(xhr);
		callback(newMatch)
	}).catch( e => {
		updateHeaders(e);
		errorHandler(e)
	})
}

export function editMatch (match, callback) {
	ajax.put(`/api/matches/${match.id}`, cookie.load('authHeaders'), {match}).then(argumentArray => {
		const [ match, , xhr ] = argumentArray;
		updateHeaders(xhr);
		callback(match)
	}).catch( e => {
		updateHeaders(e);
		errorHandler(e)
	})
}