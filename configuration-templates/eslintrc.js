const isCi = !!process.env.CI;

module.exports = {
  env: {
    commonjs: true,
    es6: true,
    mocha: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  globals: {
    deps: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': isCi ? 'error' : 'warn',
  },
};

// This just prints everything if you execute this directly like so:
//   node .eslintrc.js
if (require.main === module) {
  console.error(module.exports); // eslint-disable-line no-console
}
