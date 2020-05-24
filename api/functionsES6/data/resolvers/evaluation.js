// @flow

import _values from 'lodash/values';
import {
  createWrapper,
  singleWrapper,
  updateWrapper,
} from '../firestore';
import {
  EVALUATIONS_COLLECTION,
  JOBS_COLLECTION,
  USER_SETTINGS_COLLECTION,
  PROFILES_COLLECTION,
} from './collections';
import { guid } from '../../utils';

/**
 * Queries
 */


/**
 * Mutations
 */

// TODO: need to check proper state after a match, rejectedPanelMatch, etc...
// input JobStatusInput {
//   needsMatch: Boolean
//   needsConsistencyCheck: Boolean
//   consistencyCheckApproved: Boolean
//   postConsistencyCheckAdminAppealed: Boolean
//   consistencyCheckRejected: Boolean
//   postConsistencyCheckAdminApproved: Boolean
// }
// we are in create or update evaluations
// called from the eval form page
// we could be in the first panel, or a rejeceted, appeal, or consistency
// because of this defaults don't make sense and we have to be very careful
// with the status that we do set
function getJobState(evaluationInput, newEvaluationKey, oldJobStatus) {
  const jobData = {
    status: {},
  };
  console.log('evaluationInput', evaluationInput);

  // Save draft
  if (evaluationInput.isDraft) {
    if (oldJobStatus.consistencyCheckRejected) {
      // For save draft rejectedPanelMatch
      jobData.status = {
        needsMatch: false,
        needsConsistencyCheck: false,
        consistencyCheckApproved: false,
        consistencyCheckRejected: true,
      };
      jobData.rejectedPanelMatchId = newEvaluationKey;
    } else if (oldJobStatus.postConsistencyCheckAdminAppealed) {
      // For save draft appealPanelMatch
      jobData.status = {
        postConsistencyCheckAdminAppealed: true,
      };
      jobData.appealPanelMatchId = newEvaluationKey;
    } else {
      // For save draft panelMatch
      jobData.status = {
        needsMatch: true,
        needsConsistencyCheck: false,
      };
      jobData.panelMatchId = newEvaluationKey;
    }
  } else {
    if (!evaluationInput.consistencyCheckRejected && oldJobStatus.consistencyCheckRejected) {
      // Save rejectedPanelMatch form
      jobData.status = {
        needsMatch: false,
        needsConsistencyCheck: true,
        consistencyCheckRejected: true,
      };
      jobData.rejectedPanelMatchId = newEvaluationKey;
      jobData.rejectedPanelMemberIds = [];
    } else if (!evaluationInput.postConsistencyCheckAdminAppealed && oldJobStatus.postConsistencyCheckAdminAppealed) {
      // Save appealPanelMatch form
      jobData.status = {
        needsMatch: false,
        needsConsistencyCheck: true,
        postConsistencyCheckAdminAppealed: true,
      };
      jobData.appealPanelMatchId = newEvaluationKey;
      jobData.appealPanelMemberIds = [];
    } else {
      // Save panelMatch form
      jobData.status = {
        needsMatch: false,
        needsConsistencyCheck: true,
      };
      jobData.panelMatchId = newEvaluationKey;
    }
  }

  // For consistencies form
  if (evaluationInput.passedCheck) {
    jobData.status = {
      needsMatch: false,
      needsConsistencyCheck: false,
      consistencyCheckApproved: true,
      consistencyCheckRejected: false,
    };
  }

  // For consistencies form
  if (evaluationInput.consistencyCheckRejected) {
    jobData.status = {
      needsMatch: false,
      needsConsistencyCheck: false,
      consistencyCheckApproved: false,
      consistencyCheckRejected: true,
    };
  }

  // jobData.consistencyPanelMemberIds = [];

  return jobData;
}

const createEvaluation = async (
  parent, {
    input: {
      // files = [],
      ...baseAttrs
    },
  }, context) => {
  console.log('MUTATION: createEvaluation');

  const evaluation = await createWrapper({
    collection: EVALUATIONS_COLLECTION,
  }, {
    ...baseAttrs,
    // key: newEvaluationKey,
    createDate: baseAttrs.createDate || Date.now(),
    // pass in through base attrs
    // accountId,
  });

  const job = await singleWrapper({
    collection: JOBS_COLLECTION,
    id: baseAttrs.jobId,
  });
  const jobData = getJobState(baseAttrs, evaluation.key, job.status);
  await updateWrapper({
    collection: JOBS_COLLECTION,
    id: baseAttrs.jobId
  }, jobData);

  return {
    status: 200,
    key: evaluation.keu,
    message: 'created evaluation',
  };
};

// TODO: not sure we need to do all these queries here
const updateEvaluation = async (parent, { input }, context) => {
  console.log('MUTATION: updateEvaluation');
  const updatedInput = {
    ...input,
    // pass in through input
    // accountId,
  };
  const evaluation = await singleWrapper({
    collection: EVALUATIONS_COLLECTION,
    id: input.key,
  });
  const job = await singleWrapper({
    collection: JOBS_COLLECTION,
    id: evaluation.jobId,
  });

  const jobData = getJobState(updatedInput, updatedInput.key, job.status);
  console.log(jobData);

  // TODO: manage this state better, move into getJobState
  if (jobData.status.needsConsistencyCheck && jobData.status.consistencyCheckRejected) {
    // nuke consistency panel members
    jobData.consistencyPanelMemberIds = null;
  }
  // this accounts for a bug in getJobState, it's the double-reject state atm
  // so we force it to go into consistency and clear the consistency and rejected panel members
  if (jobData.status.consistencyCheckRejected && !jobData.status.needsConsistencyCheck) {
    jobData.consistencyPanelMemberIds = null;
    // jobData.status.needsConsistencyCheck = true;
    jobData.rejectedPanelMemberIds = null;
  }

  console.log("DEBUG")
  console.log(jobData);
  // END

  await updateWrapper({
    collection: JOBS_COLLECTION,
    id: evaluation.jobId,
  }, jobData);

  return updateWrapper({
    collection: EVALUATIONS_COLLECTION,
    id: input.key,
  }, updatedInput);
};

// export const deleteEvaluation = (parent, { key }, { accountId }) =>
//   deleteWrapper(`evaluations/${accountId}/${key}`, itemRef => itemRef.remove());

// export const deleteEvaluations = (parent, args, { accountId }) =>
//   deleteWrapper(`evaluations/${accountId}`, itemRef => itemRef.remove());


const createOrUpdateEvaluation = async (parent, args, requestContext) => {
  const {
    input: {
      ...baseAttrs
    },
  } = args;
  console.log('MUTATION: createOrUpdateEvaluation');

  let response = {};

  if (baseAttrs.key) {
    response = await updateEvaluation(parent, args, requestContext);
  } else {
    response = await createEvaluation(parent, args, requestContext);
  }

  return response;
};

/**
 * Nested Object
 */

const evaluationProfile = ({ profileId }) => {
  // null or undefined....
  if (!profileId) {
    return null;
  }




  return singleWrapper({
    collection: PROFILES_COLLECTION,
    id: profileId,
  });
};

const afterMatchComments = async (evaluation) => {
  const getCommentDetail = async (comment) => {
    const owner = await singleWrapper({
      collection: USER_SETTINGS_COLLECTION,
      id: comment.userId,
    });

    return {
      ...comment,
      userEmail: owner.email,
      userDisplayName: owner.displayName,
    };
  };

  const comments = _values(evaluation.afterMatchComments);
  const result = await Promise.all(comments.map(comment => getCommentDetail(comment)));

  return result;
};

const beforeAppealComments = async (evaluation) => {
  const getCommentDetail = async (comment) => {
    const owner = await singleWrapper({
      collection: USER_SETTINGS_COLLECTION,
      id: comment.userId,
    });

    return {
      ...comment,
      userEmail: owner.email,
      userDisplayName: owner.displayName,
    };
  };

  const comments = _values(evaluation.afterMatchComments);
  const result = await Promise.all(comments.map(comment => getCommentDetail(comment)));

  return result;
};

// TODO: remove after migration
const appealMemberIds = async (evaluation) => {
  if (!evaluation.appealMemberIds) {
    return null;
  }
  if (Array.isArray(evaluation.appealMemberIds)) {
    return evaluation.appealMemberIds;
  }

  return Object.keys(evaluation.appealMemberIds);
};

const rejectedPanelMemberIds = async (evaluation) => {
  if (!evaluation.rejectedPanelMemberIds) {
    return null;
  }
  if (Array.isArray(evaluation.rejectedPanelMemberIds)) {
    return evaluation.rejectedPanelMemberIds;
  }

  return Object.keys(evaluation.rejectedPanelMemberIds);
};

const reviewMemberIds = async (evaluation) => {
  if (!evaluation.reviewMemberIds) {
    return null;
  }
  if (Array.isArray(evaluation.reviewMemberIds)) {
    return evaluation.reviewMemberIds;
  }

  return Object.keys(evaluation.reviewMemberIds);
};

const panelMemberIds = async (evaluation) => {
  if (!evaluation.panelMemberIds) {
    return null;
  }
  if (Array.isArray(evaluation.panelMemberIds)) {
    return evaluation.panelMemberIds;
  }

  return Object.keys(evaluation.panelMemberIds);
};

const evaluationNestedObject = {
  profile: evaluationProfile,
  afterMatchComments,
  beforeAppealComments,

  appealMemberIds,
  rejectedPanelMemberIds,
  reviewMemberIds,
  panelMemberIds,
};


// Migration Helper Queries
// export const evaluations = async (_, args, { accountId }) => {
//   console.log('QUERY: getCompletedEvaluations');
//   const {
//     page,
//     limit,
//     sortBy,
//     filterBy,
//     sortReverse,
//     pageSize,
//   } = args;
//   const query = await ref(`evaluations/${accountId}`).once('value');
//   let data = mapSnapshotToEntities(query);
//   // console.log('all evaluations for account');
//   // console.log(data);

//   return data;
// }

export {
  createOrUpdateEvaluation,
  getJobState,
  createEvaluation,
  updateEvaluation,

  evaluationNestedObject,
};
