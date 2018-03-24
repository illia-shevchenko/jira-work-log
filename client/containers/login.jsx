import { connect } from 'react-redux';
import { Login as LoginComponent } from '../components/login';

const mapState = (state) => state.login;

const mapDispatch = (dispatch) => ({
  onChange: () => {
    dispatch.login.clearError();
  },
  onSubmit: (form) => {
    dispatch.login.do(form);
  },
});

export const Login = connect(mapState, mapDispatch)(LoginComponent);
