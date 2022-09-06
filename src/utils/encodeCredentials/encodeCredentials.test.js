import { encodeEmail, encodePhone } from './encodeCredentials';

describe('encode email', () => {
  test('test@email.com returns t**t@*****.com', () => {
    const input = 'test@email.com';

    const output = 't**t@*****.com';

    expect(encodeEmail(input)).toBe(output);
  });
  test('test.testing@hotmail.com returns t**********g@*******.com', () => {
    const input = 'test.testing@hotmail.com';

    const output = 't**********g@*******.com';

    expect(encodeEmail(input)).toBe(output);
  });
  test('jim87@test.de returns j***7@****.de', () => {
    const input = 'jim87@test.de';

    const output = 'j***7@****.de';

    expect(encodeEmail(input)).toBe(output);
  });
});

describe('encode phone', () => {
  test('8013459087 returns 8*******87', () => {
    const input = '8013459087';

    const output = '******9087';

    expect(encodePhone(input)).toBe(output);
  });
  test('(801)345-9087 returns (**********87', () => {
    const input = '(801)3459087';

    const output = '********9087';

    expect(encodePhone(input)).toBe(output);
  });
  test('345 9087 returns 8*****87', () => {
    const input = '8013459087';

    const output = '******9087';

    expect(encodePhone(input)).toBe(output);
  });
});
