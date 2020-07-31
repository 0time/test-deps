const injectableTryquire = ({ require }) => (x, def = {}) => {
  try {
    return require(x);
  } catch (err) {
    return def;
  }
};

module.exports = injectableTryquire({ require });
module.exports.injectableTryquire = injectableTryquire;
