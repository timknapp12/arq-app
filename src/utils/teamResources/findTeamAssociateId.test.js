import { findTeamAssociateId } from './findTeamAssociateId';

const testArray = [
  {
    teamName: 'Test',
    associateId: 123,
  },
  {
    teamName: 'Test 2',
    associateId: 321,
  },
  {
    teamName: 'Test 3',
    associateId: 989,
  },
];
describe('find associate id by team name', () => {
  test('team name "Test" returns id: 123', () => {
    const input = 'Test';
    const output = 123;

    expect(findTeamAssociateId(input, testArray)).toBe(output);
  });
  test('team name "Test 2" returns id: 321', () => {
    const input = 'Test 2';
    const output = 321;

    expect(findTeamAssociateId(input, testArray)).toBe(output);
  });
  test('team name "Test 3" returns id: 989', () => {
    const input = 'Test 3';
    const output = 989;

    expect(findTeamAssociateId(input, testArray)).toBe(output);
  });
});
