// @flow

import React from 'react';

type Props = {
  data: Object,
};

type PageableState = {
  page: number,
  pageSize: number,
  prevDisabled: boolean,
};

/**
 * purposefully abstract, can be used for anything waiting for data
 * not responsible for loading data
 */
const pageResults = (WrappedComponent: any) =>
  class HOCWaitingOnData extends React.Component<Props, PageableState> {
    state = {
      page: 0,
      pageSize: 25,
      prevDisabled: true,
    }

    nextPage = () => {
      this.setState({
        page: this.state.page + 1,
        prevDisabled: this.state.page + 1 === 0,
      });
    }

    prevPage = () => {
      this.setState({
        page: this.state.page - 1,
        prevDisabled: this.state.page + 1 === 0,
      });
    }

    changePageSize = (size: number) => {
      this.setState({
        pageSize: size,
      });
    }

    render() {
      const newProps = {
        page: this.state.page,
        pageSize: this.state.pageSize,
        prevDisabled: this.state.prevDisabled,
        nextPage: this.nextPage,
        prevPage: this.prevPage,
        changePageSize: this.changePageSize,
      };

      return (
        <WrappedComponent {...this.props} {...newProps} />
      );
    }
  };

export default pageResults;

export type { PageableState };
