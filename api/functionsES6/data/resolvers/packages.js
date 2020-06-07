// @flow
import axios from 'axios';
import {
  createWrapper,
  updateWrapper,
  indexQuery,
} from '../firestore';
import Config from '../../config';
import { PACKAGES_COLLECTION } from './collections';

type RequestContext = {
  uid: string
}

// wish we could get flowtypes from graphql schemas
type PackageCreateInput = {
  carrier: string,
  tracking_code: string,
}

type PackageUpdateInput = {
  carrier: string,
  tracking_code: string,
}

const getPackages = async (parent, _params, { uid } : RequestContext) => {
  console.log('we be getting packages');

  // TODO: add email verified middleware?
  // TODO: check state of graphql middleware in general, maybe move to diff JS framework

  const packages = await indexQuery({
    collection: PACKAGES_COLLECTION,
    index: 'userId',
  }, uid);

  const data = packages.filter((pack) => !pack.isArchived);

  return data;
};

const trackPackage = async (parent: any, { input } : { input: PackageCreateInput }, { uid } : RequestContext) => {
  const {
    carrier,
    tracking_code: trackingCode,
  } = input;

  // TODO: abstract, blah blah blah
  const response = await axios.get('https://api.shipengine.com/v1/tracking', {
    headers: {
      'API-Key': Config.shipEngineAPIKey,
    },
    params: {
      carrier_code: carrier,
      tracking_number: trackingCode,
    },
  })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      // always executed
    });

  const {
    data,
  } = response;

  const record = {
    userId: uid,
    carrier,
    isActive: true,
    lastUpdated: Date.now(),
    tracking_code: trackingCode,
    ship_engine: data,
  };

  return createWrapper({
    collection: PACKAGES_COLLECTION,
  }, record)
    .then(() => ({
      status: 200,
      message: 'tracking started',
    }))
    .catch((error) => ({
      status: 500,
      message: error,
      error,
    }));
};

const updatePackage = (parent: any, { input } : { input: PackageUpdateInput }) => {
  // simply hits the shipengine api again
  // use object ID or pair of carrier and tracking code to get the object
  // if carrier and tracking code are used we don't need to query the db?
  const data = {
    ...input,
  };

  // if we archive packages before they're done tracking, no need to track anymore!
  if (data.isArchived) {
    data.isActive = false;
  }

  return updateWrapper({
    collection: PACKAGES_COLLECTION,
    id: input.key,
  }, data);
};

/**
 * Nested Object
 */

export {
  getPackages,
  trackPackage,
  updatePackage,
};
