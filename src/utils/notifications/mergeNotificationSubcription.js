export const mergeNotificationSubcription = (array = [], newItem) => {
  const result = array.find((item) => item?.viewId === newItem?.viewId);
  if (result) {
    return array;
  } else {
    const newArray = array.slice();
    newArray.unshift(newItem);
    return newArray;
  }
};
