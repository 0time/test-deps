const {
  d,
  expect,
  sinon: { stub },
  tquire,
} = deps;

d(__filename, () => {
  let path = null;
  let relative = null;

  const specialRelative = (from, to) => {
    relative = stub().returns(path);

    const result = tquire(__filename)._impl({ path: { relative } })(from, to);

    expect(relative).to.have.been.calledOnceWithExactly(from, to);

    return result;
  };

  describe('given a path which starts with a /', () => {
    beforeEach(() => {
      path = process.cwd();
    });

    it('should leave it unmodified', () =>
      expect(specialRelative('/', path)).to.equal(path));
  });

  describe('given a path which starts with a .', () => {
    beforeEach(() => {
      path = './path/to/location';
    });

    it('should leave it unmodified', () =>
      expect(specialRelative(process.cwd(), path)).to.equal(path));
  });

  describe('given a path which starts with a letter', () => {
    beforeEach(() => {
      path = 'path/to/location';
    });

    it('should produce a leading ./', () =>
      expect(specialRelative(process.cwd(), path)).to.equal(`./${path}`));
  });
});
