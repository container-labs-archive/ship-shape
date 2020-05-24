// @flow

import { prettyStatus } from './status';

function panelAssigned(job: Object) {
  const {
    panelMembers,
    consistencyPanelMembers,
    rejectedPanelMembers,
    appealPanelMembers,
    status: {
      needsMatch,
      needsConsistencyCheck,
      consistencyCheckApproved,
      postConsistencyCheckAdminAppealed,
      consistencyCheckRejected,
    },
  } = job;

  if (needsMatch) {
    if (panelMembers.length > 0) {
      return 'Yes';
    }
    return 'No';
  }
  if (needsConsistencyCheck) {
    if (consistencyPanelMembers.length > 0) {
      return 'Yes';
    }
    return 'No';
  }

  if (consistencyCheckApproved && !postConsistencyCheckAdminAppealed) {
    return 'N/A';
  }

  if (consistencyCheckRejected) {
    if (rejectedPanelMembers.length > 0) {
      return 'Yes';
    }
    return 'No';
  }

  if (postConsistencyCheckAdminAppealed) {
    if (appealPanelMembers.length > 0) {
      return 'Yes';
    }
    return 'No';
  }

  return 'Unknown';
}

export { prettyStatus, panelAssigned };
