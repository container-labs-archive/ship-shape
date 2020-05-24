// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import styles from './styles';
import { prettyStatus } from 'Utils/jobs';
import DataTable from '../../DataTable';

import type { Props, State } from './types';

const columnData = [
  {
    id: 'jobNumber',
    label: 'Job number',
    sortable: true,
  },
  {
    id: 'jobTilte',
    label: 'Job title',
    sortable: true,
  },
  {
    id: 'recordNumber',
    label: 'Record number',
    sortable: true,
  },
  {
    id: 'status',
    label: 'Status',
  },
  {
    id: 'actions',
    label: 'Actions',
    sortable: false,
    center: true,
  },
];

@withStyles(styles)
class AssignedJobDataTable extends Component<Props, State> {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     page: 0,
  //     order: null,
  //     orderBy: null,
  //     rowsPerPage: 25,
  //     data: props.data,
  //   };
  // }

  state = {
    page: 0,
    order: null,
    orderBy: null,
    rowsPerPage: 25,
    data: {},
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ data: nextProps.data });
  // }

  static getDerivedStateFromProps(props, state) {
    return {
      data: props.data,
    };
  }

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
      onMatch,
      classes,
      loading,
      addButton,
      onAdd,
    } = this.props;

    const {
      data,
      page,
      order,
      orderBy,
      rowsPerPage,
    } = this.state;

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
        {data && data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(dt => (
          <TableRow hover key={dt.key} jest={`row-${dt.jobTitle}`} jestkey={`row-${dt.key}`}>
            <TableCell>{dt.jobNumber}</TableCell>
            <TableCell>{dt.jobTitle}</TableCell>
            <TableCell>{dt.recordNumber}</TableCell>
            <TableCell>{prettyStatus(dt)}</TableCell>
            <TableCell
              className={classes.tableCellCenter}
            >
              <Tooltip title="Match">
                <IconButton
                  onClick={() => { onMatch(dt.key); }}
                  id="buttonMatch"
                >
                  <AssignmentIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    );
  }
}

export default AssignedJobDataTable;
