export const findTeamOwnerId = (teamName = '', array = []) => {
  if (array) {
    const result = array.find((item) => item.teamName === teamName);
    if (result) {
      return result.teamOwnerAssociateId;
    }
  }
};

export const findAssociateIdInListOfTeams = (associateId, array = []) => {
  if (array) {
    const result = array.find((item) => item.associateId === associateId);
    if (result) {
      return true;
    } else {
      return false;
    }
  }
};

export const findTeamAccessCode = (teamName = '', array = []) => {
  if (array) {
    const result = array.find((item) => item.teamName === teamName);
    if (result) {
      return result.accessCode;
    } else {
      return '';
    }
  }
};
