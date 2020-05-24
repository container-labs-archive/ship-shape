// @flow

import * as React from 'react';
import classnames from 'classnames';
import {
  TableCell,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core';
import classNames from 'classnames';
import SelenityType from 'Components/Layout/SelenityType';
import styles from '../styles';
import type { Props } from './types';

const cellStyles = (totalVariants, classes) => {
  if (!totalVariants) {
    return classnames(classes.cell);
  }

  return classnames(
    classes.cell,
    totalVariants > 5 && classes.nonMatch,
    totalVariants <= 5 && classes.match,
  );
};

class VariationRow extends React.PureComponent<Props> {
  render() {
    const {
      classes,
      totalVariants,
      disabled,
      isEvaluation,
    } = this.props;

    return (
      <TableRow>
        <TableCell
          className={classnames(classes.cell, classes.rightText)}
          colSpan={6}
        >
          <SelenityType variant="body1" disabled={disabled}>
            Number of variations
          </SelenityType>
        </TableCell>
        <TableCell
          className={cellStyles(totalVariants, classes)}
        >
          <Typography variant="body1">
            {!isEvaluation && (
              totalVariants
            )}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(VariationRow);
