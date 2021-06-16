export const encodeEmail = (email) => {
  const firstIndex = email.indexOf('@');
  const secondIndex = email.indexOf('.', email.length - 4);
  const emailArray = email.split('');
  return emailArray
    .map((letter, index) => {
      if (
        index === 0 ||
        index === firstIndex - 1 ||
        index === firstIndex ||
        index >= secondIndex
      ) {
        return letter;
      } else {
        return '*';
      }
    })
    .join('');
};

export const encodePhone = (phone) => {
  const phoneIndex = phone.length - 2;
  const phoneArray = phone.split('');
  return phoneArray
    .map((digit, index) => {
      if (index === 0 || index >= phoneIndex) {
        return digit;
      } else {
        return '*';
      }
    })
    .join('');
};
