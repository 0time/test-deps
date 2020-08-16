const path = require('@0ti.me/en-path');
const proxyquire = require('proxyquire')
  .noPreserveCache()
  .noCallThru();

module.exports = ({ directories: { root, src, test } }) => (
  testFileFilename,
  mocks,
) =>
  proxyquire(
    path.srelative(
      path.dirname(__filename),
      path.join(
        path.relative(root, src),
        path.relative(test, testFileFilename),
      ),
    ),
    mocks,
  );
