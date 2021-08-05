export const calculateNewProspectNotifications = (array = []) => {
  let count = 0;

  array?.forEach((item) => {
    if (item.isReadByAssociate === false) {
      count += 1;
    }
  });
  return count;
};
