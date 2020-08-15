const path = require('path');
const proxyquire = require('proxyquire')
  .noPreserveCache()
  .noCallThru();

const {
  d,
  expect,
  sinon: { spy, stub },
  tquire,
  uuid,
} = deps;

const me = __filename;

d(me, () => {
  let filename = null;
  let mockPathDirnameResult = null;
  let mockPathJoinResult = null;
  let mockPathRelativeRootSrcResult = null;
  let mockPathRelativeTestFilenameResult = null;
  let mockProxyquireResult = null;
  let mockSRelativeResult = null;
  let mocksSymbol = null;
  let root = null;
  let src = null;
  let test = null;

  let info = null;
  let mocks = null;
  let mockNoCallThru = null;
  let mockNoPreserveCache = null;
  let mockPath = null;
  let mockPathDirname = null;
  let mockPathJoin = null;
  let mockPathRelative = null;
  let mockProxyquire = null;
  let mockSRelative = null;
  let pquire = null;

  beforeEach(() => {
    filename = `filename-${uuid()}`;
    mockPathDirnameResult = `mock-path-dirname-result-${uuid()}`;
    mockPathJoinResult = `mock-path-join-result-${uuid()}`;
    mockPathRelativeRootSrcResult = `mock-path-relative-root-src-result-${uuid()}`;
    mockPathRelativeTestFilenameResult = `mock-path-relative-test-filename-result-${uuid()}`;
    mockProxyquireResult = `mock-proxyquire-result-${uuid()}`;
    mockSRelativeResult = `mock-special-relative-result-${uuid()}`;
    mocksSymbol = `mocks-symbol-${uuid()}`;
    root = `root-${uuid()}`;
    src = `src-${uuid()}`;
    test = `test-${uuid()}`;

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

    mockSRelative = stub().returns(mockSRelativeResult);

    mockPath = {
      dirname: mockPathDirname,
      join: mockPathJoin,
      relative: mockPathRelative,
      srelative: mockSRelative,
    };

    mockNoCallThru = stub().returns(mockProxyquireResult);
    mockNoPreserveCache = stub().returns({ noCallThru: () => mockNoCallThru });
    mockProxyquire = { noPreserveCache: mockNoPreserveCache };

    mocks['@0ti.me/en-path'] = mockPath;
    mocks['proxyquire'] = mockProxyquire;

    info = { directories: { root, src, test } };

    pquire = proxyquire(tquire(me, false), mocks)(info);
  });

  it('should configure proxyquire', () => {
    pquire(filename, mocksSymbol);

    expect(mockNoPreserveCache).to.have.been.calledOnceWithExactly();
    expect(mockNoCallThru).to.have.been.calledOnceWithExactly(
      mockSRelativeResult,
      mocksSymbol,
    );
  });

  it('should call specialRelative with the dirname and the joined path', () => {
    pquire(filename, mocksSymbol);

    expect(mockSRelative).to.have.been.calledOnceWithExactly(
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
