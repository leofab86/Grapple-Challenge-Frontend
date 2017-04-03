import { connect } from 'react-redux';
import { AppActions } from '../../actions/reduxActions';
import ReduxComponent from './reduxComponent';


const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
	let dispatcher = {};
	for (var key in AppActions) {
		dispatcher[key] = (param1, param2) => {
			dispatch(AppActions[key](param1, param2))
		}
	}
	return {dispatcher}
}

const ReduxContainer = connect(
  // mapStateToProps,
  // mapDispatchToProps
)(ReduxComponent)

ReduxContainer.displayName = 'ReduxContainer';

export default ReduxContainer;