import { checkForPinnedNotifications } from './checkForPinnedNotifications';
import { shortArray, totalArray } from './mockNotifications';

describe('calculate unread news', () => {
  test('returns false', () => {
    const output = false;

    expect(checkForPinnedNotifications(shortArray)).toBe(output);
  });

  test('returns true', () => {
    const output = true;

    expect(checkForPinnedNotifications(totalArray)).toBe(output);
  });
});
