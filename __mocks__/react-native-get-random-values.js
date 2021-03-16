// this is needed so that the 'react-native-get-random-values' library works in tests
// The 'react-native-get-random-values' is needed to generate unique random values for image urls
export default {
  getRandomBase64: jest.fn().mockImplementation(() => {
    console.log('getRandomBase64 mock called');
    return 'mockedBase64';
  }),
};
