module.exports = {
  '**/*.{js,jsx}': () => 'yarn test',
};

// This just prints everything if you execute this directly like so:
//   node lint-staged.config.js
if (require.main === module) {
  console.error(module.exports); // eslint-disable-line no-console
}
