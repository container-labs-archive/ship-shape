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
import { PACKAGES_COLLECTION } from './collections';

// for migration
// we need to get a list of all users


const getPackages = (parent, {}) => {


    // indexQuery({
    //   collection: PACKAGES_COLLECTION,
    //   index: 'userId',
    // }, 1234)

    return {}
}


const trackPackage = async (parent: any, { input } : { input: any }) => {
  const {
    carrier,
    trackingCode,
  } = input;

  const response = await axios.get('https://api.shipengine.com/v1/tracking?ID=12345', {
    headers: {
      'API-Key': 'TEST_UdhlCCzLEA6sjggCleIDCnOWB6Sy+eVDx58QKKAspq8',
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

  const result = await createWrapper({
    collection: PACKAGES_COLLECTION,
  }, data);

  // write to packages collection

  console.log(result);
  console.log('we be trackin');

  return {
    status: 200,
  };

  // return admin.auth().updateUser(uid, properties)
  // .then(() => ({
  //   key: uid,
  //   status: 200,
  //   message: `updated user ${uid}`,
  // }))
  // .catch(error => ({
  //   status: 500,
  //   message: `fail to update user ${uid}`,
  //   error,
  // }));

}

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
