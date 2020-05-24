// @flow

// TODO: import { BrowserLogger } from '@containerlabs/react-apollo-shared';

const envKey = process.env.NODE_BUILD_ENV || process.env.NODE_ENV;

// TODO: anywhere we want to log in the app, should use this
class BrowserLogger {
  constructor(environment: string) {
    this.environment = environment || envKey;
  }

  log(message) {
    switch (this.environment) {
      case 'test': {
        break;
      } case 'production': {
        break;
      } default: {
        console.log(message); // eslint-disable-line
      }
    }
  }

  error(message: string) {
    switch (this.environment) {
      case 'test': {
        break;
      } case 'production': {
        break;
      } default: {
        console.error(message); // eslint-disable-line
      }
    }
  }

  debug(message: string) {
    switch (this.environment) {
      case 'test': {
        break;
      } case 'production': {
        break;
      } default: {
        console.log(message); // eslint-disable-line
      }
    }
  }
}

export default BrowserLogger;
