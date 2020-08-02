const path = require('path');
const specialRelative = require('./special-relative');

module.exports = ({ directories: { root, src, test } }) => (
  filename,
  shouldRequire = true,
) => {
  // If the require is going to be done here, use this filename, if we're just returning
  // the filename, make it relative to _that_ file.
  const relativeFilename = shouldRequire ? __filename : filename;

  const relativePath = specialRelative(
    // Since require is based on _this_ file, relative to the directory that
    // _this_ file lives in
    path.dirname(relativeFilename),
    path.join(
      // Join the relative part of the src
      path.relative(root, src),
      // with the relative part of the test file
      path.relative(test, filename),
    ),
  );

  return shouldRequire ? require(relativePath) : relativePath;
};
