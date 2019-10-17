// A shortcut for mocha describe that just describes the file path
module.exports = options => (filename, cb) =>
  describe(path.relative(options.directories.test, filename), cb);
