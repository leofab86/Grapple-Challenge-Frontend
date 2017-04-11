import React, { PropTypes as is } from 'react';

const {ReactComponent, routerType, renderLogging} = window.GCCONF.client;
import TextInput from './common/textInput';
import chainHOC from '../helpers/chainHOC';

class EditChallenge extends ReactComponent {
	static propTypes = {
		urlMatchId: is.oneOfType([is.string, is.number]),
		id: is.number,
		name: is.string,
		ruleset: is.string,
		state: is.string,
		city: is.string,
		participants: is.array,
		asyncEditMatch: is.func
	};

	state = {
		id: this.props.id || '',
		name: this.props.name || '',
		ruleset: this.props.ruleset || '',
		state: this.props.state || '',
		city: this.props.city || ''
	}

	componentWillReceiveProps (nextProps) {
		const { id, name, ruleset, state, city } = nextProps;
		this.setState({ id, name, ruleset, state, city })
	}

	inputHandler = (event) => {
		const { name, value } = event.target;
		this.setState({[name]:value});
	}

	submit = () => {
		this.props.asyncEditMatch(this.state, () => {
			routerType.push(`/challenge/${this.state.id}`);
		})
	}

	render() {
		if(renderLogging) console.log('RENDERING EditChallenge');
		const grid = "col-xs-10 col-sm-10 col-md-8 col-lg-8 col-xs-offset-1 col-sm-offset-1 col-md-offset-2 col-lg-offset-2"
		const { name, ruleset, state, city, urlMatchId } = this.props;

		const renderInput = (name, label) => {
			return (
				<TextInput
					name={name}
					label={label}
					type="text"
					value={this.state[name]}
					onChange={this.inputHandler} />
			)
		}

		return (
			<div className={grid}>

				<div className='jumbotron'><h3>Edit Match: {name}</h3></div>

				{renderInput('name', 'Challenge Name:')}
				<br/>

				{renderInput('ruleset', 'RuleSet:')}
				<br/>

				{renderInput('state', 'State:')}
				<br/>

				{renderInput('city', 'City:')}
				<br/>

				<div className='centerButton'>
					<button className="btn btn-success" 
						onClick={this.submit}
						>Submit</button>				
				</div>

			</div>
		)
	}
}

export default chainHOC(EditChallenge, ['stateTrackerHOC', 'updateReporterHOC']);
