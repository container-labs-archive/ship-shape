// @flow

import * as accountResolvers from './account';
import * as commentsResolvers from './comments';
import * as jobResolvers from './job';
import * as userResolvers from './user';
import * as profileResolvers from './profile';
import * as evaluationResolver from './evaluation';

const resolvers = {
  Query: {
    /**
     * User Queries
     */
    users: userResolvers.getUsers,
    panelMembers: userResolvers.getPanelMembers,
    // review members are panel members
    // reviewMembers: userResolvers.getPanelMembers,
    user: userResolvers.getUser,
    // migration
    getAllUsers: userResolvers.getAllUsers,

    /**
     * Profile Queries
     */
    profiles: profileResolvers.getProfiles,
    notArchivedProfiles: profileResolvers.getNotArchivedProfiles,
    profile: profileResolvers.getProfile,

    /**
     * Job Queries
     */
    jobs: jobResolvers.getJobs,
    allJobs: jobResolvers.getAllJobs,
    job: jobResolvers.getJob,
    completedJobs: jobResolvers.completedJobs,

    // new schema
    assignedJobsForPanelMember: jobResolvers.getAssignedJobs,

    /**
     * Evaluation Queries
     */
    // evaluation: evaluationResolver.getEvaluation,

    // Migration helper Queries
    // evaluations: evaluationResolver.evaluations,

    account: accountResolvers.getAccount,
  },

  Mutation: {
    /**
     * Profile Mutations
     */
    createProfile: profileResolvers.createProfile,
    updateProfile: profileResolvers.updateProfile,
    deleteProfile: profileResolvers.deleteProfile,

    /**
     * Job Mutations
     */
    appealJob: jobResolvers.appealJob,
    doneJob: jobResolvers.doneJob,
    createJob: jobResolvers.createJob,
    updateJob: jobResolvers.updateJob,
    deleteJob: jobResolvers.deleteJob,
    createOrUpdateJob: jobResolvers.createOrUpdateJob,
    assignPanelMemberToJob: jobResolvers.assignPanelMemberToJob,

    /**
     * Evaluation Mutations
     */
    // createEvaluation: evaluationResolver.createOrUpdateEvaluation,
    // updateEvaluation: evaluationResolver.createOrUpdateEvaluation,
    createOrUpdateEvaluation: evaluationResolver.createOrUpdateEvaluation,
    // deleteEvaluation: evaluationResolver.deleteEvaluation,
    // deleteEvaluations: evaluationResolver.deleteEvaluations,
    addEvaluationComment: commentsResolvers.addEvaluationComment,
    updateEvaluationComment: commentsResolvers.updateEvaluationComment,
    deleteEvaluationComment: commentsResolvers.deleteEvaluationComment,

    /**
     * User Mutations
     */
    createUser: userResolvers.createUser,
    updateUser: userResolvers.updateUser,
    deleteUser: userResolvers.deleteUser,
    updateUserSetting: userResolvers.updateUserSetting,
    sendWelcome: userResolvers.sendWelcome,
    confirmAccount: userResolvers.confirmAccount,

  },

  Evaluation: {
    profile: evaluationResolver.evaluationNestedObject.profile,
    // afterMatchComments: evaluationResolver.evaluationNestedObject.afterMatchComments,

    appealMemberIds: evaluationResolver.evaluationNestedObject.appealMemberIds,
    rejectedPanelMemberIds: evaluationResolver.evaluationNestedObject.rejectedPanelMemberIds,
    reviewMemberIds: evaluationResolver.evaluationNestedObject.reviewMemberIds,
    panelMemberIds: evaluationResolver.evaluationNestedObject.panelMemberIds,
  },

  User: {
    isReviewer: userResolvers.userNestedObject.isReviewer,
  },

  Job: {
    panelMembers: jobResolvers.jobNestedObject.panelMembers,
    consistencyPanelMembers: jobResolvers.jobNestedObject.consistencyPanelMembers,
    rejectedPanelMembers: jobResolvers.jobNestedObject.rejectedPanelMembers,
    appealPanelMembers: jobResolvers.jobNestedObject.appealPanelMembers,

    panelMatch: jobResolvers.jobNestedObject.panelMatch,
    rejectedPanelMatch: jobResolvers.jobNestedObject.rejectedPanelMatch,
    appealPanelMatch: jobResolvers.jobNestedObject.appealPanelMatch,

    consistencyPanelComments: jobResolvers.jobNestedObject.consistencyPanelComments,
    mostRecentPanelMatch: jobResolvers.jobNestedObject.mostRecentPanelMatch,
    mostRecentPanelMembers: jobResolvers.jobNestedObject.mostRecentPanelMembers,

    files: jobResolvers.jobNestedObject.files,
  },
};

export default resolvers;
