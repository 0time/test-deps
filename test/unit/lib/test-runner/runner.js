const { d, expect, tquire } = deps;

d(__filename, () => {
  const runner = tquire(__filename);
  const thing = Symbol();

  it('should work with a promise functionToTest', () =>
    expect(
      runner(deps, {
        expected: thing,
        functionToTest: () => Promise.resolve(thing),
      }),
    ).to.eventually.be.fulfilled.then(actual =>
      expect(actual).to.deep.equal(thing),
    ));
});
