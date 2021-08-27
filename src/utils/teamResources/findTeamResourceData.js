export const findTeamOwnerId = (teamName = '', array = []) => {
  if (array) {
    const result = array.find((item) => item?.teamName === teamName);
    if (result) {
      return result.teamOwnerAssociateId;
    }
  }
};

export const findAssociateIdInListOfTeams = (associateId, array = []) => {
  if (array) {
    return array.some((item) => item?.associateId === associateId);
  }
};

export const findTeamAccessCode = (teamName = '', array = []) => {
  if (array) {
    const result = array.find((item) => item?.teamName === teamName);
    if (result) {
      return result.accessCode;
    } else {
      return '';
    }
  }
};
