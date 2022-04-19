import encodeProspectUrl from './encodeProspectUrl';

describe('encode prospect url', () => {
  test('replaces = and ||', () => {
    const input =
      'https://arqprospect-dev.azurewebsites.net?source=afb63486-e547-4ae6-825f-a7993ca25f97||092e6143-ab9c-4f98-b343-2aaf9e1d97b4';

    const output =
      'https://arqprospect-dev.azurewebsites.net?source%3Dafb63486-e547-4ae6-825f-a7993ca25f97%7C%7C092e6143-ab9c-4f98-b343-2aaf9e1d97b4';

    expect(encodeProspectUrl(input)).toBe(output);
  });
});
