export const findRankObject = (list, value) => {
  return list.find((_, index) => index === value);
};

export const findRankName = (list, value) => {
  const result = list.find((_, index) => index === value);
  return result.name;
};
