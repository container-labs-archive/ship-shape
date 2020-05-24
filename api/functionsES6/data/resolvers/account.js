// @flow
import { singleWrapper } from '../firestore';
import { ACCOUNTS_COLLECTION } from './collections';

/**
 * Queries
 */
const getAccount = async (parent, args, { accountId }) => {
  const account = await singleWrapper({
    collection: ACCOUNTS_COLLECTION,
    id: accountId,
  });

  return {
    ...account,
  };
};

export {
  getAccount,
};
