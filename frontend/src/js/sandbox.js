
import React from 'react';
import { render } from 'react-dom';
import SandboxWrapper from './SandboxWrapper';

render(
  <SandboxWrapper />,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
