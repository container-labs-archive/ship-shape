// @flow

type Props = {
  commentId: string,
  classes: Object,
  content: string,
  createdAt: string,
  displayName: string,
  haveActions: boolean,
  onUpdate: Function,
  onRemove: Function,
};

type State = {
  isHovering: boolean,
  isEditing: boolean,
  content: string,
};

export type {
  Props,
  State,
};
