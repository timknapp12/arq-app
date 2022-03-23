import capitalizeFirstLetterOfEachWord from './capitalizeFirstLetterOfEachWord';

describe('Capitalize First Letter Of Each Word', () => {
  test('casing for JOHN DOUGLAS', () => {
    const input = 'JOHN DOUGLAS';

    const output = 'John Douglas';
    expect(capitalizeFirstLetterOfEachWord(input)).toBe(output);
  });
  test('casing for bIlLy mAdiSoN', () => {
    const input = 'bIlLy mAdiSoN';

    const output = 'Billy Madison';
    expect(capitalizeFirstLetterOfEachWord(input)).toBe(output);
  });
  test(`casing for bill and ted's adventure`, () => {
    const input = `bill and ted's adventure`;

    const output = `Bill And Ted's Adventure`;
    expect(capitalizeFirstLetterOfEachWord(input)).toBe(output);
  });
});
