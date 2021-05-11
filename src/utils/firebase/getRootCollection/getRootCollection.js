export const getRootCollection = (market, language) => {
  let collectionName;
  console.log(`market`, market);
  if (market === 'us') {
    const languageCode = language === 'es' ? 'es' : 'en';
    collectionName = `corporate resources us market ${languageCode} language`;
    return collectionName;
  }
  return (collectionName = `corporate resources ${market}`);
};
