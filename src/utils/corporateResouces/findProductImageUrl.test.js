import { findProductImageUrl } from './findProductImageUrl';
import { testProductLinks, QCoreLinks } from './mockData';

describe('findProductImageUrl', () => {
  test('testLinks gets correct image url', () => {
    const output =
      'https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/resources%2Fchicken.jpeg?alt=media&token=67c31f22-0b0a-450f-8f03-3d73439cdc56';

    expect(findProductImageUrl(testProductLinks)).toBe(output);
  });
  test('Q Core Links gets correct image url', () => {
    const output =
      'https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/resources%2FproductCategories%2Fnutritionals%2Fqcore-9994.jpg?alt=media&token=5311eeff-e0ca-48d2-a94a-4e0dfa57cb6f';

    expect(findProductImageUrl(QCoreLinks)).toBe(output);
  });
  test('Q Core Links result is not same as video url', () => {
    const output = 'https://vimeo.com/qsciences/download/486649781/4dd632fc7d';

    expect(findProductImageUrl(QCoreLinks)).not.toBe(output);
  });
});
