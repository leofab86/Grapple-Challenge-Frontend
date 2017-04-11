import React, { PropTypes as is } from 'react';
const {ReactComponent, routerType, renderLogging} = window.GCCONF.client;
import chainHOC from '../helpers/chainHOC';


Challenge.propTypes = {
	urlMatchId: is.oneOfType([is.string, is.number]),
	publicMatch: is.object,
	//SavedChallenge:
	matchId: is.oneOfType([is.string, is.number]),
	matchName: is.string,
	participants: is.array,
	user_id: is.oneOfType([is.string, is.number])
}

function Challenge (props) {
	if(renderLogging) console.log('RENDERING GenericComponent');
	
	const mySavedMatch = (props.urlMatchId == props.matchId) ? true : false;
	const userMatch = true;

	let matchName, participants;
	if(mySavedMatch) {
		({ matchName, participants } = props);
	} else if (props.publicMatch) {
		({ name:matchName, participants } = props.publicMatch);
	}
	const grid = "col-xs-12 col-sm-12 col-md-10 col-lg-10 col-md-offset-1 col-lg-offset-1";
	if(matchName && participants) {
		return (
			<div className={grid}>
				<div className='matchHeader jumbotron'>
					<h2>{matchName}</h2>
					<h3>{participants[0].name} vs {participants[1].name}</h3>
				</div>
				<div className='optionsBar'>
					{(mySavedMatch || userMatch) ? 
						<button 
							className='btn btn-primary settingsButton'
							onClick={()=>{routerType.push(`/challenge/edit/${props.urlMatchId}`)}}
							>Edit</button> 
						: null}
				</div>
				<div className='matchDetails'>
					<h4>Match details:</h4>
					<h4>RuleSet: {props.publicMatch.ruleset}</h4>
					<h4>State: {props.publicMatch.state}</h4>
					<h4>City: {props.publicMatch.city}</h4>
				</div>
			</div>
		)
	} else return null;
	
}

export default chainHOC(Challenge, ['updateReporterPP']);



// class Challenge extends ReactComponent{
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


//export default chainHOC(Challenge, ['stateTrackerHOC', 'updateReporterHOC']);