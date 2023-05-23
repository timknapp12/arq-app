import { Localized } from '../../translations/Localized';

const placementDayLimit = 7;

export const isWithinPlaceTime = (date) => {
  const today = new Date();
  const oneWeekAgo = new Date(
    today.getTime() - placementDayLimit * 24 * 60 * 60 * 1000,
  );
  return new Date(date).getTime() >= oneWeekAgo.getTime();
};

export const getAssociatesEligibleForPlacement = (associateData) => {
  if (
    !associateData ||
    !associateData.enrollmentChildTreeNodes ||
    !associateData.childTreeNodes
  ) {
    return [];
  }
  const intersection = associateData.enrollmentChildTreeNodes.filter((obj1) =>
    associateData.childTreeNodes.some(
      (obj2) => obj2.associate.associateId === obj1.associate.associateId,
    ),
  );

  const ambassadorsOnly = intersection.filter((obj1) => {
    return obj1.associate.associateType.toLowerCase() === 'ambassador';
  });

  const recentEnough = ambassadorsOnly.filter((obj1) => {
    return isWithinPlaceTime(obj1.associate.dateSignedUp);
  });
  return recentEnough;
};

export const findMembersInDownlineOneLevel = (array, firstType, secondType) => {
  return array?.filter(
    (member) =>
      member?.associate?.associateType === firstType ||
      member?.associate?.associateType === secondType,
  );
};

const associateStatusMap = {
  SUSPENDED: Localized('Suspended'),
  TERMINATED: Localized('Terminated'),
  FRAUDULENT_BEHAVIOR: Localized('Fraudulent Behavior'),
  HOLD_ID_VERIFICATION: Localized('Hold ID Verification'),
  DOCU_SIGN_HOLD: Localized('DocuSign Hold'),
  CHARGEBACK: Localized('Chargeback'),
  INACTIVE_AMBASSADOR: Localized('Inactive Ambassador'),
};

// there are 5 possible colors and 7 possible labels that this function needs to define
export const filterMemberByStatusAndType = (member, memberTypeColorMap) => {
  const { associateType, associateStatus } = member?.associate;
  let label;
  let color;
  if (associateType === 'AMBASSADOR' && associateStatus === 'ACTIVE') {
    label = `${member?.rank?.rankName} / ${member?.customerSalesRank?.rankName}`;
    color = memberTypeColorMap.activeAmbassador;
    return [label, color];
  }
  if (associateType === 'PREFERRED' && associateStatus === 'ACTIVE') {
    label = Localized('Preferred Customer');
    color = memberTypeColorMap.activePreferred;
    return [label, color];
  }
  if (associateType === 'RETAIL' && associateStatus === 'ACTIVE') {
    label = Localized('Retail');
    color = memberTypeColorMap.activeRetail;
    return [label, color];
  }
  if (
    associateStatus === 'TERMINATED' ||
    associateStatus === 'FRAUDULENT_BEHAVIOR' ||
    associateStatus === 'CHARGEBACK'
  ) {
    label = associateStatusMap[associateStatus];
    color = memberTypeColorMap.terminated;
    return [label, color];
  }
  if (
    associateStatus === 'SUSPENDED' ||
    associateStatus === 'HOLD_ID_VERIFICATION' ||
    associateStatus === 'DOCU_SIGN_HOLD' ||
    associateStatus === 'INACTIVE_AMBASSADOR'
  ) {
    label = associateStatusMap[associateStatus];
    color = memberTypeColorMap.warning;
    return [label, color];
  } else {
    label = 'Not Active';
    color = memberTypeColorMap.warning;
    return [label, color];
  }
};

export const putSelectedMemberAtTopOfList = (array, id) => {
  const selectedMember = array.find(
    (item) => item.associate.associateId === id,
  );
  if (!selectedMember) {
    return array;
  }
  const filteredList = array.filter(
    (item) => item.associate.associateId !== id,
  );
  filteredList.unshift(selectedMember);

  return filteredList;
};
