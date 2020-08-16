module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
  },
};

// This just prints everything if you execute this directly like so:
//   node .huskyrc.js
if (require.main === module) {
  console.error(module.exports); // eslint-disable-line no-console
}
