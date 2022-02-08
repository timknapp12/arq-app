import validateEmailPattern from './validateEmailPattern';

describe('validate email pattern', () => {
  test('test@gmail.com returns true', () => {
    const input = 'test@gmail.com';

    const output = true;
    expect(validateEmailPattern(input)).toBe(output);
  });
  test('test+1@gmail.com returns true', () => {
    const input = 'test+1@gmail.com';

    const output = true;
    expect(validateEmailPattern(input)).toBe(output);
  });
  test('test_1@gmail.com returns true', () => {
    const input = 'test_1@gmail.com';

    const output = true;
    expect(validateEmailPattern(input)).toBe(output);
  });
  test('test_1.test@gmail.com returns true', () => {
    const input = 'test_1.test@gmail.com';

    const output = true;
    expect(validateEmailPattern(input)).toBe(output);
  });
  test('User.Test@gmail.com returns true', () => {
    const input = 'User.Test@gmail.com';

    const output = true;
    expect(validateEmailPattern(input)).toBe(output);
  });
  test('.test_1@gmail.com returns true', () => {
    const input = '.test_1@gmail.com';

    const output = false;
    expect(validateEmailPattern(input)).toBe(output);
  });
  test('test_1.@gmail.com returns true', () => {
    const input = 'test_1.@gmail.com';

    const output = false;
    expect(validateEmailPattern(input)).toBe(output);
  });
  test('a>b@email.com returns true', () => {
    const input = 'a>b@email.com';

    const output = false;
    expect(validateEmailPattern(input)).toBe(output);
  });
});
