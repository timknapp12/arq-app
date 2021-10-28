export const findMembersInDownlineOneLevel = (array, firstType, secondType) => {
  if (array) {
    return array.filter(
      (member) =>
        member?.associate?.associateType === firstType ||
        member?.associate?.associateType === secondType,
    );
  }
};
