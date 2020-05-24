// @flow

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import styles from './styles';

// TODO: finish updating to check the first panelMatch
const filtersConfig = [
  {
    value: 'jobTitle',
    label: 'Job Title',
  },
  {
    value: 'jobNumber',
    label: 'Job Number',
  },
  {
    value: 'panelMatch.band',
    label: 'Level',
  },
  {
    value: 'panelMatch.verdict',
    label: 'Verdict',
  },
];

const filterNames = {
  jobTitle: 'Job Title',
  jobMatchNumber: 'Job Match Number',
  'panelMatch.band': 'Level',
  'panelMatch.verdict': 'Verdict',
};

function defaultState() {
  const state = {
    filters: {},
  };
  filtersConfig.forEach((config) => {
    state.filters[config.value] = '';
  });

  return state;
}

// legacy
// profileTitle: String
// actual
// profile.title => harder to search on

type Props = {
  currentFilters: Object,
  onApplyFilters: Function,
  classes: Object,
  toggleDrawer: Function,
  drawerOpen: boolean,
}

type State = {
  filters: Object,
}

@withStyles(styles)
class FilterPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { currentFilters } = this.props;
    const state = defaultState();

    currentFilters.forEach((filter) => {
      state.filters[filter.filterKey] = filter.value;
    });

    this.state = state;
  }

  onFilterChange = (filterName: string, event: Object) => {
    const updatedState = {};
    updatedState[filterName] = event.target.value;
    const mergedState = Object.assign(this.state.filters, updatedState);
    this.setState({ filters: mergedState });
  }

  onFiltersApply = () => {
    const { onApplyFilters } = this.props;
    const { filters } = this.state;

    const filterList = [];
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== '') {
        filterList.push({
          filterKey: key,
          value,
        });
      }
    });

    onApplyFilters(filterList);
  }

  onClearFilters = () => {
    const { onApplyFilters } = this.props;
    onApplyFilters([]);
    const state = defaultState();
    this.setState(state);
  }

  render() {
    const {
      classes,
      toggleDrawer,
      drawerOpen,
    } = this.props;

    return (
      <Drawer anchor="right" open={drawerOpen} >
        <div className={classes.drawer} >
          <div className={classes.titleContainer}>
            <Typography variant="h6" gutterBottom className={classes.title}>Filters</Typography>
            <IconButton color="primary" onClick={() => toggleDrawer(!drawerOpen)} >
              <CloseIcon />
            </IconButton>
          </div>
          <Divider className={classes.divider} />
          {filtersConfig.map((config) => {
            const value = this.state.filters[config.value];
            return (
              <FormControl className={classes.formControl} key={`filter-${config.value}`} >
                <TextField
                  id="value"
                  label={config.label}
                  value={value}
                  onChange={e => this.onFilterChange(config.value, e)}
                  margin="normal"
                />
                <br />
              </FormControl>
            );
          })}
          <div className={classes.actions}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onFiltersApply}
            >
              Apply
            </Button>
            <Button
              onClick={this.onClearFilters}
            >
              Clear
            </Button>
          </div>
        </div>
      </Drawer>
    );
  }
}

export default FilterPanel;
export { filterNames };
