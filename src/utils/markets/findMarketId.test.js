import { findMarketId } from './findMarketId';
import { markets } from './markets';

describe('find market url', () => {
  test('returns usa id of 88', () => {
    const input = 'us';

    const output = 88;
    expect(findMarketId(input, markets)).toBe(output);
  });
  test('returns mexico id of 56', () => {
    const input = 'mx';

    const output = 56;
    expect(findMarketId(input, markets)).toBe(output);
  });
  test('returns sweden id of 77', () => {
    const input = 'se';

    const output = 77;
    expect(findMarketId(input, markets)).toBe(output);
  });
});
