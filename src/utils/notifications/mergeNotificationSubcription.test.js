import { mergeNotificationSubcription } from './mergeNotificationSubcription';
import { shortArray, totalArray } from './mockNotifications';

describe('mergeNotificationSubcription', () => {
  test('adds new item to front of array', () => {
    const input = {
      viewId: 131,
      isSaved: false,
      isReadByAssociate: false,
      dateViewUtc: '2021-08-04T19:48:32.585Z',
      prospect: {
        firstName: 'John',
        lastName: 'Douglas',
        prospectId: 'a8c0577a-9dca-4e74-ac10-87a142b7d143',
      },
      sentLinks: {
        displayName: 'John Douglas',
        sentLinkId: '1cde5580-6a13-4184-ba5b-58c2f69acfc0',
      },
    };

    const output = [
      {
        viewId: 131,
        isSaved: false,
        isReadByAssociate: false,
        dateViewUtc: '2021-08-04T19:48:32.585Z',
        prospect: {
          firstName: 'John',
          lastName: 'Douglas',
          prospectId: 'a8c0577a-9dca-4e74-ac10-87a142b7d143',
        },
        sentLinks: {
          displayName: 'John Douglas',
          sentLinkId: '1cde5580-6a13-4184-ba5b-58c2f69acfc0',
        },
      },
      {
        viewId: 31,
        isSaved: false,
        isReadByAssociate: false,
        dateViewUtc: '2021-08-04T19:48:32.585Z',
        prospect: {
          firstName: 'John',
          lastName: 'Douglas',
          prospectId: 'a8c0577a-9dca-4e74-ac10-87a142b7d143',
        },
        sentLinks: {
          displayName: 'John Douglas',
          sentLinkId: '1cde5580-6a13-4184-ba5b-58c2f69acfc0',
        },
      },
      {
        viewId: 30,
        isSaved: false,
        isReadByAssociate: false,
        dateViewUtc: '2021-08-04T19:46:44.965Z',
        prospect: {
          firstName: 'Lewis',
          lastName: 'Bass',
          prospectId: '4200cf70-3e5e-4ae1-8178-e912d6be3cf2',
        },
        sentLinks: {
          displayName: 'Lewis Bass',
          sentLinkId: '9f485307-c1b6-4e34-ac94-94dc276a9d32',
        },
      },
      {
        viewId: 29,
        isSaved: false,
        isReadByAssociate: false,
        dateViewUtc: '2021-08-04T19:46:31.601Z',
        prospect: {
          firstName: 'Lewis',
          lastName: 'Bass',
          prospectId: '4200cf70-3e5e-4ae1-8178-e912d6be3cf2',
        },
        sentLinks: {
          displayName: 'Lewis Bass',
          sentLinkId: '9f485307-c1b6-4e34-ac94-94dc276a9d32',
        },
      },
    ];

    expect(mergeNotificationSubcription(shortArray, input)).toStrictEqual(
      output,
    );
  });
  test('does NOT add item with same id to the array', () => {
    const input = {
      viewId: 31,
      isSaved: false,
      isReadByAssociate: false,
      dateViewUtc: '2021-08-04T19:48:32.585Z',
      prospect: {
        firstName: 'John',
        lastName: 'Douglas',
        prospectId: 'a8c0577a-9dca-4e74-ac10-87a142b7d143',
      },
      sentLinks: {
        displayName: 'John Douglas',
        sentLinkId: '1cde5580-6a13-4184-ba5b-58c2f69acfc0',
      },
    };

    expect(mergeNotificationSubcription(totalArray, input)).toStrictEqual(
      totalArray,
    );
  });
});
