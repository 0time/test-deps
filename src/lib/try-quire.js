module.exports = (x, def = {}) => {
  try {
    return require(x);
  } catch (err) {
    return def;
  }
};
