// @flow

import React from 'react';
import {
  Button,
  Paper,
  TextField,
} from '@material-ui/core';
import {
  Field,
  reduxForm,
} from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { firebaseAuth } from '../../redux/firebase/firebase';
import { login } from '../../redux/auth/actions';

type Props = {
  oobCode: string,
  apiKey: string,
  handleSubmit: Function,
};

const renderField = ({ input, label, type, meta: { touched, error }, className }) => (
  <div>
    <TextField
      {...input}
      label={label}
      type={type}
      error={touched && error}
      helperText={touched && error ? error : ''}
      className={className}
    />
  </div>
);

@connect()
class ResetComponent extends React.Component<Props> {
  state = {
    oobCode: null,
    apiKey: null,
    email: '',
    errorType: null,
    errorMessage: null,
    passwordResetSuccessful: false,
  }

  // TODO: rewrite
  componentWillMount() {
    const {
      oobCode,
      apiKey,
    } = this.props;
    this.setState({
      oobCode,
      apiKey,
    });

    firebaseAuth.verifyPasswordResetCode(oobCode).then((email) => {
      this.setState({
        email,
      });
    })
    .catch((error) => {
        switch (error.code) {
          case 'auth/expired-action-code': {
            this.setState({
              errorType: 'expired',
              errorMessage: 'Your code has expired, please request a new one',
            });
            break;
          }
          case 'auth/invalid-action-code': {
            this.setState({
              errorType: 'invalid',
              errorMessage: 'Your code is invalid, please request a new one',
            });
            break;
          }
          default: {
            this.setState({
              errorType: 'unknown',
              errorMessage: error.message,
            });
          }
        }
    });
  }

  handleResetPassword = (json: Object) => {
    const { dispatch } = this.props;
    const {
      oobCode,
      email,
    } = this.state;
    const {
      newPassword,
    } = json;

    // Save the new password.
    firebaseAuth.confirmPasswordReset(oobCode, newPassword).then((resp) => {
      // Password reset has been confirmed and new password updated.
      this.setState({
        passwordResetSuccessful: true,
      });
      dispatch(login({
        username: email,
        password: newPassword,
      })).then(() => {
        dispatch(push('/home'));
      }).catch(() => {
        this.setState({
          errorType: 'loginError',
          errorMessage: 'There were problems loging in.',
        });
      });
    }).catch((error) => {
      switch (error.code) {
        case 'auth/expired-action-code': {
          this.setState({
            errorType: 'expired',
            errorMessage: 'Your code has expired, please request a new one',
          });
          break;
        }
        case 'auth/invalid-action-code': {
          this.setState({
            errorType: 'invalid',
            errorMessage: 'Your code is invalid, please request a new one',
          });
          break;
        }
        default: {
          this.setState({
            errorType: 'unknown',
            errorMessage: error.message,
          });
        }
      }
  });
  }

  render() {
    const {
      classes,
      handleSubmit,
      submitting,
    } = this.props;
    const {
      oobCode,
      apiKey,
      email,
      errorType,
      errorMessage,
    } = this.state;

    return (
      <Paper className={classes.container} elevation={24}>
        <form onSubmit={handleSubmit(this.handleResetPassword)}>
          <div>
            <TextField
              error={errorType && (errorType === 'expired' || errorType === 'invalid')}
              helperText={errorType && (errorType === 'expired' || errorType === 'invalid')  ? errorMessage : ''}
              disabled
              label="Reset Code"
              className={classes.field}
              value={oobCode}
            />
          </div>
          <div>
            <TextField
              disabled
              label="Email"
              className={classes.field}
              value={email}
            />
          </div>
          <div>
            <Field
              name="newPassword"
              label="New Password"
              component={renderField}
              className={classes.field}
              type="password"
            />
          </div>
          <div>
            <Field
              name="newPasswordMatch"
              label="Type Your Password Again"
              component={renderField}
              className={classes.field}
              type="password"
            />
          </div>
          <div className={classes.buttons}>
            <Button
              fullWidth
              disabled={submitting || errorType && (errorType === 'expired' || errorType === 'invalid')}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.newPassword) {
    errors.newPassword = 'Please enter a new password';
  } else {
    if (!values.newPasswordMatch) {
      errors.newPasswordMatch = 'Please type your new password again';
    } else if(values.newPassword !== values.newPasswordMatch) {
      errors.newPasswordMatch = 'Passwords do not match';
    }
  }

  return errors;
};

export default reduxForm({
  form: 'setNewPassword',
  fields: ['newPassword', 'newPasswordMatch'],
  validate,
})(ResetComponent);


