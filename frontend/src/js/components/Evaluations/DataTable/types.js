// @flow

type Props = {
  title: ?string,
  onView: Function,
  onArchive: Function,
  classes: Object,
  data: Array<Object>,
  onDownload: Function,
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
