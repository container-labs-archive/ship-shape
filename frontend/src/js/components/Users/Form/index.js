// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'Components/redux-form-material-ui';
import AsyncButton from '../../Layout/AsyncButton';
import styles from './styles';
import type { Props } from './types';

const Form = ({
  formSubmitting,
  handleSubmit,
  onSubmit,
  classes,
}: Props): ReactComponent => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <Field
        name="email"
        label="Email"
        component={TextField}
        className={classes.field}
      />
    </div>
    <div>
      <Field
        name="displayName"
        label="Display Name"
        component={TextField}
        className={classes.field}
      />
    </div>
    <div className={classes.buttons}>
      <AsyncButton
        type="submit"
        variant="contained"
        color="primary"
        waiting={formSubmitting}
        label="Save"
      />
    </div>
  </form>
);

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter an email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.displayName) {
    errors.displayName = 'Please enter display name';
  } else if (values.displayName.length > 100) {
    errors.displayName = 'Must be 100 characters or less';
  }

  return errors;
};

export default reduxForm({
  form: 'users',
  fields: ['email', 'displayName'],
  validate,
})(withStyles(styles)(Form));
