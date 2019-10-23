const runner = require('./runner');

const { isFunction } = require('lodash');

module.exports = testContext => testConfig => {
  const description = isFunction(testConfig.description)
    ? testConfig.description(testConfig)
    : testConfig.description;

  return it(description, () => runner(testContext, testConfig));
};
