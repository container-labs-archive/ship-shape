// @flow

type Props = {
  onClose: Function,
  onSave: Function,
  classes: Object,
  image: Object,
  open: boolean,
}

type State = {
  scale: number,
  editor: Object,
}

export type {
  Props,
  State,
};
