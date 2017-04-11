import stateTrackerHOC from '../stateTracker/stateTrackerHOC';
import { updateReporterII, updateReporterPP } from '../components/common/updateReporterHOC';
import { stateTracker, updateReports } from '../../config'

export default function(baseComponent, HOCarray) {
	let HOCchain = baseComponent;
	
	if(HOCarray) {

		//ADD IMPORTED HOCs into HOCbox below
		const HOCbox = {
			stateTrackerHOC: (stateTracker) ? stateTrackerHOC : null,
			updateReporterHOC: (updateReports.update || updateReports.pass) ? updateReporterII : null,
			updateReporterPP: (updateReports.update || updateReports.pass) ? updateReporterPP : null
		}


		HOCchain = HOCarray.reduce((accumulator, currentValue, index, array) => {
			if(HOCbox[currentValue] === null) return accumulator;
			if(!HOCbox[currentValue]) {
				console.warn(`${currentValue} not found in HOCbox. From ${baseComponent.name || baseComponent.displayName}`)
				return accumulator;
			}
			return HOCbox[currentValue](accumulator)
		}, baseComponent)
	}

	// ----------------------- Apply DEFAULT HOCs -----------------------------
	// if(stateTracker) HOCchain = stateTrackerHOC(HOCchain);
	// if (updateReports.pass || updateReports.update) HOCchain = updateReporterHOC(HOCchain) 


	return HOCchain 

}