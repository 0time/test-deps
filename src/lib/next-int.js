module.exports = (max = Number.MAX_SAFE_INTEGER, min = 0, MathLib = Math) =>
  MathLib.floor(MathLib.random() * MathLib.floor(max - min)) + min;
