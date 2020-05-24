const path = require('path');

module.exports = {
  Apollo: path.resolve(__dirname, '../src/js/apollo.js'),
  Assets: path.resolve(__dirname, '../src/assets'),
  Config: path.resolve(__dirname, '../src/js/config/index.js'),
  Components: path.resolve(__dirname, '../src/js/components'),
  Middleware: path.resolve(__dirname, '../src/js/redux/middleware'),
  HOCS: path.resolve(__dirname, '../src/js/components/Hocs/index.js'),
  Query: path.resolve(__dirname, '../src/js/graphql'),
  Redux: path.resolve(__dirname, '../src/js/redux'),
  Types: path.resolve(__dirname, '../src/js/utils/types.js'),
  Utils: path.resolve(__dirname, '../src/js/utils'),
};
