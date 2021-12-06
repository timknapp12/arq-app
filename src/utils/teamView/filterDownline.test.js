import {
  findMembersInDownlineOneLevel,
  filterMemberByStatusAndType,
  putSelectedMemberAtTopOfList,
} from './filterDownline';
import { mockChildTree, searchResults } from './mockDownlineData';

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

const blue = '#007985';
const caramel = '#D59957';
const violet = '#70346E';
const darkRed = '#AC2A1C';
const warningYellow = '#FDD207';

const memberTypeColorMap = {
  activeAmbassador: blue,
  activePreferred: caramel,
  activeRetail: violet,
  warning: warningYellow,
  terminated: darkRed,
};

describe('filterMemberByStatusAndType', () => {
  test('active ambassador with rank gold returns #007985 and Gold', () => {
    const input = {
      associate: {
        associateId: 75197,
        associateType: 'AMBASSADOR',
        associateStatus: 'ACTIVE',
      },
      rank: {
        rankId: 1,
        rankName: 'Gold',
      },
    };
    const output = ['Gold', blue];

    expect(
      filterMemberByStatusAndType(input, memberTypeColorMap),
    ).toStrictEqual(output);
  });
  test('Terminated ambassador returns #AC2A1C and Terminated', () => {
    const input = {
      associate: {
        associateId: 75197,
        associateType: 'AMBASSADOR',
        associateStatus: 'TERMINATED',
      },
      rank: {
        rankId: 1,
        rankName: 'Gold',
      },
    };
    const output = ['Terminated', darkRed];

    expect(
      filterMemberByStatusAndType(input, memberTypeColorMap),
    ).toStrictEqual(output);
  });
  test('Suspended ambassador returns #FDD207 and Suspended', () => {
    const input = {
      associate: {
        associateId: 75197,
        associateType: 'AMBASSADOR',
        associateStatus: 'SUSPENDED',
      },
      rank: {
        rankId: 1,
        rankName: 'Gold',
      },
    };
    const output = ['Suspended', warningYellow];

    expect(
      filterMemberByStatusAndType(input, memberTypeColorMap),
    ).toStrictEqual(output);
  });
  test('DocuSign Hold ambassador returns #FDD207 and DocuSign Hold', () => {
    const input = {
      associate: {
        associateId: 75197,
        associateType: 'AMBASSADOR',
        associateStatus: 'DOCU_SIGN_HOLD',
      },
      rank: {
        rankId: 1,
        rankName: 'Gold',
      },
    };
    const output = ['DocuSign Hold', warningYellow];

    expect(
      filterMemberByStatusAndType(input, memberTypeColorMap),
    ).toStrictEqual(output);
  });
  test('Chargeback ambassador returns #AC2A1C and Chargeback', () => {
    const input = {
      associate: {
        associateId: 75197,
        associateType: 'AMBASSADOR',
        associateStatus: 'CHARGEBACK',
      },
      rank: {
        rankId: 1,
        rankName: 'Gold',
      },
    };
    const output = ['Chargeback', darkRed];

    expect(
      filterMemberByStatusAndType(input, memberTypeColorMap),
    ).toStrictEqual(output);
  });
  test('Fraudulent Behavior ambassador returns #AC2A1C and Fraudulent Behavior', () => {
    const input = {
      associate: {
        associateId: 75197,
        associateType: 'AMBASSADOR',
        associateStatus: 'FRAUDULENT_BEHAVIOR',
      },
      rank: {
        rankId: 1,
        rankName: 'Gold',
      },
    };
    const output = ['Fraudulent Behavior', darkRed];

    expect(
      filterMemberByStatusAndType(input, memberTypeColorMap),
    ).toStrictEqual(output);
  });
  test('Hold ID Verification ambassador returns #FDD207 and Hold ID Verification', () => {
    const input = {
      associate: {
        associateId: 75197,
        associateType: 'AMBASSADOR',
        associateStatus: 'HOLD_ID_VERIFICATION',
      },
      rank: {
        rankId: 1,
        rankName: 'Gold',
      },
    };
    const output = ['Hold ID Verification', warningYellow];

    expect(
      filterMemberByStatusAndType(input, memberTypeColorMap),
    ).toStrictEqual(output);
  });
  test('Active Preferred Customer returns #D59957 and Preferred Customer', () => {
    const input = {
      associate: {
        associateId: 75197,
        associateType: 'PREFERRED',
        associateStatus: 'ACTIVE',
      },
      rank: {
        rankId: 1,
        rankName: 'Ambassador',
      },
    };
    const output = ['Preferred Customer', caramel];

    expect(
      filterMemberByStatusAndType(input, memberTypeColorMap),
    ).toStrictEqual(output);
  });
  test('Terminated Preferred Customer returns #D59957 and Terminated', () => {
    const input = {
      associate: {
        associateId: 75197,
        associateType: 'PREFERRED',
        associateStatus: 'TERMINATED',
      },
      rank: {
        rankId: 1,
        rankName: 'Ambassador',
      },
    };
    const output = ['Terminated', darkRed];

    expect(
      filterMemberByStatusAndType(input, memberTypeColorMap),
    ).toStrictEqual(output);
  });
  test('Active RETAIL Customer returns #70346E and Retail', () => {
    const input = {
      associate: {
        associateId: 75197,
        associateType: 'RETAIL',
        associateStatus: 'ACTIVE',
      },
      rank: {
        rankId: 1,
        rankName: 'Ambassador',
      },
    };
    const output = ['Retail', violet];

    expect(
      filterMemberByStatusAndType(input, memberTypeColorMap),
    ).toStrictEqual(output);
  });
  test('Terminated RETAIL Customer returns #D59957 and Retail', () => {
    const input = {
      associate: {
        associateId: 75197,
        associateType: 'RETAIL',
        associateStatus: 'TERMINATED',
      },
      rank: {
        rankId: 1,
        rankName: 'Ambassador',
      },
    };
    const output = ['Terminated', darkRed];

    expect(
      filterMemberByStatusAndType(input, memberTypeColorMap),
    ).toStrictEqual(output);
  });
});

describe('putSelectedMemberAtTopOfList', () => {
  test('takes 3rd object and puts it at the top', () => {
    const input = 3;

    const output = [
      { associate: { associateId: 3, firstName: 'Test Three' } },
      { associate: { associateId: 1, firstName: 'Test One' } },
      { associate: { associateId: 2, firstName: 'Test Two' } },
      { associate: { associateId: 4, firstName: 'Test Four' } },
      { associate: { associateId: 5, firstName: 'Test Five' } },
    ];

    expect(putSelectedMemberAtTopOfList(searchResults, input)).toStrictEqual(
      output,
    );
  });
  test('takes 2nd object and puts it at the top', () => {
    const input = 2;

    const output = [
      { associate: { associateId: 2, firstName: 'Test Two' } },
      { associate: { associateId: 1, firstName: 'Test One' } },
      { associate: { associateId: 3, firstName: 'Test Three' } },
      { associate: { associateId: 4, firstName: 'Test Four' } },
      { associate: { associateId: 5, firstName: 'Test Five' } },
    ];

    expect(putSelectedMemberAtTopOfList(searchResults, input)).toStrictEqual(
      output,
    );
  });
  test('takes 5th object and puts it at the top', () => {
    const input = 5;

    const output = [
      { associate: { associateId: 5, firstName: 'Test Five' } },
      { associate: { associateId: 1, firstName: 'Test One' } },
      { associate: { associateId: 2, firstName: 'Test Two' } },
      { associate: { associateId: 3, firstName: 'Test Three' } },
      { associate: { associateId: 4, firstName: 'Test Four' } },
    ];

    expect(putSelectedMemberAtTopOfList(searchResults, input)).toStrictEqual(
      output,
    );
  });
  test('takes 1st object and leaves it at the top', () => {
    const input = 1;

    const output = [
      { associate: { associateId: 1, firstName: 'Test One' } },
      { associate: { associateId: 2, firstName: 'Test Two' } },
      { associate: { associateId: 3, firstName: 'Test Three' } },
      { associate: { associateId: 4, firstName: 'Test Four' } },
      { associate: { associateId: 5, firstName: 'Test Five' } },
    ];

    expect(putSelectedMemberAtTopOfList(searchResults, input)).toStrictEqual(
      output,
    );
  });
});
