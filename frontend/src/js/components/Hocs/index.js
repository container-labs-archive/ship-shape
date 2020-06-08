import {
  refetchOnMount,
  checkPermission,
  requireAdmin,
  queryLoader,
  waitingOnData,
} from '@containerlabs/react-apollo-shared';
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

  Loadable,
  Loader,
};
