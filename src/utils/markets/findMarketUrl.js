export const findMarketUrl = (marketCode, array) => {
  const result = array.find((item) => item.countryCode === marketCode);
  return result.pictureUrl;
};
