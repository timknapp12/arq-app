import moment from 'moment';
import 'moment/locale/cs';
import 'moment/locale/de';
import 'moment/locale/es';
import 'moment/locale/fr';
import 'moment/locale/it';
import 'moment/locale/ja';
import 'moment/locale/nl';
import 'moment/locale/nb';

const getLocalDate = (
  utcString,
  language,
  // set default param with day first for all languages besides 'en'
  format = language === 'en' ? 'MM-DD-YY' : 'DD-MM-YY',
) => {
  const date = moment(utcString);
  // moment.js uses 'nb' for Norwegian but react native uses 'no'
  const formattedLanguage = language === 'no' ? 'nb' : language;
  moment.locale(formattedLanguage);
  return date.format(format);
};

export default getLocalDate;
