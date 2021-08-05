import { calculateNewProspectNotifications } from './calculateNewProspectNotifications';
import { shortArray, totalArray } from './mockNotifications';

describe('calculate unread news', () => {
  test('3 unread items', () => {
    const output = 3;

    expect(calculateNewProspectNotifications(shortArray)).toBe(output);
  });

  test('6 unread items', () => {
    const output = 6;

    expect(calculateNewProspectNotifications(totalArray)).toBe(output);
  });
});
