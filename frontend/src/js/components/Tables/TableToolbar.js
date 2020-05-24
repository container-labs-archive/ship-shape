// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';

type Props = {
  classes: Object,
  addButton: boolean,
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

const TableToolbar = ({
  title,
  onAdd,
  filter,
  classes,
  addButton = true,
}: Props): ReactComponent => (
  <Toolbar className={classes.root}>
    <div className={classes.title}>
      <Typography variant="h6">{title}</Typography>
    </div>
    <div className={classes.actions}>
      {
        addButton &&
        <Button
          variant="contained"
          color="primary"
          onClick={onAdd}
          id="buttonAdd"
        >
          Add New
        </Button>
      }
      {
        filter &&
        <Tooltip title="Filter">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      }
    </div>
  </Toolbar>
);

export default withStyles(styles)(TableToolbar);
