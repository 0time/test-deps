const path = require('path');
const proxyquire = require('proxyquire')
  .noPreserveCache()
  .noCallThru();

const {
  d,
  expect,
  sinon: { spy, stub },
  tquire,
} = deps;

const me = __filename;

d(me, () => {
  const filename = Symbol();
  const mockPathDirnameResult = Symbol();
  const mockPathJoinResult = Symbol();
  const mockPathRelativeRootSrcResult = Symbol();
  const mockPathRelativeTestFilenameResult = Symbol();
  const mockProxyquireResult = Symbol();
  const mockSpecialRelativeResult = Symbol();
  const mocksSymbol = Symbol();
  const root = Symbol();
  const src = Symbol();
  const test = Symbol();

  let info = null;
  let mocks = null;
  let mockNoCallThru = null;
  let mockNoPreserveCache = null;
  let mockPath = null;
  let mockPathDirname = null;
  let mockPathJoin = null;
  let mockPathRelative = null;
  let mockProxyquire = null;
  let mockSpecialRelative = null;
  let pquire = null;

  beforeEach(() => {
    mocks = {};

    mockPathDirname = stub().returns(mockPathDirnameResult);
    mockPathJoin = stub().returns(mockPathJoinResult);

    mockPathRelative = spy((a, b) => {
      if (a === root && b === src) {
        return mockPathRelativeRootSrcResult;
      } else if (a === test && b === filename) {
        return mockPathRelativeTestFilenameResult;
      } else {
        throw new Error('unmatched pair');
      }
    });

    mockPath = {
      dirname: mockPathDirname,
      join: mockPathJoin,
      relative: mockPathRelative,
    };

    mockSpecialRelative = stub().returns(mockSpecialRelativeResult);

    mockNoCallThru = stub().returns(mockProxyquireResult);
    mockNoPreserveCache = stub().returns({ noCallThru: () => mockNoCallThru });
    mockProxyquire = { noPreserveCache: mockNoPreserveCache };

    mocks['path'] = mockPath;
    mocks['proxyquire'] = mockProxyquire;
    mocks['../tquire/special-relative'] = mockSpecialRelative;

    info = { directories: { root, src, test } };

    pquire = proxyquire(tquire(me, false), mocks)(info);
  });

  it('should configure proxyquire', () => {
    pquire(filename, mocksSymbol);

    expect(mockNoPreserveCache).to.have.been.calledOnceWithExactly();
    expect(mockNoCallThru).to.have.been.calledOnceWithExactly(
      mockSpecialRelativeResult,
      mocksSymbol,
    );
  });

  it('should call specialRelative with the dirname and the joined path', () => {
    pquire(filename, mocksSymbol);

    expect(mockSpecialRelative).to.have.been.calledOnceWithExactly(
      mockPathDirnameResult,
      mockPathJoinResult,
    );
  });

  it('should call dirname with the relativeFilename', () => {
    pquire(filename, mocksSymbol);

    expect(mockPathDirname).to.have.been.calledOnceWithExactly(
      path.resolve(__dirname, tquire(me, false)),
    );
  });

  it('should call join with the root+src and test+filename results', () => {
    pquire(filename, mocksSymbol);

    expect(mockPathJoin).to.have.been.calledOnceWithExactly(
      mockPathRelativeRootSrcResult,
      mockPathRelativeTestFilenameResult,
    );
  });

  it('should call mockPathRelative first with root+src then with test+filename', () => {
    pquire(filename, mocksSymbol);

    expect(mockPathRelative.args).to.deep.equal([
      [root, src],
      [test, filename],
    ]);
  });

  it('should call proxyquire with the specialRelativeResult', () =>
    expect(pquire(filename, mocksSymbol)).to.equal(mockProxyquireResult));
});
