// @flow

import * as React from 'react';
import _replace from 'lodash/replace';
import {
  Chip,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  History as HistoryIcon,
} from '@material-ui/icons';
import { TextField } from 'Components/redux-form-material-ui';
import { Field } from 'redux-form';
import styles from '../styles';
import { matchResultStyle, matchResultText } from 'Utils/matcher/factors';
import scores from 'Utils/matcher/scores';
import FactorDescription from './FactorDescription';
import ProfileSelect from '../../FormHeader/ProfileSelect';
import type { Props } from './types';

const factorLevels = Object.keys(scores).reduce((levels, key) => {
  levels[key] = Array(...new Array(scores[key].length - 1))
    .map((v, i) => (i + 1).toString());
  return levels;
}, {});

@withStyles(styles)
class ProfileRow extends React.PureComponent<Props> {
  render() {
    const {
      name,
      profileScore,
      score,
      factor,
      evidenceString,
      factorDescription,
      classes,
      index,
      singleFactorData,
      isEvaluation,
      matchData,

      isConsistency,
      isAppeal,
      isReject,
    } = this.props;
    const options = factorLevels[factor].map(val => ({ value: val, label: val }));
    const profileScoreDisplay = profileScore ? _replace(profileScore, / +/g, ' / ') : undefined;

    const consistencyOrEval = isConsistency || isEvaluation;

    return (
      <TableRow>
        <TableCell
          className={classes.indexCell}
        >
          {index + 1}
        </TableCell>
        <TableCell
          className={classes.factorCell}
        >
          <FactorDescription
            classes={classes}
            name={name}
            disabled={consistencyOrEval}
            factorDescription={factorDescription}
          />
        </TableCell>
        <TableCell
          className={classes.evidenceCell}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Field
              fullWidth
              multiline
              name={evidenceString}
              component={TextField}
              placeholder="Your evidence..."
              disabled={isConsistency}
            />
            {!isConsistency && matchData && (isAppeal || isReject) && (
            <Tooltip title={matchData[`evidence${index + 1}`]} placement="right">
              <HistoryIcon />
            </Tooltip>
            )}
          </div>
        </TableCell>
        <TableCell
          className={classes.profileScoreCell}
        >
          <Typography variant="body1">
            {profileScoreDisplay}
          </Typography>
        </TableCell>
        <TableCell
          className={classes.panelScoreCell}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Field
              fullWidth
              name={factor}
              component={ProfileSelect}
              floatingLabelText="Score"
              placeholder="-"
              id={`panelScoreSelect${index + 1}`}
              disabled={isConsistency}
              options={options}
            />
            {!isConsistency && matchData && (isAppeal || isReject) && (
              <Tooltip title={matchData[`factor${index + 1}`]} placement="right">
                <HistoryIcon />
              </Tooltip>
            )}
          </div>
        </TableCell>
        <TableCell
          className={classes.resultCell}
        >
          {score && !isEvaluation && (
            <Chip
              label={matchResultText(singleFactorData)}
              className={matchResultStyle(singleFactorData, classes)}
            />
            )
          }
        </TableCell>
        <TableCell
          className={classes.jeScoreCell}
        >
          <Typography variant="body1">
            {score}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }
}

export default ProfileRow;
