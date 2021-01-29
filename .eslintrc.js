module.exports = {
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'no-use-before-define': ['error', { variables: false }],
    'no-unused-vars': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
  env: {
    jest: true,
    node: true,
  },
};
