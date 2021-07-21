export const calculateUnreadNews = (array = []) => {
  let count = 0;

  array?.forEach((folder) =>
    folder?.links?.forEach((link) => {
      if (link.isViewedByAssociate === false) {
        count += 1;
      }
    }),
  );
  return count;
};
