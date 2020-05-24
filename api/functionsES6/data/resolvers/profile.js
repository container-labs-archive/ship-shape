// @flow

import _sortBy from 'lodash/sortBy';
import {
  indexQuery,
  listWrapper,
  singleWrapper,
  createWrapper,
  updateWrapper,
  deleteWrapper,
} from '../firestore';
import { PROFILES_COLLECTION } from './collections';

const factorFields = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

function sanitizeProfile(profile) {
  const sanitized = {
    ...profile,
    // any nested fields would need to be joined separately
    // the above doesn't do a deep copy
  };

  factorFields.forEach((n) => {
    const dbFactor = profile[`factor_${n}_level`];
    const sanitizedFactor = dbFactor.trim();

    if (dbFactor !== sanitizedFactor) {
      console.log('mismatch for', profile);
    }
    sanitized[`factor_${n}_level`] = sanitizedFactor;
  });

  return sanitized;
}

/**
 * Queries
 */
const getProfiles = (parent, { limit, page }) => {
  // listWrapper('profiles-ports', { sortBy: 'title', limit, page });

  // TODO: sortyBy, limit, page, etc....
  return listWrapper({
    collection: PROFILES_COLLECTION,
  }).then((profiles) => {
    return profiles.map(profile => sanitizeProfile(profile));
  });
};

const getProfile = (parent, { key }) => {
  return singleWrapper({
    collection: PROFILES_COLLECTION,
    id: key,
  }).then(profile => sanitizeProfile(profile));
};

const getNotArchivedProfiles = async () => {
  // listWrapper('profiles-ports').then((models) => {
  //   const result = models.filter(({ archived }) => !archived);
  //   return _sortBy(result, ['title']);
  // });

  const profiles = await indexQuery({
    collection: PROFILES_COLLECTION,
    index: 'isArchieved',
  }, false);

  return _sortBy(profiles, ['title']);
};

/**
 * Mutations
 */
const createProfile = (parent, { input }) => {
  return createWrapper({
    collection: PROFILES_COLLECTION,
  }, input);
};

const updateProfile = (parent, { input }) => {
  return updateWrapper({
    collection: PROFILES_COLLECTION,
    id: input.key,
  }, input);
};

const deleteProfile = (parent, { key }) => {
  return deleteWrapper({
    collection: PROFILES_COLLECTION,
    id: key,
  });
};

export {
  getProfiles,
  getProfile,
  getNotArchivedProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
};
