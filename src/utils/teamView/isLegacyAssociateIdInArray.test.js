import isLegacyAssociateIdInArray from './isLegacyAssociateIdInArray';

const data = [
  {
    associateId: 0,
    associate: {
      associateId: 0,
      legacyAssociateId: 890324,
    },
  },
  {
    associateId: 1,
    associate: {
      associateId: 1,
      legacyAssociateId: 720762,
    },
  },
  {
    associateId: 2,
    associate: {
      associateId: 2,
      legacyAssociateId: 246098,
    },
  },
  {
    associateId: 3,
    associate: {
      associateId: 3,
      legacyAssociateId: 489241,
    },
  },
];
describe('isLegacyAssociateIdInArray', () => {
  test('489241 returns true', () => {
    const input = 489241;

    const output = true;
    expect(isLegacyAssociateIdInArray(data, input)).toBe(output);
  });
  test('489241 returns false from an empty array', () => {
    const input = 489241;

    const output = false;
    expect(isLegacyAssociateIdInArray([], input)).toBe(output);
  });
  test('489241 returns false from a null array', () => {
    const input = 489241;

    const output = false;
    expect(isLegacyAssociateIdInArray(null, input)).toBe(output);
  });
  test('890324 returns true', () => {
    const input = 890324;

    const output = true;
    expect(isLegacyAssociateIdInArray(data, input)).toBe(output);
  });
});
