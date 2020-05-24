// @flow

import accountDefs from './defs/account';
import evaluationDefs from './defs/evaluation';
import evaluationFileDefs from './defs/evaluationFile';
import jobDefs from './defs/job';
import jobFilesDefs from './defs/jobFile';
import profileDefs from './defs/profile';
import userDefs from './defs/user';

const typeDefs = `
${accountDefs}

# app-settings
type AppSettings {
  featureUserManagement: Boolean
  featureUploadFiles: Boolean
}

input AppSettingsUpdateInput {
  featureUserManagement: Boolean
  featureUploadFiles: Boolean
}

# user-settings
input UserSettingUpdateInput {
  key: String! # firebase user uuid
  email: String
  displayName: String
  activePanelMember: Boolean
  isReviewer: Boolean
  isOwner: Boolean
  isAdmin: Boolean
  isDemo: Boolean
  photoURL: String
  imageRef: String
  darkTheme: Boolean
}

type PanelMember {
  key: String!
  email: String
  displayName: String
  photoURL: String
}

# comments
type Comment {
  key: String!
  userId: String!
  displayName: String!
  email: String!
  photoURL: String
  content: String!
  createdAt: String!
}

# job files
${jobFilesDefs}

# jobs
${jobDefs}

# users
${userDefs}

# profiles
${profileDefs}

# evaluation-files
${evaluationFileDefs}

# evaluations
${evaluationDefs}

# responses
type Response {
  status: Int
  message: String
  key: ID
  error: String
}

input FilterBy {
  filterKey: String
  value: String
}

type PagedEvaluations {
  data: [Evaluation]
  page: Int
  totalPages: Int
  totalResults: Int
  pageSize: Int
}

type PagedJobs {
  data: [Job]
  page: Int
  totalPages: Int
  totalResults: Int
  pageSize: Int
}

# the schema allows the following query:
type Query {
  profiles(limit: Int, page: Int): [Profile]
  profile(key: String!): Profile
  notArchivedProfiles: [Profile]

  panelMembers: [PanelMember]
  #reviewMembers: [ReviewMember]

  # TODO remove code and check
  #completedEvaluations(
  #  limit: Int,
  #  sortBy: String,
  #  page: Int,
  #  filterBy: [FilterBy],
  #  pageSize: Int,
  #  sortReverse: Boolean
  #): PagedEvaluations
  #evaluation(
  #  key: String!
  #): Evaluation
  #consistencies: [Evaluation]
  #assignedEvaluationsForReviewMember(
  #  reviewMemberId: String!
  #): [Evaluation]
  #rejectedEvaluations: [Evaluation]

  users: [User]
  # TODO: remove?
  getAllUsers: [User]
  user(key: String!): User

  jobs: [Job]
  allJobs: [Job]
  #matchedJobs: [Job]
  #unmatchedJobs: [Job]
  job(key: String!): Job

  completedJobs(
    limit: Int,
    sortBy: String,
    page: Int,
    filterBy: [FilterBy],
    pageSize: Int,
    sortReverse: Boolean
  ): PagedJobs

  # new schema
  assignedJobsForPanelMember: [Job]

  appSettings: AppSettings

  appeals: [Evaluation]
  #appealMembers: [AppealReviewMember]
  #assignedAppealsForPanelMember(panelMemberId: String!): [Evaluation]

  # endpoints to help with migration
  # evaluations: [Evaluation]

  # account
  account: Account
}

# this schema allows the following mutation:
type Mutation {
  # profiles
  createProfile (
    input: ProfileInput
  ): Profile
  updateProfile (
    input: ProfileUpdateInput
  ): Response
  deleteProfile (
    key: String!
  ): Response
  deleteProfiles: Response

  # evaluations
  createOrUpdateEvaluation (
    input: EvaluationUpdateInput
  ): Response
  #deleteEvaluation (
  #  key: String!
  #): Response
  #deleteEvaluations: Response
  addEvaluationComment(
    jobId: String!
    content: String!
  ): Response
  updateEvaluationComment(
    jobId: String!
    commentId: String!
    content: String!
  ): Response
  deleteEvaluationComment(
    jobId: String!
    commentId: String!
  ): Response

  # users
  createUser (
    input: UserCreateInput
  ): User
  updateUser (
    input: UserUpdateInput
  ): Response
  deleteUser (
    key: String!
  ): Response
  confirmAccount (
    email: String!
    inviteCode: String!
    password: String!
    key: String!
  ): Response
  sendWelcome (
    input: UserCreateInput
  ): User


  # jobs
  appealJob(
    key: String!
  ): Response
  doneJob(
    key: String!
  ): Response
  createJob(
    input: JobCreateInput
  ): Response
  updateJob(
    input: JobUpdateInput
  ): Response
  deleteJob (
    key: String!
  ): Response
  createOrUpdateJob (
    input: JobUpdateInput
  ): Response
  assignPanelMemberToJob (
    jobKey: String!
    panelMemberKeys: [String]!
  ): Response

  # user-settings
  updateUserSetting(
    input: UserSettingUpdateInput
  ): Response

  # app-settings
  updateAppSettings(
    input: AppSettingsUpdateInput
  ): Response
}`;

export default typeDefs;
