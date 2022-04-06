import moment from 'moment';
import getLocalDate from './getLocalDate';

describe('Get Local Date returns day in correct order', () => {
  const utcString = '2021-08-04T21:49:36.361Z';
  test('en returns month before day', () => {
    const language = 'en';
    moment.locale(language);

    const output = '08-04-21';

    expect(getLocalDate(utcString, language)).toBe(output);
  });
  test('cs returns month before day', () => {
    const language = 'cs';
    moment.locale(language);

    const output = '04-08-21';

    expect(getLocalDate(utcString, language)).toBe(output);
  });
  test('de returns month before day', () => {
    const language = 'de';
    moment.locale(language);

    const output = '04-08-21';

    expect(getLocalDate(utcString, language)).toBe(output);
  });
  test('es returns month before day', () => {
    const language = 'es';
    moment.locale(language);

    const output = '04-08-21';

    expect(getLocalDate(utcString, language)).toBe(output);
  });
  test('fr returns month before day', () => {
    const language = 'fr';
    moment.locale(language);

    const output = '04-08-21';

    expect(getLocalDate(utcString, language)).toBe(output);
  });
  test('it returns month before day', () => {
    const language = 'it';
    moment.locale(language);

    const output = '04-08-21';

    expect(getLocalDate(utcString, language)).toBe(output);
  });
  test('ja returns month before day', () => {
    const language = 'ja';
    moment.locale(language);

    const output = '04-08-21';

    expect(getLocalDate(utcString, language)).toBe(output);
  });
  test('no returns month before day', () => {
    const language = 'no';
    moment.locale(language);

    const output = '04-08-21';

    expect(getLocalDate(utcString, language)).toBe(output);
  });
  test('nl returns month before day', () => {
    const language = 'nl';
    moment.locale(language);

    const output = '04-08-21';

    expect(getLocalDate(utcString, language)).toBe(output);
  });
});

describe('get local date showing shortened month', () => {
  const utcString = '2021-07-14T21:49:36.361Z';
  const format = 'MMMM DD';

  test('en shows July 14', () => {
    const language = 'en';
    moment.locale(language);

    const output = 'July 14';
    expect(getLocalDate(utcString, language, format)).toBe(output);
  });
  test('de shows Juli 14', () => {
    const language = 'de';
    moment.locale(language);

    const output = 'Juli 14';
    expect(getLocalDate(utcString, language, format)).toBe(output);
  });
  test('es shows julio 14', () => {
    const language = 'es';
    moment.locale(language);

    const output = 'julio 14';
    expect(getLocalDate(utcString, language, format)).toBe(output);
  });
  test('fr shows juillet 14', () => {
    const language = 'fr';
    moment.locale(language);

    const output = 'juillet 14';
    expect(getLocalDate(utcString, language, format)).toBe(output);
  });
  test('it shows luglio 14', () => {
    const language = 'it';
    moment.locale(language);

    const output = 'luglio 14';
    expect(getLocalDate(utcString, language, format)).toBe(output);
  });
  test('ja shows 7月 14', () => {
    const language = 'ja';
    moment.locale(language);

    const output = '7月 14';
    expect(getLocalDate(utcString, language, format)).toBe(output);
  });
  test('no shows juli 14', () => {
    const language = 'no';
    // moment.js uses 'nb' for Norwegian but react native uses 'no'
    moment.locale(language === 'no' ? 'nb' : language);

    const output = 'juli 14';
    expect(getLocalDate(utcString, language, format)).toBe(output);
  });
  test('nl shows juli 14', () => {
    const language = 'nl';
    moment.locale(language);

    const output = 'juli 14';
    expect(getLocalDate(utcString, language, format)).toBe(output);
  });
});
