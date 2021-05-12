import firebase from 'firebase/app';
import 'firebase/firestore';

// https://stackoverflow.com/questions/49691215/cloud-functions-how-to-copy-firestore-collection-to-a-new-document
const firestore = firebase.firestore();
async function copyCollection(srcCollectionName, destCollectionName) {
  const documents = await firestore
    .collection(srcCollectionName)
    .doc('products')
    .collection('product categories')
    .doc('hemp')
    .collection('list')
    .doc('q rest plus')
    .collection('assets')
    .get();
  let writeBatch = firebase.firestore().batch();
  const destCollection = firestore.collection(destCollectionName);
  let i = 0;
  for (const doc of documents.docs) {
    writeBatch.set(
      destCollection
        .doc('products')
        .collection('product categories')
        .doc('hemp')
        .collection('list')
        .doc('q rest plus')
        .collection('assets')
        .doc(doc.id),
      doc.data(),
    );
    i++;
    if (i > 400) {
      // write batch only allows maximum 500 writes per batch
      i = 0;
      console.log('Intermediate committing of batch operation');
      await writeBatch.commit();
      writeBatch = firebase.firestore().batch();
    }
  }
  if (i > 0) {
    console.log(
      'Firebase batch operation completed. Doing final committing of batch operation.',
    );
    await writeBatch.commit();
  } else {
    console.log('Firebase batch operation completed.');
  }
}
// wrap the function below in useeffect in dashboardscreen.js
copyCollection(
  'corporate resources us market english language',
  'corporate resources us market es language',
)
  .then(() => console.log('copy complete'))
  .catch((error) => console.log('copy failed. ' + error));
