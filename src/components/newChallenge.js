import React, { PropTypes as is } from 'react';

const {ReactComponent, routerType, renderLogging, updateReports} = window.GCCONF.client;
import TextInput from './common/textInput';
import CreateChallengers from './createChallengers';
import AccountPage from './accountPage';
import chainHOC from '../helpers/chainHOC';

class NewChallenge extends ReactComponent {
	static propTypes = {
		//SavedChallenge
		matchName: is.string,
		city: is.string,
		state: is.string,
		ruleset: is.string,
		participants: is.array,
		//User
		name: is.string,
		email: is.string,
		id: is.oneOfType([is.string, is.number]),
		isSignedIn: is.bool,
		affiliation: is.string,
		rank: is.string,
		weight: is.oneOfType([is.string, is.number]),
		//Functions
		saveChallenge: is.func,
		resetChallenge: is.func,
		newPopup: is.func,
		closePopup: is.func,
		asyncSaveChallenge: is.func,
		asyncGetUsers: is.func
	};

	state = {
		matchName: this.props.matchName, 
		city: this.props.city,
		state: this.props.state,
		ruleset: this.props.ruleset,
		participants: this.props.participants
	}

	componentWillUnmount () {
		if(updateReports.update) console.warn('NewChallenge component causes double render of ViewContainer when unmounting');
		this.props.saveChallenge(this.state)
	}

	inputHandler = (event) => {
		if (!window.onbeforeunload) window.onbeforeunload = e => e.returnValue;
		const { name, value } = event.target;
		this.setState({[name]:value});
	}

	submit = (challenger, opponent) => {
		if (!this.props.isSignedIn) {
			this.props.newPopup({
				visible: true,
				wide: false,
				label: '',
				component: AccountPage,
				componentProps: {
					loginCallback: () => this.props.closePopup(),
					signupCallback: () => this.props.closePopup(),
					successUrl: window.location.href
				}
			})
		} else {
			this.props.asyncSaveChallenge({
				user_id: this.props.id,
				matchName: this.state.matchName,
				participants: [
					{user_id:this.props.id},
					{user_id:opponent.id}
				]
			}, matchId => routerType.push(`/challenge/edit/${matchId}`));
		}
	}

	clear = () => {
		this.setState({matchName: '', participants: []});
	}

	render() {
		if(renderLogging) console.log('RENDERING NewChallenge');
		const grid = "col-xs-10 col-sm-10 col-md-8 col-lg-8 col-xs-offset-1 col-sm-offset-1 col-md-offset-2 col-lg-offset-2"
		const { name, email, affiliation, rank, weight, asyncGetUsers, saveChallenge, participants } = this.props;

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
			<div className={grid+' videoYellow'}>

				<div className='jumbotron'><h3>Create a new Challenge!</h3></div>

				{renderInput('matchName', 'Give your Challenge a name:')}
				<br/>

				{renderInput('state', 'State:')}
				<br/>

				{renderInput('city', 'City:')}
				<br/>

				<CreateChallengers
					challengerName={name}
					challengerEmail={email}
					challengerAffiliation={affiliation}
					challengerRank={rank}
					challengerWeight={weight} 
					submit={this.submit} 
					clear={this.clear}
					asyncGetUsers={asyncGetUsers}
					saveChallenge={saveChallenge}
					participants={participants}
				/>

			</div>
		)
	}
}

export default chainHOC(NewChallenge, ['stateTrackerHOC', 'updateReporterHOC']);

