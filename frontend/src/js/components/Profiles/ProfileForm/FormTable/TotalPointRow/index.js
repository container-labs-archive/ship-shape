// @flow

import * as React from 'react';
import classnames from 'classnames';
import {
  TableCell,
  TableRow,
  withStyles,
  Typography,
} from '@material-ui/core';
import SelenityType from 'Components/Layout/SelenityType';
import classNames from 'classnames';
import styles from '../styles';
import type { Props } from './types';

@withStyles(styles)
class VariationRow extends React.PureComponent<Props> {
  render() {
    const {
      classes,
      totalPoints,
      disabled,
    } = this.props;

    return (
      <TableRow>
        <TableCell
          className={classnames(classes.cell, classes.rightText)}
          colSpan={6}
        >
          <SelenityType variant="body1" disabled={disabled}>
            Total Points
          </SelenityType>
        </TableCell>
        <TableCell
          className={classes.cell}
        >
          <Typography variant="body1">
            {totalPoints}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }
}

export default VariationRow;
