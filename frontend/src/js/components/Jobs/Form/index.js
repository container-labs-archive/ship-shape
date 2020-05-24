// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from 'Components/redux-form-material-ui';
import { Field, reduxForm, getFormValues, change } from 'redux-form';
import Button from '@material-ui/core/Button';
import MultipleFileUpload from '../MultipleFileUpload';
import styles from './styles';
import type { Props, State } from './types';

const mapStateToProps = state => ({
  values: getFormValues('jobs')(state),
});

const mapDispatchToProps = dispatch => ({
  changeFieldValue: (field, value) => {
    dispatch(change('jobs', field, value));
  },
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withStyles(styles)
class Form extends Component<Props, State> {
  state = {
    requesting: false,
  }

  // TODO: remove
  // handleCompleteUploading = (uploadedFiles) => {
  //   const { values: { addedFiles = [] }, changeFieldValue } = this.props;
  //   changeFieldValue('addedFiles', [...addedFiles, ...uploadedFiles]);
  // }

  // handleCompleteDeleting = (deletedRefPath, softDelete) => {
  //   const { changeFieldValue, values: { files = [], addedFiles = [], deletedFiles = [] } } = this.props;

  //   if (softDelete) {
  //     const deletedFile = files.find(f => f.storageRefPath === deletedRefPath);
  //     if (!deletedFile) return;

  //     const { key, url, storageRefPath } = deletedFile;
  //     changeFieldValue('deletedFiles', [...deletedFiles, { key, url, storageRefPath }]);
  //   } else {
  //     changeFieldValue('addedFiles', addedFiles.filter(f => f.storageRefPath !== deletedRefPath));
  //   }
  // }

  handleStartRequest = () => {
    this.setState({ requesting: true });
  }

  handleComleteRequest = () => {
    this.setState({ requesting: false });
  }

  render() {

    const {
      classes,
      onSubmit,
      submitting,
      handleSubmit,
      storageRootRef,
      // values: {
      //   files = [],
      // },
      dispatch,
      onFileUpdate,
      files,
      accountId,
    } = this.props;
    const { requesting } = this.state;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field
            name="jobTitle"
            label="Job Title"
            component={TextField}
            className={classes.field}
            id="jobTitle"
          />
        </div>
        <div>
          <Field
            name="jobNumber"
            label="Job Number"
            component={TextField}
            className={classes.field}
            id="jobNumber"
          />
        </div>
        <div>
          <Field
            name="recordNumber"
            label="Post Number"
            component={TextField}
            className={classes.field}
            id="recordNumber"
          />
        </div>
        <div className={classes.dropzone}>
          <MultipleFileUpload
            onStartRequest={this.handleStartRequest}
            onCompleteRequest={this.handleComleteRequest}
            // onCompleteUploading={this.handleCompleteUploading}
            // onCompleteDeleting={this.handleCompleteDeleting}

            // this is the new place to store shared files
            // storageChildRefName="job-files"
            storageChildRefName={`account-files/${accountId}`}
            storageRootRef={storageRootRef}
            dispatch={dispatch}

            files={files}
            onFileUpdate={onFileUpdate}

          />
        </div>
        <div className={classes.buttons}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={requesting || submitting}
            id="submitJob"
          >
            Save
          </Button>
        </div>
      </form>
    );
  }
}

const form = 'jobs';
const fields = ['jobTitle', 'jobNumber', 'recordNumber', 'files', 'addedFiles', 'deletedFiles'];
const initialValues = {
  jobTitle: '', jobNumber: '', recordNumber: '', files: [], addedFiles: [], deletedFiles: [],
};
const validate = (values) => {
  const errors = {};

  if (!values.jobTitle) {
    errors.jobTitle = 'Please enter job title';
  }

  if (!values.jobNumber) {
    errors.jobNumber = 'Please enter job number';
  }

  return errors;
};

export default reduxForm({
  form: 'jobs',
  fields,
  validate,
  initialValues,
})(Form);
