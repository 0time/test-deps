const path = require('path');

module.exports = filename =>
  require(path.relative(
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
