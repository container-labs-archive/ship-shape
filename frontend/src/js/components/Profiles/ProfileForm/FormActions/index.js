// @flow

import React from 'react';
import {
  Button,
} from '@material-ui/core';

type Props = {
  submitting: boolean,
  onClear: Function,
  clearButton: boolean,
  showSaveDraftDialog: Function,
  showSaveDialog: Function,
  isConsistency: boolean,
  showRejectDialog: Function,
  showApproveDialog: Function,
}

class FormActions extends React.PureComponent<Props> {
  render() {
    const {
      submitting,
      onClear,
      clearButton,
      showSaveDraftDialog,
      showSaveDialog,
      isConsistency,
      showRejectDialog,
      showApproveDialog,
    } = this.props;

    return (
      <div>
        {!isConsistency && (
          <div>
            <Button variant="outlined" component="span" onClick={showSaveDraftDialog} id="buttonSaveDraft">
              Save Draft
            </Button>
                &nbsp;
            <Button
              color="primary"
              variant="contained"
              disabled={submitting}
              onClick={showSaveDialog}
              id="buttonSave"
            >
              Save
            </Button>
                &nbsp;
            { clearButton && (
            <Button
              color="secondary"
              variant="contained"
              disabled={submitting}
              onClick={onClear}
            >
              Clear
            </Button>)}
          </div>
        )}
        {isConsistency && (
          <div>
            <Button
              variant="outlined"
              component="span"
              onClick={showRejectDialog}
              id="buttonReject"
            >
              Reject
            </Button>
            &nbsp;
            <Button
              color="primary"
              variant="contained"
              disabled={submitting}
              onClick={showApproveDialog}
              id="buttonSave"
            >
              Approve
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default FormActions;
