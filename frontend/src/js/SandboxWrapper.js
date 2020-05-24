// @flow

import * as React from 'react';
import { Provider } from 'react-redux';
import 'Assets/style.css';
import store from './store';
import SandboxApp from './pages/Sandbox';

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SandboxApp />
      </Provider>
    );
  }
}

export default AppWrapper;
