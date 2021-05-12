import { getRootCollection } from './getRootCollection/getRootCollection';
import { marketToLangMap } from './marketToLangMap';

export const getCorporateAssets = (
  db,
  market = 'us',
  language = 'en',
  callback,
  documentID,
) => {
  const rootCollection = getRootCollection(market, language);
  const supportedLang =
    market === 'us' && language === 'es' ? 'es' : marketToLangMap[market];
  const corporateAssets = [];
  db.collection(rootCollection)
    .doc(documentID)
    .collection('assets')
    .orderBy('order', 'asc')
    .get()
    .then(async (querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
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
        corporateAssets.push(resourceWithID);
      });
      callback(corporateAssets);
    });
};
