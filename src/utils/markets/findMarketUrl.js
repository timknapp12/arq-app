export const findMarketUrl = (market, array) => {
  const result = array.find((item) => item.value === market);
  return result.url;
};
