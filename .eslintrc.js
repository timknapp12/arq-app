module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', //this plugin is required to use eslint for react, otherwise we will get errors for 'React' import, as 'no-unused-vars'
  ],
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': 'off',
    'no-use-before-define': ['error', { variables: false }],
  },
};
