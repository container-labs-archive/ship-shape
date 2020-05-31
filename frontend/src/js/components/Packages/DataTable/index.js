// @flow

import React, { Component } from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import styles from './styles';
import DataTable from '../../DataTable';

import type { Props, State } from './types';

const columnData = [
  {
    id: 'createDate',
    label: 'Create date',
    sortable: true,
  },
  {
    id: 'carrier',
    label: 'Carrier',
    sortable: true,
  },
  {
    id: 'tracking_code',
    label: 'Tracking Number',
    sortable: true,
  },
];
@withStyles(styles)
class JobsDataTable extends Component<Props, State> {
  state = {
    page: 0,
    order: null,
    orderBy: null,
    rowsPerPage: 25,
    data: {},
  }

  static getDerivedStateFromProps(props, state) {
    return {
      data: props.data,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ data: nextProps.data });
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

  render() {
    const {
      title,
      onAdd,
      onEdit,
      onDelete,
      onAssign,
      onSchedule,
      classes,
      addButton,
      isUnmatched,
      onAppeals,
      onMarkDone,
      loading,
    } = this.props;

    const { data, page, order, orderBy, rowsPerPage } = this.state;

    return (
      <DataTable
        data={data}
        loading={loading}
        addButton={addButton}
        onAdd={onAdd}
        columnData={columnData}
        order={order}
        orderBy={orderBy}
        onRequestSort={this.handleRequestSort}
        emptyMessage="There are no jobs in the queue."
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        title={title}
      >
        {data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((dt, index) => (
            <TableRow hover key={dt.key} jest={`row-${dt.jobTitle}`}>
              <TableCell>{moment(new Date(parseInt(dt.createDate))).format('YYYY-MM-DD')}</TableCell>
              <TableCell>{dt.carrier}</TableCell>
              <TableCell>{dt.tracking_code}</TableCell>
              <TableCell>{dt.recordNumber}</TableCell>
            </TableRow>
          ))}
      </DataTable>
    );
  }
}

export default JobsDataTable;
