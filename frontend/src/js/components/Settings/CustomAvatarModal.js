// @flow

import React, { Component } from 'react';
import {
  Slider,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import ReactAvatarEditor from 'react-avatar-editor';
import type { Props, State } from './types';

class CustomAvatarModel extends Component<Props, State> {
  state = {
    scale: 1.2,
    editor: {},
  };

  setEditorRef = (editor: Object) => {
    if (editor) {
      this.setState({ editor });
    }
  };

  handleChange = (event: Object, value: number) => {
    this.setState({ scale: value });
  };

  handleCancel = () => {
    const { onClose } = this.props;

    onClose();
  };

  handleOk = () => {
    const { onSave } = this.props;
    const { editor } = this.state;

    const canvas = editor.getImage().toDataURL();
    onSave(canvas);
  };

  render() {
    const {
      classes,
      image,
      open,
      onClose,
    } = this.props;
    const { scale } = this.state;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={onClose}
      >
        <DialogTitle id="confirmation-dialog-title">
          Custom Image
        </DialogTitle>
        <DialogContent style={{ overflowY: 'unset' }}>
          <div>
            <ReactAvatarEditor
              ref={this.setEditorRef}
              width={200}
              height={200}
              border={10}
              scale={parseFloat(scale)}
              borderRadius={200}
              color={[255, 255, 255, 0.6]}
              image={image}
            />
            <Slider
              classes={{ container: classes.slider }}
              value={scale}
              min={1}
              max={2}
              step={0.01}
              onChange={this.handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CustomAvatarModel;
