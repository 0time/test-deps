module.exports = {
  singleQuote: true,
  trailingComma: 'all',
};

// This just prints everything if you execute this directly like so:
//   node .prettierrc.js
if (require.main === module) {
  console.error(module.exports); // eslint-disable-line no-console
}
