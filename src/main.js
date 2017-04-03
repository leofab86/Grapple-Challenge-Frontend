
import React from 'react';
import ReactDOM from 'react-dom';

import { renderApp } from './app';
import { authenticate, getAuthFromUrl } from './actions/authActions';

console.log('MAIN.js Entry Point');

authenticate( getAuthFromUrl(), returnedSession => {
	ReactDOM.render(renderApp(returnedSession), document.getElementById('app'));
})


