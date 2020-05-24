// @flow

type Props = {
  classes: Object,
  onSubmit: Function,
  submitting: boolean,
  handleSubmit: Function,
  storageRootRef: Object,
  changeFieldValue: Function,
  values: Object,
}

type State = {
  requesting: boolean,
}

export type {
  Props,
  State,
};
