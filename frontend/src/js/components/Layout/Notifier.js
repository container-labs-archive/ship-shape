// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

type Props = {
  notification: string,
  visible: boolean,
}

const TransitionLeft = props => <Slide direction="left" {...props} />;

@connect(store => ({
  notification: store.notification.message,
  visible: store.notification.visible,
}))
class Notifier extends Component<Props> {
  render() {
    const {
      notification,
      visible,
    } = this.props;

    let content = '';
    if (visible) {
      content = notification;
    }

    return (
      <Snackbar
        open={visible}
        message={content}
        TransitionComponent={TransitionLeft}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    );
  }
}

export default Notifier;
