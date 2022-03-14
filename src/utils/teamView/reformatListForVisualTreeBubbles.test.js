import reformatListForVisualTreeBubbles from './reformatListForVisualTreeBubbles';

describe('splice One Item FromList', () => {
  test('splits last item', () => {
    const input = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];

    const output = [[{ id: 0 }, { id: 1 }, { id: 2 }], { id: 3 }];
    expect(reformatListForVisualTreeBubbles(input)).toStrictEqual(output);
  });
  test('leaves list as it was and returns null as second item', () => {
    const input = [{ id: 0 }, { id: 1 }, { id: 2 }];

    const output = [[{ id: 0 }, { id: 1 }, { id: 2 }], null];
    expect(reformatListForVisualTreeBubbles(input)).toStrictEqual(output);
  });
  test('returns empty array with null as second item', () => {
    const input = [];

    const output = [[], null];
    expect(reformatListForVisualTreeBubbles(input)).toStrictEqual(output);
  });
  test('a list of 1 returns empty array and one popped item', () => {
    const input = [{ id: 0 }];

    const output = [[], { id: 0 }];
    expect(reformatListForVisualTreeBubbles(input)).toStrictEqual(output);
  });
});
