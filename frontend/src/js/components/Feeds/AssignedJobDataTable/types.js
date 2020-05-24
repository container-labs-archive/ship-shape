// @flow

type Props = {
  onMatch: Function,
  classes: Object,
  title: string,
  data: Array<Object>,
}

type State = {
  page: number,
  order: string,
  orderBy: string,
  rowsPerPage: number,
  data: Object,
}

export type {
  Props,
  State,
};
