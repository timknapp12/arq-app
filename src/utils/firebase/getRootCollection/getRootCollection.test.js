import { getRootCollection } from './getRootCollection';

describe('get root collection', () => {
  test('us market and en language returns resource for us en', () => {
    const market = 'us';
    const language = 'en';

    const output = 'corporate resources us market en language';

    expect(getRootCollection(market, language)).toBe(output);
  });
  test('us market and ES language returns resource for us es', () => {
    const market = 'us';
    const language = 'es';

    const output = 'corporate resources us market es language';

    expect(getRootCollection(market, language)).toBe(output);
  });
  test('mx market returns mx market regardless of language', () => {
    const market = 'mx';
    const language = 'jp';

    const output = 'corporate resources mx';

    expect(getRootCollection(market, language)).toBe(output);
  });
  test('jp market returns jp market regardless of language', () => {
    const market = 'jp';
    const language = 'de';

    const output = 'corporate resources jp';

    expect(getRootCollection(market, language)).toBe(output);
  });
});
