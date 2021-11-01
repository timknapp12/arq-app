export const findMembersInDownlineOneLevel = (array, firstType, secondType) => {
  return array?.filter(
    (member) =>
      member?.associate?.associateType === firstType ||
      member?.associate?.associateType === secondType,
  );
};
