export const findActiveAmbassadors = (array) => {
  if (array) {
    return array.filter(
      (member) => member?.associate?.associateType === 'AMBASSADOR',
    );
  }
};
