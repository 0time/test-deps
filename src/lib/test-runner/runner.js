const { isFunction } = require('lodash');
const Promise = require('bluebird');

module.exports = ({ expect }, testConfig) => {
  const { functionToTest } = testConfig;

  const expected = isFunction(testConfig.expected)
    ? testConfig.expected(testConfig)
    : testConfig.expected;

  const input = isFunction(testConfig.input)
    ? testConfig.input(testConfig)
    : testConfig.input;

  return Promise.try(() => functionToTest(input)).then(actual => {
    expect(actual).to.deep.equal(expected);

    return actual;
  });
};
