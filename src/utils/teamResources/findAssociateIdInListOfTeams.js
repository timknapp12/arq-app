export const findAssociateIdInListOfTeams = (associateId, array) => {
  const result = array.find((item) => item.associateId === associateId);
  if (result) {
    return true;
  } else {
    return false;
  }
};
