export const getRootCollection = (market, language) => {
  let collectionName;
  if (market === 'us') {
    const languageCode = language === 'es' ? 'es' : 'en';
    collectionName = `corporate resources us market ${languageCode} language`;
    return collectionName;
  }
  if (market === 'ca') {
    const languageCode = language === 'fr' ? 'fr' : 'en';
    collectionName = `corporate resources ca market ${languageCode} language`;
    return collectionName;
  }
  return (collectionName = `corporate resources ${market}`);
};
