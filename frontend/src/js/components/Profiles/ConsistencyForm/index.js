// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { queryLoader } from 'HOCS';
import { reduxForm } from 'redux-form';
import _includes from 'lodash/includes';
import filesize from 'filesize';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import styles from './styles';
import {
  approveConsistencyMessage,
  rejectConsistencyMessage,
} from '../../../config';
import FormFactorFields from '../FormFactorFields';
import BasicFormFields from '../Shared/BasicFormFields';
import type { Props, State } from './types';

@connect()
@queryLoader
@withStyles(styles)
class ConsistencyForm extends Component<Props, State> {
  state = {
    openApproveDialog: false,
    openRejectDialog: false,
  };

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

  handleApprove = (values: Object) => {
    const {
      onSave,
    } = this.props;

    const submitEvalData = {
      // any comments
      passedCheck: true,
    };

    this.hideApproveDialog();

    return onSave(submitEvalData);
  }

  handleReject = (values: Object) => {
    const {
      onSave,
    } = this.props;

    const submitEvalData = {
      // any comments
      consistencyCheckRejected: true,
    };

    this.hideRejectDialog();

    return onSave(submitEvalData);
  }

  assignedRejectPanelMemnerIds = () => {
    const { jobData: { rejectedPanelMemberIds } } = this.props;
    return rejectedPanelMemberIds || [];
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

  renderFormActions = () => {
    const { submitting } = this.props;

    return (
      <div>
        <Button
          variant="outlined"
          component="span"
          onClick={this.showRejectDialog}
          id="buttonReject"
        >
          Reject
        </Button>
        &nbsp;
        <Button
          color="primary"
          variant="contained"
          disabled={submitting}
          onClick={this.showApproveDialog}
          id="buttonSave"
        >
          Approve
        </Button>
      </div>
    );
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

  render() {
    const {
      handleSubmit,
      jobFiles,
      classes,

      fields,
      profile,
      newScoreData,
      jobData,
      profileOptions,
    } = this.props;
    const {
      isHybridMatch,
      isEvaluation,
      isMatch,
    } = this.state;

    return (
      <div className="container" id="formMatch">
        <Paper className={classes.container}>
          <form onSubmit={handleSubmit(this.handleApprove)}>
            <BasicFormFields
              profileOptions={profileOptions}
              classes={classes}
              profile={profile}
              jobData={jobData}
              isMatch={isMatch}
              isHybridMatch={isHybridMatch}
              isEvaluation={isEvaluation}
            />
            <FormFactorFields
              fields={fields}
              profile={profile}
              newScoreData={newScoreData}
              jobData={jobData}
              isHybrid={isHybridMatch}
              isEvaluation={isEvaluation}
              isConsistency
            />
            {this.renderFormErrors()}
            {this.renderFormActions()}
          </form>
          {this.renderConfirmApproveModal()}
          {this.renderConfirmRejectModal()}
        </Paper>

      </div>
    );
  }
}

export default reduxForm({
  form: 'profiles',
  enableReinitialize: true,
})(ConsistencyForm);
