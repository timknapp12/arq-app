import { getRootCollection } from './getRootCollection/getRootCollection';
import { marketToLangMap } from './marketToLangMap';

// this is to get categories ex: Hemp, Energy, Fitness & Weight Loss
export const getCorporateProductCategories = (
  db,
  market = 'us',
  language = 'en',
  callback,
  navigate,
) => {
  const rootCollection = getRootCollection(market, language);
  const supportedLang =
    market === 'us' && language === 'es' ? 'es' : marketToLangMap[market];

  const productCategories = [];
  db.collection(rootCollection)
    .doc('products')
    .collection('product categories')
    .orderBy('order', 'asc')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const { title, defaultTitle, ...rest } = data;
        // if no "title" field is in the database then the default title will be used
        const backupTitle = title ? title : defaultTitle;
        // if the device language mathces the market language then "backup title" will be used (which should be the translated version)
        // otherwise the default title in English will be used
        const newTitle =
          supportedLang === language ? backupTitle : defaultTitle;
        const resourceWithID = {
          id: doc.id,
          title: newTitle,
          ...rest,
        };
        productCategories.push(resourceWithID);
      });
      callback(productCategories);
      navigate(productCategories[0]);
    });
};

// this is to get a list of products per category ex: Hemp Category -> Q Fuse, Q Rest +
export const getCorporateProducts = (
  db,
  market = 'us',
  language = 'en',
  callback,
  documentID,
) => {
  const rootCollection = getRootCollection(market, language);
  const supportedLang =
    market === 'us' && language === 'es' ? 'es' : marketToLangMap[market];

  const products = [];
  db.collection(rootCollection)
    .doc('products')
    .collection('product categories')
    .doc(documentID)
    .collection('list')
    .orderBy('order', 'asc')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const {
          title,
          defaultTitle,
          description,
          defaultDescription,
          ...rest
        } = data;
        // if no "title" field is in the database then the default title will be used
        const backupTitle = title ? title : defaultTitle;
        // if the device language mathces the market language then "backup title" will be used (which should be the translated version)
        // otherwise the default title in English will be used
        const newTitle =
          supportedLang === language ? backupTitle : defaultTitle;

        const backupDescription = description
          ? description
          : defaultDescription;
        // if the device language mathces the market language then "backup description" will be used (which should be the translated version)
        // otherwise the default description in English will be used
        const newDescription =
          supportedLang === language ? backupDescription : defaultDescription;

        const resourceWithID = {
          id: doc.id,
          title: newTitle,
          description: newDescription,
          ...rest,
        };
        products.push(resourceWithID);
      });
      callback(products);
    });
};

// this is to get the assets associated with each product ex: Q Rest -> video, pdf, podcast
export const getProductAssets = (
  db,
  market = 'us',
  language = 'en',
  callback,
  categoryID,
  productID,
) => {
  const rootCollection = getRootCollection(market, language);
  const supportedLang =
    market === 'us' && language === 'es' ? 'es' : marketToLangMap[market];

  const productAssets = [];
  db.collection(rootCollection)
    .doc('products')
    .collection('product categories')
    .doc(categoryID)
    .collection('list')
    .doc(productID)
    .collection('assets')
    .orderBy('order', 'asc')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const { title, defaultTitle, ...rest } = data;
        // if no "title" field is in the database then the default title will be used
        const backupTitle = title ? title : defaultTitle;
        // if the device language mathces the market language then "backup title" will be used (which should be the translated version)
        // otherwise the default title in English will be used
        const newTitle =
          supportedLang === language ? backupTitle : defaultTitle;
        const resourceWithID = {
          id: doc.id,
          title: newTitle,
          ...rest,
        };
        productAssets.push(resourceWithID);
      });
      callback(productAssets);
    });
};
