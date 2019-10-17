const tryquire = (x, def = {}) => {
  try {
    return require(x);
  } catch (err) {
    return def;
  }
};

const myNycrc = tryquire('./.my.nycrc.js');

module.exports = Object.assign(
  {
    all: true,
    forceColor: true,
    include: ['src'],
    reporter: ['lcov', 'text', 'text-summary'],
    watermarks: {
      branches: [90, 95],
      functions: [90, 95],
      lines: [90, 95],
      statements: [90, 95],
    },
  },
  myNycrc,
);
