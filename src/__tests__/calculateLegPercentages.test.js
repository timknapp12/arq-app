import { calculateLegPercentages } from '../Utils/calculateLegPercentages';

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
describe('calculate leg percentages', () => {
  test('emerald returns 40 40 20', () => {
    const user = {
      leg1OV: 1992193,
      leg2OV: 156931,
      leg3OV: 75607,
    };

    const output = {
      leg1Max: 140000,
      leg2Max: 140000,
      leg3Max: 70000,
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
      leg3Max: 115500,
    };
    expect(calculateLegPercentages(user, emeraldRequiremments)).toStrictEqual(
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
      leg1Max: 5000,
      leg2Max: 5000,
      leg3Max: 0,
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
      leg1Max: 5000,
      leg2Max: 5000,
      leg3Max: 2500,
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
      leg1Max: 900,
      leg2Max: 600,
      leg3Max: 0,
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
      leg1Max: 900,
      leg2Max: 600,
      leg3Max: 300,
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
      leg3Max: 495,
    };
    expect(calculateLegPercentages(user, executiveRequirements)).toStrictEqual(
      output,
    );
  });
});
