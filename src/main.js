import React from 'react';
import ReactDOM from 'react-dom';

document.devConfig = require('../config');
const { renderApp } = require('./app');
const { authenticate, getAuthFromUrl } = require('./actions/authActions');

console.log('MAIN.js Entry Point');


authenticate( getAuthFromUrl(), returnedSession => {
	ReactDOM.render(renderApp(returnedSession), document.getElementById('app'));
})


