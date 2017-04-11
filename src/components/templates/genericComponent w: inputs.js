import React, { PropTypes as is } from 'react';

const {ReactComponent, renderLogging} = window.GCCONF.client;
import TextInput from './common/textInput';
import chainHOC from '../helpers/chainHOC';

class COMPONENTNAME extends ReactComponent {
	static propTypes = {
		propName: is.oneOfType([is.string, is.number])
	};

	state = {

	}

	inputHandler = (event) => {
		const { name, value } = event.target;
		this.setState({[name]:value});
	}

	submit = () => {

	}

	render() {
		if(renderLogging) console.log('RENDERING COMPONENTNAME');
		const grid = "col-xs-10 col-sm-10 col-md-8 col-lg-8 col-xs-offset-1 col-sm-offset-1 col-md-offset-2 col-lg-offset-2"
		const { a } = this.props;

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

				<div className='jumbotron'><h3>Generic Component w/ Inputs</h3></div>

				{renderInput('name', 'Label')}
				<br/>

				{renderInput('name', 'Label')}
				<br/>

				{renderInput('name', 'Label')}
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

export default chainHOC(COMPONENTNAME, ['stateTrackerHOC', 'updateReporterHOC']);

