// @flow

import type { ApolloQuery, ScoreData } from 'Types';

type Fields = {
  jobTitle: string,
  jobMatchNumber: string,
  dateOfPanel: string,
};

type Props = {
  data: ApolloQuery,
  onSave: Function,
  onClear: Function,
  submitting: boolean,
  pickProfile: Function,
  handleSubmit: Function,
  profileOptions: Object,
  panelMemberOptions: Object,
  disabledFields: Array<Object>,
  jobFiles: Array<Object>,
  fields: Fields,
  newScoreData: ScoreData,
  profile: Object,
  hybridMatch: Function,
};

type State = {
  openSaveDialog: boolean,
};

export type { Props, State };
