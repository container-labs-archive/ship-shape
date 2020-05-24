// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { compose, graphql } from 'Apollo';
import { queryLoader, withHeader } from 'HOCS';
import queryString from 'Utils/queryString';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'Components/redux-form-material-ui';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import styles from './styles';

import { notify } from '../../redux/notifications/actions';
import { confirmAccountMutation } from './graphql';
import type { Props, State } from './types';

@connect()
@compose(graphql(confirmAccountMutation))
@queryLoader
@withStyles(styles)
@withHeader('Confirm Account', 'center')
class ConfirmAccount extends Component<Props, State> {
  handleConfirm = (values) => {
    const { dispatch, mutate, location: { search } } = this.props;
    const query = queryString(search);
    const {
      email,
      inviteCode,
    } = query;

    const user = {
      email,
      inviteCode,
      password: values.password,
    };

    if (values.email) {
      user.email = values.email;
    }
    if (values.inviteCode) {
      user.inviteCode = values.inviteCode;
    }

    mutate({
      variables: user,
    }).then((result) => {
      const {
        data: {
          confirmAccount: {
            status,
            message,
          },
        },
      } = result;

      if (status === 500) {
        dispatch(notify(message));
        return;
      }

      dispatch(notify('Account confirmed'));
      dispatch(push('/login'));
    }).catch((error) => {
      dispatch(notify('Account failed to confirm'));
    });
  }

  render() {
    const {
      classes,
      handleSubmit,
      submitting,
      location,
    } = this.props;
    const query = queryString(location.search);
    const {
      email,
      inviteCode,
    } = query;

    return (
      <Paper className={classes.container} elevation={24}>
        <form onSubmit={handleSubmit(this.handleConfirm)}>
          <div>
            <Field
              type="email"
              name="email"
              label="Email"
              disabled={email !== undefined}
              component={TextField}
              className={classes.field}
              props={{ value: email }}
            />
          </div>
          <div>
            <Field
              name="inviteCode"
              label="Invite Code"
              disabled={inviteCode !== undefined}
              component={TextField}
              className={classes.field}
              props={{ value: inviteCode }}
            />
          </div>
          <div>
            <Field
              name="password"
              label="Your password"
              component={TextField}
              className={classes.field}
            />
          </div>
          <div className={classes.buttons}>
            <Button
              fullWidth
              disabled={submitting}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Confirm
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

const validate = (values, props) => {
  const errors = {};
  const query = queryString(props.location.search);
  const {
    email,
    inviteCode,
  } = query;

  if (email === undefined && !values.email) {
    errors.email = 'Please enter your email';
  }

  if (inviteCode === undefined && !values.inviteCode) {
    errors.inviteCode = 'Please enter your invite code';
  }

  if (!values.password) {
    errors.password = 'Please enter your new password';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return errors;
};

export default reduxForm({
  form: 'confirm',
  fields: ['email', 'inviteCode', 'password'],
  validate,
})(ConfirmAccount);

