// @flow

import React, { Component } from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import styles from './styles';
import DataTable from '../../DataTable';
import type { Props, State } from './types';

const columnData = [
  {
    id: 'createDate',
    label: 'When',
    sortable: true,
  },
  {
    id: 'country_code',
    label: 'Country',
    sortable: true,
  },
  {
    id: 'city_locality',
    label: 'City',
    sortable: true,
  },
  {
    id: 'description',
    label: 'Description',
    sortable: true,
  },

];
@withStyles(styles)
class PackagesDataTable extends Component<Props, State> {
  state = {
    data: {},
  }

  static getDerivedStateFromProps(props: Props) {
    return {
      data: props.data,
    };
  }

  render() {
    const {
      title,
    } = this.props;

    const {
      data,
    } = this.state;

    return (
      <DataTable
        data={data}
        columnData={columnData}
        emptyMessage="No events yet for this package."
        title={title}
      >
        {data.map(dt => (
          <TableRow hover key={dt.key} jest={`row-${dt.jobTitle}`}>
            <TableCell>{moment(dt.occurred_at).format('MM/DD/YY HH:MM')}</TableCell>
            <TableCell>{dt.country_code}</TableCell>
            <TableCell>
              {dt.city_locality}
,
              {' '}
              {dt.state_province}
            </TableCell>
            <TableCell>{dt.description}</TableCell>
          </TableRow>
        ))}
      </DataTable>
    );
  }
}

export default PackagesDataTable;
