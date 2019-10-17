module.exports = ({ console, process }) => err => {
  console.error(err);

  process.exit(255);
};
