// @flow

import * as React from 'react';
import classnames from 'classnames';
import {
  TableRow, TableCell,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  VERDICT_PROFILE_MATCH,
  VERDICT_LEVEL_MATCH,
  VERDICT_NON_MATCH,
  NON_MATCH_BAND,
} from 'Utils/matcher/constants';
import SelenityType from 'Components/Layout/SelenityType';
import styles from '../styles';
import type { Props } from './types';

const levelText = (matchMeta) => {
  if (!matchMeta.verdict) {
    return '';
  }

  return matchMeta.band.band;
};

@withStyles(styles)
class LevelRow extends React.PureComponent<Props> {
  levelStyles = (matchMeta, classes) => {
    if (!matchMeta.verdict) {
      return classnames(classes.cell);
    }

    const {
      verdict,
      reason,
    } = matchMeta.verdict;
    const {
      isEvaluation,
    } = this.props;

    if (isEvaluation) {
      return classnames(
        classes.cell,
      );
    }

    return classnames(
      classes.cell,
      verdict === VERDICT_PROFILE_MATCH && classes.profileMatch,
      verdict === VERDICT_LEVEL_MATCH && classes.levelMatch,
      verdict === VERDICT_NON_MATCH && reason === NON_MATCH_BAND && classes.nonMatch,
    );
  };


  render() {
    const {
      matchMeta,
      classes,
      disabled,
    } = this.props;

    return (
      <TableRow>
        <TableCell
          className={classnames(classes.cell, classes.rightText)}
          colSpan={6}
        >
          <SelenityType variant="body1" disabled={disabled}>
            Band
          </SelenityType>
        </TableCell>
        <TableCell
          className={this.levelStyles(matchMeta, classes)}
        >
          <Typography variant="body1">
            {levelText(matchMeta)}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }
}

export default LevelRow;
