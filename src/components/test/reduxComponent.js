import React from 'react';
const {ReactComponent, renderLogging} = window.GCCONF.client;
import cookie from 'react-cookie';
import ajax from '../../helpers/ajax';
import chainHOC from '../../helpers/chainHOC';
import {Typeahead} from 'react-bootstrap-typeahead';

class ReduxComponent extends ReactComponent {


	getMatch = () => {
		const session = cookie.load('authHeaders');
		const user_id = this.props.id;
		ajax.get('/api/matches/174', cookie.load('authHeaders')).then(function(argumentArray){
			console.log('SUCCESS');

		}).catch(function(e) {
			console.error(e)
		})
	}

	render() {
		if(renderLogging) console.log('RENDERING ReduxComponent')
		
		return (
			<div>
				<button onClick={this.getMatch}>Get Match</button>
			</div>
		)



	}
}


export default chainHOC(ReduxComponent, ['stateTrackerHOC']);