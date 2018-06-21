import Login from './Login'
import reducers, {actions} from '../../redux/user'
import { connect } from 'react-redux';

export function mapStateToProps(state) {
  return {};
}

export function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(actions.login()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
export const reducer = reducers
export const action = actions