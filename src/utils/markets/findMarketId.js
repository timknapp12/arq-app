export const findMarketId = (marketCode, array = []) => {
  const result = array.find((item) => item?.countryCode === marketCode);
  if (result) {
    return result.countryId;
  } else {
    return 88;
  }
};

export const findMarketCode = (marketId, array = []) => {
  const result = array.find((item) => item?.countryId === marketId);
  if (result) {
    return result.countryCode;
  } else {
    return 'us';
  }
};
