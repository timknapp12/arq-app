import { calculateUnreadNews } from './calculateUnreadNews';
import { inputOne, totalArray } from './mockNews';

describe('calculate unread news', () => {
  test('2 unread items', () => {
    const output = 2;

    expect(calculateUnreadNews(inputOne)).toBe(output);
  });

  test('15 unread items', () => {
    const output = 15;

    expect(calculateUnreadNews(totalArray)).toBe(output);
  });
});
