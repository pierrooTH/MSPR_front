module.exports = {
  root: true,
  extends: ['@react-native-community', 'eslint:recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react-native/no-inline-styles': 'off',
    'prettier/prettier': 'off',
  },
  env: {
    jest: true,
  },
};
