// @flow

// TODO: download other panels as well

import Client, { gql } from 'Apollo';
import _ from 'lodash';
import { notify } from '../notifications/actions';
import {
  DOWNLOAD_START,
  DOWNLOAD_SUCCESS,
  DOWNLOAD_FAILED,
} from './constant';

const toCSV = require('array-to-csv');

// escape all quotes, return surrounded w/ double quotes
export const cellWrapper = (value: string) => {
  if (value === undefined || value === null) {
    return '';
  }

  let val = value.replace(/"/g, '\\"').replace(/\n/g, ' ');
  val = `''${val}''`;
  return val;
};


export const downloadProfile = (fileInfo: Object, filters) => (dispatch: Function) => {
  dispatch({
    type: DOWNLOAD_START,
  });

  const filterBy = filters ? filters : [];

  const models = [];
  const headers = [
    'JIT/Job Match Number',
    'Panel Date',
    'Job Title',
    'Panel Members',
    'Profile',
    'Total',
    'Total Variants',
    'Verdict',
    'Factor 1 Evidence',
    'Factor 1 Score',
    'Factor 2 Evidence',
    'Factor 2 Score',
    'Factor 3 Evidence',
    'Factor 3 Score',
    'Factor 4 Evidence',
    'Factor 4 Score',
    'Factor 5 Evidence',
    'Factor 5 Score',
    'Factor 6 Evidence',
    'Factor 6 Score',
    'Factor 7 Evidence',
    'Factor 7 Score',
    'Factor 8 Evidence',
    'Factor 8 Score',
    'Factor 9 Evidence',
    'Factor 9 Score',
    'Factor 10 Evidence',
    'Factor 10 Score',
    'Factor 11 Evidence',
    'Factor 11 Score',
    'Factor 12 Evidence',
    'Factor 12 Score',
    'Factor 13 Evidence',
    'Factor 13 Score',
    'Factor 14 Evidence',
    'Factor 14 Score',
    'Factor 15 Evidence',
    'Factor 15 Score',
    'Factor 16 Evidence',
    'Factor 16 Score',
  ];
  models.push(headers);

  // TODO: test w/ legacy Heart and Chest Data
  // TODO: push this logic server-side
  Client.query({
    query: gql`
        query completedJobs($filterBy: [FilterBy]) {
          completedJobs(sortBy: "createDate", sortReverse: true, filterBy: $filterBy) {
            data {
              key
              jobTitle
              jobNumber
              panelMembers {
                key
                displayName
                email
              }

              mostRecentPanelMatch {
                key
                profileVersion
                band
                verdict
                total
                createDate
                jobMatchNumber
                total
                totalVariants
                dateOfPanel
                jobTitle
                total
                totalVariants
                variesBy
                verdict
                jobMatchNumber
                factor1
                factor2
                factor3
                factor4
                factor5
                factor6
                factor7
                factor8
                factor9
                factor10
                factor11
                factor12
                factor13
                factor14
                factor15
                factor16
                evidence1
                evidence2
                evidence3
                evidence4
                evidence5
                evidence6
                evidence7
                evidence8
                evidence9
                evidence10
                evidence11
                evidence12
                evidence13
                evidence14
                evidence15
                evidence16

                profile {
                  key
                  title
                }
              }
            }
            page
            totalPages
            totalResults
          }
        }
      `,
    variables: {
      filterBy,
    },
  }).then((result) => {
    const json = result.data.completedJobs.data;
    // TODO: push this logic to the api to build this csv
    // TODO: the legacy fields below can be migrated to new fields and this code can be removed
    //       but that query needs to be written, validated, and run
    json.forEach((model) => {
      const row = [
        // NOTE: this is supporting legacy jobMatchNumber. the new one lives at the job level
        model.jobNumber ? model.jobNumber : model.mostRecentPanelMatch.jobMatchNumber,
        // support legacy date of panel and new
        model.dateOfPanel ? model.dateOfPanel : model.mostRecentPanelMatch.dateOfPanel,
        model.jobTitle,
        // TODO: should this be match panel members, consistency panel members?
        //       do we combine them or split them out?
        cellWrapper(model.panelMembers ? _.map(model.panelMembers, member => member.email).join(',') : 'no panel members'),
        model.mostRecentPanelMatch.profile.title,
        model.mostRecentPanelMatch.total,
        model.mostRecentPanelMatch.totalVariants,
        model.mostRecentPanelMatch.verdict,
        cellWrapper(model.mostRecentPanelMatch.evidence1),
        model.mostRecentPanelMatch.factor1,
        cellWrapper(model.mostRecentPanelMatch.evidence2),
        model.mostRecentPanelMatch.factor2,
        cellWrapper(model.mostRecentPanelMatch.evidence3),
        model.mostRecentPanelMatch.factor3,
        cellWrapper(model.mostRecentPanelMatch.evidence4),
        model.mostRecentPanelMatch.factor4,
        cellWrapper(model.mostRecentPanelMatch.evidence5),
        model.mostRecentPanelMatch.factor5,
        cellWrapper(model.mostRecentPanelMatch.evidence6),
        model.mostRecentPanelMatch.factor6,
        cellWrapper(model.mostRecentPanelMatch.evidence7),
        model.mostRecentPanelMatch.factor7,
        cellWrapper(model.mostRecentPanelMatch.evidence8),
        model.mostRecentPanelMatch.factor8,
        cellWrapper(model.mostRecentPanelMatch.evidence9),
        model.mostRecentPanelMatch.factor9,
        cellWrapper(model.mostRecentPanelMatch.evidence10),
        model.mostRecentPanelMatch.factor10,
        cellWrapper(model.mostRecentPanelMatch.evidence11),
        model.mostRecentPanelMatch.factor11,
        cellWrapper(model.mostRecentPanelMatch.evidence12),
        model.mostRecentPanelMatch.factor12,
        cellWrapper(model.mostRecentPanelMatch.evidence13),
        model.mostRecentPanelMatch.factor13,
        cellWrapper(model.mostRecentPanelMatch.evidence14),
        model.mostRecentPanelMatch.factor14,
        cellWrapper(model.mostRecentPanelMatch.evidence15),
        model.mostRecentPanelMatch.factor15,
        cellWrapper(model.mostRecentPanelMatch.evidence16),
        model.mostRecentPanelMatch.factor16,
      ];
      models.push(row);
    });
  }).then(() => {
    const csvData = toCSV(models);
    dispatch({ type: DOWNLOAD_SUCCESS, payload: { contents: csvData, ...fileInfo } });
    dispatch(notify('Download Successful'));
  }).catch((error) => {
    dispatch({ type: DOWNLOAD_FAILED, payload: error });
    dispatch(notify('Download Failed'));
  });
};
