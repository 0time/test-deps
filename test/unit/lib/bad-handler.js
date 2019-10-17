const {
  d,
  expect,
  sinon,
  sinon: { stub },
  tquire,
} = deps;

d(__filename, () => {
  const badHandlerCreator = tquire(__filename);

  describe('given a mock globalContext', () => {
    const error = stub();
    const exit = stub();

    const input = Symbol();

    let badHandler = null;

    beforeEach(() => {
      badHandler = badHandlerCreator({
        console: {
          error,
        },
        process: {
          exit,
        },
      });
    });

    afterEach(() => {
      sinon.resetHistory();
    });

    it('should console.error the error', () => {
      badHandler(input);

      expect(error).to.have.been.calledOnceWithExactly(input);
    });

    it('should exit with error code 255', () => {
      badHandler(input);

      expect(exit).to.have.been.calledOnceWithExactly(255);
    });
  });
});
