import { getDiffInDays, getLastDayOfNextMonth } from './executiveTimeclock';

describe('getDiffInDays', () => {
  test('return 0 if signUp day is same day', () => {
    const input = '2023-05-02T22:56:47.000Z';
    const newDate = new Date('2023-05-02T17:35:52.606Z');
    const output = 0;

    expect(getDiffInDays(input, newDate)).toBe(output);
  });
  test('return 0 if signUp day is day before', () => {
    const input = '2023-05-01T22:56:47.000Z';
    const newDate = new Date('2023-05-02T17:35:52.606Z');
    const output = 0;

    expect(getDiffInDays(input, newDate)).toBe(output);
  });
  test('return 2 if signUp day is 3 days ago', () => {
    const input = '2023-05-01T22:56:47.000Z';
    const newDate = new Date('2023-05-04T17:35:52.606Z');
    const output = 2;

    expect(getDiffInDays(input, newDate)).toBe(output);
  });
  test('return 4 if signUp day is 5 days ago', () => {
    const input = '2023-05-01T22:56:47.000Z';
    const newDate = new Date('2023-05-06T17:35:52.606Z');
    const output = 4;

    expect(getDiffInDays(input, newDate)).toBe(output);
  });
  test('return 7 if signUp day is 8 days ago', () => {
    const input = '2023-05-01T22:56:47.000Z';
    const newDate = new Date('2023-05-09T17:35:52.606Z');
    const output = 7;

    expect(getDiffInDays(input, newDate)).toBe(output);
  });
});

describe('getLastDayOfNextMonth', () => {
  test('return June 30 for May 2', () => {
    const input = '2023-05-02T22:56:47.000Z';
    const output = new Date('2023-06-30T06:00:00.000Z');

    expect(getLastDayOfNextMonth(input)).toStrictEqual(output);
  });
  test('return June 30 for May 31', () => {
    const input = '2023-05-31T22:56:47.000Z';
    const output = new Date('2023-06-30T06:00:00.000Z');

    expect(getLastDayOfNextMonth(input)).toStrictEqual(output);
  });
  test('return Feb 28 for Jan 14', () => {
    const input = '2023-01-14T22:56:47.000Z';
    const output = new Date('2023-02-28T07:00:00.000Z');

    expect(getLastDayOfNextMonth(input)).toStrictEqual(output);
  });
  test('return Feb 28 for Jan 31', () => {
    const input = '2023-01-31T22:56:47.000Z';
    const output = new Date('2023-02-28T07:00:00.000Z');

    expect(getLastDayOfNextMonth(input)).toStrictEqual(output);
  });
  test('return May 31 for Apr 1', () => {
    const input = '2023-04-01T22:56:47.000Z';
    const output = new Date('2023-05-31T06:00:00.000Z');

    expect(getLastDayOfNextMonth(input)).toStrictEqual(output);
  });
  test('return May 31 for Apr 30', () => {
    const input = '2023-04-30T22:56:47.000Z';
    const output = new Date('2023-05-31T06:00:00.000Z');

    expect(getLastDayOfNextMonth(input)).toStrictEqual(output);
  });
  test('return Jan 31 for Dec 31', () => {
    const input = '2023-12-29T02:56:47.000Z';
    const output = new Date('2024-01-31T07:00:00.000Z');

    expect(getLastDayOfNextMonth(input)).toStrictEqual(output);
  });
});
