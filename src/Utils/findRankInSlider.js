export const findRankInSlider = (list, value) => {
  const result = list.find((_, index) => index === value);
  return result.name;
};
