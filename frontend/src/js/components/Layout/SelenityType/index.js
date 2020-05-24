// @flow

import * as React from 'react';
import {
  Typography,
  withStyles,
} from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
  disabled: {
    color: theme.palette.grey[400],
  },
})

@withStyles(styles)
class SelenityType extends React.Component {
  render() {
    const {
      classes,
      disabled,
      children,
      ...typoProps
    } = this.props;

    return (
      <Typography {...typoProps} className={classNames(disabled && classes.disabled)}>
        {children}
      </Typography>
    );
  }
}

export default SelenityType;
