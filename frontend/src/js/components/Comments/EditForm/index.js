// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm, reset } from 'redux-form';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import TextField from '../TextField';
import styles from './styles';
import type { Props } from './types';

const formId = Date.now();

@withStyles(styles)
class EditForm extends Component<Props> {
  onSubmit = (values) => {
    const { dispatch, onSubmit } = this.props;

    onSubmit(values);
    dispatch(reset('comments-edit'));
  }

  render() {
    const { classes, handleSubmit, onClose } = this.props;

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
          />
          <div className={classes.actions}>
            <IconButton
              className={classes.button}
              onClick={onClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
            <IconButton
              className={classes.button}
              type="submit"
            >
              <DoneIcon className={classes.icon} />
            </IconButton>
          </div>
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
  form: `comments-edit-${formId}`,
  fields: ['content'],
  validate,
})(EditForm);
