// @flow

import { getJobState } from '../data/resolvers/evaluation';

function buildEval(overrideEval: Object) {
  return {
    band: 4,
    dateOfPanel: '2018-11-30',
    evidence1: 'panelMatch',
    evidence2: 'panelMatch',
    evidence3: 'panelMatch',
    evidence4: 'panelMatch',
    evidence5: 'panelMatch',
    evidence6: 'panelMatch',
    evidence7: 'panelMatch',
    evidence8: 'panelMatch',
    evidence9: 'panelMatch',
    evidence10: 'panelMatch',
    evidence11: 'panelMatch',
    evidence12: 'panelMatch',
    evidence13: 'panelMatch',
    evidence14: 'panelMatch',
    evidence15: 'panelMatch',
    evidence16: 'panelMatch',
    factor1: '3',
    factor2: '3',
    factor3: '3',
    factor4: '2',
    factor5: '3',
    factor6: '3',
    factor7: '3',
    factor8: '2',
    factor9: '3',
    factor10: '2',
    factor11: '3',
    factor12: '1',
    factor13: '2',
    factor14: '3',
    factor15: '2',
    factor16: '5',
    isDraft: false,
    isEvaluation: false,
    isHybrid: false,
    jobId: '-LSZ6jaNj7_uQddL76yr',
    jobMatchNumber: '1',
    jobTitle: 'test',
    profileId: '-Kywi98FthMa9-qmPOpJ',
    profileVersion: '1.0',
    total: 309,
    totalVariants: 4,
    userId: '0MP9OPGU0vQJ10tXeta4juMu0bz2',
    variesBy: 4,
    verdict: 'NON_MATCH',
    ...overrideEval,
  }
}

describe('getJobState', () => {
  it('save panelMatch', () => {
    const evaluationInput = buildEval();
    const newEvaluationKey = '1234';

    const oldJobStatus = {
      needsMatch: true,
    };

    const jobState = getJobState(evaluationInput, newEvaluationKey, oldJobStatus);
    console.log(jobState);

    expect(jobState.status.needsMatch).toBe(false);
    expect(jobState.status.needsConsistencyCheck).toBe(true);
  });

  it('save draft panelMatch', () => {
    const evaluationInput = buildEval({
      band: undefined,
      dateOfPanel: '2018-11-30',
      evidence1: '1',
      factor1: undefined,
      factor2: undefined,
      factor3: undefined,
      factor4: undefined,
      factor5: undefined,
      factor6: undefined,
      factor7: undefined,
      factor8: undefined,
      factor9: undefined,
      factor10: undefined,
      factor11: undefined,
      factor12: undefined,
      factor13: undefined,
      factor14: undefined,
      factor15: undefined,
      factor16: undefined,
      isDraft: true,
      isEvaluation: false,
      isHybrid: false,
      jobId: '-LSZGqcDXT-Rtj8ScgIb',
      jobMatchNumber: '1',
      jobTitle: 'test',
      profileId: '-Kywi9WKz8mlBcWS6FbS',
      profileVersion: '1.0',
      total: 0,
      totalVariants: 0,
      userId: '0MP9OPGU0vQJ10tXeta4juMu0bz2',
      verdict: undefined,
    })

    const newEvaluationKey = '1234';
    const oldJobStatus = {
      needsMatch: true,
    };

    const jobState = getJobState(evaluationInput, newEvaluationKey, oldJobStatus);
    console.log(jobState);

    expect(jobState.status.needsMatch).toBe(true);
    expect(jobState.status.needsConsistencyCheck).toBe(false);
  });

  it('save rejectedPanelMatch', () => {
    const evaluationInput = {
      band: 3,
      dateOfPanel: '2018-11-30',
      evidence1: 'rejected',
      evidence2: 'rejected',
      evidence3: 'rejected',
      evidence4: 'rejected',
      evidence5: 'rejected',
      evidence6: 'rejected',
      evidence7: 'rejected',
      evidence8: 'rejected',
      evidence9: 'rejected',
      evidence10: 'rejected',
      evidence11: 'rejected',
      evidence12: 'rejected',
      evidence13: 'rejected',
      evidence14: 'rejected',
      evidence15: 'rejected',
      evidence16: 'rejected',
      factor1: '3',
      factor2: '2',
      factor3: '3',
      factor4: '3',
      factor5: '2',
      factor6: '3',
      factor7: '2',
      factor8: '2',
      factor9: '3',
      factor10: '2',
      factor11: '3',
      factor12: '2',
      factor13: '2',
      factor14: '2',
      factor15: '2',
      factor16: '3',
      isDraft: false,
      isEvaluation: false,
      isHybrid: false,
      jobId: '-LSZ8pAEL9xAMBBR5-My',
      jobMatchNumber: '3',
      jobTitle: 'test',
      profileId: '-Kywi9WKz8mlBcWS6FbS',
      profileVersion: '1.0',
      total: 261,
      totalVariants: 6,
      userId: '0MP9OPGU0vQJ10tXeta4juMu0bz2',
      variesBy: 6,
      verdict: 'NON_MATCH',
    };

    const newEvaluationKey = '1234';

    const oldJobStatus = {
      consistencyCheckApproved: false,
      consistencyCheckRejected: true,
      needsConsistencyCheck: false,
      needsMatch: false,
    };

    const jobState = getJobState(evaluationInput, newEvaluationKey, oldJobStatus);
    console.log(jobState);

    expect(jobState.status.needsMatch).toBe(false);
    expect(jobState.status.needsConsistencyCheck).toBe(true);
    expect(jobState.status.consistencyCheckRejected).toBe(true);
  });

  it('save draft rejectedPanelMatch', () => {
    const evaluationInput = {
      band: undefined,
      dateOfPanel: '2018-11-30',
      evidence1: '2',
      factor1: undefined,
      factor2: undefined,
      factor3: undefined,
      factor4: undefined,
      factor5: undefined,
      factor6: undefined,
      factor7: undefined,
      factor8: undefined,
      factor9: undefined,
      factor10: undefined,
      factor11: undefined,
      factor12: undefined,
      factor13: undefined,
      factor14: undefined,
      factor15: undefined,
      factor16: undefined,
      isDraft: true,
      isEvaluation: false,
      isHybrid: false,
      jobId: '-LSZGqcDXT-Rtj8ScgIb',
      jobMatchNumber: '1',
      jobTitle: 'test',
      profileId: undefined,
      profileVersion: '1.0',
      total: 0,
      totalVariants: 0,
      userId: '0MP9OPGU0vQJ10tXeta4juMu0bz2',
      verdict: undefined,
    };

    const newEvaluationKey = '1234';

    const oldJobStatus = {
      consistencyCheckApproved: false,
      consistencyCheckRejected: true,
      needsConsistencyCheck: false,
      needsMatch: false,
    };

    const jobState = getJobState(evaluationInput, newEvaluationKey, oldJobStatus);
    console.log(jobState);

    expect(jobState.status.needsMatch).toBe(false);
    expect(jobState.status.needsConsistencyCheck).toBe(false);
    expect(jobState.status.consistencyCheckRejected).toBe(true);
    expect(jobState.status.consistencyCheckApproved).toBe(false);
  });

  it('save appealPanelMatch', () => {
    const evaluationInput = {
      band: 3,
      dateOfPanel: '2018-11-30',
      evidence1: 'appeal',
      evidence2: 'appeal',
      evidence3: 'appeal',
      evidence4: 'appeal',
      evidence5: 'appeal',
      evidence6: 'appeal',
      evidence7: 'appeal',
      evidence8: 'appeal',
      evidence9: 'appeal',
      evidence10: 'appeal',
      evidence11: 'appeal',
      evidence12: 'appeal',
      evidence13: 'appeal',
      evidence14: 'appeal',
      evidence15: 'appeal',
      evidence16: 'appeal',
      factor1: '2',
      factor2: '2',
      factor3: '2',
      factor4: '2',
      factor5: '2',
      factor6: '2',
      factor7: '3',
      factor8: '2',
      factor9: '2',
      factor10: '2',
      factor11: '3',
      factor12: '2',
      factor13: '1',
      factor14: '1',
      factor15: '2',
      factor16: '5',
      isDraft: false,
      isEvaluation: false,
      isHybrid: false,
      jobId: '-LSZ8pAEL9xAMBBR5-My',
      jobMatchNumber: '3',
      jobTitle: 'test',
      profileId: '-KywiAgB1x5FQzHcaFoT',
      profileVersion: '1.0',
      total: 227,
      totalVariants: 4,
      userId: '0MP9OPGU0vQJ10tXeta4juMu0bz2',
      variesBy: 4,
      verdict: 'NON_MATCH',
    };

    const newEvaluationKey = '1234';

    const oldJobStatus = {
      consistencyCheckApproved: true,
      consistencyCheckRejected: false,
      needsConsistencyCheck: false,
      needsMatch: false,
      postConsistencyCheckAdminAppealed: true,
    };

    const jobState = getJobState(evaluationInput, newEvaluationKey, oldJobStatus);
    console.log(jobState);

    expect(jobState.status.needsMatch).toBe(false);
    expect(jobState.status.needsConsistencyCheck).toBe(true);
    expect(jobState.status.postConsistencyCheckAdminAppealed).toBe(true);
  });

  it('save draft appealPanelMatch', () => {
    const evaluationInput = {
      band: undefined,
      dateOfPanel: '2018-11-30',
      evidence1: '3',
      factor1: undefined,
      factor2: undefined,
      factor3: undefined,
      factor4: undefined,
      factor5: undefined,
      factor6: undefined,
      factor7: undefined,
      factor8: undefined,
      factor9: undefined,
      factor10: undefined,
      factor11: undefined,
      factor12: undefined,
      factor13: undefined,
      factor14: undefined,
      factor15: undefined,
      factor16: undefined,
      isDraft: true,
      isEvaluation: false,
      isHybrid: false,
      jobId: '-LSZGqcDXT-Rtj8ScgIb',
      jobMatchNumber: '1',
      jobTitle: 'test',
      profileId: undefined,
      profileVersion: '1.0',
      total: 0,
      totalVariants: 0,
      userId: '0MP9OPGU0vQJ10tXeta4juMu0bz2',
      verdict: undefined,
    };

    const newEvaluationKey = '1234';

    const oldJobStatus = {
      consistencyCheckApproved: true,
      consistencyCheckRejected: false,
      needsConsistencyCheck: false,
      needsMatch: false,
      postConsistencyCheckAdminAppealed: true,
    };

    const jobState = getJobState(evaluationInput, newEvaluationKey, oldJobStatus);
    console.log(jobState);

    expect(jobState.status.postConsistencyCheckAdminAppealed).toBe(true);
  });

  it('consistency check appeal', () => {
    const evaluationInput = {
      passedCheck: true,
      key: '1234',
    };

    const newEvaluationKey = '1234';

    const oldJobStatus = {
      needsConsistencyCheck: true,
      needsMatch: false,
      postConsistencyCheckAdminAppealed: true,
    };

    const jobState = getJobState(evaluationInput, newEvaluationKey, oldJobStatus);
    console.log(jobState);

    expect(jobState.status.needsMatch).toBe(false);
    expect(jobState.status.needsConsistencyCheck).toBe(false);
    expect(jobState.status.consistencyCheckApproved).toBe(true);
    expect(jobState.status.consistencyCheckRejected).toBe(false);
  });

  it('consistency check reject', () => {
    const evaluationInput = {
      consistencyCheckRejected: true,
      key: '1234',
    };

    const newEvaluationKey = '1234';

    const oldJobStatus = {
      needsConsistencyCheck: true,
      needsMatch: false,
      postConsistencyCheckAdminAppealed: true,
    };

    const jobState = getJobState(evaluationInput, newEvaluationKey, oldJobStatus);
    console.log(jobState);

    expect(jobState.status.needsMatch).toBe(false);
    expect(jobState.status.needsConsistencyCheck).toBe(false);
    expect(jobState.status.consistencyCheckApproved).toBe(false);
    expect(jobState.status.consistencyCheckRejected).toBe(true);
  });
});
