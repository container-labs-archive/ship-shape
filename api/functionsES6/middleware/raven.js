import Raven from 'raven';
import Config from '../config';

// Must configure Raven before doing anything else with it
Raven.config(Config.ravenAPIDSN).install();

const requestHandler = Raven.requestHandler();
const errorHandler = Raven.errorHandler();

export default Raven;

export {
  requestHandler,
  errorHandler,
};
