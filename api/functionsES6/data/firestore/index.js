// @flow
import { firestore } from '../../firebase';
import type {
  QuerySnapshot,
  WriteResult,
} from '../../../flow-typed/npm/firebase_v5.x.x';

type PathObject = {
  collection: string,
  id?: string,
  index?: string,
};

async function singleWrapper(pathObject: PathObject) {
  console.log('fireWrapper:singleWrapper', pathObject);
  const {
    collection,
    id,
  } = pathObject;
  console.log('id', id, 'x');
  const ref = firestore.collection(collection).doc(id);

  // TODO: error checking
  return ref.get().then((doc) => {
    return {
      // key: doc.id,
      ...doc.data(),
    };
  });
}

async function indexQuery(pathObject: PathObject, value: string) {
  console.log('fireWrapper:indexQuery', pathObject);
  const {
    collection,
    index,
  } = pathObject;

  const ref = firestore.collection(collection);
  const query = ref.where(index, '==', value);

  return query.get().then((doc) => {
    const elements = [];
    doc.docs.forEach((element) => {
      elements.push({
        // key: element.id,
        ...element.data(),
      });
    });
    return elements;
  });
}

async function multiIndexQuery(pathObject: PathObject) {
  console.log('fireWrapper:multiIndexQuery', pathObject);
  const {
    collection,
    indexs,
    orderBys,
  } = pathObject;
  const ref = firestore.collection(collection);
  let query = ref.where(indexs[0].index, '==', indexs[0].value);
  for (let i = 1; i < indexs.length; i += 1) {
    query = query.where(indexs[i].index, '==', indexs[i].value);
  }

  if (orderBys) {
    for (let i = 0; i < orderBys.length; i += 1) {
      const orderByData = orderBys[i];
      if (orderByData.direction) {
        query = query.orderBy(orderByData.by, orderByData.direction);
      } else {
        query = query.orderBy(orderByData.by);
      }
    }
  }

  return query.get().then((doc) => {
    const elements = [];
    doc.docs.forEach((element) => {
      elements.push({
        // key: element.id,
        ...element.data(),
      });
    });
    return elements;
  });
}

async function listWrapper(pathObject: PathObject) {
  const {
    collection,
  } = pathObject;

  return firestore.collection(collection).get().then((docs: QuerySnapshot) => {
    const models = [];
    docs.docs.forEach((doc) => {
      models.push({
        // key: doc.id(),
        ...doc.data(),
      });
    });
    return models;
  });
}


async function createWrapper(pathObject: PathObject, data: Object) {
  console.log('fireWrapper:createWrapper', pathObject);
  const {
    collection,
    id,
  } = pathObject;

  let ref;
  // this is when we want the id to be specific
  // usually this is a hack around a missing key to index on in the object
  // such as userId for the user-settings collection
  if (id) {
    ref = firestore.collection(collection).doc(id);
    return ref.set({ ...data, key: id }).then((doc) => {
      return {
        key: id,
      };
    });
  }

  const docRef = firestore.collection(collection).doc();

  return docRef.set({ ...data, key: docRef.id }).then(() => {
    return {
      key: docRef.id,
    };
  });
}

async function updateWrapper(pathObject: PathObject, data: Object) {
  console.log('fireWrapper:updateWrapper', pathObject);
  console.log('data', data);
  const {
    collection,
    id,
  } = pathObject;

  const ref = firestore.collection(collection).doc(id);

  // TODO: error checking
  // TODO: merge in status field as middleware?
  return ref.update(data).then(() => {
    // console.log(doc);
    return {
      key: id,
    };
  });
}

async function deleteWrapper(pathObject: PathObject) {
  console.log('fireWrapper:deleteWrapper', pathObject);
  const {
    collection,
    id,
  } = pathObject;
  const ref = firestore.collection(collection).doc(id);

  return ref.delete();
}

// nested updates
// var initialData = {
//     name: 'Frank',
//     age: 12,
//     favorites: {
//       food: 'Pizza',
//       color: 'Blue',
//       subject: 'recess'
//     }
//   };

//   // ...
//   var updateNested = db.collection('users').doc('Frank').update({
//     age: 13,
//     'favorites.color': 'Red'
//   });


export {
  createWrapper,
  singleWrapper,
  listWrapper,
  indexQuery,
  multiIndexQuery,
  updateWrapper,
  deleteWrapper,
};
