import {activeComponentDispatcher} from './dispatcher';
import ActionTypes from './STactionTypes';

const exportInternalState = {

	unmount: (component) => {
		activeComponentDispatcher.dispatch({
			actionType: ActionTypes.DELETE,
			keyPath: [component.name]
		});
	},

	updateState: (component, nextState) => {
		activeComponentDispatcher.dispatch({
			actionType: ActionTypes.STATE,
			keyPath: [component.name],
			value: nextState
		});
	},

	updateProps: (component, nextState) => {
		activeComponentDispatcher.dispatch({
			actionType: ActionTypes.PROPS,
			keyPath: [component.name],
			value: nextState
		});
	},

	emit: () => {
		activeComponentDispatcher.dispatch({
			actionType: ActionTypes.EMIT
		});
	}
}

module.exports = exportInternalState;