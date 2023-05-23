import moment from 'moment';

export const getDiffInDays = (dateStart, dateEnd = new Date()) =>
  moment(dateEnd).diff(moment(dateStart), 'days');

export const getLastDayOfNextMonth = (UTCDate) => {
  const newDate = new Date(UTCDate);
  newDate.setHours(0, 0, 0);
  // add 2 months to input
  newDate.setMonth(newDate.getMonth() + 2);
  // set day of month to 0, which will convert it to the last day of prev month
  newDate.setDate(0);
  return newDate;
};
