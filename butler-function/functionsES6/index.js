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

const throttle = require('promise-ratelimit')(1000);
const functions = require('firebase-functions');


const COLLECTION = 'packages';
const PUBSUB_TOPIC = 'butler';

const butler = functions.pubsub.topic(PUBSUB_TOPIC).onPublish((message, context) => {
  console.log('The function was triggered at ', context.timestamp);
  console.log('The unique ID for the event is', context.eventId);

  console.log(firestore);
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
    const promises = [];

    elements.forEach((element) => {
      const {
        carrier,
        tracking_code,
      } = element;

      const request = axios.get('https://api.shipengine.com/v1/tracking', {
        headers: {
          'API-Key': Config.shipEngineAPIKey,
        },
        params: {
          carrier_code: carrier,
          tracking_number: tracking_code,
        },
      }).then((response) => {
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


        console.log('record', record);
        const updateRef = firestore.collection(COLLECTION).doc(element.key);

        // TODO: error checking
        return updateRef.update(record);
      })
        .catch((error) => {
          // handle error
          console.error(error);
        })
        .finally(() => {
          // always executed
          console.log('done');
        })
        .then(() => {
          return throttle();
        });

      // write to firestore
      promises.push(request);
    });

    // https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/
    return Promise.all(promises);
  });
});

export {
  butler,
};
