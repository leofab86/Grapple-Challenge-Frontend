import React from 'react';
import cookie from 'react-cookie';

import ajax from '../../helpers/ajax';
import { errorHandler } from '../../helpers/appHelpers';
import { updateHeaders } from '../../actions/authActions';
import {ReactComponent, stateTracker, renderLogging, updateReports} from '../../../config';
import chainHOC from '../../helpers/chainHOC';

function Test (props) {
	function click () {
		$.ajax({
			url: '/api/users',
			type: 'GET',
			headers: cookie.load('authHeaders'),
			success: function (param1, param2, param3) {
				console.log(param3.getResponseHeader('access-token'));
				updateHeaders(arguments[2])
				//success(arguments);
			},
			error: function(e) {
				console.log(arguments, e.getResponseHeader('access-token'));
				//error(e);
			}
		})
	}

	if(renderLogging) console.log('RENDERING GenericComponent')
	return (
		<div>
			<button onClick={click}>Click Me</button>
		</div>
	)
}

export default Test;

// class Test extends ReactComponent{

// 	render() {
// 		if(renderLogging) console.log('RENDERING Generic Component');
// 		return(
// 			<div>
// 				<h1>Generic Component</h1>
// 			</div>
// 		);
// 	}
// }


//export default chainHOC(Test, ['stateTrackerHOC', 'updateReporterHOC']);