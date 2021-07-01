import { findAssociateIdInListOfTeams } from './findAssociateIdInListOfTeams';

const testArray = [
  {
    accessCode: '123',
    associateId: 211,
    teamAccessId: 3,
    teamName: 'Team Awesome',
  },
  {
    accessCode: '123123',
    associateId: 330,
    teamAccessId: 4,
    teamName: 'Test Team',
  },
  {
    accessCode: '123123',
    associateId: 113,
    teamAccessId: 4,
    teamName: 'Test Team 2',
  },
];
describe('find if associate id is in list of teams', () => {
  test('id 330 is found in array', () => {
    const input = 330;
    const output = true;
    expect(findAssociateIdInListOfTeams(input, testArray)).toBe(output);
  });
  test('id 1234 is NOT found in array', () => {
    const input = 1234;
    const output = false;
    expect(findAssociateIdInListOfTeams(input, testArray)).toBe(output);
  });
});
