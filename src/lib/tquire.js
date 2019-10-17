const path = require('path');

// path.relative can return a path without a leading `.`, this works around that
const specialRelativeRegex = /^\.\//;
const specialRelative = (from, to) => {
  const result = path.relative(from, to);

  return specialRelativeRegex.test(result) ? result : `./${result}`;
};

module.exports = ({ directories: { root, src, test } }) => filename =>
  require(specialRelative(
    // Since require is based on _this_ file, relative to the directory that
    // _this_ file lives in
    path.dirname(__filename),
    path.join(
      // Join the relative part of the src
      path.relative(root, src),
      // with the relative part of the test file
      path.relative(test, filename),
    ),
  ));
