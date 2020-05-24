// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm, reset } from 'redux-form';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import TextField from '../TextField';
import styles from './styles';
import type { Props } from './types';

@withStyles(styles)
class Form extends Component<Props> {
  onSubmit = (values) => {
    const { dispatch, onSubmit } = this.props;

    onSubmit(values);
    dispatch(reset('comments'));
  }

  render() {
    const { classes, handleSubmit } = this.props;

    return (
      <form
        className={classes.container}
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <div className={classes.inline}>
          <Field
            name="content"
            placeholder="Write a comment..."
            className={classes.textField}
            component={TextField}
            id="enter-comment"
          />
          <IconButton
            className={classes.button}
            type="submit"
            id="add-comment"
          >
            <SendIcon className={classes.icon} />
          </IconButton>
        </div>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.content) {
    errors.content = 'Please enter comment content';
  }

  return errors;
};

export default reduxForm({
  form: 'comments',
  fields: ['content'],
  validate,
})(Form);
