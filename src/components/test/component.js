import React from 'react';
import ajax from '../../helpers/ajax';
import {ReactComponent, stateTracker, renderLogging, updateReports} from '../../../config';
import chainHOC from '../../helpers/chainHOC';

function Test (props) {
	console.log(props);
	function click () {
		const match = {
			id: props.urlMatchId,
			name: 'Test 1!', 
			ruleset: 'RULESET',
			city: 'BOSTON', 
			state: 'MA'
		}

		props.asyncEditMatch(match, (returnedMatch) => {
			console.log(returnedMatch)
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