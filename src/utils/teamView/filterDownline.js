export const findMembersInDownlineOneLevel = (array, type) => {
  if (array) {
    return array.filter((member) => member?.associate?.associateType === type);
  }
};
