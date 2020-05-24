// @flow

import * as React from 'react';
import {
  TableRow, TableCell,
  withStyles,
} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import DataTable from 'Components/DataTable';
import Avatar from 'Components/Avatar';
import AsyncButton from '../../Layout/AsyncButton';
import styles from './styles';
import type { Props, State } from './types';

const columnData = [
  {
    id: 'photo',
    label: '',
  },
  {
    id: 'email',
    label: 'Email',
    sortable: true,
  },
  {
    id: 'displayName',
    label: 'Name',
  },
  {
    id: 'lastLogin',
    label: 'Last Login',
  },
  {
    id: 'admin',
    label: 'Admin',
    center: true,
  },
  {
    id: 'panelMember',
    label: 'Panel member',
    center: true,
  },
  {
    id: 'disableAccount',
    label: 'Disable',
    center: true,
  },
  {
    id: 'passwordReset',
    label: 'Password reset email',
    center: true,
  },
  {
    id: 'deleteAccount',
    label: 'Delete Account',
    center: true,
  },
];

function prettySignIn(lastSignInTime) {
  if (lastSignInTime) {
    const parts = lastSignInTime.split(' ');
    return [parts[0], parts[1], parts[2], parts[3]].join(' ');
  }
  return 'Never';
}

@withStyles(styles)
class UsersDataTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // TODO: we need to make requests to the server for sorting data
    //       move this out of state and we don't need both of these methods
    const { data } = this.props;
    const settings = data.reduce((res, obj) => ({
      ...res,
      [obj.key]: {
        isAdmin: obj.isAdmin,
        disabled: obj.disabled,
        activePanelMember: obj.activePanelMember,
        isReviewer: obj.isReviewer,
        isDemo: obj.isDemo,
      },
    }), {});

    this.state = {
      page: 0,
      order: null,
      orderBy: null,
      rowsPerPage: 25,
      settings,
      data,
    };
  }

  // TODO: shouldn't need to do this
  // componentWillReceiveProps(nextProps) {
  //   const { data } = nextProps;
  //   // TODO: we need to make requests to the server for sorting data
  //   //       move this out of state and we don't need both of these methods
  //   const settings = data.reduce((res, obj) => ({
  //     ...res,
  //     [obj.key]: {
  //       isAdmin: obj.isAdmin,
  //       disabled: obj.disabled,
  //       activePanelMember: obj.activePanelMember,
  //       isReviewer: obj.isReviewer,
  //       isDemo: obj.isDemo,
  //     },
  //   }), {});
  //   this.setState({ settings, data });
  // }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChangeAdminSetting = (key, isAdmin) => {
    const nextState = this.state;
    nextState.settings[key].isAdmin = isAdmin;

    this.setState(nextState);
    this.props.onChangeAdminSetting(key, isAdmin);
  }

  handleChangePanelMemberSetting = (key, activePanelMember) => {
    const nextState = this.state;
    nextState.settings[key].activePanelMember = activePanelMember;

    this.setState(nextState);
    this.props.onChangePanelMemberSetting(key, activePanelMember);
  }

  handleChangeReviewMemberSetting = (key, isReviewer) => {
    const nextState = this.state;
    nextState.settings[key].isReviewer = isReviewer;

    this.setState(nextState);
    this.props.onChangeReviewMemberSetting(key, isReviewer);
  }

  handleChangeDemoSetting = (key, isDemo) => {
    const nextState = this.state;
    nextState.settings[key].isDemo = isDemo;

    this.setState(nextState);
    this.props.onChangeDemoSetting(key, isDemo);
  }

  handleChangeDisabledUserAccount = (key, disabled) => {
    const nextState = this.state;
    nextState.settings[key].disabled = disabled;

    this.setState(nextState);
    this.props.onChangeDisabledUserAccount(key, disabled);
  }

  render() {
    const {
      title,
      onAdd,
      onDelete,
      onClickPasswordReset,
      classes,
    } = this.props;

    const {
      data,
      loading,
      settings,
      page,
      order,
      orderBy,
      rowsPerPage,
    } = this.state;

    return (
      <DataTable
        data={data}
        loading={loading}
        onAdd={onAdd}
        columnData={columnData}
        order={order}
        orderBy={orderBy}
        onRequestSort={this.handleRequestSort}
        emptyMessage="There are no users."
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        title={title}
      >
        {data && data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(dt => (
          <TableRow hover key={dt.key}>
            <TableCell>
              <Avatar
                photoURL={dt.photoURL}
                email={dt.email}
              />
            </TableCell>
            <TableCell>{dt.email}</TableCell>
            <TableCell>{dt.displayName}</TableCell>
            <TableCell>{prettySignIn(dt.lastSignInTime)}</TableCell>
            <TableCell className={classes.tableCellCenter}>
              <Switch
                checked={settings[dt.key].isAdmin}
                onChange={() => this.handleChangeAdminSetting(dt.key, !settings[dt.key].isAdmin)}
              />
            </TableCell>
            <TableCell className={classes.tableCellCenter}>
              <Switch
                checked={settings[dt.key].activePanelMember}
                onChange={() => this.handleChangePanelMemberSetting(dt.key, !settings[dt.key].activePanelMember)}
              />
            </TableCell>
            <TableCell className={classes.tableCellCenter}>
              <Switch
                checked={settings[dt.key].disabled}
                onChange={() => this.handleChangeDisabledUserAccount(dt.key, !settings[dt.key].disabled)}
              />
            </TableCell>
            <TableCell className={classes.tableCellCenter}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => { onClickPasswordReset(dt.email); }}
              >
                Send
              </Button>
            </TableCell>
            <TableCell className={classes.tableCellCenter}>
              <AsyncButton
                label="Delete"
                onClick={() => { onDelete(dt.key); }}
                waiting={loading}
              />
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    );
  }
}

export default UsersDataTable;
