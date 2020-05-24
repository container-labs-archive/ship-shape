// @flow

function prettyStatus(job: Object) {
  const {
    status: {
      needsMatch,
      needsConsistencyCheck,
      consistencyCheckApproved,
      postConsistencyCheckAdminAppealed,
      consistencyCheckRejected,
    },
  } = job;

  if (needsMatch) return 'Needs Match';
  if (needsConsistencyCheck) return 'Needs Consistency';
  if (postConsistencyCheckAdminAppealed) return 'Appealed';
  if (consistencyCheckApproved) return 'Approved';
  if (postConsistencyCheckAdminAppealed) return 'Appealed';
  if (consistencyCheckRejected) return 'Rejected';

  return 'Unknown Status';
}

export {
  prettyStatus,
}
