// @flow
import {
  createWrapper,
  updateWrapper,
  deleteWrapper,
} from '../firestore';
import { COMMENTS_COLLECTION } from './collections';

/**
 * Queries
 */

// // probably move this
// const commentsForJob = async (parent, args, { accountId }) => {

//   const comments = indexQuery({
//     collection: COMMENTS_COLLECTION,
//     index: 'jobId',
//   }, parent.jobId);

//   return comments;
// };


// TODO: should have a type, AKA from consistency panel
const addEvaluationComment = async (
  parent, {
    content,
    jobId,
  }, {
    uid: currentUserId,
    accountId,
  }) => {
  console.log(`MUTATION: addEvaluationComment ${jobId}`);

  const createdAt = Date.now();
  const commentData = {
    userId: currentUserId,
    createdAt,
    content,
    jobId,
    accountId,
  };

  const createdComment = await createWrapper({
    collection: COMMENTS_COLLECTION,
  }, commentData);

  return {
    key: createdComment.key,
    status: 200,
    message: 'created evaluation comment',
  };
};

const updateEvaluationComment = async (
  parent, {
    jobId,
    commentId,
    content,
  }, {
    accountId,
  }) => {
  console.log(`MUTATION: updateEvaluationComment ${jobId} ${commentId}`);

  await updateWrapper({
    collection: COMMENTS_COLLECTION,
    id: commentId,
  }, {
    content,
  });

  return {
    key: commentId,
    status: 200,
    message: `updated evaluation comment ${jobId} ${commentId}`,
  };
};

const deleteEvaluationComment = async (
  parent, {
    jobId,
    commentId,
  }, {
    accountId,
  }) => {
  console.log(`MUTATION: deleteEvaluationComment ${jobId} ${commentId}`);

  const commentData = {};
  commentData[`consistencyPanelComments.${commentId}`] = null;

  await deleteWrapper({
    collection: COMMENTS_COLLECTION,
    id: commentId,
  }, commentData);

  return {
    key: commentId,
    status: 200,
    message: `deleted evaluation comment ${jobId} ${commentId}`,
  };
};

export {
  addEvaluationComment,
  updateEvaluationComment,
  deleteEvaluationComment,

};
