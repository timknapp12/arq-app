// this function provides the width of a bar chart, so we want to cap the result (width) at 100
export const getPercentage = (currentNumber, requiredTotal) => {
  const result = Math.floor((currentNumber / requiredTotal) * 100);
  if (result > 100) {
    return 100;
  } else return result;
};

export const findRequiredValueOfNextRank = (rankId, ranks, fieldType) => {
  // the last rank is Crown Diamond with rankId of 18, so there is no higher rank to get
  const nextRank =
    rankId === 18
      ? ranks[ranks.length - 1]
      : ranks?.find((rank) => rank.rankId > rankId);
  return nextRank[fieldType];
};
