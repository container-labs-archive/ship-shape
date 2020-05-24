// @flow

import * as React from 'react';
import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from '@material-ui/core';
import {
  clearEvaluationMessage,
} from '../../../config/strings';

type Props = {
  openClearDialog: Boolean,
  onClose: Function,
  onConfirm: Function,
};

class ClearModal extends React.PureComponent<Props> {
  render() {
    const {
      openClearDialog,
      onClose,
      onConfirm,
    } = this.props;

    return (
      <Dialog open={!!openClearDialog}>
        <DialogTitle>
          Confirm
        </DialogTitle>
        <DialogContent>
          {clearEvaluationMessage}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            No
          </Button>
          <Button color="primary" onClick={onConfirm}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ClearModal;
