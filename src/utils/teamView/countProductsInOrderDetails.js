export const countProductsInOrderDetails = (array) => {
  let count = 0;
  array?.forEach((order) => {
    return (count += order?.quantity);
  });
  return count;
};
