// @flow

type Props = {
  title: string,
  description: string,
  open: boolean,
  options: Array<Object>,
  selectedValue: Array<string>,
  selectionLimit: number,
  onSubmit: Function,
  onClose: Function,
  classes: Object,
}

type State = {
  value: Array<Object>,
  error: string,
}

export type {
  Props,
  State,
};
