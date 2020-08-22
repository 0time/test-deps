const { CHECK_COVERAGE, NODE_ENV, NYC_REPORTERS } = process.env;

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
const defaultReporters = ['lcov', 'text', 'text-summary'];

defaultColorSettings.default = defaultColorSettings.unit;

const getColorSettings = (colorSettings = defaultColorSettings) =>
  colorSettings[NODE_ENV] || colorSettings.default;

const setAllCategoriesTo = inp => ({
  branches: inp,
  functions: inp,
  lines: inp,
  statements: inp,
});

const getCheckCoverage = () => (CHECK_COVERAGE === '' ? false : true);
const getCoverageLevels = ({ yellow }) => setAllCategoriesTo(yellow);
const getReporters = () =>
  NYC_REPORTERS !== undefined
    ? NYC_REPORTERS === ''
      ? []
      : NYC_REPORTERS.split(',')
    : defaultReporters;
const getWatermarks = ({ yellow, green }) =>
  setAllCategoriesTo([yellow, green]);

module.exports = Object.assign(
  {
    all: true,
    'check-coverage': getCheckCoverage(),
    forceColor: true,
    include: ['src'],
    reporter: getReporters(),
    watermarks: getWatermarks(getColorSettings()),
  },
  getCheckCoverage() ? getCoverageLevels(getColorSettings()) : {},
);

// This just prints everything if you execute this directly like so:
//   node nyc.config.js
if (require.main === module) {
  console.error(module.exports); // eslint-disable-line no-console
}

module.exports.setAllCategoriesTo = setAllCategoriesTo;
module.exports.getColorSettings = getColorSettings;
module.exports.getCoverageLevels = getCoverageLevels;
module.exports.getReporters = getReporters;
module.exports.getWatermarks = getWatermarks;
