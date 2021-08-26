export const findMarketId = (marketCode, array) => {
  const result = array.find((item) => item?.countryCode === marketCode);
  return result.countryId;
};

export const findMarketCode = (marketId, array = []) => {
  const result = array.find((item) => item?.countryId === marketId);
  return result.countryCode;
};
