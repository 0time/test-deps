const { d, expect, tquire } = deps;

const fname = __filename.replace(/index\.js$/, 'special-relative.js');

d(__filename, () => {
  describe('if called without requesting a require', () => {
    it('should return the relative path instead', () =>
      expect(tquire(fname)).to.equal(require(tquire(fname, false))));
  });
});
