import {
  findTeamOwnerId,
  findIfUserHasATeam,
  findTeamAccessCode,
  findUsersOwnTeamInfo,
  findPropInArray,
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

describe('findIfUserHasATeam', () => {
  test('id 333 is owner of a team in the array', () => {
    const input = 333;
    const output = true;
    expect(findIfUserHasATeam(input, testArray)).toBe(output);
  });
  test('id 1234 is NOT found in array', () => {
    const input = 1234;
    const output = false;
    expect(findIfUserHasATeam(input, testArray)).toBe(output);
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

describe('findUsersOwnTeamInfo', () => {
  test('is 111 returns team object', () => {
    const input = 111;
    const output = {
      accessCode: '123',
      associateId: 211,
      teamAccessId: 3,
      teamName: 'Team Awesome',
      teamOwnerAssociateId: 111,
    };

    expect(findUsersOwnTeamInfo(input, testArray)).toStrictEqual(output);
  });
  test('id 312 returns null', () => {
    const input = 312;
    const output = null;

    expect(findUsersOwnTeamInfo(input, testArray)).toBe(output);
  });
});

const listOfTeamFolders = [
  {
    folderId: 4265,
    folderName: 'My Team Folder',
    isWideLayout: true,
  },
  {
    folderId: 4755,
    folderName: 'Folder 2',
    isWideLayout: true,
  },
  {
    folderId: 0,
    folderName: 'Test Folder',
    isWideLayout: true,
  },
];
describe('findPropInArray with folderName and folderId', () => {
  test('folder name Test Folder returns folderId 0', () => {
    const input = 'Test Folder';
    const output = 0;

    expect(
      findPropInArray(listOfTeamFolders, input, 'folderName', 'folderId'),
    ).toStrictEqual(output);
  });
  test('folder name Folder 2 returns folderId 4755', () => {
    const input = 'Folder 2';
    const output = 4755;

    expect(
      findPropInArray(listOfTeamFolders, input, 'folderName', 'folderId'),
    ).toBe(output);
  });
  test('folder name My Team Folder does not return folderId 4755', () => {
    const input = 'My Team Folder';
    const output = 4755;

    expect(
      findPropInArray(listOfTeamFolders, input, 'folderName', 'folderId'),
    ).not.toBe(output);
  });
});

describe('findPropInArray with team owner id', () => {
  test('team name "Test Team" returns id: 222', () => {
    const input = 'Test Team';
    const output = 222;

    expect(
      findPropInArray(testArray, input, 'teamName', 'teamOwnerAssociateId'),
    ).toBe(output);
  });
  test('team name "Team Awesome" returns id: 111', () => {
    const input = 'Team Awesome';
    const output = 111;

    expect(
      findPropInArray(testArray, input, 'teamName', 'teamOwnerAssociateId'),
    ).toBe(output);
  });
  test('team name "Test Team 2" returns id: 333', () => {
    const input = 'Test Team 2';
    const output = 333;

    expect(
      findPropInArray(testArray, input, 'teamName', 'teamOwnerAssociateId'),
    ).toBe(output);
  });
});
