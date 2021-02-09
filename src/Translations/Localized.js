import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance
import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';
// source https://dev.to/vikrantnegi/creating-a-multi-language-app-in-react-native-1joj
// or https://www.instamobile.io/mobile-development/react-native-localization/

const languageCodes = {
  english: 'en',
  spanish: 'es',
  french: 'fr',
  arabic: 'ar',
  japanese: 'ja',
};
// TODO - transform path dynamically - can you use template literals in paths???

//TODO - may have to add Localization.getLocalizationAsync() for Android to reset locale https://docs.expo.io/versions/latest/sdk/localization/
export const translationGetters = {
  es: () => require('./es.json'),
  en: () => require('./en.json'),
  fr: () => require('./fr.json'),
  ar: () => require('./ar.json'),
  ja: () => require('./ja.json'),
};
export const Localized = memoize(
  (key, config) =>
    i18n.t(key, config).includes('missing') ? key : i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

const mapToCode = (languageTag) => {
  //   console.log('languageTag', languageTag);
  for (const property in languageCodes) {
    if (languageTag === languageCodes[property]) {
      return languageCodes[property];
    }
  }
};
export const init = () => {
  let localeLanguageTag = Localization.locale.substring(0, 2);
  //   console.log('localeLanguageTag', localeLanguageTag);
  const filteredTag = mapToCode(localeLanguageTag) || 'en';
  let isRTL = Localization.isRTL;
  Localized.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = {
    [filteredTag]: translationGetters[filteredTag](),
  };
  i18n.locale = localeLanguageTag;
};
