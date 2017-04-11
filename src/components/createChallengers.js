import React, { PropTypes as is } from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';

import validator from '../helpers/validator';
import {ReactComponent, renderLogging, stateTracker, updateReports} from '../../config';
import TextInput from './common/textInput';
import chainHOC from '../helpers/chainHOC';
import { accountInputs, inputs2State, renderInputs } from './common/accountSettings';


class CreateChallengers extends ReactComponent{
	static propTypes = {
		submit: is.func.isRequired,
		clear: is.func.isRequired,
		challengerName: is.string,
		challengerEmail: is.string,
		challengerAffiliation: is.string,
		challengerRank: is.string,
		challengerWeight: is.oneOfType([is.string, is.number]),
		asyncGetUsers: is.func.isRequired,
		saveChallenge: is.func.isRequired,
		participants: is.array.isRequired
	};

	constructor(props) {
		super();
		const { name:savedName, email:savedEmail, weight:savedWeight, affiliation:savedAffiliation, rank:savedRank
		} = props.participants[0] || {};
		this.state = {
			users: [],
			challenger: {...inputs2State(accountInputs),
				name: props.challengerName || savedName || '',
				email: props.challengerEmail || savedEmail || '',
				weight: props.challengerWeight || savedWeight || '',
				affiliation: props.challengerAffiliation || savedAffiliation || '',
				rank: props.challengerRank || savedRank || ''
			},
			opponent: props.participants[1] || {
				id: '',
				name: ''
			}
		}
	}

	componentDidMount () {
		this.props.asyncGetUsers(users => this.setState({users}))
	}

	componentWillReceiveProps (nextProps) {
		if(this.props.challengerName !== nextProps.challengerName) 
			this.setState({ 
				challenger: {...this.state.challenger, 
					name: nextProps.challengerName, 
					email: nextProps.challengerEmail,
					affiliation: nextProps.challengerAffiliation,
					rank: nextProps.challengerRank,
					weight: nextProps.challengerWeight 
				}
			});
	}

	componentWillUnmount () {
		this.props.saveChallenge({
			participants:[
				this.state.challenger, 
				this.state.opponent
			]
		})
	}

	inputHandler (combatant, input, event) {
		if (!window.onbeforeunload) window.onbeforeunload = e => e.returnValue;
		const value = event.target.value;
		const nextState = { ...this.state[combatant], [input]:value, errors:{} }
		this.setState({ [combatant]: nextState });
	}

	selectOpponent (selection) {
		this.setState({opponent:selection[0]})
	}

	render(){
		if(renderLogging) console.log('RENDERING CreateChallengers');
		const { state, props, selectOpponent } = this;
		
		return(
			<div className='videoGreen'>
				<div className='row'>
					<div className='leftColumn col-xs-12 col-sm-6'>
						<button 
							className="btn btn-default disabled createChallengersButtons"
							>Your Info</button>
						{accountInputs.map(renderInputs.bind(this, 'challenger'))}
					</div>
					<div className='rightColumn col-xs-12 col-sm-6'>
						<div className="btn-group">
							
							<button 
								className="btn btn-default disabled dropdown-toggle createChallengersButtons" 
								type="button" 
								data-toggle="dropdown" 
								aria-haspopup="true" 
								aria-expanded="false"
								>Invite Opponent
							</button>
						
							<ul className="dropdown-menu">
							</ul>
							
						</div>
						<br/>
						<label>User Name</label>
						<Typeahead
							selected={[state.opponent]}
							options={[...state.users]}
							onChange={selectOpponent.bind(this)}
							labelKey='name'
						/>
					</div>
				</div>					

				<div className='centerButton'>
					<button className="btn btn-success" 
						onClick={() => {props.submit(state.challenger, state.opponent)}}
						>Save and continue</button>				
					<button className="btn btn-danger"
						onClick={props.clear}>Reset</button>
				</div>
			</div>
		);
	}
}

export default chainHOC(CreateChallengers, ['stateTrackerHOC', 'updateReporterHOC']);

