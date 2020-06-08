// @flow

import * as React from 'react';
import {
  Chip,
  Table, TableBody, TableCell, TableRow, TableHead,
} from '@material-ui/core';
import {
  factors,
  computeFactors,
  matchResultStyle,
  matchResultText,
} from 'Utils/matcher/factors';
import { prettyVerdict } from 'Utils/matcher/verdict';

type Props = {
  data: Object,
  classes: Object,
  accountId: string,
};

class FactorTable extends React.PureComponent<Props> {
  render() {
    const {
      data: {
        job: {
          mostRecentPanelMatch,
          mostRecentPanelMatch: {
            isEvaluation,
          },
        },
      },
      classes,
      accountId,
    } = this.props;

    const panelMatch = mostRecentPanelMatch;

    const { profile = {} } = panelMatch;
    const scoreData = computeFactors(
      profile,
      panelMatch,
      accountId,
      { isHybrid: panelMatch.isHybrid, isEvaluation: panelMatch.isEvaluation },
    );

    return (
      <Table className={classes.factorTable}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.indexColumn}>#</TableCell>
            <TableCell className={classes.factorColumn}>Factor</TableCell>
            <TableCell className={classes.evidenceColumn}>Evidence</TableCell>
            <TableCell className={classes.scoreColumn}>Profile Score</TableCell>
            <TableCell className={classes.profileScoreColumn}>
              Panel Score
            </TableCell>
            <TableCell className={classes.resultColumn}>Result</TableCell>
            <TableCell className={classes.jeScoreColumn}>JE Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {factors.map((factor, index) => {
            let profileScore = 'N/A';
            let resultText = 'N/A';
            let resultClasses = 'N/A';
            let jeScore = 'N/A';

            if (!isEvaluation) {
              profileScore = profile[`factor_${index + 1}_level`]
                ? profile[`factor_${index + 1}_level`].replace(/ +/g, ' / ')
                : null;

              resultText = matchResultText(
                scoreData.factors[`factor${index + 1}`],
              );
              resultClasses = matchResultStyle(
                scoreData.factors[`factor${index + 1}`],
                classes,
              );
              jeScore = scoreData.factors[`factor${index + 1}`].score;
            }

            return (
              <TableRow key={`factor-${index}`}>
                <TableCell className={classes.indexColumn}>{index + 1}</TableCell>
                <TableCell className={classes.factorColumn}>{factor}</TableCell>
                <TableCell className={classes.evidenceColumn}>
                  {panelMatch[`evidence${index + 1}`]}
                </TableCell>
                <TableCell className={classes.profileScoreColumn}>
                  {profileScore}
                </TableCell>
                <TableCell className={classes.scoreColumn}>
                  {panelMatch[`factor${index + 1}`]}
                </TableCell>
                <TableCell className={classes.resultColumn}>
                  <Chip label={resultText} className={resultClasses} />
                </TableCell>
                <TableCell className={classes.jeScoreColumn}>{jeScore}</TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={6} className={classes.sumaryTitleColumn}>
              Number of variations
            </TableCell>
            <TableCell className={classes.sumaryValueColumn}>
              {panelMatch.totalVariants}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6} className={classes.sumaryTitleColumn}>
              Total Points
            </TableCell>
            <TableCell className={classes.sumaryValueColumn}>
              {panelMatch.total}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6} className={classes.sumaryTitleColumn}>
              Band
            </TableCell>
            <TableCell className={classes.sumaryValueColumn}>
              {panelMatch.band}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6} className={classes.sumaryTitleColumn}>
              Verdict
            </TableCell>
            <TableCell className={classes.sumaryValueColumn}>
              {prettyVerdict(panelMatch.verdict)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

export default FactorTable;
