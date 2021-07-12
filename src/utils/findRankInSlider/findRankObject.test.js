import { findRankObject } from '.';

describe('find rank in slider', () => {
  test('returns "pro" object item with value of 2', () => {
    const input = 2;
    const output = { rankName: 'pro' };

    expect(findRankObject(mocklist, input)).toStrictEqual(output);
  });
  test('returns "crown-diamond" object item with value of 16', () => {
    const input = 16;
    const output = { rankName: 'crown-diamond' };

    expect(findRankObject(mocklist, input)).toStrictEqual(output);
  });
  test('does NOT return "crown-diamond" object item with value of 1', () => {
    const input = 1;
    const output = { rankName: 'crown-diamond' };

    expect(findRankObject(mocklist, input)).not.toStrictEqual(output);
  });
});

const mocklist = [
  { rankName: 'distributor' },
  { rankName: 'builder' },
  { rankName: 'pro' },
  { rankName: 'exec' },
  { rankName: 'elite' },
  { rankName: 'bronze' },
  { rankName: 'silver' },
  { rankName: 'gold' },
  { rankName: 'platinum' },
  { rankName: 'ruby' },
  { rankName: 'emerald' },
  { rankName: 'diamond' },
  { rankName: 'blue-diamond' },
  { rankName: 'black-diamond' },
  { rankName: 'royal-diamond' },
  { rankName: 'presidential-diamond' },
  { rankName: 'crown-diamond' },
];
