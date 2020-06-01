import {
  refetchOnMount,
  checkPermission,
  requireAdmin,
  queryLoader,
  waitingOnData,
} from '@containerlabs/react-apollo-shared';
import pageResults from './pageResults';
import withHeader from './withHeader';
import withFilters from './withFilters';
import Loadable from './Loadable';
import Loader from './Loader';
import authenticated from './authenticated';

export {
  authenticated,
  refetchOnMount,
  checkPermission,
  requireAdmin,
  queryLoader,
  waitingOnData,

  pageResults,
  withFilters,
  withHeader,

  Loadable,
  Loader,
};
