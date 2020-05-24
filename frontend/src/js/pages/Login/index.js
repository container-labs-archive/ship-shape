// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withHeader } from 'HOCS';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'Components/redux-form-material-ui';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
// import firebase from 'firebase';
import { push } from 'connected-react-router';

import styles from './styles';
import { login, loginSuccess, loginError } from '../../redux/auth/actions';
import type { Props, State } from './types';
import { firebaseAuth } from '../../redux/firebase/firebase';
import GoogleButton from './GoogleButton';

const provider = new firebase.auth.GoogleAuthProvider();

@connect(state => ({
  error: state.auth.error,
  isLoading: state.auth.isFetching,
  isAuthenticated: state.auth.isAuthenticated,
}))
@withStyles(styles)
@withHeader('Login', 'center')
class Login extends Component<Props, State> {
  componentDidMount() {
    this.redirectIfAuthenticated();
  }

  // handleLogin = ({ username, password }) => {
  //   const { dispatch } = this.props;
  //   dispatch(login({
  //     username: username.trim(),
  //     password: password.trim(),
  //   })).then(() => {
  //     dispatch(push('/home'));
  //   });
  // }

  redirectIfAuthenticated = () => {
    const { isAuthenticated, dispatch } = this.props;
    if (isAuthenticated) {
      dispatch(push('/home'));
    }
  }

  handleGoogleLogin = () => {
    const { dispatch } = this.props;
    firebaseAuth.signInWithPopup(provider).then((result) => {
      const { user } = result;
      dispatch(loginSuccess(user));
    }).catch(() => {
      dispatch(loginError());
    });
  }

  render() {
    const {
      error,
      handleSubmit,
      submitting,
      classes,
      isLoading,
    } = this.props;

    return (
      <Paper className={classes.container} elevation={24} id="loginForm" >
        <form onSubmit={handleSubmit(this.handleLogin)}>
          {/* <div>
            <Field
              name="username"
              component={TextField}
              placeholder="Username or email"
              className={classes.textField}
              id="username"
            />
          </div>
          <div>
            <Field
              name="password"
              type="password"
              component={TextField}
              placeholder="Password"
              className={classes.textField}
              id="password"
            />
          </div> */}
          <div className={classes.error}>
            {error && <span>{error}</span>}
          </div>
          <div className={classes.buttons}>
            {/* <Button
              fullWidth
              disabled={isLoading}
              variant="contained"
              color="primary"
              type="submit"
              id="loginSubmit"
            >
              Login
            </Button> */}
            <GoogleButton handleLogin={this.handleGoogleLogin} />
          </div>
          <div className={classes.links}>
            <Link to="/reset">Forgot your password?</Link>
          </div>
        </form>
      </Paper>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Please enter username';
  }

  return errors;
};


export default reduxForm({
  form: 'login',
  fields: ['username', 'password'],
  initialValues: { username: '', password: '' },
  validate,
})(Login);
