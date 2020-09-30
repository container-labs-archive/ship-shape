import {
  refetchOnMount,
  checkPermission,
  requireAdmin,
  queryLoader,
  waitingOnData,
} from '@containerlabs/shared-nodejs-web';
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
