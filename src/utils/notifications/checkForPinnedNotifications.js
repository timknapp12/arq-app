export const checkForPinnedNotifications = (array = []) => {
  let count = 0;

  array?.forEach((item) => {
    if (item.isSaved === true) {
      count += 1;
    }
  });
  return count > 0 ? true : false;
};
