// @flow

type Props = {
  title: string,
  description: string,
  open: boolean,
  selectionLimit: number,
  onSubmit: Function,
  onClose: Function,
  classes: Object,
};

type State = {
  emailToMember: boolean,
  moreInfo: string,
  selectedDate: Date,
};

export type { Props, State };
