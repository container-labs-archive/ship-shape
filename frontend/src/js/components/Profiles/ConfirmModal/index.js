// @flow

import * as React from 'react';
import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography,
} from '@material-ui/core';
import {
  saveEvaluationMessage,
} from '../../../config/strings';

type Props = {
  handleSubmit: Function,
  onClose: Function,
  openSaveDialog: Boolean,
};

class ConfirmModal extends React.PureComponent<Props> {
  render() {
    const {
      handleSubmit,
      openSaveDialog,
      onClose,
    } = this.props;

    return (
      <Dialog open={!!openSaveDialog}>
        <DialogTitle>
          Confirm
        </DialogTitle>
        <DialogContent>
          <Typography>
            {saveEvaluationMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={onClose}
          >
            No
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            id="submitDialog"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmModal;
