const { d, testRunner } = deps;
const { identity } = require('lodash');

d(__filename, () => {
  const input = Symbol();
  const testFixtures = [
    {
      description: 'constant description',
      expected: input,
      input,
      functionToTest: identity,
    },
    {
      description: () => 'function description',
      expected: input,
      input,
      functionToTest: identity,
    },
    {
      description: 'function input',
      expected: input,
      input: () => input,
      functionToTest: identity,
    },
    {
      description: 'function expected',
      expected: () => input,
      input,
      functionToTest: identity,
    },
  ];

  testFixtures.forEach(testRunner);
});
