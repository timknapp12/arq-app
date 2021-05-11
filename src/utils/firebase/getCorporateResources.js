import { getRootCollection } from './getRootCollection/getRootCollection';
import { marketToLangMap } from './marketToLangMap';

export const getCorporateResources = (
  db,
  market = 'us',
  language = 'en',
  callback,
) => {
  const rootCollection = getRootCollection(market, language);
  const supportedLang =
    market === 'us' && language === 'es' ? 'es' : marketToLangMap[market];
  const corporateResources = [];
  db.collection(rootCollection)
    .orderBy('order', 'asc')
    .get()
    .then(async (querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
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
        corporateResources.push(resourceWithID);
      });
      callback(corporateResources);
    });
};
