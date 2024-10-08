const { configs } = require('@eslint/js');

module.exports = [
  configs.recommended,
  {
    env: {
      browser: true,
    },
    rules: {
      semi: ['error', 'always'],
      indent: ['error', 2],
      'no-unused-vars': 'warn',
    },
  },
];