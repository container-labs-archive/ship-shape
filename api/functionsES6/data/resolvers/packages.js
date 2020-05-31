// @flow
import axios from 'axios';
import {
  singleWrapper,
  listWrapper,
  createWrapper,
  updateWrapper,
  indexQuery,
} from '../firestore';
import {
  admin,
} from '../../firebase/index';
import { sendWelcomeEmail } from '../../mailers/welcomeEmail';
import Config from '../../config';
import { PACKAGES_COLLECTION } from './collections';

type RequestContext = {
  uid: string
}

// wish we could get flowtypes from graphql schemas
type Package = {
  carrier: String
}

type PackageCreateInput = {
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

  console.log('packages')
  console.log(packages)
  console.log('userId', uid)

  return packages;
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
    .catch(error => ({
      status: 500,
      message: error,
      error,
    }));
};

const updatePackage = (parent, {}) => {
  // simply hits the shipengine api again
  // use object ID or pair of carrier and tracking code to get the object
  // if carrier and tracking code are used we don't need to query the db?
}

/**
 * Nested Object
 */

export {
  getPackages,
  trackPackage,
  updatePackage,
};
