export const getReviewAssignmentStatus = ({ reviewMemberIds, appealMemberIds }) => {
  if (reviewMemberIds && reviewMemberIds.length || appealMemberIds && appealMemberIds.length) {
    return 'Assigned';
  }
  return 'Unassigned';
};

export const getCheckingStatus = ({ requestedChange, doneChange }) => {
  if (doneChange) {
    return 'Completed Change';
  }

  if (requestedChange) {
    return 'Requested Change';
  }

  return 'Invalid';
};
