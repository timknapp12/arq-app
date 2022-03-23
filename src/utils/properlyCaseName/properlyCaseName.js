import capitalizeFirstLetterOfEachWord from './capitalizeFirstLetterOfEachWord';

const properlyCaseName = (firstName = '', lastName = '') =>
  capitalizeFirstLetterOfEachWord(`${firstName} ${lastName}`).trim();

export default properlyCaseName;
