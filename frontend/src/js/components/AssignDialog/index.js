// @flow

// TODO:

// we want to use the MenuItem pattern here, but need to build out a multi-select component

import React, { Component } from 'react';
import Select from 'react-select';
import {
  Button, DialogContentText,
  DialogContent, DialogActions, DialogTitle, Dialog,
  Slide,
  withStyles,
} from '@material-ui/core';
import styles from './styles';
import type { Props, State } from './types';

const Transition = props => <Slide direction="up" {...props} />;

@withStyles(styles)
class AssignDialog extends Component<Props, State> {
  state = {
    value: [],
    error: null,
  }

  // componentWillReceiveProps(nextProps) {
  //   const { options, selectedValue } = nextProps;
  //   this.setState({ value: selectedValue, error: null });
  // }

  // static getDerivedStateFromProps(props, state) {
  //   console.log('getting derived', props);
  //   return {
  //     value: props.selectedValue,
  //   };
  // }

  handleChange = (value) => {
    const { selectionLimit } = this.props;

    if (value.length > selectionLimit) {
      this.setState({
        error: `Assigned members can't be greater than ${selectionLimit}`,
      });
    } else {
      console.log('setting state');
      this.setState({ value, error: null });
    }
  }

  handleClose = () => {
    this.props.onClose();
  }

  handleSubmit = (value) => {
    if (!value.length) {
      this.setState({
        error: 'At least one member must be assign',
      });
      return;
    }
    this.props.onSubmit(value);
  }

  render() {
    const {
      value,
      error,
    } = this.state;
    const {
      title,
      description,
      open,
      options,
      classes,
    } = this.props;

    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        classes={{ paper: classes.paper }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent style={{ overflowY: 'visible' }}>
          <DialogContentText>
            {description}
          </DialogContentText>
          <div>{error}</div>
          <Select
            isMulti
            required
            value={value}
            options={options}
            onChange={this.handleChange}
            id="selectName"
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={this.handleClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.handleSubmit(value)}
            id="buttonAssignSubmit"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AssignDialog;
