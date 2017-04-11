import React, { PropTypes as is } from 'react';

const {ReactComponent, renderLogging} = window.GCCONF.client;
import chainHOC from '../helpers/chainHOC';


GenericComponent.propTypes = {

}

function GenericComponent (props) {

	function click () {}

	if(renderLogging) console.log('RENDERING GenericComponent')
	return (
		<div>
			<button onClick={click}>Click Me</button>
		</div>
	)
}

export default GenericComponent;

// class GenericComponent extends ReactComponent{
//	static propTypes = {}

// 	render() {
// 		if(renderLogging) console.log('RENDERING Generic Component');
// 		return(
// 			<div>
// 				<h1>Generic Component</h1>
// 			</div>
// 		);
// 	}
// }


//export default chainHOC(GenericComponent, ['stateTrackerHOC', 'updateReporterHOC']);