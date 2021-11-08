import { Localized } from '../../translations/Localized';

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
};

// there are 5 possible colors and 7 possible labels that this function needs to define
export const filterMemberByStatusAndType = (member, memberTypeColorMap) => {
  const { associateType, associateStatus } = member?.associate;
  let label;
  let color;
  // determine the label for the ambassador
  // determine the color indicator for the ambassador
  if (associateType === 'AMBASSADOR') {
    if (associateStatus === 'ACTIVE') {
      label = member?.rank?.rankName;
      color = memberTypeColorMap.activeAmbassador;
    } else {
      label = associateStatusMap[associateStatus];
      color = memberTypeColorMap.warning;
    }
    // determine the label for the preferred
    // determine the color indicator for the preferred
  }
  if (associateType === 'PREFERRED') {
    if (associateStatus === 'ACTIVE') {
      label = Localized('Preferred Customer');
      color = memberTypeColorMap.activePreferred;
    } else {
      label = associateStatusMap[associateStatus];
      color = memberTypeColorMap.warning;
    }
    // determine the label for the retail
    // determine the color indicator for the retail
  }
  if (associateType === 'RETAIL') {
    if (associateStatus === 'ACTIVE') {
      label = Localized('Retail');
      color = memberTypeColorMap.activeRetail;
    } else {
      label = associateStatusMap[associateStatus];
      color = memberTypeColorMap.warning;
    }
    // if the type is terminated, then override the previous values
  }
  if (associateStatus === 'TERMINATED') {
    label = Localized('Terminated');
    color = memberTypeColorMap.terminated;
  }
  return [label, color];
};
