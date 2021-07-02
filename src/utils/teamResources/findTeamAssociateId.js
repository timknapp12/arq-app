export const findTeamAssociateId = (teamName = '', array = []) => {
  const result = array.find((item) => item.teamName === teamName);
  if (result) {
    return result.associateId;
  }
};

export const findAssociateIdInListOfTeams = (associateId, array = []) => {
  const result = array.find((item) => item.associateId === associateId);
  if (result) {
    return true;
  } else {
    return false;
  }
};

export const findTeamAccessCode = (teamName = '', array = []) => {
  const result = array.find((item) => item.teamName === teamName);
  if (result) {
    return result.accessCode;
  }
};
