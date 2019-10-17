const badHandler = require('./lib/bad-handler');

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
const src = `${root}/src`;
const test = `${root}/test/${env}`;

const info = {
  directories: {
    root: process.cwd(),
    src: `${root}/src`,
    test: `${root}/test/${env}`,
  },
  env,
};

const d = require('./lib/d')(info);
const tquire = require('./lib/tquire');

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
