const badHandler = require('./lib/bad-handler')(global);

process.on('uncaughtException', badHandler);
process.on('unhandledRejection', badHandler);

const _ = require('lodash');
const bluebird = require('bluebird');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const path = require('path');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
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

const d = require('./lib/d')(info);
const tquire = require('./lib/tquire')(info);

module.exports = {
  _,
  bluebird,
  chai,
  d,
  expect: chai.expect,
  path,
  sinon,
  tquire,
  util,
  utilities: {
    info,
  },
  uuid,
};
