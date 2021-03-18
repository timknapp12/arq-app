import { findRankObject } from '.';

describe('find rank in slider', () => {
  test('returns "pro" object item with value of 2', () => {
    const input = 2;
    const output = { name: 'pro' };

    expect(findRankObject(mocklist, input)).toStrictEqual(output);
  });
  test('returns "crown-diamond" object item with value of 16', () => {
    const input = 16;
    const output = { name: 'crown-diamond' };

    expect(findRankObject(mocklist, input)).toStrictEqual(output);
  });
  test('does NOT return "crown-diamond" object item with value of 1', () => {
    const input = 1;
    const output = { name: 'crown-diamond' };

    expect(findRankObject(mocklist, input)).not.toStrictEqual(output);
  });
});

const mocklist = [
  { name: 'distributor' },
  { name: 'builder' },
  { name: 'pro' },
  { name: 'exec' },
  { name: 'elite' },
  { name: 'bronze' },
  { name: 'silver' },
  { name: 'gold' },
  { name: 'platinum' },
  { name: 'ruby' },
  { name: 'emerald' },
  { name: 'diamond' },
  { name: 'blue-diamond' },
  { name: 'black-diamond' },
  { name: 'royal-diamond' },
  { name: 'presidential-diamond' },
  { name: 'crown-diamond' },
];
