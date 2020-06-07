// @flow

import React, { Component } from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {
  Button,
  Collapse,
  Grid,
  Typography,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PackageTable from '../DataTable';
import styles from './styles';

import type { Props, State } from './types';


const carrierLogos = {
  dhl_express: 'https://storage.googleapis.com/ship-shape-assets/dhl.png',
  fedex: 'https://storage.googleapis.com/ship-shape-assets/fedex.png',
  ontrac: 'https://storage.googleapis.com/ship-shape-assets/ontrac.png',
  usps: 'https://storage.googleapis.com/ship-shape-assets/usps.png',
  ups: 'https://storage.googleapis.com/ship-shape-assets/ups.png',
}

@withStyles(styles)
class PackageList extends Component<Props, State> {
  state = {
    expanded: false,
  }

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  handleExpand = () => {
    const {
      expanded,
    } = this.state;

    this.setState({
      expanded: !expanded,
    });
  }

  handleArchive = (rowKey) => {
    const {
      onUpdate,
    } = this.props;

    onUpdate({
      key: rowKey,
      isArchived: true,
    });
  }

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
      data,
    } = this.props;
    const {
      expanded,
    } = this.state;

    return (
      <div>
        {data.map((row) => {
          const {
            ship_engine: {
              estimated_delivery_date,
              events,
            },
          } = row;

          const rowKey = `pk-${row.key}`;

          return (
            <Card className={classes.root} key={rowKey} >
              <CardContent>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography className={classes.pos} color="textSecondary">
                    <img src={carrierLogos[row.carrier]} alt={row.carrier} className={classes.carrierLogo} />
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" component="h2">
                    Tracking Number
                  </Typography>
                  <Typography variant="body2" component="p">
                    {row.tracking_code}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" component="h2">
                    Estimated Delivery Date
                  </Typography>
                  <Typography variant="body2" component="p">
                    {estimated_delivery_date && moment(estimated_delivery_date).format('MM/DD/YY')}
                    {!estimated_delivery_date && "No Information"}
                  </Typography>
                </Grid>
              </Grid>
              </CardContent>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <PackageTable
                    data={events}
                  />
                </CardContent>
              </Collapse>
              <CardActions>
                <Button size="small" onClick={this.handleExpand}>Show More</Button>
                <Button size="small" onClick={() => this.handleArchive(row.key)}>Archive</Button>
              </CardActions>
            </Card>
          )
        })}
      </div>
    );
  }
}

export default PackageList;
