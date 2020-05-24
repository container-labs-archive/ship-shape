const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const alias = require('./alias');
const loaderRules = require('./loader-rules');
const plugins = require('./plugins');

console.log('plugins');
console.log(path.resolve('./dist/'),)

const baseConfig = {
  mode: 'production',
  entry: [
    // 'core-js/stable',
    // 'regenerator-runtime/runtime',
    './src/js/main.js',
  ],
  resolve: {
    alias,
    extensions: ['*', '.js', '.jsx'],
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
  },
  module: {
    rules: loaderRules,
  },
  output: {
    path: path.resolve('./dist/'),
    filename: '[name]-[hash:6].min.js',
    publicPath: '/',
    sourceMapFilename: '[name]-[hash:6].js.map',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true,
          chunks: 'all',
        },
      },
    },
    minimizer: [new TerserPlugin({
      parallel: true,
      sourceMap: true,
      extractComments: true,
    })],
    usedExports: true,
  },
  plugins: [
    ...plugins,
  ],
};

module.exports = baseConfig;
