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
  Typography,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PackageTable from '../DataTable';
import styles from './styles';

import type { Props, State } from './types';


@withStyles(styles)
class PackageList extends Component<Props, State> {
  state = {
    expanded: false
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
              events,
            },
          } = row;



          return (
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Carrier
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPsAAADJCAMAAADSHrQyAAAAw1BMVEX///8qAHz/WQAAAHFBLYZpJW7/XAD/uqYiAH3/TwD/UwAgAHj29vn/mXn/SAD/+PaQhrT/j2t3aqSmn8KEeaz/cTn/zb9OOY2spcWyq8nq5/ERAHT/UQBSP4//7+rb1+aMgbFtX57/imPw7vWelr3/4dj/sJjAutP/x7ZAJ4Y5HoNbSZT/8+97b6cAAGlcAGDNydwyEYD/oIJoWZv/PgD/lHL/e0z/08b/aSzf3On/YyBhUJf/5t6ZkLr/qY//gle+qsB+D48nAAAEUklEQVR4nO3Za1vaSByG8eCwuiSaasEDDBQQ5GSxoPaglu1+/0+1QDIHyARECtl63b9X5DQXD0wy/5l4HgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJCVY7c3tvHBaUdffWs54XJ3tUkb7bv4si+hw+P1rr77tvI5F1nepI2ijK76+6/DgyT/bFfffVtkJzvZyb5JG+8ge2CIbbP7RuEPyH750Wh2N2kjmd0/M647u/ru29LZg9M3t5HMHv7Gb7g7ZCe7U6tSaaVcq6Y87zL7qNGPJin50/ryodJgul/W2q13kD1Xa5SU4TxpOScCPfyJ/si6qjuODwVSTFzP+RNLx/5s2rjXO8++7zl0zDm+i+kQ18rLhXInEE19UVPYddBDMVg9vt88VtVGqMN/DfW+rCa5zrpOdr26DJb3Bv34/s4vHgrUZmpddxHqrbAXtdHRu6rfMoqelr0iktFyQX5+SS3xq6zL7h1Z4ecdvKd3+D+yip6WfaDySVmrSdX7ZWl6xal0XbI6u3dfMOFvPO/GRD/IbknLPZfp6+jzwr6r4oonz+oRUkgprE6wai5zbcIXPn0KrY3MoqdkV6ZZ5ypx+ODBa+qwYja+PQ3Nb7FyHvfN13uen/XnWSf4P2Q3z3n9xxbVaWoYE3UdVcRDfls6slvP+Wo8jzOBjTCj0S1isg8ulZqOp9eqWypyX/8uein31vGcPzd+nESnfUhmD4/2H9hi6rqJ2Wn+Wy1xOwT67JFMZHfWddZdHp91v/N4K7lq2noyaTJ6ybShTl9X094shs98UcOVvZs6ihn2qpa6D9bW8xd2+OxqGuXN2a3y/jZR06bNZY7MSHdwvttgr7A6e5CwXfZ763nnZziyR1zZ9cMrP/y4ZKiLHuuN3fi1fb6zcMP7Wb+kdGVXpVvQTJ6v7u3gRe9qvfZZ11t81vnPvz3NZpxrF7pjJ88vqT9eVNSuYnKMK1xYVOn2fXmM8zO+5Z3ZVUDTsY8rkVZZBQ0u1SFXXVcw1PT853L06VnZvp52ZtcDvKpb9Wv6u7qZ0dbm63hP48CR3f53o2H8c9WMbib8yb7z2tzrdbpMFZNZwJGa0k7nMhMzCIhme/Ji1UErsx+a+cs/1oQ2yxcX7uxmohqI2RxebYnpL2FNWu1Bb032c9+K20uu42QhZZ32ylnWitn9P0qteFdk/6X7+bybd5bXcTKRtkbdcCSUUQ1/unRo/Xqdd6J7eeHXvA17Hefn3kPHUtfn24nwQk1fFn+XIO9Yp13Mbv5mPaxZ6zjVz/sMbBnImGgsHakPFpZqpTTvZsvWSpUcHxdF3MYXv5AUnvUe9cahbuM81DuzKvDKV8oocaybFzKq4qXIte0jreHsyPzVxLQz1ItxE/8eufQ65rNVw9tn7DzmG1TKjebt7UPj6mn5yHF5eJkbv7QrrssAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQof8AN6lg0i9Mca4AAAAASUVORK5CYII="/>
                  {row.carrier}
                </Typography>
                <Typography variant="h6" component="h2">
                  Tracking Number
                </Typography>
                <Typography variant="body2" component="p">
                  {row.tracking_code}
                </Typography>
                <Typography variant="body2" component="p">
                  {row.estimated_delivery_date}
                </Typography>
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
              </CardActions>
            </Card>
          )
        })}
      </div>
    );
  }
}

export default PackageList;
