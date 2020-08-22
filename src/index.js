const badHandler = require('./lib/bad-handler')(global);

process.on('uncaughtException', badHandler);
process.on('unhandledRejection', badHandler);

const _ = require('lodash');
const bluebird = require('bluebird');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const dCreator = require('./lib/d');
const nextInt = require('./lib/next-int');
const path = require('path');
const pquireCreator = require('./lib/pquire');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const tquireCreator = require('./lib/tquire');
const tryquire = require('./lib/try-quire');
const util = require('util');
const uuid = require('uuid').v4;

chai.use(chaiAsPromised);
chai.use(sinonChai);

const env = _.get(process, 'env.NODE_ENV');

const root = process.cwd();

const info = {
  directories: {
    root,
    src: `${root}/src`,
    test: `${root}/test/${env}`,
  },
  env,
};

const d = dCreator(info);
const pquire = pquireCreator(info);
const tquire = tquireCreator(info);

const testContext = {
  _,
  bluebird,
  chai,
  d,
  expect: chai.expect,
  nextInt,
  path,
  pquire,
  sinon,
  tquire,
  tryquire,
  util,
  utilities: {
    info,
  },
  uuid,
};

testContext.testRunner = require('./lib/test-runner')(testContext);

module.exports = testContext;
