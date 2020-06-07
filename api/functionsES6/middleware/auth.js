// @flow

import httpError from 'http-errors';
import { admin } from '../firebase/index';
import Config from '../config';

const base64encodedBasicAuth = Buffer.from('admin:_phase1_').toString('base64');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(httpError(401, "Missing 'Authorization' header."));
  }

  const [authType, token] = authHeader.split(' ');

  if (authType.indexOf('Bearer') === 0) {
    return admin.auth().verifyIdToken(token)
      .then((decodedToken) => {
        console.log(`authorizing ${decodedToken.email}`);
        req.currentUser = decodedToken;
        return next();
      }).catch((error) => {
        console.error(error);
        if (error.errorInfo && error.errorInfo.code === 'auth/argument-error') {
          return next(httpError(401, 'Bearer token expired'));
        }

        return next(httpError(401, 'Bearer token is not valid for this project'));
      });
  } if (authType.indexOf('Basic') === 0) {
    // console.log('basic auth')
    if (token === base64encodedBasicAuth) {
      req.currentUser = {
        email: 'basic',
        uid: Config.basicAuthUserId,
      };
      return next();
    }
    return next(httpError(401, 'Basic token is not valid for this project'));
  }
  return next(httpError(401, 'Need to pass in a token'));
};

export default authenticate;
