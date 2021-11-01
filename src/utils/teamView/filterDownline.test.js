import { findMembersInDownlineOneLevel } from './filterDownline';
import { mockChildTree } from './mockDownlineData';

describe('findMembersInDownlineOneLevel', () => {
  test('returns type of AMBASSADOR', () => {
    const output = [
      {
        associate: {
          associateId: 75197,
          legacyAssociateId: 272398,
          firstName: 'Karlie',
          lastName: 'Hodgen',
          profileUrl: null,
          associateType: 'AMBASSADOR',
          associateStatus: 'TERMINATED',
        },
        rank: {
          rankId: 1,
          rankName: 'Ambassador',
        },
        pv: 0,
        qoV: 0,
        pa: 0,
      },
      {
        associate: {
          associateId: 202602,
          legacyAssociateId: 742546,
          firstName: 'Matthew',
          lastName: 'Adams',
          profileUrl: null,
          associateType: 'AMBASSADOR',
          associateStatus: 'ACTIVE',
        },
        rank: {
          rankId: 1,
          rankName: 'Ambassador',
        },
        pv: 0,
        qoV: 0,
        pa: 0,
      },
      {
        associate: {
          associateId: 152996,
          legacyAssociateId: 622003,
          firstName: 'Angela',
          lastName: 'Mourlam',
          profileUrl: null,
          associateType: 'AMBASSADOR',
          associateStatus: 'SUSPENDED',
        },
        rank: {
          rankId: 1,
          rankName: 'Ambassador',
        },
        pv: 0,
        qoV: 0,
        pa: 0,
      },
    ];

    expect(
      findMembersInDownlineOneLevel(mockChildTree, 'AMBASSADOR'),
    ).toStrictEqual(output);
  });

  test('returns type of PREFERRED', () => {
    const output = [
      {
        associate: {
          associateId: 85981,
          legacyAssociateId: 319342,
          firstName: 'Kelsey',
          lastName: 'Bowman',
          profileUrl: null,
          associateType: 'PREFERRED',
          associateStatus: 'TERMINATED',
        },
        rank: {
          rankId: 1,
          rankName: 'Ambassador',
        },
        pv: 0,
        qoV: 0,
        pa: 0,
      },
      {
        associate: {
          associateId: 86478,
          legacyAssociateId: 321223,
          firstName: 'Brooke',
          lastName: 'Mutapcic',
          profileUrl: null,
          associateType: 'PREFERRED',
          associateStatus: 'TERMINATED',
        },
        rank: {
          rankId: 1,
          rankName: 'Ambassador',
        },
        pv: 0,
        qoV: 0,
        pa: 0,
      },
      {
        associate: {
          associateId: 93133,
          legacyAssociateId: 353092,
          firstName: 'Michelle',
          lastName: 'Bartusek',
          profileUrl: null,
          associateType: 'PREFERRED',
          associateStatus: 'TERMINATED',
        },
        rank: {
          rankId: 1,
          rankName: 'Ambassador',
        },
        pv: 0,
        qoV: 0,
        pa: 0,
      },
    ];

    expect(
      findMembersInDownlineOneLevel(mockChildTree, 'PREFERRED'),
    ).toStrictEqual(output);
  });

  test('returns type of RETAIL', () => {
    const output = [
      {
        associate: {
          associateId: 86111,
          legacyAssociateId: 319822,
          firstName: 'Misty',
          lastName: 'Rivera',
          profileUrl: null,
          associateType: 'RETAIL',
          associateStatus: 'TERMINATED',
        },
        rank: {
          rankId: 1,
          rankName: 'Ambassador',
        },
        pv: 0,
        qoV: 0,
        pa: 0,
      },
    ];

    expect(
      findMembersInDownlineOneLevel(mockChildTree, 'RETAIL'),
    ).toStrictEqual(output);
  });

  test('returns type of RETAIL and PREFERRED', () => {
    const output = [
      {
        associate: {
          associateId: 85981,
          legacyAssociateId: 319342,
          firstName: 'Kelsey',
          lastName: 'Bowman',
          profileUrl: null,
          associateType: 'PREFERRED',
          associateStatus: 'TERMINATED',
        },
        rank: {
          rankId: 1,
          rankName: 'Ambassador',
        },
        pv: 0,
        qoV: 0,
        pa: 0,
      },
      {
        associate: {
          associateId: 86111,
          legacyAssociateId: 319822,
          firstName: 'Misty',
          lastName: 'Rivera',
          profileUrl: null,
          associateType: 'RETAIL',
          associateStatus: 'TERMINATED',
        },
        rank: {
          rankId: 1,
          rankName: 'Ambassador',
        },
        pv: 0,
        qoV: 0,
        pa: 0,
      },
      {
        associate: {
          associateId: 86478,
          legacyAssociateId: 321223,
          firstName: 'Brooke',
          lastName: 'Mutapcic',
          profileUrl: null,
          associateType: 'PREFERRED',
          associateStatus: 'TERMINATED',
        },
        rank: {
          rankId: 1,
          rankName: 'Ambassador',
        },
        pv: 0,
        qoV: 0,
        pa: 0,
      },
      {
        associate: {
          associateId: 93133,
          legacyAssociateId: 353092,
          firstName: 'Michelle',
          lastName: 'Bartusek',
          profileUrl: null,
          associateType: 'PREFERRED',
          associateStatus: 'TERMINATED',
        },
        rank: {
          rankId: 1,
          rankName: 'Ambassador',
        },
        pv: 0,
        qoV: 0,
        pa: 0,
      },
    ];

    expect(
      findMembersInDownlineOneLevel(mockChildTree, 'RETAIL', 'PREFERRED'),
    ).toStrictEqual(output);
  });
});
