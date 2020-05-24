const evaluationDefs = `
type Evaluation {
  key: String!
  archived: Boolean

  createDate: String

  dateOfPanel: String
  jobMatchNumber: String
  # TODO deprecate this, its
  jobTitle: String
  jobSummary: String

  profileId: String
  # legacy imports wont have a profile
  profile: Profile
  profileVersion: String

  band: String
  total: Int
  totalVariants: Int
  variesBy: Int
  verdict: String
  # for use with most recent job
  mostRecentPanelMembers: [PanelMember]

  factor1: String
  factor2: String
  factor3: String
  factor4: String
  factor5: String
  factor6: String
  factor7: String
  factor8: String
  factor9: String
  factor10: String
  factor11: String
  factor12: String
  factor13: String
  factor14: String
  factor15: String
  factor16: String
  evidence1: String
  evidence2: String
  evidence3: String
  evidence4: String
  evidence5: String
  evidence6: String
  evidence7: String
  evidence8: String
  evidence9: String
  evidence10: String
  evidence11: String
  evidence12: String
  evidence13: String
  evidence14: String
  evidence15: String
  evidence16: String
  jobId: String
  orgName: String
  panelNotes: String
  files: [EvaluataionFile]
  afterMatchComments: [Comment]

  # for appeals
  #beforeAppealComments: [Comment]
  appealFiles: [EvaluataionFile]

  # for hybrid
  isHybrid: Boolean
  isEvaluation: Boolean
  # for Draft
  isDraft: Boolean

  # for legacy
  profileTitle: String
  fromImport: Boolean
  legacyPanelMembers: [String]
  panelMembers: [String]

  # TODO deprecate
  needsAppeal: Boolean
  requestedChange: Boolean
  doneChange: Boolean
  checked: Boolean
  done: Boolean
  appealMemberIds: [String]
  rejectedPanelMemberIds: [String]
  reviewMemberIds: [String]
  panelMemberIds: [String]
  userId: String

  # for migration
  oldJobId: String
}

input EvaluationInput {
  archived: Boolean
  createDate: String
  dateOfPanel: String
  jobMatchNumber: String
  # TODO deprecate this, its on job model
  jobTitle: String
  jobSummary: String


  profileId: String
  profileVersion: String

  band: String
  total: Int
  totalVariants: Int
  variesBy: Int
  verdict: String

  factor1: String
  factor2: String
  factor3: String
  factor4: String
  factor5: String
  factor6: String
  factor7: String
  factor8: String
  factor9: String
  factor10: String
  factor11: String
  factor12: String
  factor13: String
  factor14: String
  factor15: String
  factor16: String
  evidence1: String
  evidence2: String
  evidence3: String
  evidence4: String
  evidence5: String
  evidence6: String
  evidence7: String
  evidence8: String
  evidence9: String
  evidence10: String
  evidence11: String
  evidence12: String
  evidence13: String
  evidence14: String
  evidence15: String
  evidence16: String
  jobId: String!

  orgName: String
  panelNotes: String
  #files: [EvaluataionFileCreateInput]

  # the user who saved it
  userId: String

  # for legacy
  profileTitle: String
  fromImport: Boolean
  legacyPanelMembers: [String]

  # for hybrid
  isHybrid: Boolean
  # TODO make sure FE is saving this
  isEvaluation: Boolean
  # TODO this should live per eval
  isDraft: Boolean

  # for appeals
  appealFiles: [EvaluataionFileCreateInput]

  # passthroughs for setting job status
  # should be able to remove these with a refactor
  passedCheck: Boolean
  consistencyCheckRejected: Boolean

  # for migration
  oldJobId: String
}

input EvaluationUpdateInput {
  key: String
  archived: Boolean
  dateOfPanel: String
  jobMatchNumber: String
  jobTitle: String
  jobSummary: String

  profileId: String
  profileVersion: String

  band: String
  total: Int
  totalVariants: Int
  variesBy: Int
  verdict: String

  factor1: String
  factor2: String
  factor3: String
  factor4: String
  factor5: String
  factor6: String
  factor7: String
  factor8: String
  factor9: String
  factor10: String
  factor11: String
  factor12: String
  factor13: String
  factor14: String
  factor15: String
  factor16: String
  evidence1: String
  evidence2: String
  evidence3: String
  evidence4: String
  evidence5: String
  evidence6: String
  evidence7: String
  evidence8: String
  evidence9: String
  evidence10: String
  evidence11: String
  evidence12: String
  evidence13: String
  evidence14: String
  evidence15: String
  evidence16: String
  jobId: String
  orgName: String
  panelNotes: String
  #files: [EvaluataionFileUpdateInput]
  # the user who saved it
  userId: String

  # for legacy
  profileTitle: String
  fromImport: Boolean
  legacyPanelMembers: [String]

  # for appeals
  postConsistencyCheckAdminAppealed: Boolean
  # appealFiles: [EvaluataionFileUpdateInput]

  # for hybrid
  isHybrid: Boolean
  # TODO make sure FE is saving this
  isEvaluation: Boolean
  # for draft
  isDraft: Boolean

  # passthroughs for setting job status
  # should be able to remove these with a refactor
  passedCheck: Boolean
  consistencyCheckRejected: Boolean

  # for migration
  oldJobId: String
}`;

export default evaluationDefs;
