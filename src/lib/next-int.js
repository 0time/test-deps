module.exports = (max, min = 0, MathLib = Math) =>
  MathLib.floor(MathLib.random() * MathLib.floor(max - min)) + min;
