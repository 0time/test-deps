const path = require('path');
const proxyquire = require('proxyquire')
  .noPreserveCache()
  .noCallThru();
const specialRelative = require('../tquire/special-relative');

module.exports = ({ directories: { root, src, test } }) => (
  filename,
  mocks,
) => {
  const relativeFilename = __filename;

  const relativePath = specialRelative(
    path.dirname(relativeFilename),
    path.join(path.relative(root, src), path.relative(test, filename)),
  );

  return proxyquire(relativePath, mocks);
};
