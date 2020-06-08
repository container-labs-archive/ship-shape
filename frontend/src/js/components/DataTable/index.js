// @flow

import * as React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  withStyles,
} from '@material-ui/core';
import { Loader } from 'HOCS';
import TableHead from '../Tables/TableHead';
import TableToolbar from './TableToolbar';
import styles from './styles';

type Props = {
  classes: Object,
  title: string,
  onAdd: Function,
  data: Object,
  loading: boolean,
  columnData: Array<Object>,
  order: any,
  orderBy: any,
  onRequestSort: any,
  emptyMessage: any,
  children: any,
  onChangePage: any,
  onChangeRowsPerPage: any,
  page: any,
  rowsPerPage: any,
}

@withStyles(styles)
class DataTable extends React.Component<Props> {
  render() {
    const {
      classes,
      title,
      onAdd,
      data,
      loading,
      columnData,
      order,
      orderBy,
      onRequestSort,
      emptyMessage,
      children,
      onChangePage,
      onChangeRowsPerPage,
      page,
      rowsPerPage,
    } = this.props;

    return (
      <Paper className={classes.container}>
        {title && (
          <TableToolbar
            title={title}
            onAdd={onAdd}
          />
        )}
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={onRequestSort}
              columnData={columnData}
            />
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={columnData.length}>
                    <Loader />
                  </TableCell>
                </TableRow>
              )}
              {data && !data.length && (
                <TableRow>
                  <TableCell colSpan={7} className={classes.tableCellCenter}>
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
              {!loading && children}
            </TableBody>
            {rowsPerPage && (
            <TableFooter>
              <TableRow>
                {data && (
                <TablePagination
                  colSpan={7}
                  page={page}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[25, 50, 100]}
                  onChangePage={onChangePage}
                  onChangeRowsPerPage={onChangeRowsPerPage}
                />
                )}
              </TableRow>
            </TableFooter>
            )}
          </Table>
        </div>
      </Paper>
    );
  }
}

export default DataTable;
