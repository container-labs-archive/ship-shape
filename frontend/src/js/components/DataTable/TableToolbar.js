// @flow

import * as React from 'react';
import {
  Button,
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
  withStyles,
} from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { FilterList as FilterListIcon } from '@material-ui/icons';

type Props = {
  classes: Object,
  title: string,
  onAdd: Function,
  filter: boolean,
}

const styles = theme => ({
  root: {
    paddingRight: theme.spacing(1),
    justifyContent: 'space-between',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.dark,
        backgroundColor: lighten(theme.palette.secondary.light, 0.4),
      }
      : {
        color: lighten(theme.palette.secondary.light, 0.4),
        backgroundColor: theme.palette.secondary.dark,
      },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

@withStyles(styles)
class TableToolbar extends React.PureComponent<Props> {
  render() {
    const {
      title,
      onAdd,
      filter,
      classes,
    } = this.props;

    return (
      <Toolbar className={classes.root}>
        <div className={classes.title}>
          <Typography variant="h6">{title}</Typography>
        </div>
        <div className={classes.actions}>
          {
            onAdd && (
            <Button
              variant="contained"
              color="primary"
              onClick={onAdd}
              id="buttonAdd"
            >
              Add New
            </Button>
            )
          }
          {
            filter && (
            <Tooltip title="Filter">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            )
          }
        </div>
      </Toolbar>
    );
  }
}

export default TableToolbar;
