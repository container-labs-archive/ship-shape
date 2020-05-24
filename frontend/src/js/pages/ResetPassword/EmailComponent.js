// @flow

import React from 'react';
import {
  Button,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  Field,
  reduxForm,
} from 'redux-form';
import { connect } from 'react-redux';
import { notify } from '../../redux/notifications/actions';
import { firebaseAuth } from '../../redux/firebase/firebase';

type Props = {
  classes: Object,
  dispatch: Function,
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
class EmailComponent extends React.Component<Props> {
  state = {
    showThankYou: false,
  };

  handleSendEmail = (values) => {
    const { email } = values;
    const { dispatch } = this.props;

    firebaseAuth.sendPasswordResetEmail(email)
      .then(() => {
        dispatch(notify(`Email sent to ${email}`));
        this.setState({
          showThankYou: true,
        })
      }).catch((error) => {
        console.error(error);
        dispatch(notify('There was an error sending your email'));
      });
  }

  render() {
    const {
      classes,
      submitting,
      handleSubmit,
    } = this.props;
    const {
      showThankYou,
    } = this.state;

    return (
      <Paper className={classes.container} elevation={24}>
        {showThankYou && (
          <Typography>
            Check your email for a link to reset your password.
          </Typography>
        )}
        {!showThankYou && (
          <form onSubmit={handleSubmit(this.handleSendEmail)}>
            <div>
              <Field
                name="email"
                label="Email"
                component={renderField}
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
                Submit
              </Button>
            </div>
          </form>
        )}
      </Paper>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Please enter email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default reduxForm({
  form: 'passwordReset',
  fields: ['email'],
  validate,
})(EmailComponent);
