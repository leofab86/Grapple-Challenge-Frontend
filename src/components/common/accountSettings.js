import React from 'react';

import TextInput from './TextInput';

export const accountInputs = ['Name', 'Email', 'Affiliation', 'Rank', 'Weight'];

export function inputs2State (inputs) {
	const state = {};
	for (var i = 0; i < inputs.length; i++) {
		state[inputs[i].toLowerCase()] = ''
	}
	state.errors = {};
	return state;
}

export function renderInputs (combatant, input) {
	if(combatant)
		return (
			<TextInput
				key={input.toLowerCase()}
				label={input}
				name={combatant+'-'+input.toLowerCase()}  
				type='text'  
				value={this.state[combatant][input.toLowerCase()]}
				onChange={this.inputHandler.bind(this, combatant, input.toLowerCase())}
				error={this.state[combatant]['errors'][input.toLowerCase()]}/>
		)
	else
		return (
			<TextInput
				key={input.toLowerCase()}
				label={input}
				name={input.toLowerCase()}  
				type='text'  
				value={this.state[input.toLowerCase()]}
				onChange={this.inputHandler.bind(this, input.toLowerCase())}
				error={this.state['errors'][input.toLowerCase()]}/>
		)
}