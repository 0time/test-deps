const { d, expect, tquire } = deps;

const me = __filename;

d(me, () => {
  const nextIntImpl = tquire(me);

  const getMathLib = randomValue => ({
    floor: Math.floor,
    random: () => randomValue,
  });

  describe('given random=zero', () => {
    let nextInt = null;

    beforeEach(() => {
      nextInt = (a, b) => nextIntImpl(a, b, getMathLib(0));
    });

    it('should give the low value', () =>
      expect(nextInt(5, undefined)).to.equal(0));

    it('should give the low value', () => expect(nextInt(5, 0)).to.equal(0));

    it('should give the low value', () => expect(nextInt(5, 1)).to.equal(1));
  });

  describe('given random=1', () => {
    let nextInt = null;

    beforeEach(() => {
      nextInt = (a, b) => nextIntImpl(a, b, getMathLib(1));
    });

    it('should give the high value', () =>
      expect(nextInt(5, undefined)).to.equal(5));

    it('should give the high value', () => expect(nextInt(5, 0)).to.equal(5));

    it('should give the high value', () => expect(nextInt(5, 1)).to.equal(5));
  });

  describe('given unspecified random lib', () => {
    const LOW = 1;
    const HIGH = 10;
    let nextInt = null;

    beforeEach(() => {
      nextInt = (a, b) => nextIntImpl(a, b, undefined);
    });

    it('should give a value inclusively between the low and high values', () =>
      expect(nextInt(HIGH, LOW))
        .to.be.at.least(LOW)
        .and.at.most(HIGH));

    it('should give a value inclusively between the low and high values', () =>
      expect(nextInt(HIGH))
        .to.be.at.least(0)
        .and.at.most(HIGH));
  });
});
