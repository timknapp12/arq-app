export const findRankObject = (list, value) => {
  return list.find((_, index) => index === value);
};

export const findRankName = (list, value) => {
  const result = list.find((_, index) => index === value);
  return result.rankName;
};

export const findRankIndex = (list, name) => {
  const result = list.findIndex((item) => item?.rankName === name);
  return result;
};

export const findRankId = (list, name) => {
  const result = list.find((item) => item.rankName === name);
  return result.rankId;
};
