const { NODE_ENV } = process.env;

const defaultColorSettings = {
  integration: {
    yellow: 50,
    green: 70,
  },
  unit: {
    yellow: 90,
    green: 95,
  },
};

defaultColorSettings.default = defaultColorSettings.unit;

const getColorSettings = (colorSettings = defaultColorSettings) =>
  colorSettings[NODE_ENV] || colorSettings.default;

const setAllCategoriesTo = inp => ({
  branches: inp,
  functions: inp,
  lines: inp,
  statements: inp,
});

const getWatermarks = ({ yellow, green }) =>
  setAllCategoriesTo([yellow, green]);
const getCoverageLevels = ({ yellow }) => setAllCategoriesTo(yellow);

module.exports = Object.assign(
  {
    all: true,
    'check-coverage': true,
    forceColor: true,
    include: ['src'],
    reporter: ['lcov', 'text', 'text-summary'],
    watermarks: getWatermarks(getColorSettings()),
  },
  getCoverageLevels(getColorSettings()),
);

// This just prints everything if you execute this directly like so:
//   node nyc.config.js
if (require.main === module) {
  console.error(module.exports); // eslint-disable-line no-console
}

module.exports.getColorSettings = getColorSettings;
module.exports.getWatermarks = getWatermarks;
module.exports.getCoverageLevels = getCoverageLevels;
module.exports.setAllCategoriesTo = setAllCategoriesTo;
