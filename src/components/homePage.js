import React, { PropTypes as is } from 'react';

const {ReactComponent, routerType, renderLogging} = window.GCCONF.client;
import chainHOC from '../helpers/chainHOC';


class HomePage extends ReactComponent{
	static propTypes = {
		matches: is.object
	}

	render() {
		if(renderLogging) console.log('RENDERING HomePage');
		const grid = "col-xs-12 col-sm-12 col-md-10 col-lg-10 col-md-offset-1 col-lg-offset-1"
		const matches = this.props.matches;

		return(
			<div className={grid}>
				<div className='jumbotron'>
					<h2>Home Page</h2>
					<h3>Some info about our site...</h3>
					<h3>This is where popular fights will be listed</h3>
				</div>
				<div className='matchesContainer'>
					{Object.keys(matches).map( id =>{
						const { name, participants } = matches[id];
						return (
							<div className='matchCard' key={id} onClick={()=>routerType.push(`/challenge/${id}`)}>
								<h4>{name}</h4>
								<h5>{participants[0].name}</h5>
								<h5>vs</h5>
								<h5>{participants[1].name}</h5>
							</div> 
						)
					})}
				</div>
			</div>
		);
	}
}

export default chainHOC(HomePage, ['stateTrackerHOC', 'updateReporterHOC']);