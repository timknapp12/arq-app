import properlyCaseName from './properlyCaseName';

describe('Properly Case Name', () => {
  test('Properly case mark petersen', () => {
    const firstName = 'mark';
    const lastName = 'petersen';

    const output = 'Mark Petersen';
    expect(properlyCaseName(firstName, lastName)).toBe(output);
  });
  test('Properly case MARC WILSON', () => {
    const firstName = 'MARC';
    const lastName = 'WILSON';

    const output = 'Marc Wilson';
    expect(properlyCaseName(firstName, lastName)).toBe(output);
  });
  test('Properly case jena and dylan Tomer', () => {
    const firstName = 'jena and dylan';
    const lastName = 'Tomer';

    const output = 'Jena And Dylan Tomer';
    expect(properlyCaseName(firstName, lastName)).toBe(output);
  });
  test('Properly case jimmy with no last name', () => {
    const soloArg = 'Jimmy';

    const output = 'Jimmy';
    expect(properlyCaseName(soloArg)).toBe(output);
  });
  test('Properly case name with undefined last name', () => {
    const firstName = 'BILLY';
    const lastName = undefined;

    const output = 'Billy';
    expect(properlyCaseName(firstName, lastName)).toBe(output);
  });
  test('Properly case name with undefined first name', () => {
    const firstName = undefined;
    const lastName = 'thompson';

    const output = 'Thompson';
    expect(properlyCaseName(firstName, lastName)).toBe(output);
  });
  test('Handle case with undefined first AND last name', () => {
    const firstName = undefined;
    const lastName = undefined;

    const output = '';
    expect(properlyCaseName(firstName, lastName)).toBe(output);
  });
});
