import React, { PropTypes as is } from 'react';

const {ReactComponent, renderLogging} = window.GCCONF.client;
import chainHOC from '../helpers/chainHOC';


class GlobalPopup extends ReactComponent{
	static propTypes = {
		component: is.func.isRequired,
		visible: is.bool.isRequired,
		wide: is.bool.isRequired,
		label: is.string,
		componentProps: is.object,
		closePopup: is.func.isRequired,
		asyncLogin: is.func.isRequired,
		asyncSignup: is.func.isRequired, 
	};

	close(){
		this.props.closePopup()
	}

	render(){
		if(renderLogging) console.log('RENDERING GlobalPopup');	
		const props = this.props;
		if(!props.visible) return null;

		const label = props.label;
		const labelRender = (!label) ? null : <h2>{label}</h2>
		const Component = props.component;

		const grid = (props.wide) ? 
			'col-xs-10 col-sm-10 col-md-8 col-lg-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-2 col-lg-offset-3' 
		:	'col-xs-8 col-sm-8 col-md-6 col-lg-4 col-xs-offset-2 col-sm-offset-2 col-md-offset-3 col-lg-offset-4'

		return(
			<div className='fixedPlane'>
				<div className='container'>
					<div className={grid}>
						<div className='globalPopup'>
							<button onClick={this.close.bind(this)} className='closeXButton'>X</button>
							{labelRender}
							<Component 
								popupProps={props.componentProps} 
								asyncSignup={props.asyncSignup}
								asyncLogin={props.asyncLogin}/>
							<br/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default chainHOC(GlobalPopup, ['stateTrackerHOC', 'updateReporterHOC']);