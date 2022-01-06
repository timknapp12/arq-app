import {
  getPercentage,
  findRequiredValueOfNextRank,
} from './calculateBasedOnNextRank';
import { ranks } from './mockRanks';

describe('Get Percentage', () => {
  test('1 of 2 returns 50', () => {
    const input1 = 1;
    const input2 = 2;

    const output = 50;
    expect(getPercentage(input1, input2)).toBe(output);
  });
  test('0 of 2 returns 0', () => {
    const input1 = 0;
    const input2 = 2;

    const output = 0;
    expect(getPercentage(input1, input2)).toBe(output);
  });
  test('3 of 2 returns 100', () => {
    const input1 = 3;
    const input2 = 2;

    const output = 100;
    expect(getPercentage(input1, input2)).toBe(output);
  });
});

describe('get next rank requirements', () => {
  test('rank id of 1 returns required PV of 100', () => {
    const lastMonthRankId = 1;
    const fieldType = 'requiredPv';

    const output = 100;

    expect(findRequiredValueOfNextRank(lastMonthRankId, ranks, fieldType)).toBe(
      output,
    );
  });
  test('rank id of 7 returns required PV of 200', () => {
    const lastMonthRankId = 7;
    const fieldType = 'requiredPv';

    const output = 200;

    expect(findRequiredValueOfNextRank(lastMonthRankId, ranks, fieldType)).toBe(
      output,
    );
  });
  test('rank id of 9 returns required QOV of 100,000', () => {
    const lastMonthRankId = 9;
    const fieldType = 'minimumQoV';

    const output = 100000;

    expect(findRequiredValueOfNextRank(lastMonthRankId, ranks, fieldType)).toBe(
      output,
    );
  });
  test('rank id of 9 returns required QOV of 100,000', () => {
    const lastMonthRankId = 9;
    const fieldType = 'minimumQoV';

    const output = 100000;

    expect(findRequiredValueOfNextRank(lastMonthRankId, ranks, fieldType)).toBe(
      output,
    );
  });
  test('rank id of 1 returns required PA of 2', () => {
    const lastMonthRankId = 1;
    const fieldType = 'requiredPa';

    const output = 2;

    expect(findRequiredValueOfNextRank(lastMonthRankId, ranks, fieldType)).toBe(
      output,
    );
  });
  test('rank id of 18 returns required PA of 2', () => {
    const lastMonthRankId = 18;
    const fieldType = 'requiredPa';

    const output = 2;

    expect(findRequiredValueOfNextRank(lastMonthRankId, ranks, fieldType)).toBe(
      output,
    );
  });
  test('rank id of 1 returns rankName of Builder', () => {
    const lastMonthRankId = 1;
    const fieldType = 'rankName';

    const output = 'Builder';

    expect(findRequiredValueOfNextRank(lastMonthRankId, ranks, fieldType)).toBe(
      output,
    );
  });
});
