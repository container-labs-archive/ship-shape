/* eslint-disable camelcase */

// only add when they actually load...
// require('@google-cloud/trace-agent').start();
// require('@google-cloud/profiler').start();
/**
 * This file is to use the graphql api as a firebase function
 * NOTE: subscriptions do not work this way
 * THIS HAS TO BE A REQUIRE AT LEAST AT V0.8.1
 */
// import app from './server';
import axios from 'axios';
import { firestore } from './firebase';
import Config from './config';

const throttle = require('promise-ratelimit')(2000);
const functions = require('firebase-functions');


const COLLECTION = 'packages';
const PUBSUB_TOPIC = 'butler';

const butler = functions.pubsub.topic(PUBSUB_TOPIC).onPublish(() => {
  // query for all active trackings
  const ref = firestore.collection(COLLECTION);

  const query = ref.where('isActive', '==', true);

  return query.get().then((doc) => {
    const elements = [];
    doc.docs.forEach((element) => {
      elements.push({
        // key: element.id,
        ...element.data(),
      });
    });
    return elements;
  }).then((elements) => {
    console.log('METRIC_num_packages ', elements.length);
    // https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/
    return elements.reduce(async (previousPromise, element) => {
      const {
        carrier,
        tracking_code,
      } = element;

      await previousPromise;

      console.log('METRIC_ship_api_request');
      const response = await axios.get('https://api.shipengine.com/v1/tracking', {
        headers: {
          'API-Key': Config.shipEngineAPIKey,
        },
        params: {
          carrier_code: carrier,
          tracking_number: tracking_code,
        },
      })
        .catch((error) => {
          console.error(error);
          console.error('METRIC_ship_api_request_error');
        })
        .finally(() => {
          console.log('METRIC_ship_api_request_finally');
        });


      const {
        data,
      } = response;
      const {
        status_code,
      } = data;

      const record = {
        ...element,
        lastUpdated: Date.now(),
        ship_engine: {
          ...data,
        },
      };

      console.log('tracking code', status_code);
      // stop checking for updates once it's delivered
      if (status_code === 'DE') {
        console.log('marking delivered package as no longer active');
        record.isActive = false;
      }


      // console.log('record', record);
      const updateRef = firestore.collection(COLLECTION).doc(element.key);

      // TODO: error checking
      await updateRef.update(record);

      return throttle();
    }, Promise.resolve());

    // https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/
    // return Promise.all(promises);
  });
});

export {
  butler,
};
