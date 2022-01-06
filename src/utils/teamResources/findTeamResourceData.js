export const findTeamOwnerId = (teamName = '', array = []) => {
  if (array) {
    const result = array.find((item) => item?.teamName === teamName);
    if (result) {
      return result.teamOwnerAssociateId;
    }
  }
};

export const findIfUserHasATeam = (associateId, array = []) => {
  if (array) {
    return array.some((item) => item?.teamOwnerAssociateId === associateId);
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

export const findUsersOwnTeamInfo = (associateId, array = []) => {
  if (array) {
    const result = array.find(
      (item) => item?.teamOwnerAssociateId === associateId,
    );
    if (result) {
      return result;
    } else {
      return null;
    }
  }
};

export const findPropInArray = (array = [], folderName = '', prop1, prop2) => {
  if (array) {
    const result = array.find((item) => item[prop1] === folderName);
    if (result) {
      return result[prop2];
    } else {
      return null;
    }
  }
};
