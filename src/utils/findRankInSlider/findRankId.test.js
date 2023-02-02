import { findRankId } from '.';

describe('find rank in slider', () => {
  test('"pro" returns id of 4', () => {
    jest.useFakeTimers();

    const input = 'pro';
    const output = 4;

    expect(findRankId(mocklist, input)).toBe(output);
  });
  test('"crown-diamond" returns id of 18', () => {
    jest.useFakeTimers();

    const input = 'crown-diamond';
    const output = 18;

    expect(findRankId(mocklist, input)).toBe(output);
  });
  test('"crown-diamond" does NOT return id of 1', () => {
    jest.useFakeTimers();

    const input = 'crown-diamond';
    const output = 1;

    expect(findRankId(mocklist, input)).not.toBe(output);
  });
});

const mocklist = [
  { rankName: 'ambassador', rankId: 1 },
  { rankName: 'builder', rankId: 3 },
  { rankName: 'pro', rankId: 4 },
  { rankName: 'exec', rankId: 5 },
  { rankName: 'elite', rankId: 6 },
  { rankName: 'bronze', rankId: 7 },
  { rankName: 'silver', rankId: 8 },
  { rankName: 'gold', rankId: 9 },
  { rankName: 'platinum', rankId: 10 },
  { rankName: 'ruby', rankId: 11 },
  { rankName: 'emerald', rankId: 12 },
  { rankName: 'diamond', rankId: 13 },
  { rankName: 'blue-diamond', rankId: 14 },
  { rankName: 'black-diamond', rankId: 15 },
  { rankName: 'royal-diamond', rankId: 16 },
  { rankName: 'presidential-diamond', rankId: 17 },
  { rankName: 'crown-diamond', rankId: 18 },
];
