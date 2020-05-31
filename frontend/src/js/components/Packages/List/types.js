// @flow


type Package = {
  carrer: string,
  tracking_code: string,
}

type Props = {
  onAdd: Function,
  onEdit: Function,
  onDelete: Function,
  onAssign: Function,
  classes: Object,
  title: string,
  addButton: boolean,
  dataLoading: boolean,

  data: Array<Package>,
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
