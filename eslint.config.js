module.exports = {
    root: true,
   ...require('eslint-config-recommended'),
    env: {
      browser: true,
    },
    rules: {
      semi: ['error', 'always'],
      indent: ['error', 2],
    },
  };