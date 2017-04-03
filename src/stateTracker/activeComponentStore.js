"use strict";
import {activeComponentDispatcher} from './dispatcher';
import ActionTypes from './STactionTypes';
import {EventEmitter} from 'events';
import Immutable from 'immutable';

const CHANGE_EVENT = 'change';

let activeComponentState = Immutable.fromJS({});
let activeProps = Immutable.fromJS({});

const activeComponentStore = Object.assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function (callback){
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},

	getState: () => {
		return activeComponentState.toJS();
	},

	getProps: () => {
		return activeProps.toJS();
	}

});


activeComponentDispatcher.register((action) => {
	switch(action.actionType) {
		case ActionTypes.STATE:
			activeComponentState = activeComponentState.mergeIn(action.keyPath, action.value);
			break;

		case ActionTypes.PROPS:
			if(!Object.keys(action.value).length) {
				activeProps = activeProps.deleteIn(action.keyPath)
			} else activeProps = activeProps.mergeIn(action.keyPath, action.value);
			break;

		case ActionTypes.DELETE:
			activeProps = activeProps.deleteIn(action.keyPath);
			activeComponentState = activeComponentState.deleteIn(action.keyPath);
			activeComponentStore.emitChange();
			break;

		case ActionTypes.EMIT:
			activeComponentStore.emitChange();
			break

		default:
			// no op
	}

});

export default activeComponentStore;