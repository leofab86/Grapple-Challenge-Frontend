import { connect } from 'react-redux';

import * as AppActions from '../actions/reduxActions';
import MyAccountPage from '../components/myAccountPage';


const mapStateToProps = (state) => {
	const { email, name, isSignedIn, id, affiliation, weight, rank } = state.auth;
	return { email, name, isSignedIn, id, affiliation, weight, rank }
}

const mapDispatchToProps = (dispatch) => {
	const asyncEditUser = (id, callback) => dispatch(AppActions.asyncEditUser(id, callback));
	return {asyncEditUser}
}

const MyAccountContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MyAccountPage)

MyAccountContainer.displayName = 'MyAccountContainer';

export default MyAccountContainer;