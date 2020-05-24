// @flow

import _sortBy from 'lodash/sortBy';
import _keys from 'lodash/keys';
// import { scheduledEmail } from '../../mailers/scheduledEmail';
import { PAGE_SIZE } from '../../constants';
import {
  COMMENTS_COLLECTION,
  JOBS_COLLECTION,
  JOB_FILES_COLLECTION,
  USER_SETTINGS_COLLECTION,
  EVALUATIONS_COLLECTION,
} from './collections';
import {
  indexQuery,
  singleWrapper,
  createWrapper,
  updateWrapper,
  multiIndexQuery,
} from '../firestore';
// TODO: remove the dep on these, move into firestore wrappers
import { admin, firestore } from '../../firebase';
import { guid } from '../../utils';

/**
 * Queries
 */
const getJobs = async (parent, args, { accountId }) => {
  console.log('QUERY: getJobs');
  const query = await multiIndexQuery({
    collection: JOBS_COLLECTION,
    indexs: [{
      index: 'accountId',
      value: accountId,
    }, {
      index: 'isArchieved',
      value: false,
    }],
    orderBys: [{
      by: 'createDate',
      direction: 'desc',
    }],
  });

  return query.map(entity => ({
    ...entity,
    status: entity.status ? entity.status : { needsMatch: true },
    panelMemberIds: entity.panelMemberIds ? _keys(entity.panelMemberIds) : [],
    consistencyPanelMemberIds: entity.consistencyPanelMemberIds ? _keys(entity.consistencyPanelMemberIds) : [],
    rejectedPanelMemberIds: entity.rejectedPanelMemberIds ? _keys(entity.rejectedPanelMemberIds) : [],
    appealPanelMemberIds: entity.appealPanelMemberIds ? _keys(entity.appealPanelMemberIds) : [],
  })).filter(
    (job) => {
      const {
        status,
      } = job;
      if (!status) {
        console.error('job without status', job.key);
      }

      const doneJobs = status && status.postConsistencyCheckAdminApproved && status.postConsistencyCheckAdminApproved;

      return doneJobs === undefined || doneJobs === false;
    },
  );
};

const getAllJobs = async (parent, args, { accountId }) => {
  console.log('QUERY: getJobs');

  const query = await indexQuery({
    collection: JOBS_COLLECTION,
    index: 'accountId',
  }, accountId);

  return query.map(entity => ({
    ...entity,
    status: entity.status ? entity.status : { needsMatch: true },
    panelMemberIds: entity.panelMemberIds ? _keys(entity.panelMemberIds) : [],
    consistencyPanelMemberIds: entity.consistencyPanelMemberIds ? _keys(entity.consistencyPanelMemberIds) : [],
    rejectedPanelMemberIds: entity.rejectedPanelMemberIds ? _keys(entity.rejectedPanelMemberIds) : [],
    appealPanelMemberIds: entity.appealPanelMemberIds ? _keys(entity.appealPanelMemberIds) : [],
  }));
};

// schema 2.0
const getAssignedJobs = async (
  parent,
  args,
  requestContext,
) => {
  console.log('QUERY: getAssignedJobsForPanelMember');
  const { accountId, user_id } = requestContext;
  const query = await multiIndexQuery({
    collection: JOBS_COLLECTION,
    indexs: [{
      index: 'accountId',
      value: accountId,
    }, {
      index: 'isArchieved',
      value: false,
    }],
  });

  return query.filter(
    (job) => {
      const {
        status,
        panelMemberIds,
        consistencyPanelMemberIds,
        rejectedPanelMemberIds,
        appealPanelMemberIds,
      } = job;

      if (!status) {
        console.error('job without status', job.key);
      }

      const assignedMatch = panelMemberIds && panelMemberIds[user_id] && status.needsMatch;
      const assignedConsistency = consistencyPanelMemberIds && consistencyPanelMemberIds[user_id] && status.needsConsistencyCheck;
      const assignedRejected = rejectedPanelMemberIds && rejectedPanelMemberIds[user_id] && status.consistencyCheckRejected;
      const assignedAppeals = appealPanelMemberIds && appealPanelMemberIds[user_id] && status.postConsistencyCheckAdminAppealed;
      const doneJobs = status && status.postConsistencyCheckAdminApproved && status.postConsistencyCheckAdminApproved;

      return (doneJobs === undefined || doneJobs === false) && (assignedMatch || assignedConsistency || assignedRejected || assignedAppeals);
    },
  );
};

// TODO: should write some tests around the filter logic here
const completedJobs = async (
  parent,
  args,
  requestContext,
) => {
  console.log('QUERY: completedJobs');
  const { accountId, user_id } = requestContext;
  const query = await multiIndexQuery({
    collection: JOBS_COLLECTION,
    indexs: [{
      index: 'accountId',
      value: accountId,
    }, {
      index: 'isArchieved',
      value: false,
    }],
  });

  const allDoneJobs = query.filter(
    (job) => {
      const {
        status,
      } = job;
      if (!job.status) {
        console.log(job);
      }

      const doneJobs = status.postConsistencyCheckAdminApproved && status.postConsistencyCheckAdminApproved === true;

      return doneJobs;
    },
  );
  // need to get the panelMatches in this query to do some filtering

  let jobsWithPanelMatch = [];
  const jobsWithPanelMatchPromises = [];
  allDoneJobs.forEach((job) => {
    // console.log(job);

    if (!job.panelMatchId) {
      console.log(job);
      return;
    }

    jobsWithPanelMatchPromises.push(singleWrapper({
      collection: EVALUATIONS_COLLECTION,
      id: job.panelMatchId,
    }).then((panelMatch) => {
      const joined = {
        ...job,
        panelMatch,
      };
      jobsWithPanelMatch.push(joined);
    }));
  });
  await Promise.all(jobsWithPanelMatchPromises);

  const {
    page,
    limit,
    sortBy,
    filterBy,
    sortReverse,
    pageSize,
  } = args;

  // filter
  if (filterBy !== undefined) {
    console.log('filter', filterBy);
    filterBy.forEach(({ filterKey, value: filterValue }) => {
      jobsWithPanelMatch = jobsWithPanelMatch.filter((item) => {
        let compareValue = item;
        filterKey.split('.').forEach((part) => {
          compareValue = compareValue[part];
        });
        // exact match
        // return compareValue.toString() === filterValue.toString();

        // poor man's fuzzy match
        const regex = new RegExp(filterValue, 'i');
        return regex.test(compareValue.toString());
      });
    });
  }

  // sort
  if (sortBy !== undefined) {
    jobsWithPanelMatch = _sortBy(jobsWithPanelMatch, [sortBy]);
  }

  // reverse
  if (sortReverse !== undefined) {
    jobsWithPanelMatch = jobsWithPanelMatch.reverse();
  }

  // limit
  if (limit !== undefined) {
    jobsWithPanelMatch = jobsWithPanelMatch.slice(0, limit);
  }
  const totalResults = jobsWithPanelMatch.length;

  const elementsPerPage = pageSize || PAGE_SIZE;

  // per page
  const totalPages = Math.ceil(jobsWithPanelMatch.length / elementsPerPage);
  if (page !== undefined) {
    jobsWithPanelMatch = jobsWithPanelMatch.slice(page * elementsPerPage, (page * elementsPerPage) + elementsPerPage);
  }

  return {
    page,
    pageSize,
    data: jobsWithPanelMatch,
    totalPages,
    totalResults,
  };
};

const getJob = async (parent, { key }, { accountId }) => {
  console.log('QUERY: getJob');
  let job = await multiIndexQuery({
    collection: JOBS_COLLECTION,
    indexs: [{
      index: 'accountId',
      value: accountId,
    }, {
      index: 'key',
      value: key,
    }],
  });
  job = job[0];

  // console.log(job);
  job.panelMemberIds = _keys(job.panelMemberIds);
  job.consistencyPanelMemberIds = _keys(job.consistencyPanelMemberIds);
  job.rejectedPanelMemberIds = _keys(job.rejectedPanelMemberIds);
  job.appealPanelMemberIds = _keys(job.appealPanelMemberIds);

  return job;
};

/**
 * Mutations
 */

const appealJob = async (parent, { key }, { accountId }) => {
  console.log(`MUTATION: appealJob ${key}`);

  const status = {
    needsMatch: false,
    needsConsistencyCheck: false,
    consistencyCheckApproved: true,
    consistencyCheckRejected: false,
    postConsistencyCheckAdminAppealed: true,
  };

  await updateWrapper({
    collection: JOBS_COLLECTION,
    id: key,
  }, {
    status,
  });

  return {
    key,
    status: 200,
    message: `appeals job ${key}`,
  };
};

const doneJob = async (parent, { key }, { accountId }) => {
  console.log(`MUTATION: doneJob ${key}`);

  const status = {
    needsMatch: false,
    needsConsistencyCheck: false,
    consistencyCheckApproved: false,
    consistencyCheckRejected: false,
    postConsistencyCheckAdminAppealed: false,
    postConsistencyCheckAdminApproved: true,
  };

  await updateWrapper({
    collection: JOBS_COLLECTION,
    id: key,
  }, {
    status,
  });

  return {
    key,
    status: 200,
    message: `mark job done ${key}`,
  };
};

// const jobPanelMembersForSendMail = ({ panelMemberIds }) => {
//   return Promise.all(
//     panelMemberIds.map(id => singleWrapper({
//       collection: USER_SETTINGS_COLLECTION,
//       id,
//     })),
//   );
// };

async function createFileObjects(files, jobId, accountId) {
  // create the job file objects
  const promises = [];
  files.forEach((file) => {
    const fileData = {
      ...file,
      jobId,
      accountId,
    };

    promises.push(
      createWrapper({
        collection: JOB_FILES_COLLECTION,
      }, fileData).then((data) => {
        return {
          ...data,
          ...file,
        }
      }),
    );
  });
  const result = await Promise.all(promises);
  return result;
}

const createJob = async (parent, { input }, { accountId }) => {
  console.log('MUTATION: createJob');

  const { ...baseAttrs } = input;

  // TODO: need to make sure this works with the UI too
  const panelMemberIdsMap = {};
  if (baseAttrs.panelMemberIds) {
    baseAttrs.panelMemberIds.forEach((id) => {
      panelMemberIdsMap[id] = true;
    });
  }

  // TODO: remove files field here
  const createdJob = await createWrapper({
    collection: JOBS_COLLECTION,
  }, {
    // TODO: move the status logic to a method
    // sometimes during create we pass in status, so this needs to come first
    status: {
      needsMatch: true,
      ...baseAttrs.status,
    },
    ...baseAttrs,
    // key: createdJob,
    createDate: Date.now(),
    panelMemberIds: panelMemberIdsMap,
    accountId,
    isArchieved: false,
  });
  console.log('createdJob', createdJob);

  if (input.files) {
    const fileObjects = await createFileObjects(input.files, createdJob.key, accountId);
    await updateWrapper({
      collection: JOBS_COLLECTION,
      id: createdJob.key,
    }, {
      fileRefs: fileObjects,
    });
    console.log('fileRefs', fileObjects);
  }

  return {
    status: 200,
    key: createdJob.key,
    message: 'created job',
  };
};

const updateJob = async (parent, { input }, { accountId }) => {
  // have tests run on CI/CD
  const { key, ...baseAttrs } = input;
  const existingJob = await singleWrapper({ collection: JOBS_COLLECTION, id: key }).then(job => job);

  console.log(`MUTATION: updateJob ${key}`);
  const jobModel = {
    // some jobs have a create date already
    createDate: existingJob.createDate ? existingJob.createDate : Date.now(),
    key,
    ...baseAttrs,
    status: {
      ...existingJob.status,
      ...baseAttrs.status,
    },
  };
  delete jobModel.files;

  if (input.files) {
    const newFiles = input.files.filter(inputFile => !inputFile.key);
    const oldFiles = input.files.filter(inputFile => inputFile.key);
    let refs = oldFiles;

    if (newFiles.length > 0) {
      // TODO: rework file flow, create new ones, add the key to the job model
      const fileObjects = await createFileObjects(newFiles, key, accountId);

      refs = refs.concat(fileObjects);
    }
    jobModel.fileRefs = refs;

    const filesToKeep = jobModel.fileRefs.map(ref => ref.key);
    const archivePromises = [];
    existingJob.fileRefs.forEach((ref) => {
      if (filesToKeep.indexOf(ref.key) < 0) {
        console.log('archiving ', ref.key)
        archivePromises.push(updateWrapper({
          collection: JOB_FILES_COLLECTION,
          id: ref.key,
        }, {
          key: ref.key,
          isArchived: true,
        }));
      }
    });
    // }
  }

  // update current job
  await updateWrapper({
    collection: JOBS_COLLECTION,
    id: key,
  }, jobModel);

  // TODO: part of the scheduling feature
  // baseAttrs don't have property scheduleShouldSendEmail
  // if (false && baseAttrs.scheduleShouldSendEmail) {
  //   const instance = await singleWrapper(`jobs/${accountId}/${input.key}`);
  //   instance.panelMemberIds = _keys(instance.panelMemberIds);
  //   await jobPanelMembersForSendMail(instance).then((panelMembers) => {
  //     panelMembers.map((user) => {
  //       scheduledEmail(user);
  //     });
  //   });
  // }

  return {
    key,
    status: 200,
    message: `updated job ${key}`,
  };
};

const createOrUpdateJob = async (parent, input, context) => {
  console.log('create or update', input);
  // BUG BUG BUG
  // this needs to be input.input on purpose
  if (input.input.key) {
    const response = await updateJob(parent, input, context);
    return response;
  }
  const response = await createJob(parent, input, context);
  return response;
};

const deleteJob = async (parent, { key }, { accountId }) => {
  console.log(`MUTATION: deleteJob ${key}`);

  await updateWrapper({
    collection: JOBS_COLLECTION,
    id: key,
  }, {
    isArchieved: true,
  });

  return {
    key,
    status: 200,
    message: `deleted job ${key}`,
  };
};

const assignPanelMemberToJob = async (
  parent,
  { jobKey, panelMemberKeys },
  { accountId },
) => {
  const refPath = `jobs/${accountId}/${jobKey}`;
  console.log(`MUTATION: assignPanelMemberToJob ${refPath}`);

  const job = await singleWrapper({
    collection: JOBS_COLLECTION,
    id: jobKey,
  });
  let updateData;
  console.log('job')
  console.log(job);

  if (job.status.needsMatch) {
    await updateWrapper({
      collection: JOBS_COLLECTION,
      id: jobKey,
    }, {
      panelMemberIds: null,
    });

    updateData = panelMemberKeys.reduce(
      (res, pmk) => ({
        ...res,
        [`panelMemberIds.${pmk}`]: true,
      }),
      {},
    );

    // TODO: if we want to remove limit remove this
    const success = panelMemberKeys.length >= 1;

    updateData = {
      ...updateData,
      assigned: success,
    };
  }

  if (job.status.needsConsistencyCheck) {
    await updateWrapper({
      collection: JOBS_COLLECTION,
      id: jobKey,
    }, {
      consistencyPanelMemberIds: null,
    });

    updateData = panelMemberKeys.reduce(
      (res, pmk) => ({
        ...res,
        [`consistencyPanelMemberIds.${pmk}`]: true,
      }),
      {},
    );

    // NOTE: if we want to remove limit remove this
    const success = panelMemberKeys.length >= 1;

    updateData = {
      ...updateData,
      assigned: success,
    };
  }

  if (job.status.consistencyCheckRejected && !job.status.needsConsistencyCheck) {
    await updateWrapper({
      collection: JOBS_COLLECTION,
      id: jobKey,
    }, {
      rejectedPanelMemberIds: null,
    });

    updateData = panelMemberKeys.reduce(
      (res, pmk) => ({
        ...res,
        [`rejectedPanelMemberIds.${pmk}`]: true,
      }),
      {},
    );

    // TODO: if we want to remove limit remove this
    const success = panelMemberKeys.length >= 1;

    updateData = {
      ...updateData,
      assigned: success,
    };
  }

  if (job.status.postConsistencyCheckAdminAppealed) {
    await updateWrapper({
      collection: JOBS_COLLECTION,
      id: jobKey,
    }, {
      appealPanelMemberIds: null,
    });

    updateData = panelMemberKeys.reduce(
      (res, pmk) => ({
        ...res,
        [`appealPanelMemberIds.${pmk}`]: true,
      }),
      {},
    );

    // TODO: if we want to remove limit remove this
    const success = panelMemberKeys.length >= 1;

    updateData = {
      ...updateData,
      assigned: success,
    };
  }

  await updateWrapper({
    collection: JOBS_COLLECTION,
    id: jobKey,
  }, updateData);

  return {
    key: jobKey,
    status: 200,
    message: `assigned panel members to job`,
  };
};

async function getUsers(ids) {
  if (!ids) return [];

  let users = [];

  if (Array.isArray(ids)) {
    users = await Promise.all(
      ids.map(id => singleWrapper({
        collection: USER_SETTINGS_COLLECTION,
        id,
      })),
    );
  } else {
    users = await Promise.all(
      Object.keys(ids).map(id => singleWrapper({
        collection: USER_SETTINGS_COLLECTION,
        id,
      })),
    );
  }
  users = users.filter((user) => {
    if (user.isArchieved) {
      return false;
    }

    return true;
  })
  console.log(users);

  return users;
}

const panelMembers = async ({ key, panelMemberIds }) => {
  const ids = panelMemberIds;
  console.log('panelMembers', ids);
  return getUsers(ids);
};

const consistencyPanelMembers = async ({ consistencyPanelMemberIds }) => {
  const ids = consistencyPanelMemberIds;
  console.log('consistencyPanelMembers', ids);
  return getUsers(ids);
};

const rejectedPanelMembers = async ({ rejectedPanelMemberIds }) => {
  const ids = rejectedPanelMemberIds;
  console.log('rejectedPanelMembers', ids);
  return getUsers(ids);
};

const appealPanelMembers = async ({ appealPanelMemberIds }) => {
  const ids = appealPanelMemberIds;
  console.log('appealPanelMembers', ids);
  return getUsers(ids);
};

const panelMatch = async ({ panelMatchId }, args, { accountId }) => {
  if (panelMatchId !== undefined) {
    const model = await multiIndexQuery({
      collection: EVALUATIONS_COLLECTION,
      indexs: [{
        index: 'accountId',
        value: accountId,
      }, {
        index: 'key',
        value: panelMatchId,
      }],
    });
    return model[0];
  }
  return null;
};

const rejectedPanelMatch = async ({ rejectedPanelMatchId }, args, { accountId }) => {
  if (rejectedPanelMatchId !== undefined) {
    const model = await multiIndexQuery({
      collection: EVALUATIONS_COLLECTION,
      indexs: [{
        index: 'accountId',
        value: accountId,
      }, {
        index: 'key',
        value: rejectedPanelMatchId,
      }],
    });

    return model[0];
  }
  return null;
};

const appealPanelMatch = async ({ appealPanelMatchId }, args, { accountId }) => {
  if (appealPanelMatchId !== undefined) {
    const model = await multiIndexQuery({
      collection: EVALUATIONS_COLLECTION,
      indexs: [{
        index: 'accountId',
        value: accountId,
      }, {
        index: 'key',
        value: appealPanelMatchId,
      }],
    });

    return model;
  }
  return null;
};

// needsMatch: Boolean
// needsConsistencyCheck: Boolean
// consistencyCheckApproved: Boolean
// postConsistencyCheckAdminAppealed: Boolean
// consistencyCheckRejected: Boolean
// postConsistencyCheckAdminApproved: Boolean

// panelMatch => consistencyCheck => consistencyCheckApproved => postConsistencyCheckAdminApproved ==== panelMatch
// panelMatch => consistencyCheck => consistencyCheckRejected => rejectedPanelMatchId

const mostRecentPanelMatch = async ({
  panelMatchId,
  panelMemberIds,
  rejectedPanelMatchId,
  rejectedPanelMemberIds,
  appealPanelMatchId,
  appealPanelMemberIds,
  status
}, args, { accountId }) => {
  console.log('mostRecentPanelMatch');
  console.log(status);

  let evaluationId = panelMatchId;
  let userIds = panelMemberIds;
  if (status.needsMatch || (status.consistencyCheckApproved && !rejectedPanelMatchId && !appealPanelMatchId)) {
    console.log('panelMatchId', panelMatchId);
    evaluationId = panelMatchId;
    userIds = panelMemberIds;
  } else if (status.consistencyCheckRejected && rejectedPanelMatchId) {
    evaluationId = rejectedPanelMatchId;
    userIds = rejectedPanelMemberIds;
  } else if (status.postConsistencyCheckAdminApproved) {
    // appealedFirst?
    // get both and compare create dates?
    if (appealPanelMatchId) {
      evaluationId = appealPanelMatchId;
      userIds = appealPanelMemberIds;
    } else if (rejectedPanelMatchId) {
      evaluationId = rejectedPanelMatchId;
      userIds = rejectedPanelMemberIds;
    } else {
      evaluationId = panelMatchId;
      userIds = panelMemberIds;
    }
  }

  if (evaluationId) {
    const evaluation = await singleWrapper({
      collection: EVALUATIONS_COLLECTION,
      id: evaluationId,
    });
    const users = await getUsers(userIds);
    console.log('most recent panel members', users);
    return {
      ...evaluation,
      mostRecentPanelMembers: users,
    };
  }
  return null;
};

const mostRecentPanelMembers = async ({
  panelMemberIds,
  rejectedPanelMatchId,
  rejectedPanelMemberIds,
  appealPanelMatchId,
  appealPanelMemberIds,
  status
}) => {
  console.log('mostRecentPanelMembers');
  console.log(status);
  console.log(panelMemberIds);

  let userIds = panelMemberIds;
  if (status.needsMatch || (status.consistencyCheckApproved && !rejectedPanelMatchId && !appealPanelMatchId)) {
    userIds = panelMemberIds;
  } else if (status.consistencyCheckRejected && rejectedPanelMatchId) {
    userIds = rejectedPanelMemberIds;
  } else if (status.postConsistencyCheckAdminApproved) {
    // appealedFirst?
    // get both and compare create dates?
    if (appealPanelMatchId) {
      userIds = appealPanelMemberIds;
    } else if (rejectedPanelMatchId) {
      userIds = rejectedPanelMemberIds;
    } else {
      userIds = panelMemberIds;
    }
  }

  const users = await getUsers(userIds);
  console.log('most recent panel members', users);
  return users;
};

// this one is a little more complicated because we have to do a join on the users
const consistencyPanelCommentsResolver = async ({ key }) => {
  console.log('get: consistencyPanelCommentsResolver');
  const jobComments = await indexQuery({
    collection: COMMENTS_COLLECTION,
    index: 'jobId',
  }, key);

  console.log('jobComments', jobComments);

  const userIds = new Set();
  jobComments.forEach((comment) => {
    userIds.add(comment.userId);
  });

  const promises = [];
  userIds.forEach(id => promises.push(singleWrapper({
    collection: USER_SETTINGS_COLLECTION,
    id,
  })));

  const mergedCommnets = [];
  await Promise.all(promises).then((results) => {
    jobComments.forEach((comment) => {
      const user = results.find(singleUser => singleUser.key === comment.userId);

      mergedCommnets.push({
        ...comment,
        photoURL: user.photoURL,
        displayName: user.displayName,
        email: user.email,
        userId: user.key,
      });
    });
  });
  console.debug('mergedComments', mergedCommnets);

  // sort

  return _sortBy(mergedCommnets, ['createdAt']);
};

// TODO: storageRefPath is in the job-files collecttion
//       query that collection first for files for this job id that aren't archieved
const filesResolver = async ({ fileRefs }) => {
  let files = [];
  console.log('fileResolver', fileRefs);

  if (fileRefs) {
    const promises = [];
    fileRefs.forEach((fileRef) => {
      if (fileRef.isArchived) {
        return;
      }
      promises.push(
        admin.storage().bucket().file(fileRef.storageRefPath).getMetadata()
          .then(metadata => ({
            ...fileRef,
            // why are there two metadatas?
            metadata: metadata[0],
          })),
      );
    });
    files = await Promise.all(promises);
    files = files.filter(fileObject => fileObject.key);
  }
  console.log('files', files);

  return files;
}

const jobNestedObject = {
  // new schema
  panelMatch,
  rejectedPanelMatch,
  appealPanelMatch,
  mostRecentPanelMatch,
  mostRecentPanelMembers,

  panelMembers,
  consistencyPanelMembers,
  rejectedPanelMembers,
  appealPanelMembers,

  // comments
  consistencyPanelComments: consistencyPanelCommentsResolver,
  files: filesResolver,
};

export {
  getJobs,
  getJob,
  getAllJobs,
  getAssignedJobs,
  completedJobs,

  createJob,
  updateJob,
  createOrUpdateJob,
  assignPanelMemberToJob,
  deleteJob,

  appealJob,
  doneJob,

  jobNestedObject,
};
