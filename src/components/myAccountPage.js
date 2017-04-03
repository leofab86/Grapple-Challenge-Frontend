import React, { PropTypes as is } from 'react';

import {ReactComponent, stateTracker, renderLogging, updateReports} from '../../config';
import chainHOC from '../helpers/chainHOC';
import { toastrMsg } from '../helpers/appHelpers';
import { accountInputs, inputs2State, renderInputs } from './common/accountSettings';


class MyAccountPage extends ReactComponent{
	static propTypes = {
		email: is.string.isRequired,
		name: is.string.isRequired,
		affiliation: is.string,
		weight: is.oneOfType([is.string, is.number]),
		rank: is.string,
		id: is.oneOfType([is.string, is.number]).isRequired,
		isSignedIn: is.bool.isRequired,
		asyncEditUser: is.func.isRequired
	};

	constructor (props) {
		super();
		const { name, email, weight, affiliation, rank } = props;
		this.state = {...inputs2State(accountInputs), name, email, weight, affiliation, rank}
	}

	inputHandler = (input, event) => {
		const value = event.target.value;
		this.setState({ [input]: value, errors: {}});
	}

	submit = () => {
		this.props.asyncEditUser({...this.state, id:this.props.id}, function(user) {
			toastrMsg('success', 'User Update Successful!')
		})
	}

	render() {
		if(renderLogging) console.log('RENDERING MyAccountPage');
		return(
			<div>
				<h1>Hello {this.props.name}</h1>
				<hr/>
				<h3>My info:</h3>
				{accountInputs.map(renderInputs.bind(this, null))}
				<button className='btn btn-success' onClick={this.submit}>Save</button>
			</div>
		);
	}
}


export default chainHOC(MyAccountPage, ['stateTrackerHOC', 'updateReporterHOC']);