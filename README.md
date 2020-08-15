[![Build Status](https://travis-ci.org/0time/test-deps.svg?branch=master)](https://travis-ci.org/0time/test-deps)
[![Coverage Status](https://coveralls.io/repos/github/0time/test-deps/badge.svg?branch=master)](https://coveralls.io/github/0time/test-deps?branch=master)

# Objective

Simplify maintenance of test dependencies by just shoving them all into one `npm` package.

## Usage

In your [https://mochajs.org/#-require-module-r-module](mocha require configuration), require a file which contains this line:

    // Example file will be referred to as `test/add-deps-global.js`
    global.deps = require('@0time/test-deps');

Then in your tests, you can use the exports of [src/index.js](index.js) like this:

    const {bluebird, chai, expect, tquire, uuid} = deps;

This works because in the `test/add-deps-global.js` file, we added the `deps` global variable containing these features.

### tquire

Currently unconfigurable, the `tquire` feature will find the source file which maps to the file you're trying to test if you lay out your test files consistently.

For unit tests:

    // Given files:
    // * src/some/source/file.js
    // * test/unit/some/source/file.js
    // and given an environment variable NODE_ENV set to `unit`
    // If this file is test/unit/some/source/file.js, this line will 'require' the src/some/source/file.js module
    const moduleFromSrcSomeSourceFile = tquire(__filename);

For integration tests:

    // Given files:
    // * src/some/source/file.js
    // * test/integration/some/source/file.js
    // and given an environment variable NODE_ENV set to `integration`
    // If this file is test/integration/some/source/file.js, this line will 'require' the src/some/source/file.js module
    const moduleFromSrcSomeSourceFile = tquire(__filename);

### d (short for a modified mocha describe function call)

The `d` feature will use the same logic as tquire to call describe with the source filename.

    // This
    d(__filename, () => {
    });
    // is roughly equivalent (for unit testing) to:
    describe(
      __filename
        .replace(process.cwd(), '')
        .replace(/\/?test\/unit/, ''), () => {
    });
