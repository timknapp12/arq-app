import { findRankInSlider } from '../Utils/findRankInSlider';

describe('find rank in slider', () => {
  test('returns "pro" item with value of 2', () => {
    jest.useFakeTimers();

    const input = 2;
    const output = 'pro';

    expect(findRankInSlider(mocklist, input)).toBe(output);
  });
  test('returns "crown-diamond" item with value of 16', () => {
    jest.useFakeTimers();

    const input = 16;
    const output = 'crown-diamond';

    expect(findRankInSlider(mocklist, input)).toBe(output);
  });
  test('does NOT return "crown-diamond" item with value of 1', () => {
    jest.useFakeTimers();

    const input = 1;
    const output = 'crown-diamond';

    expect(findRankInSlider(mocklist, input)).not.toBe(output);
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
