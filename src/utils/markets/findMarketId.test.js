import { findMarketId, findMarketCode } from './findMarketId';
import { markets } from './markets';

describe('find market id', () => {
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

describe('find market 2-digit code', () => {
  test('returns usa 2-digit code from id 88', () => {
    const input = 88;

    const output = 'us';
    expect(findMarketCode(input, markets)).toBe(output);
  });
  test('returns mexico 2-digit code from id 56', () => {
    const input = 56;

    const output = 'mx';
    expect(findMarketCode(input, markets)).toBe(output);
  });
  test('returns sweden 2-digit code from id 77', () => {
    const input = 77;

    const output = 'se';
    expect(findMarketCode(input, markets)).toBe(output);
  });
});
