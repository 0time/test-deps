const path = require('path');

// A shortcut for mocha describe that just describes the file path
module.exports = ({ directories: { test } }) => (filename, cb) =>
  describe(path.relative(test, filename), cb);
