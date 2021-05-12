import { findMarketUrl } from './findMarketUrl';
import { markets } from './markets';

describe('find market url', () => {
  test('returns usa url', () => {
    const input = 'us';

    const output =
      'https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/profile_images%2Fusa-flag_72x72.png?alt=media&token=55469beb-4a67-4c63-a156-dbd1fd96b7b4';

    expect(findMarketUrl(input, markets)).toBe(output);
  });
  test('returns poland url', () => {
    const input = 'pl';

    const output =
      'https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/profile_images%2Fpoland-flag_72x72.png?alt=media&token=8a62aa17-49d4-4e42-b3b8-bdb4b1cd631a';

    expect(findMarketUrl(input, markets)).toBe(output);
  });
  test('returns sweden url', () => {
    const input = 'se';

    const output =
      'https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/profile_images%2Fsweden-flag_72x72.png?alt=media&token=647cdedb-1ec2-427d-8470-44582b6bd2c7';

    expect(findMarketUrl(input, markets)).toBe(output);
  });
});
