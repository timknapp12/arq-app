// source for regex https://regexlib.com/Search.aspx?k=email&c=-1&m=5&ps=20
const pattern = new RegExp(
  /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
);

const validateEmailPattern = (emailAddress) => pattern.test(emailAddress);

export default validateEmailPattern;
