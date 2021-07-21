export const findMarketId = (marketCode, array) => {
  const result = array.find((item) => item?.countryCode === marketCode);
  return result.countryId;
};
