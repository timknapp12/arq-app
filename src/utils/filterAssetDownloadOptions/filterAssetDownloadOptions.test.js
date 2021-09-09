import { filterAssetDownloadOptions } from './filterAssetDownloadOtions';

describe('Filter Asset Download Options', () => {
  test('removes video and podcast from list', () => {
    const input = [
      { name: 'image name', contentType: 'image' },
      { name: 'video name', contentType: 'video' },
      { name: 'podcast name', contentType: 'podcast' },
      { name: 'document name', contentType: 'pdf' },
    ];

    const output = [
      { name: 'image name', contentType: 'image' },
      { name: 'document name', contentType: 'pdf' },
    ];
    expect(filterAssetDownloadOptions(input)).toStrictEqual(output);
  });
  test('does not remove anything from list', () => {
    const input = [
      { name: 'image name', contentType: 'image' },
      { name: 'document name', contentType: 'pdf' },
    ];

    const output = [
      { name: 'image name', contentType: 'image' },
      { name: 'document name', contentType: 'pdf' },
    ];
    expect(filterAssetDownloadOptions(input)).toStrictEqual(output);
  });
});
