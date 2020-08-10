const { get } = require('lodash');

module.exports = {
  ignore: ['**/fixtures/**'],
  recursive: true,
  require: ['./test/add-deps-global.js'],
  spec: [`test/${get(process, 'env.NODE_ENV')}`],
};
