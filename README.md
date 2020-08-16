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

## Configuration Templates

In the `./configuration-templates` directory, you can find configuration files which can be used in various ways.

## Quickstart:

    if which yarn; then
      yarn add --dev @0ti.me/test-deps
    else
      npm install --save-dev @0ti.me/test-deps
    fi

    for i in nyc.config.js huskyrc.js lint-staged.config.js mocharc.js nyc.config.js prettierrc.js; do
      OUTPUT="${i}"

      if echo $i | grep -E 'rc\.js$' 2>/dev/null 1>&2; then
        OUTPUT=".${OUTPUT}"
      fi

      ln -s "node_modules/@0ti.me/test-deps/configuration-templates/${i}" "${OUTPUT}"
    done

    ln -s "node_modules/@0ti.me/test-deps/configuration-templates/add-deps-global.js" "test/add-deps-global.js"

### nyc.config.js

You can use it as is with a symlink

    #!/usr/bin/env bash

    ln -s node_modules/@0ti.me/test-deps/configuration-templates/nyc.config.js

Or you can require it (in your own nyc.config.js)

    const testDepsNycConfig = require('@0ti.me/test-deps/configuration-templates/nyc.config.js');

    module.exports = testDepsNycConfig;

Or you can require it and override things you want to change. (in your own nyc.config.js)

    const testDepsNycConfig = require('@0ti.me/test-deps/configuration-templates/nyc.config.js');

    module.exports = Object.assign(
      {},
      testDepsNycConfig,
      {branches: 10},
    );

### Files similar to `nyc.config.js`:

* eslintrc.js☭
* huskyrc.js☭
* lint-staged.config.js
* mocharc.js☭
* prettierrc.js☭

☭ The files with this mark must be symlinked to `project-dir/.filename` like so:

    ln -s node_modules/@0ti.me/test-deps/configuration-templates/eslintrc.js .eslintrc.js
