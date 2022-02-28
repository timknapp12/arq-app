import stringify from './stringify';

describe('stringify', () => {
  test('int of 123456 returns string of 123,456', () => {
    const input = 123456;

    const output = '123,456';
    expect(stringify(input)).toBe(output);
  });
  test('int of 123456.5 returns string of 123,456', () => {
    const input = 123456.5;

    const output = '123,456';
    expect(stringify(input)).toBe(output);
  });
  test('int of 0 returns string of 0', () => {
    const input = 0;

    const output = '0';
    expect(stringify(input)).toBe(output);
  });
});
