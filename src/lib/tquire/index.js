const path = require('path');
const specialRelative = require('./special-relative');

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
