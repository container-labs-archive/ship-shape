// @flow

import React from 'react';

type Props = {
}

type Filter = {
  filterKey: string,
  value: string,
}

type FilterState = {
  withFilters: ?[Filter],
}

const withFilters = (WrappedComponent: any) => class HOCWaitingOnData extends React.Component<Props, FilterState> {
    state = {
      withFilters: [],
    }

    updateFilters = (filters: [Filter]) => {
      this.setState({ withFilters: filters });
    }

    render() {
      const newProps = {
        currentFilters: this.state.withFilters,
        updateFilters: this.updateFilters,
      };

      return (
        <WrappedComponent {...this.props} {...newProps} />
      );
    }
};

export default withFilters;
export type { FilterState };
