// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import TableHead from '../../Tables/TableHead';
import TableToolbar from './TableToolbar';
import styles from './styles';
import { prettyVerdict } from 'Utils/matcher/verdict';
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
    id: 'verdict',
    label: 'Verdict',
    sortable: true,
  },
  {
    id: 'profile',
    label: 'Profile',
    sortable: false,
    center: true,
  },
  {
    id: 'level',
    label: 'Level',
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
class DataTable extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      order: null,
      orderBy: null,
      rowsPerPage: props.pageSize,
    };
  }

  handleChangePage = (event: Object, newPage: number) => {
    const { onNextPage, onPreviousPage, page } = this.props;
    if (page < newPage) {
      onNextPage();
    } else if (page > newPage) {
      onPreviousPage();
    }
  };

  handleChangeRowsPerPage = (event: Object) => {
    const { changePageSize } = this.props;
    changePageSize(event.target.value);
  };

  render() {
    const {
      title,
      onView,
      onArchive,
      onAppeal,
      classes, onDownload, page, updateFilters, data, totalResults, currentFilters,
    } = this.props;

    const { order, orderBy, rowsPerPage } = this.state;

    return (
      <Paper className={classes.root}>
        <TableToolbar
          title={title}
          onDownload={onDownload}
          filter={false}
          onApplyFilters={updateFilters}
          currentFilters={currentFilters}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              columnData={columnData}
            />
            <TableBody>
              {!data.length && (
                <TableRow>
                  <TableCell colSpan={7} className={classes.tableCellCenter}>
                    There are no completed matches.
                  </TableCell>
                </TableRow>
              )}
              {data.map((dt) => {
                const { mostRecentPanelMatch: panelMatch } = dt;

                return (
                  <TableRow hover key={dt.key}>
                    <TableCell>
                      {dt.jobNumber ? dt.jobNumber : 'no panel'}
                    </TableCell>
                    <TableCell>
                      {dt.jobTitle}
                    </TableCell>
                    <TableCell>
                      {panelMatch ? prettyVerdict(panelMatch.verdict) : 'no panel'}
                    </TableCell>
                    <TableCell>
                      {panelMatch && panelMatch.profile ? (panelMatch.profile.title || dt.jobTitle) : dt.jobTitle}
                    </TableCell>
                    <TableCell>
                      {panelMatch ? panelMatch.band : 'no panel'}
                    </TableCell>
                    <TableCell className={classes.tableCellCenter}>
                      <Tooltip title="View">
                        <IconButton
                          onClick={() => {
                            onView(dt.key);
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Archive">
                        <IconButton
                          onClick={() => {
                            onArchive(dt.key);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Appeal">
                        <IconButton
                          onClick={() => {
                            onAppeal(dt.key);
                          }}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={6}
                  page={page}
                  count={totalResults}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[25, 50, 100]}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

export default DataTable;
