const fs = require('fs');
const path = require('path');
const proxyquire = require('proxyquire')
  .noPreserveCache()
  .noCallThru();

const {
  d,
  expect,
  sinon: { stub },
  tquire,
  utilities: { info },
} = deps;

const me = __filename;

d(me, () => {
  const mockProxyquireResult = Symbol();
  const mocksSymbol = Symbol();

  let mocks = null;
  let mockProxyquire = null;
  let pquire = null;

  beforeEach(() => {
    mocks = {};

    mockProxyquire = stub().returns(mockProxyquireResult);
    mockProxyquire.noPreserveCache = stub().returns(mockProxyquire);
    mockProxyquire.noCallThru = stub().returns(mockProxyquire);

    mocks['proxyquire'] = mockProxyquire;

    pquire = proxyquire(tquire(me, false), mocks);
  });

  it('should call a relative path which exists', () => {
    const fullPath = path.resolve(__dirname, tquire(me, false));

    pquire(info)(me, mocksSymbol);

    const filename = mockProxyquire.args.shift().shift();
    const resolvedPath = path.resolve(
      __dirname,
      path.dirname(fullPath),
      filename,
    );

    expect(fs.existsSync(resolvedPath), `${resolvedPath} exists`).to.equal(
      true,
    );
  });

  it('should work for other paths', () => {
    const fullPath = path
      .resolve(__dirname, tquire(me, false))
      .replace('pquire', 'tquire');
    const info = {
      directories: {
        src: '/1/src',
        //src: `${process.cwd()}/src`,
        test: '/2/test/integration',
        //root: process.cwd(),
        root: '/1',
      },
    };

    pquire(info)(
      me
        .replace('pquire', 'tquire')
        .replace(new RegExp(/.*integration/), info.directories.test),
      mocksSymbol,
    );

    const filename = mockProxyquire.args.shift().shift();
    const resolvedPath = path.resolve(
      __dirname,
      path.dirname(fullPath),
      filename,
    );

    expect(filename).to.equal('./tquire.js');
    expect(fs.existsSync(resolvedPath), `${resolvedPath} exists`).to.equal(
      true,
    );
  });
});
