const { d, expect, tquire } = deps;

d(__filename, () => {
  const index = tquire(__filename);

  it('should export tquire', () => {
    expect(index).to.have.property('tquire', tquire);
  });
});
