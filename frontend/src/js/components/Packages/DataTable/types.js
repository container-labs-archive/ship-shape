// @flow

type Props = {
  onAdd: Function,
  onEdit: Function,
  onDelete: Function,
  onAssign: Function,
  classes: Object,
  title: string,
  data: Array<Object>,
  addButton: boolean,
  dataLoading: boolean,
}

type State = {
  page: number,
  order: string,
  orderBy: string,
  rowsPerPage: number,
  data: Object,
}

export {
  Props,
  State,
};
