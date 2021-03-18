import { calculateLegPercentages, reshapePerc } from '.';

const emeraldRequiremments = {
  legMaxPerc: 40,
  legMaxOV: 140000,
  id: 10,
  requiredPV: 200,
  requiredPA: 2,
  requiredQOV: 350000,
  name: 'emerald',
};

const bronzeRequirements = {
  legMaxPerc: 50,
  legMaxOV: 5000,
  id: 5,
  requiredPV: 100,
  requiredPA: 2,
  requiredQOV: 10000,
  name: 'bronze',
};
const executiveRequirements = {
  legMaxPerc: 60,
  legMaxOV: 900,
  id: 3,
  requiredPV: 100,
  requiredPA: 2,
  requiredQOV: 1500,
  name: 'executive',
};
const diamondRequirements = {
  legMaxPerc: 40,
  legMaxOV: 200000,
  id: 11,
  requiredPV: 200,
  requiredPA: 2,
  requiredQOV: 500000,
  name: 'Diamond',
};

describe('calculate leg percentages', () => {
  test('emerald returns 40 40 20', () => {
    const user = {
      leg1OV: 1992193,
      leg2OV: 156931,
      leg3OV: 75607,
    };

    const output = {
      leg1Max: 1992193,
      leg2Max: 156931,
      leg3Max: 140000,
    };
    expect(calculateLegPercentages(user, emeraldRequiremments)).toStrictEqual(
      output,
    );
  });
  test('emerald returns 34 33 33', () => {
    const user = {
      leg1OV: 119000,
      leg2OV: 115500,
      leg3OV: 115500,
    };

    const output = {
      leg1Max: 140000,
      leg2Max: 140000,
      leg3Max: 140000,
    };
    expect(calculateLegPercentages(user, emeraldRequiremments)).toStrictEqual(
      output,
    );
  });
  test('diamond returns 40 40 20', () => {
    const user = {
      leg1OV: 119000,
      leg2OV: 115500,
      leg3OV: 115500,
    };

    const output = {
      leg1Max: 200000,
      leg2Max: 200000,
      leg3Max: 200000,
    };
    expect(calculateLegPercentages(user, diamondRequirements)).toStrictEqual(
      output,
    );
  });
  test('diamond returns 40 40 27 with high first leg', () => {
    const user = {
      leg1OV: 1190000,
      leg2OV: 115500,
      leg3OV: 115500,
    };

    const output = {
      leg1Max: 1190000,
      leg2Max: 200000,
      leg3Max: 200000,
    };
    expect(calculateLegPercentages(user, diamondRequirements)).toStrictEqual(
      output,
    );
  });
  test('bronze returns 50 50 0', () => {
    const user = {
      leg1OV: 6000,
      leg2OV: 5500,
      leg3OV: 1000,
    };

    const output = {
      leg1Max: 6000,
      leg2Max: 5500,
      leg3Max: 5000,
    };
    expect(calculateLegPercentages(user, bronzeRequirements)).toStrictEqual(
      output,
    );
  });
  test('bronze returns 50 25 25', () => {
    const user = {
      leg1OV: 6000,
      leg2OV: 2500,
      leg3OV: 1000,
    };

    const output = {
      leg1Max: 6000,
      leg2Max: 5000,
      leg3Max: 5000,
    };
    expect(calculateLegPercentages(user, bronzeRequirements)).toStrictEqual(
      output,
    );
  });
  test('bronze returns 50 50 50 with low numbers', () => {
    const user = {
      leg1OV: 600,
      leg2OV: 250,
      leg3OV: 100,
    };

    const output = {
      leg1Max: 5000,
      leg2Max: 5000,
      leg3Max: 5000,
    };
    expect(calculateLegPercentages(user, bronzeRequirements)).toStrictEqual(
      output,
    );
  });
  test('bronze returns 50 50 25 with high first leg', () => {
    const user = {
      leg1OV: 6000,
      leg2OV: 250,
      leg3OV: 100,
    };

    const output = {
      leg1Max: 6000,
      leg2Max: 5000,
      leg3Max: 5000,
    };
    expect(calculateLegPercentages(user, bronzeRequirements)).toStrictEqual(
      output,
    );
  });
  test('executive returns 60 40 0 ', () => {
    const user = {
      leg1OV: 1000,
      leg2OV: 700,
      leg3OV: 100,
    };

    const output = {
      leg1Max: 1000,
      leg2Max: 900,
      leg3Max: 900,
    };
    expect(calculateLegPercentages(user, executiveRequirements)).toStrictEqual(
      output,
    );
  });
  test('executive returns 60 20 20', () => {
    const user = {
      leg1OV: 1000,
      leg2OV: 300,
      leg3OV: 230,
    };

    const output = {
      leg1Max: 1000,
      leg2Max: 900,
      leg3Max: 900,
    };
    expect(calculateLegPercentages(user, executiveRequirements)).toStrictEqual(
      output,
    );
  });
  test('executive returns 34 33 33', () => {
    const user = {
      leg1OV: 510,
      leg2OV: 495,
      leg3OV: 400,
    };

    const output = {
      leg1Max: 900,
      leg2Max: 900,
      leg3Max: 900,
    };
    expect(calculateLegPercentages(user, executiveRequirements)).toStrictEqual(
      output,
    );
  });
  test('executive returns 60 40 33 with low numbers', () => {
    const user = {
      leg1OV: 310,
      leg2OV: 195,
      leg3OV: 100,
    };

    const output = {
      leg1Max: 900,
      leg2Max: 900,
      leg3Max: 900,
    };
    expect(calculateLegPercentages(user, executiveRequirements)).toStrictEqual(
      output,
    );
  });
  test('executive returns 60 40 33 with high first leg', () => {
    const user = {
      leg1OV: 3000,
      leg2OV: 195,
      leg3OV: 100,
    };

    const output = {
      leg1Max: 3000,
      leg2Max: 900,
      leg3Max: 900,
    };
    expect(calculateLegPercentages(user, executiveRequirements)).toStrictEqual(
      output,
    );
  });
});

describe('reshape percentage', () => {
  test('105 / 100 = 100', () => {
    const min = 105;
    const max = 100;
    const output = 100;

    expect(reshapePerc(min, max)).toBe(output);
  });
  test('55 / 100 = 55', () => {
    const min = 55;
    const max = 100;
    const output = 55;

    expect(reshapePerc(min, max)).toBe(output);
  });
  test('33 / 3 = 33', () => {
    const min = 33;
    const max = 100;
    const output = 33;

    expect(reshapePerc(min, max)).toBe(output);
  });
  test('548023 / 1093 = 100', () => {
    const min = 548023;
    const max = 1093;
    const output = 100;

    expect(reshapePerc(min, max)).toBe(output);
  });
});
