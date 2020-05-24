// @flow

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Switch } from 'Components/redux-form-material-ui';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

type Props = {
  onSubmit: Function,
  submitting: boolean,
  handleSubmit: Function,
}

const styles = {
  buttons: {
    marginTop: 20,
  },
};

const Form = ({ handleSubmit, onSubmit, submitting }: Props): ReactComponent => (
  <form
    onSubmit={handleSubmit(onSubmit)}
  >
    <div>
      <FormControlLabel
        control={<Field name="featureUserManagement" component={Switch} />}
        label="User Management"
      />
    </div>
    <div>
      <FormControlLabel
        control={<Field name="featureUploadFiles" component={Switch} />}
        label="Upload Files"
      />
    </div>
    <div style={styles.buttons}>
      <Button
        disabled={submitting}
        variant="contained"
        color="primary"
        type="submit"
      >
        Save
      </Button>
    </div>
  </form>
);

export default reduxForm({
  form: 'users',
  fields: ['featureUserManagement', 'featureUploadFiles'],
})(Form);
