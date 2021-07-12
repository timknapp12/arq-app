import { findRankName } from '.';

describe('find rank in slider', () => {
  test('returns "pro" item with value of 2', () => {
    jest.useFakeTimers();

    const input = 2;
    const output = 'pro';

    expect(findRankName(mocklist, input)).toBe(output);
  });
  test('returns "crown-diamond" item with value of 16', () => {
    jest.useFakeTimers();

    const input = 16;
    const output = 'crown-diamond';

    expect(findRankName(mocklist, input)).toBe(output);
  });
  test('does NOT return "crown-diamond" item with value of 1', () => {
    jest.useFakeTimers();

    const input = 1;
    const output = 'crown-diamond';

    expect(findRankName(mocklist, input)).not.toBe(output);
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
