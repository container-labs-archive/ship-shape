// @flow

import L from 'react-loadable';
import Loader from './Loader';

const Loadable = opts => L({
  loading: Loader,
  ...opts,
});

export default Loadable;
