export const getCorporateResources = (
  db,
  market = 'us',
  language = 'english',
  callback,
) => {
  const corporateResources = [];
  db.collection(`corporate resources ${market} market ${language} language`)
    .orderBy('order', 'asc')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const resourceWithID = { id: doc.id, ...doc.data() };
        corporateResources.push(resourceWithID);
      });
      callback(corporateResources);
    });
};
