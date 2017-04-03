var React = require('react');
var exportInternalState = require('./exportInternalState');

module.exports = function (WrappedComponent) {

	class STHOC extends WrappedComponent {
		name = WrappedComponent.displayName || WrappedComponent.name;

		componentDidMount() {
			if (super.componentDidMount) super.componentDidMount();
			exportInternalState.updateProps(this, this.props);
			if(this.state) exportInternalState.updateState(this, this.state);
			exportInternalState.emit();
		}

		componentWillUnmount() {
			if (super.componentWillUnmount) super.componentWillUnmount();

			exportInternalState.unmount(this);
			
		}

		componentDidUpdate() {
			if (super.componentDidUpdate) super.componentDidUpdate();

			exportInternalState.updateProps(this, this.props);
			if(this.state) exportInternalState.updateState(this, this.state);
			exportInternalState.emit();	
		}

		render() {
			return(
				super.render()
			);
		}
	}

	STHOC.displayName = WrappedComponent.displayName || WrappedComponent.name;


	return STHOC
}