// @flow

import * as React from 'react';
import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography,
} from '@material-ui/core';

type Props = {
  handleSubmit: Function,
  openSaveDraftDialog: boolean,
  message: String,
  onClose: Function,
}

class SaveDraftModal extends React.PureComponent<Props> {
  render() {
    const {
      handleSubmit,
      openSaveDraftDialog,
      message,
      onClose,
    } = this.props;

    return (
      <Dialog open={openSaveDraftDialog}>
        <DialogTitle>
          Confirm
        </DialogTitle>
        <DialogContent>
          <Typography>
            {message}
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
            id="saveDraftDialogButton"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default SaveDraftModal;
