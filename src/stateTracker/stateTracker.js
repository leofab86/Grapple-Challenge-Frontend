import React from 'react';
import cookie from 'react-cookie';
import activeComponentStore from './activeComponentStore';

class StateTracker extends React.Component{

	state={activeComponents: {}, activeProps: {}, _expanded:[]}

	componentWillMount() {
		activeComponentStore.addChangeListener(this._onChange.bind(this));
	}

	componentWillUnmount() {
		activeComponentStore.removeChangeListener(this._onChange.bind(this));
	}

	_onChange() {
		this.setState({
			activeComponents: activeComponentStore.getState(), 
			activeProps: activeComponentStore.getProps()
		});
	}	

	toggleList (id, event) {
		event.preventDefault()
		if(!this.state._expanded.includes(id)) {this.state._expanded.push(id)}
		else {this.state._expanded.splice(this.state._expanded.indexOf(id), 1)}
		this.setState(this.state);
	}

	renderState (state, index, parent, isArray) {
		let id;
		let wrapper = 'hiddenList';
		let log = '...';
		let listItem;
		let trimState = state;
		let title = parent;
		let expand = '->';
		
		switch(typeof state){
			
			case 'object':
				if(state === null) {
					id= parent + "_" + index;
					return (
						<li 
							title={title} 
							key={id}
							><span>{index} --> null</span>
						</li>
					)
				}
				if(!state) return;

				if (Array.isArray(state)) {
					id = parent+"_"+index;
					if(index === '_expanded') state = state.sort();
					if(this.state._expanded.includes(id)) {wrapper = ''; expand = '|'}
					if (index === 'children') {
						state = state.map(function(mapState, mapIndex) {
							return {constructor: (mapState.type.__proto__.prototype) ? mapState.type.__proto__.prototype.constructor : mapState.type.name}
						})
					}					
					
					return (
						<div key={id}>
							<button 
								title={title} 
								className="btn-link" 
								onClick={this.toggleList.bind(this, id)}
								>{index}[ ] 
							</button>
							<button className='btn-link logButton' onClick={function(state){console.log(state)}.bind(this, state)}>
								{log}
							</button>
							<button className='btn-info expandButton' onClick={this.toggleList.bind(this, id)}>
								{expand}
							</button>
							<ul className={wrapper}>
								{state.map(function(mapState, mapIndex){
									return this.renderState(mapState, mapIndex, id, 'isArray')
								}, this)}
							</ul>
						</div>
					)
				}
				else /*is object*/ {
					if(!parent) {
						id='appState';
						wrapper='';
						expand=null;
						log = null
					}
					else id = parent+"_"+index;
					if (index === 'children' || parent === 'children') {
						state = {constructor: (state.type.__proto__.prototype) ? state.type.__proto__.prototype.constructor : state.type.name};

					}
					let array = [];
					let brackets = "{ }";
					
					for (var key in state) {
						if(state.hasOwnProperty(key)) {
							array.push(this.renderState(state[key], key, id))
						}
					}
					
					if(this.state._expanded.includes(id) && parent) {wrapper = ''; expand = '|'}

					return (
						<div key={id}>
							<button 
								title={title} 
								className="btn-link" 
								onClick={this.toggleList.bind(this, id)}
								>{(index || index == 0) ? `${index} ${brackets}` : null}
							</button>
							<button className='btn-link logButton' onClick={function(state){console.log(state)}.bind(null, state)}>
								{log}
							</button>
							<button className='btn-info expandButton' onClick={this.toggleList.bind(this, id)}>
								{expand}
							</button>
							<ul className={wrapper}>{array}</ul>
						</div>
					)
				}
			case 'boolean':
			case 'function': {
				id= parent + "_" + index;
				trimState = state.toString();

				if(trimState.length > 40) {
					trimState = trimState.substring(0, 40) + '...';
					title = id + ' --> ' + state;
				}
				if(isArray) {
					listItem = 
						<li 
							title={title} 
							key={id}
							><span>{state.displayName}:{trimState}</span>
						</li>
				} else {
					listItem =
						<li 
							title={title} 
							key={id}
							><span>{index} --> {state.displayName}:{trimState}</span>
						</li>
				}
				return(listItem)
			}	
			case 'number':
			case 'string':
				id= parent + "_" + index;
				if(trimState.length > 28) {
					trimState = trimState.substring(0, 28) + '...';
					title = id + ' --> ' + state;
				}
				if (parent==='appState__expanded') {
					listItem =
						<li 
							title={title} 
							key={id} 
							onClick={this.toggleList.bind(this, state)}
							><span>{state}</span>
						</li>
				} else if (isArray) {
					listItem =
						<li 
							className = 'arrayList'
							title={title} 
							key={id} 
							><span>{trimState}</span>
						</li>
				} else {
					listItem =
						<li 
							title={title} 
							key={id}
							><span>{index} --> {trimState}</span>
						</li>
				}
				return (listItem)
			case 'undefined':
				id= parent + "_" + index;
				return (
					<li 
						title={title} 
						key={id}
						><span>{index} --> undefined</span>
					</li>
				)
			default:
				return <li>What is this?</li>
		}

	}

	render() {
		let combinedState = Object.assign({}, this.props.appState, this.state);

		let wrapper = (this.state._expanded.includes('appState')) ? '' : 'hiddenList';

		return(
			<div className='stateTracker'>
				<button className="btn-link" onClick={this.toggleList.bind(this, 'appState')}>AppState</button>
				<ul className={wrapper} >
					{this.renderState.bind(this)(combinedState)}
				</ul>
			</div>
		);
	}
}

export default StateTracker;

