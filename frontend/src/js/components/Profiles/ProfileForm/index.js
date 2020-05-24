// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { queryLoader } from 'HOCS';
import {
  reduxForm,
  stopSubmit,
} from 'redux-form';
import {
  Paper,
  Typography,
  withStyles,
  // TODO: move to componetns
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
// TODO: move
import {
  approveConsistencyMessage,
  rejectConsistencyMessage,
} from '../../../config/strings';
import styles from './styles';
import {
  saveDraftEvaluationMessage,
} from '../../../config';
import type { Props, State } from './types';
import { notify } from '../../../redux/notifications/actions';
import FormActions from './FormActions';
import BasicFormFields from './FormHeader';
import JobFiles from 'Components/Common/JobFiles';
import SaveDraftModal from '../SaveDraftModal';
import FormTable from './FormTable';
import ConfirmModal from '../ConfirmModal';
import { handleBeforeSubmit, handleSaveDraft } from '../utils';


@connect(state => ({
  userId: state.auth.userId,
  accountId: state.users.settings.user.accountId,
}))
@withStyles(styles)
class ProfileForm extends Component<Props, State> {
  state = {
    openSaveDialog: false,
    openSaveDraftDialog: false,
    openApproveDialog: false,
    openRejectDialog: false,
    comments: [],
  }

  showSaveDialog = () => {
    this.setState({ openSaveDialog: true });
  }

  showSaveDraftDialog = () => {
    const { dispatch } = this.props;

    // remove all submit errors
    dispatch(stopSubmit('profiles', {}));
    this.setState({ openSaveDraftDialog: true });
  };

  hideSaveDialog = () => {
    this.setState({ openSaveDialog: false });
  }

  hideSaveDraftDialog = () => {
    this.setState({ openSaveDraftDialog: false });
  }

  renderFormErrors = () => {
    const {
      submitFailed,
      error,
      classes,
    } = this.props;

    if (!submitFailed || !error) return null;

    return (
      <Typography className={classes.errorContainer}>
        {error}
      </Typography>
    );
  }

  handleBeforeSubmit = (values) => {
    this.hideSaveDialog();
    return handleBeforeSubmit(values, this.props, this.state);
  }

  handleSaveDraft = (values) => {
    this.hideSaveDraftDialog();
    return handleSaveDraft(values, this.props);
  }

  showApproveDialog = () => {
    this.setState({ openApproveDialog: true });
  }

  hideApproveDialog = () => {
    this.setState({ openApproveDialog: false });
  }

  showRejectDialog = () => {
    this.setState({ openRejectDialog: true });
  }

  hideRejectDialog = () => {
    this.setState({ openRejectDialog: false });
  }

  handleApprove = () => {
    const {
      onSave,
    } = this.props;

    const submitEvalData = {
      passedCheck: true,
    };

    this.hideApproveDialog();

    return onSave(submitEvalData);
  }

  handleReject = () => {
    const {
      onSave,
    } = this.props;

    const submitEvalData = {
      consistencyCheckRejected: true,
    };

    this.hideRejectDialog();

    return onSave(submitEvalData);
  }

  renderConfirmApproveModal = (): ReactComponent => {
    const { handleSubmit } = this.props;
    const { openApproveDialog } = this.state;

    return (
      <Dialog open={!!openApproveDialog}>
        <DialogTitle>
          Confirm
        </DialogTitle>
        <DialogContent>
          <Typography>
            {approveConsistencyMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={this.hideApproveDialog}
          >
            No
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(this.handleApprove)}
            id="submitDialog"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  renderConfirmRejectModal = (): ReactComponent => {
    const { handleSubmit } = this.props;
    const { openRejectDialog } = this.state;

    return (
      <Dialog open={!!openRejectDialog}>
        <DialogTitle>
          Confirm
        </DialogTitle>
        <DialogContent>
          <Typography>
            {rejectConsistencyMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={this.hideRejectDialog}
          >
            No
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(this.handleReject)}
            id="submitDialog"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  evalTypeChangeMiddleware = (values) => {
    const { onEvaluationTypeChange, change } = this.props;
    if (values.isEvaluation) {
      change('profileId', null);
    }
    onEvaluationTypeChange(values);
  }


  render() {
    const {
      handleSubmit,
      jobFiles,
      submitting,
      onClear,
      clearButton,
      profileOptions,
      classes,
      profile,
      jobData,
      fields,
      scores,
      isConsistency,
      isAppeal,
      isReject,
      onEvaluationTypeChange,
      isMatch,
      isHybridMatch,
      isEvaluation,
      accountId,
      panelMembers,
    } = this.props;
    const {
      openSaveDraftDialog,
      openSaveDialog,
    } = this.state;

    let panelType = 'Match Panel';
    if (isConsistency) {
      panelType = 'Consistency Panel';
    } else if (isReject) {
      panelType = 'Rejected Panel';
    } else if (isAppeal) {
      panelType = 'Appeal Panel';
    }

    return (
      <div className="container" id="formMatch">
        <Paper className={classes.container}>
          <Typography variant="h6">
            {panelType}
          </Typography>
          <form onSubmit={handleSubmit(this.handleBeforeSubmit)}>
            <BasicFormFields
              onEvaluationTypeChange={this.evalTypeChangeMiddleware}
              profileOptions={profileOptions}
              profile={profile}
              isMatch={isMatch}
              isHybridMatch={isHybridMatch}
              isEvaluation={isEvaluation}
              isConsistency={isConsistency}
              panelMembers={panelMembers}
            />
            <FormTable
              fields={fields}
              profile={profile}
              scores={scores}
              jobData={jobData}
              isHybridMatch={isHybridMatch}
              isEvaluation={isEvaluation}
              isReject={isReject}
              isConsistency={isConsistency}
              accountId={accountId}
            />
            {this.renderFormErrors()}
            <FormActions
              showSaveDraftDialog={this.showSaveDraftDialog}
              showSaveDialog={this.showSaveDialog}
              submitting={submitting}
              onClear={onClear}
              clearButton={clearButton}
              isConsistency={isConsistency}
              showRejectDialog={this.showRejectDialog}
              showApproveDialog={this.showApproveDialog}
            />
          </form>
          <ConfirmModal
            openSaveDialog={openSaveDialog}
            handleSubmit={handleSubmit(this.handleBeforeSubmit)}
            onClose={this.hideSaveDialog}
          />
          <SaveDraftModal
            openSaveDraftDialog={openSaveDraftDialog}
            message={saveDraftEvaluationMessage}
            handleSubmit={handleSubmit(this.handleSaveDraft)}
            onClose={this.hideSaveDraftDialog}
          />
          {this.renderConfirmApproveModal()}
          {this.renderConfirmRejectModal()}
        </Paper>
        <JobFiles
          jobFiles={jobFiles}
        />
      </div>
    );
  }
}

let ProfileWrapper = reduxForm({
  form: 'profiles',
  enableReinitialize: true,
})(ProfileForm);

ProfileWrapper = connect((state, props) => {
  // debugger;
  return {
    initialValues: props.initialValues,
  };
})(ProfileWrapper);

export default ProfileWrapper;
