const { get } = require('lodash');

module.exports = {
  ignore: ['**/fixtures/**'],
  recursive: true,
  require: ['./test/add-deps-global.js'],
  spec: [`test/${get(process, 'env.NODE_ENV')}`],
};

// This just prints everything if you execute this directly like so:
//   node .mocharc.js
if (require.main === module) {
  console.error(module.exports); // eslint-disable-line no-console
}
