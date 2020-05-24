// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Chip from '@material-ui/core/Chip';
import _filter from 'lodash/filter';

import FilterPanel, { filterNames } from './FilterPanel';

type Props = {
  classes: Object,
  onDownload: Function,
  currentFilters: Object,
  onApplyFilters: Function,
}

type State = {
  drawerOpen: boolean,
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
    paddingRight: theme.spacing(1),
  },
  filterButton: {
    marginRight: theme.spacing(2),
  },
  chip: {
    marginRight: theme.spacing(2),
  },
});

@withStyles(styles)
class TableToolbar extends React.Component<Props, State> {
  state = {
    drawerOpen: false,
  }

  toggleDrawer = (open: boolean) => {
    this.setState({
      drawerOpen: open,
    });
  };

  handleChipDelete = (filterKey: string) => {
    const { currentFilters, onApplyFilters } = this.props;
    const newFilters = _filter(currentFilters, filter => filter.filterKey !== filterKey);
    onApplyFilters(newFilters);
  }

  render() {
    const {
      classes,
      onDownload,
      onApplyFilters,
      currentFilters,
    } = this.props;
    const { drawerOpen } = this.state;

    return (
      <Toolbar className={classes.root}>
        <div className={classes.title}>
          {currentFilters.map(filter => (<Chip
            key={filter.filterKey}
            label={`${filterNames[filter.filterKey]}: ${filter.value}`}
            className={classes.chip}
            onDelete={() => this.handleChipDelete(filter.filterKey)}
          />))}
        </div>
        <div className={classes.actions}>
          <Tooltip title="Filter" className={classes.filterButton}>
            <IconButton aria-label="Filter" onClick={() => this.toggleDrawer(!drawerOpen)} >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            color="primary"
            onClick={onDownload}
          >
            Download
          </Button>
        </div>
        <FilterPanel
          currentFilters={currentFilters}
          onApplyFilters={onApplyFilters}
          drawerOpen={drawerOpen}
          toggleDrawer={this.toggleDrawer}
        />
      </Toolbar>
    );
  }
}

export default TableToolbar;
