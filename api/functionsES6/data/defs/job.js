const jobDefs = `
type JobStatus {
  # this is after a job is created, needs to default to true
  # when panelMembers are assigned this is true until that's completed
  # it's still true even if the first panel has been saved as a draft, that's why draft is a separte field
  needsMatch: Boolean
  # this is true after a panel is completed
  # check out the flow chart for this one
  # it happens after the first panel and after a rejectedPanel has been completed
  # after a panel (first step) or a rejectedPanel is completed, be sure to set isDraft to false
  needsConsistencyCheck: Boolean
  # this is after the consistencyPanel is done
  # at that point an admin can either do nothing and this job is done done
  # OR the admin can appeal
  consistencyCheckApproved: Boolean
  # if the admin needs to appeal the consistency, this is marked
  # at this point the admin would also assign appealPanelMembers
  postConsistencyCheckAdminAppealed: Boolean

  # this is if the consistencyPanel rejects a match
  # this is set by the consistencyPanel
  # then an admin will need to assign rejectedPanelMembers
  consistencyCheckRejected: Boolean

  # after the match goes through a rejectedPanel or an appealPanel
  # this is set to true
  # then and admin needs to assign consistencyPanelMembers
  # NOTE: we will re-use the needsConsistencyCheck field above and go through that flow again
  # after the rejectedPanel or appealPanel is completed we need to deleted the consistencyPanelMemberIds
  # so that when the admin goes to assign them, there are none there and the matches don't show up in the queues
  # of the consistencyPanelMembers
  # needsConsistencyCheck
  postConsistencyCheckAdminApproved: Boolean
}

input JobStatusInput {
  needsMatch: Boolean
  needsConsistencyCheck: Boolean
  consistencyCheckApproved: Boolean
  postConsistencyCheckAdminAppealed: Boolean
  consistencyCheckRejected: Boolean
  postConsistencyCheckAdminApproved: Boolean
}


type Job {
  key: String!
  createDate: String!
  jobTitle: String
  jobNumber: String
  recordNumber: String
  files: [JobFile]
  matchedMemberIds: [String]
  isArchived: Boolean

  # scheduling
  scheduledPanelTimestamp: Int
  scheduledExtraInfo: String
  scheduleShouldSendEmail: Boolean

  # new schema 2
  status: JobStatus

  #########
  # match
  panelDate: String
  panelMemberIds: [String]
  panelMembers: [PanelMember]
  panelComments: [Comment]
  panelMatch: Evaluation
  panelMatchId: String

  ###################
  # consistencyPanel
  consistencyPanelDate: String
  consistencyPanelMemberIds: [String]
  consistencyPanelMembers: [PanelMember]
  consistencyPanelComments: [Comment]

  ##############
  # rejectedPanel
  rejectedPanelDate: String
  rejectedPanelMemberIds: [String]
  rejectedPanelMembers: [PanelMember]
  rejectedPanelComments: [Comment]
  rejectedPanelMatch: Evaluation
  rejectedPanelMatchId: String

  #########
  # appeals
  appealPanelDate: String
  appealPanelMemberIds: [String]
  appealPanelMembers: [PanelMember]
  appealPanelComments: [Comment]
  appealPanelMatch: Evaluation
  appealPanelMatchId: String

  ###############
  # backend logic
  # this will be the most recent panel confirmed by consistency
  mostRecentPanelMatch: Evaluation

  # for migration
  migrationEvaluationId: String

  # legacy
  isDraft: Boolean
  assigned: Boolean
  matched: Boolean

  #
  mostRecentPanelMembers: [PanelMember]
}

input JobCreateInput {
  jobTitle: String!
  jobNumber: String
  recordNumber: String
  files: [JobFileUpdateInput]
  isArchived: Boolean

  ##############
  # new schema 2
  status: JobStatusInput

  #########
  # match
  panelDate: String
  panelMemberIds: [String]
  # panelComments: [Comment]
  panelMatchId: String
  #panelMatch: Evaluation

  ###################
  # consistencyPanel
  consistencyPanelDate: String
  consistencyPanelMemberIds: [String]
  #consistencyPanelComments: [Comment]

  ##############
  # rejectedPanel
  rejectedPanelDate: String
  rejectedPanelMemberIds: [String]
  #rejectedPanelComments: [Comment]
  rejectedPanelMatchId: String
  #rejectedPanelMatch: Evaluation

  #########
  # appeals
  appealPanelDate: String
  appealPanelMemberIds: [String]
  #appealPanelComments: [Comment]
  appealPanelMatchId: String
  #appealPanelMatch: Evaluation

  # for migration
  migrationEvaluationId: String
}

input JobUpdateInput {
  key: String
  jobTitle: String
  jobNumber: String
  recordNumber: String
  isArchived: Boolean
  files: [JobFileUpdateInput]

  ##############
  # new schema 2
  status: JobStatusInput

  #########
  # match
  panelDate: String
  panelMemberIds: [String]
  # panelComments: [Comment]
  panelMatchId: String
  #panelMatch: Evaluation

  ###################
  # consistencyPanel
  consistencyPanelDate: String
  consistencyPanelMemberIds: [String]
  #consistencyPanelComments: [Comment]

  ##############
  # rejectedPanel
  rejectedPanelDate: String
  rejectedPanelMemberIds: [String]
  #rejectedPanelComments: [Comment]
  rejectedPanelMatchId: String
  #rejectedPanelMatch: Evaluation

  #########
  # appeals
  appealPanelDate: String
  appealPanelMemberIds: [String]
  #appealPanelComments: [Comment]
  appealPanelMatchId: String
  #appealPanelMatch: Evaluation

  # for migration
  migrationEvaluationId: String
}`;

export default jobDefs;
