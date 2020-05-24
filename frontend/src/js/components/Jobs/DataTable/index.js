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

import { prettyStatus, panelAssigned } from 'Utils/jobs';
import type { Props, State } from './types';

const columnData = [
  {
    id: 'createDate',
    label: 'Create date',
    sortable: true,
  },
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
    sortable: false,
    center: true,
  },
  {
    id: 'panelMembersForStep',
    label: 'Panel Assigned',
    sortable: false,
    center: true,
  },
  {
    id: 'actions',
    label: 'Actions',
    sortable: false,
    center: true,
  },
];
@withStyles(styles)
class JobsDataTable extends Component<Props, State> {
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
            <TableRow hover key={dt.key} id={`row-${index}`} jest={`row-${dt.jobTitle}`}>
              <TableCell>{moment(new Date(parseInt(dt.createDate))).format('YYYY-MM-DD')}</TableCell>
              <TableCell>{dt.jobNumber}</TableCell>
              <TableCell>{dt.jobTitle}</TableCell>
              <TableCell>{dt.recordNumber}</TableCell>
              <TableCell className={classes.tableCellCenter}>
                {prettyStatus(dt)}
              </TableCell>
              <TableCell className={classes.tableCellCenter}>
                {panelAssigned(dt)}
              </TableCell>
              <TableCell className={classes.tableCellRight}>
                {!dt.status.postConsistencyCheckAdminAppealed
                  && dt.status.consistencyCheckApproved && (
                  <Tooltip title="Appeal">
                    <IconButton
                      onClick={() => {
                        onAppeals(dt.key);
                      }}
                      id="appealButton"
                    >
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                )}

                {dt.status.consistencyCheckApproved && (
                  <Tooltip title="Done">
                    <IconButton
                      onClick={() => {
                        onMarkDone(dt.key);
                      }}
                      id="doneButton"
                    >
                      <AssignmentTurnedInIcon />
                    </IconButton>
                  </Tooltip>
                )}

                {/* TODO: come back to scheduling panel story later */}
                {/* {isUnmatched && (
                  <Tooltip title="Schedule ">
                    <IconButton
                      onClick={() => {
                        onSchedule(dt.key);
                      }}
                    >
                      <CalendarTodayIcon />
                    </IconButton>
                  </Tooltip>
                )} */}

                <Tooltip title="Assign">
                  <IconButton
                    onClick={() => {
                      onAssign(dt.key);
                    }}
                    id="buttonAssign"
                  >
                    <AssignmentIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton
                    onClick={() => {
                      onEdit(dt.key);
                    }}
                    id="buttonEdit"
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => {
                      onDelete(dt.key);
                    }}
                    id="buttonDelete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
      </DataTable>
    );
  }
}

export default JobsDataTable;
