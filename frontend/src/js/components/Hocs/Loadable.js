// @flow

import L from 'react-loadable';
import Loader from './Loader';

const Loadable = (opts: any) => L({
  loading: Loader,
  ...opts,
});

export default Loadable;
