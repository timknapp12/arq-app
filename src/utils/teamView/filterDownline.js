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
  if (associateType === 'AMBASSADOR' && associateStatus === 'ACTIVE') {
    label = member?.rank?.rankName;
    color = memberTypeColorMap.activeAmbassador;
  }
  if (associateType === 'PREFERRED' && associateStatus === 'ACTIVE') {
    label = Localized('Preferred Customer');
    color = memberTypeColorMap.activePreferred;
  }
  if (associateType === 'RETAIL' && associateStatus === 'ACTIVE') {
    label = Localized('Retail');
    color = memberTypeColorMap.activeRetail;
  }
  if (
    associateStatus === 'TERMINATED' ||
    associateStatus === 'FRAUDULENT_BEHAVIOR' ||
    associateStatus === 'CHARGEBACK'
  ) {
    label = associateStatusMap[associateStatus];
    color = memberTypeColorMap.terminated;
  }
  if (
    associateStatus === 'SUSPENDED' ||
    associateStatus === 'HOLD_ID_VERIFICATION' ||
    associateStatus === 'DOCU_SIGN_HOLD'
  ) {
    label = associateStatusMap[associateStatus];
    color = memberTypeColorMap.warning;
  }
  return [label, color];
};
