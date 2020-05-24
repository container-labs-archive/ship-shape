// @flow

import React, { Component } from 'react';
import PageHeader from 'Components/Layout/PageHeader';

const withHeader = (headerText: string, align: string = 'left') => (WrappedComponent: any) => {
  class HOCWithHeader extends Component {
    render() {
      const style = {
        textAlign: align,
      };

      let finalText = headerText;
      if (typeof headerText === 'function') {
        finalText = headerText(this.props);
      }

      return (
        <div>
          <PageHeader
            headerText={finalText}
            style={style}
          />
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }
  return HOCWithHeader;
};

export default withHeader;
