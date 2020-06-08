// @flow

import React, { Component } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';

type Props = {
  order: string,
  orderBy: string,
  columnData: Array<Object>,
  onRequestSort: Function,
}

class EnhancedTableHead extends Component<Props> {
  createSortHandler = property => (event) => {
    const {
      onRequestSort,
    } = this.props;
    onRequestSort(event, property);
  }

  renderCellContent = (column) => {
    const { order, orderBy } = this.props;
    const { id, label } = column;

    if (false) { // sortable doesnt work for new material ui
      return (
        <Tooltip
          title="Sort"
          placement={column.numeric ? 'bottom-end' : 'bottom-start'}
          enterDelay={300}
        >
          <TableSortLabel
            direction={order}
            active={orderBy === id}
            onClick={this.createSortHandler(id)}
          >
            {label}
          </TableSortLabel>
        </Tooltip>
      );
    }

    return label;
  }

  render() {
    const { columnData } = this.props;

    return (
      <TableHead>
        <TableRow>
          {
            columnData.map(column => (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                style={{ textAlign: column.center ? 'center' : 'left' }}
              >
                {this.renderCellContent(column)}
              </TableCell>
            ))
          }
        </TableRow>
      </TableHead>
    );
  }
}

export default EnhancedTableHead;
