// Schema 2.0 proposal
// Container Labs internal notes
  // what do we do about them repeating the consistency and rejected cycle?
  // do we just use the same values and not keep track of panels if they do them 100 times
  // do we even need to care, am I thinking about this too much?

// Important changes from Schema 1.0
+ evaluation => match (we need to update the terminoligy here to be consistent with the process)
+ We will now have up to 3 match objects per job. panelMatch, rejectedPanelMatch, appealPanelMatch
+ The job has a status field, which is that state of the overall job
+ previous values need to load in later steps
  + after the first match, when the consistency panel loads, they needs to see the panelMatch details and scores
    + there's a tricky part here. if a consistency is happening after a rejected or appeal panel, we need to load those details and scores, not step 1
  + when a rejected OR an appeal panel is done, we need to load the details and scores, but they should not be editable
    + when doing the panel, the panel members can see these details and scores, but will be able to add more details and scores
    + these additional details and scores will be saved to the rejectedPanelMatch OR the rejectedAppealMatch object

job
  // these can be added to a few times during the process
  // but we don't need to keep track of where they were added
  jobFiles

  // match, hybrid match, evaluation
  panelDate
  panelMembers
  panelComments
  panelMatch: Match
    // factor1score
    // factor1details
    // total
    // isHybridMatch
    // isEvaluationMatch
    // etc....

  // consistencies
  consistencyPanelDate
  consistencyPanelMembers
  consistencyPanelComments

  // rejected
  rejectedPanelDate
  rejectedPanelMembers
  rejectedPanelComments
  rejectedPanelMatch: Match
    // factor1score
    // factor1details
    // total
    // isHybridMatch
    // isEvaluationMatch
    // etc....

  // appeals
  appealPanelDate
  appealPanelMembers
  // James, same question here but I think they are both a yes
  appealPanelComments
  appealPanelMatch: Match
    // factor1score
    // factor1details
    // total
    // isHybridMatch
    // isEvaluationMatch
    // etc....

  // overall job status
  // in order, but enums so they're explicit
  status
    // this is after a job is created, needs to default to true
    // when panelMembers are assigned this is true until that's completed
    // it's still true even if the first panel has been saved as a draft, that's why draft is a separte field
    needsMatch
    // this is true after a panel is completed
    // check out the flow chart for this one
    // it happens after the first panel and after a rejectedPanel has been completed
    // after a panel (first step) or a rejectedPanel is completed, be sure to set isDraft to false
    needsConsistencyCheck
    // this is after the consistencyPanel is done
    // at that point an admin can either do nothing and this job is done done
    // OR the admin can appeal
    consistencyCheckApproved
    // if the admin needs to appeal the consistency, this is marked
    // at this point the admin would also assign appealPanelMembers
    postConsistencyCheckAdminAppealed

    // this is if the consistencyPanel rejects a match
    // this is set by the consistencyPanel
    // then an admin will need to assign rejectedPanelMembers
    consistencyCheckRejected

    // after the match goes through a rejectedPanel or an appealPanel
    // this is set to true
    // then and admin needs to assign consistencyPanelMembers
    // NOTE: we will re-use the needsConsistencyCheck field above and go through that flow again
    // after the rejectedPanel or appealPanel is completed we need to deleted the consistencyPanelMemberIds
    // so that when the admin goes to assign them, there are none there and the matches don't show up in the queues
    // of the consistencyPanelMembers
    // needsConsistencyCheck

  // this is different from status
  // because the job can have different status and still be a partial save or draft
  isDraft true|false


