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

import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import styles from './styles';

import type { Props, State } from './types';


@withStyles(styles)
class PackageList extends Component<Props, State> {
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

    return (
      <div>
        {data.map((row) => {
          return (
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Carrier
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {row.carrier}
                </Typography>
                <Typography variant="h6" component="h2">
                  Tracking Number
                </Typography>
                <Typography variant="body2" component="p">
                  {row.tracking_code}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          )
        })}
      </div>
    );
  }
}

export default PackageList;
