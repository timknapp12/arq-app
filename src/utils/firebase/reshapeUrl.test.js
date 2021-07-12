import { reshapeUrl } from './reshapeUrl';

describe('reshapeUrl', () => {
  test('insert _72x72 into url', () => {
    const input =
      'https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/profile_images%2FJena.Tomer.bceb6ac8-480d-44b9-aab0-edfa4050f901?alt=media&token=a6fcf9f8-260e-4228-82b8-c512996ff8b8';
    const output =
      'https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/profile_images%2FJena.Tomer.bceb6ac8-480d-44b9-aab0-edfa4050f901_72x72?alt=media&token=a6fcf9f8-260e-4228-82b8-c512996ff8b8';

    expect(reshapeUrl(input, '_72x72')).toBe(output);
  });
  test('insert _24x24 into url', () => {
    const input =
      'https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/profile_images%2FJena.Tomer.31318b8c-899e-47ab-8abf-608eadf8a32f?alt=media&token=2cfe0f05-75a6-4193-80f7-ccc4bbffa534';
    const output =
      'https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/profile_images%2FJena.Tomer.31318b8c-899e-47ab-8abf-608eadf8a32f_24x24?alt=media&token=2cfe0f05-75a6-4193-80f7-ccc4bbffa534';

    expect(reshapeUrl(input, '_24x24')).toBe(output);
  });
});
