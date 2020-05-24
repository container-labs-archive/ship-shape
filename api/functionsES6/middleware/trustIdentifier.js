// @flow

import { singleWrapper } from '../data/firestore';
import { USER_SETTINGS_COLLECTION } from '../data/resolvers/collections';

/**
 * queries firebase and uses the user id to get their user id record then the trust id from that
 * and adds it to request parameters
 */
const trustIdentifier = (req, res, next) => {
  if (req.currentUser === undefined) {
    return next();
  }
  const userId = req.currentUser.uid;

  return singleWrapper({
    collection: USER_SETTINGS_COLLECTION,
    id: userId,
  }).then((model) => {
    const { accountId } = model;
    req.currentUser.accountId = accountId;
  }).finally(() => next());
};

export default trustIdentifier;
