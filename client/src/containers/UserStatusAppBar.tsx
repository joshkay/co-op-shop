import { connect } from 'react-redux';
import { AppState } from '../store';
import AppBar from '../components/navigation/AppBar';
import { logoutUser } from '../store/users/actions';

const mapStateToProps = (state: AppState) =>
{
  return {
    isAuthenticated: state.user.isAuthenticated,
    email: state.user.email
  }
}

export default connect(
  mapStateToProps,
  { logoutUser }
)(AppBar);