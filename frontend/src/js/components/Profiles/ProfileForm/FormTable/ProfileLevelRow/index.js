// @flow

import * as React from 'react';
import classnames from 'classnames';
import {
  TableCell, TableRow,
  Typography,
  withStyles,
} from '@material-ui/core';
import SelenityType from 'Components/Layout/SelenityType';
import styles from '../styles';
import type { Props } from './types';

@withStyles(styles)
class ProfileLevelRow extends React.PureComponent<Props> {
  render() {
    const {
      profile,
      classes,
      disabled,
    } = this.props;
    let profileLevel = '';

    if (profile) {
      profileLevel = profile.pay_band_max;
      if (profile.pay_band_min !== '' && profile.pay_band_min !== undefined) {
        profileLevel = `${profile.pay_band_min} / ${profileLevel}`;
      }
    }

    return (
      <TableRow>
        <TableCell
          className={classnames(classes.cell, classes.rightText)}
          colSpan={6}
        >
          <SelenityType variant="body1" disabled={disabled}>
            Profile Band
          </SelenityType>
        </TableCell>
        <TableCell
          className={classes.cell}
        >
          <Typography variant="body1">
            {profileLevel}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }
}

export default ProfileLevelRow;
