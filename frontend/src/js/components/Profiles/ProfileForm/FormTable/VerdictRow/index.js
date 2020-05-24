// @flow

import * as React from 'react';
import classnames from 'classnames';
import {
  TableCell,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core';
import styles from '../styles';
import {
  VERDICT_PROFILE_MATCH,
  VERDICT_LEVEL_MATCH,
  VERDICT_NON_MATCH,
} from 'Utils/matcher/constants';
import SelenityType from 'Components/Layout/SelenityType';
import { prettyVerdict } from 'Utils/matcher/verdict';
import type { Props } from './types';

const verdictText = (matchMeta) => {
  if (matchMeta.complete && matchMeta.isEvaluation) {
    return 'Complete';
  }
  if (!matchMeta.verdict) {
    return 'Incomplete form';
  }
  return prettyVerdict(matchMeta.verdict.verdict);
};

const verdictClassnames = (matchMeta, classes) => {
  if (matchMeta.complete && matchMeta.isEvaluation) {
    return classnames(
      classes.cell,
      classes.levelMatch,
    );
  }
  if (!matchMeta.verdict) {
    return classnames(classes.cell, classes.incomplete);
  }
  const { verdict } = matchMeta.verdict;

  return classnames(
    classes.cell,
    verdict === VERDICT_PROFILE_MATCH && classes.profileMatch,
    verdict === VERDICT_LEVEL_MATCH && classes.levelMatch,
    verdict === VERDICT_NON_MATCH && classes.nonMatch,
  );
};

class VerdictRow extends React.PureComponent<Props> {
  render() {
    const {
      classes,
      matchMeta,
    } = this.props;

    return (
      <TableRow>
        <TableCell
          className={classnames(classes.cell, classes.rightText)}
          colSpan={6}
        >
          <SelenityType variant="body1">
            Verdict
          </SelenityType>
        </TableCell>
        <TableCell
          className={verdictClassnames(matchMeta, classes)}
        >
          <Typography variant="body1">
            {verdictText(matchMeta)}
          </Typography>
        </TableCell>
      </TableRow>
    )
  }
}

export default withStyles(styles)(VerdictRow);
