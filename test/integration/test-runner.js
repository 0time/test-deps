const { d, testRunner } = deps;

// returns the (index)th item in the fibonacci sequence starting with 1
const fib = index => {
  let left = 1;
  let right = 2;
  let next = 0;

  if (index === 0) return left;
  if (index === 1) return right;

  index -= 2;

  while (index >= 0) {
    --index;

    next = left + right;
    left = right;
    right = next;
  }

  return right;
};

d(__filename, () => {
  const description = ({ input }) => `index ${input}`;
  [
    {
      description: 'index 0',
      expected: 1,
      input: 0,
    },
    {
      description,
      expected: () => 2,
      input: () => 1,
    },
    {
      description,
      expected: () => 3,
      input: () => 2,
    },
    {
      description,
      expected: () => 5,
      input: () => 3,
    },
  ]
    .map(ea => Object.assign(ea, { functionToTest: fib }))
    .forEach(testRunner);
});
