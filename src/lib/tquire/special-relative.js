// path.relative can return a path without a leading `.`, this works around that
const specialRelativeRegex = /^(\.\/)|^(\/)/;

const _impl = ({ path }) => (from, to) => {
  const result = path.relative(from, to);

  return specialRelativeRegex.test(result) ? result : `./${result}`;
};

module.exports = _impl({ path: require('path') });
module.exports._impl = _impl;
