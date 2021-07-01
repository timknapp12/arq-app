export const findTeamAssociateId = (teamName = '', array = []) => {
  const result = array.find((item) => item.teamName === teamName);
  if (result) {
    return result.associateId;
  }
};
