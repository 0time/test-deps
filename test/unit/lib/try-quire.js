const {
  d,
  expect,
  sinon: { stub },
  tquire,
} = deps;

const me = __filename;

d(__filename, () => {
  let packageToRequire = null;
  let specifiedDefault = null;

  beforeEach(() => {
    packageToRequire = Symbol();
    specifiedDefault = Symbol();
  });

  describe('given an erroring require call', () => {
    let errorSymbol = null;
    let mockRequire = null;
    let tryquire = null;

    beforeEach(() => {
      errorSymbol = Symbol();
      mockRequire = stub().throws(errorSymbol);
      tryquire = tquire(me).injectableTryquire({ require: mockRequire });
    });

    it('should return the default', () => {
      expect(tryquire(packageToRequire)).to.deep.equal({});
      expect(mockRequire).to.have.been.calledOnceWithExactly(packageToRequire);
    });

    it('should return the specified default', () => {
      expect(tryquire(packageToRequire, specifiedDefault)).to.equal(
        specifiedDefault,
      );
      expect(mockRequire).to.have.been.calledOnceWithExactly(packageToRequire);
    });
  });

  describe('given a succeeding requrie call', () => {
    let successSymbol = null;
    let mockRequire = null;
    let tryquire = null;

    beforeEach(() => {
      successSymbol = Symbol();
      mockRequire = stub().returns(successSymbol);
      tryquire = tquire(me).injectableTryquire({ require: mockRequire });
    });

    it('should return the package', () => {
      expect(tryquire(packageToRequire)).to.equal(successSymbol);
      expect(mockRequire).to.have.been.calledOnceWithExactly(packageToRequire);
    });

    it('should return the package', () => {
      expect(tryquire(packageToRequire, specifiedDefault)).to.equal(
        successSymbol,
      );
      expect(mockRequire).to.have.been.calledOnceWithExactly(packageToRequire);
    });
  });
});
