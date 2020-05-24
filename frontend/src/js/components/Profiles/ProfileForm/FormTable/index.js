// @flow

import * as React from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  withStyles,
} from '@material-ui/core';
import { factors, factorNumbers } from 'Utils/matcher/factors';
import Config from 'Config';
import VariationRow from './VariationRow';
import TotalPointRow from './TotalPointRow';
import VerdictRow from './VerdictRow';
import LevelRow from './LevelRow';
import ProfileRow from './ProfileRow';
import ProfileLevelRow from './ProfileLevelRow';

import styles from './styles';


type Props = {
  fields: Object,
  profile: Object,
  classes: Object,
  scores: Object,
  jobData: Object,
  isHybridMatch: boolean,
  isEvaluation: boolean,

  // TODO: make interface better
  isAppeal: boolean,
  isReject: boolean,
  isConsistency: boolean,
}

@withStyles(styles)
class FormFactorFields extends React.PureComponent<Props> {
  render() {
    const {
      fields,
      profile, // need
      classes,
      scores,
      jobData,
      isHybridMatch,
      isEvaluation,
      isAppeal,
      isReject,
      isConsistency,
      accountId,
    } = this.props;

    return (
      <Table className={classes.factorFieldTable}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.indexCell}>
              #
            </TableCell>
            <TableCell className={classes.factorCell}>
              Factor
            </TableCell>
            <TableCell className={classes.evidenceCell}>
              Evidence
            </TableCell>
            <TableCell className={classes.profileScoreCell}>
              Profile Score
            </TableCell>
            <TableCell className={classes.panelScoreCell}>
              Panel Score
            </TableCell>
            <TableCell className={classes.resultCell}>
              Result
            </TableCell>
            <TableCell className={classes.jeScoreCell}>
              JE Score
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            factors.map((factor, index) => {
              let profileScore;
              let factorDescription = '';
              let score = '';

              score = scores.factors[`factor${index + 1}`].score; // eslint-disable-line

              if (profile) {
                profileScore = profile[`factor_${factorNumbers[index]}_level`];
                factorDescription = profile[`factor_${index + 1}_description`];

                if (accountId && accountId === Config.statesAccount) {
                  // profileScore = profile[``];
                  // console.error('TODO');
                }
              }

              return (
                <ProfileRow
                  key={index}
                  index={index}
                  name={factor}
                  score={score}
                  styles={styles}
                  profileScore={profileScore}
                  factor={`factor${index + 1}`}
                  factorDescription={factorDescription}
                  evidenceString={`evidence${index + 1}`}
                  evidence={fields[`evidence${index + 1}`]}
                  panelScore={fields[`factor${index + 1}`]}
                  singleFactorData={scores.factors[`factor${index + 1}`]}
                  matchData={jobData}
                  isEvaluation={isEvaluation}
                  isConsistency={isConsistency}
                  isAppeal={isAppeal}
                  isReject={isReject}
                />
              );
            })
          }
          <VariationRow
            totalVariants={isHybridMatch ? scores.meta.variesBy : scores.meta.totalVariants}
            disabled={isEvaluation}
            isEvaluation={isEvaluation}
          />
          <TotalPointRow
            totalPoints={scores.meta.total}
            // disabled={isEvaluation}
          />
          <LevelRow
            matchMeta={scores.meta}
            isEvaluation={isEvaluation}
            // disabled={isEvaluation}
          />
          <ProfileLevelRow
            profile={profile}
            disabled={isEvaluation}
          />
          <VerdictRow
            matchMeta={scores.meta}
          />
        </TableBody>
      </Table>
    );
  }
}

export default FormFactorFields;
