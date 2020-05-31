import compressionMiddleware from 'compression';
import helmetMiddleware from 'helmet';
import morganMiddleware from 'morgan';

import auth from './auth';
import cors from './cors';
import Raven, {
  requestHandler as ravenRequestHandler,
  errorHandler as ravenErrorHandler,
} from './raven';

const compression = compressionMiddleware();
const helmet = helmetMiddleware();
const morgan = morganMiddleware('common');

export {
  auth,
  compression,
  cors,
  helmet,
  morgan,
  Raven,
  ravenRequestHandler,
  ravenErrorHandler,
};
