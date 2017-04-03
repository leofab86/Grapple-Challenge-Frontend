import {updateReports} from '../../../config';


module.exports = function (WrappedComponent) {

	class updateReporterHOC extends WrappedComponent {

		name = WrappedComponent.displayName || WrappedComponent.name;
		static displayName = WrappedComponent.displayName || WrappedComponent.name;

		shouldComponentUpdate(nextProps, nextState) {
			let superReturn = null;
			if (super.shouldComponentUpdate) {
				superReturn = super.shouldComponentUpdate(nextProps, nextState);			
				if (superReturn !== true && superReturn !== false ) superReturn = null;
			}
			let report = {
				updateCausers: [],
				STATE: {},
				PROPS: {}
			}
			
			let shouldUpdate = false;
			const name = this.name;

			const compare = (next, current, type) => {

				for (var key in next) {
					if (next[key] == current[key]) {
						report[type][key] = ['Pass: Referance Comparison Passed', current[key], next[key]];
					} else {
						if (typeof next[key] !== 'object') {
							report[type][key] = [`Update: non objects are diff`, current[key], next[key]];							
							report.updateCausers.push(`${type} - ${key}`);

							shouldUpdate = true;

						} else {		
							report[type][key] = [`Update: object referance comparison failed`, current[key], next[key]];
							report.updateCausers.push(`${type} - ${key}`);

							shouldUpdate = true;
						}
					}
				}
			} 

			compare(nextState, this.state, 'STATE');
			compare(nextProps, this.props, 'PROPS');

			let reportContainer = (shouldUpdate) ? [`UPD ${name}`] :
				[`Pass ${name}`];
			reportContainer.push(report);

			if (superReturn !== null) {
				console.log(`${name} SuperReturn Overide ${superReturn}`);
				console.log(reportContainer);
				return superReturn
			}

			if (shouldUpdate && updateReports.update) console.log(reportContainer);
			if (!shouldUpdate && updateReports.pass) console.log(reportContainer);
			
			return shouldUpdate; 
		}

		render() {
			return(
				super.render()
			);
		}
	}

	return updateReporterHOC
}
