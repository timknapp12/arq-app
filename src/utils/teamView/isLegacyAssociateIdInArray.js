const isLegacyAssociateIdInArray = (array, id) => {
  return (
    array?.some((item) => item?.associate?.legacyAssociateId === id) ?? false
  );
};

export default isLegacyAssociateIdInArray;
