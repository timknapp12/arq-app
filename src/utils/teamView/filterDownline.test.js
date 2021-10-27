import { findActiveAmbassadors } from './filterDownline';
import { mockChildTree } from './mockDownlineData';

describe('findActiveAmbassadors', () => {
  test('returns type of AMBASSADOR only that are NOT TERMINATED', () => {
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

    expect(findActiveAmbassadors(mockChildTree)).toStrictEqual(output);
  });
});
