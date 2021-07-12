import {
  findTeamOwnerId,
  findAssociateIdInListOfTeams,
  findTeamAccessCode,
} from './findTeamResourceData';

const testArray = [
  {
    accessCode: '123',
    associateId: 211,
    teamAccessId: 3,
    teamName: 'Team Awesome',
    teamOwnerAssociateId: 111,
  },
  {
    accessCode: '123123',
    associateId: 330,
    teamAccessId: 4,
    teamName: 'Test Team',
    teamOwnerAssociateId: 222,
  },
  {
    accessCode: '121212',
    associateId: 113,
    teamAccessId: 4,
    teamName: 'Test Team 2',
    teamOwnerAssociateId: 333,
  },
];

describe('findTeamOwnerId', () => {
  test('team name "Test Team" returns id: 222', () => {
    const input = 'Test Team';
    const output = 222;

    expect(findTeamOwnerId(input, testArray)).toBe(output);
  });
  test('team name "Team Awesome" returns id: 111', () => {
    const input = 'Team Awesome';
    const output = 111;

    expect(findTeamOwnerId(input, testArray)).toBe(output);
  });
  test('team name "Test Team 2" returns id: 333', () => {
    const input = 'Test Team 2';
    const output = 333;

    expect(findTeamOwnerId(input, testArray)).toBe(output);
  });
});

describe('findAssociateIdInListOfTeams', () => {
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

describe('findTeamAccessCode', () => {
  test('Test Team 2 returns 121212', () => {
    const input = 'Test Team 2';
    const output = '121212';

    expect(findTeamAccessCode(input, testArray)).toBe(output);
  });
  test('Team Awesome returns 123', () => {
    const input = 'Team Awesome';
    const output = '123';

    expect(findTeamAccessCode(input, testArray)).toBe(output);
  });
});
