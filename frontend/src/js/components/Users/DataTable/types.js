// @flow

type Props = {
  onAdd: Function,
  onDelete: Function,
  onClickPasswordReset: Function,
  onChangeAdminSetting: Function,
  onChangePanelMemberSetting: Function,
  onChangeDisabledUserAccount: Function,
  onChangeReviewMemberSetting: Function,
  onChangeDemoSetting: Function,
  classes: Object,
  title: string,
  data: Array<Object>,
}

type State = {
  page: number,
  order: ?string,
  orderBy: ?string,
  rowsPerPage: number,
  settings: Array<Object>,
  data: Array<Object>,
}

export type {
  Props,
  State,
};
