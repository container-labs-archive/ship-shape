require('@babel/register');

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const alias = require('./webpack/alias');
const loaderRules = require('./webpack/loader-rules');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: [
    './src/js/sandbox.js',
  ],
  resolve: {
    alias,
    extensions: ['*', '.js', '.jsx'],
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
  },
  devServer: {
    contentBase: path.resolve('./src'),
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 4000,
  },
  module: {
    rules: loaderRules,
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('local'),
        NODE_BUILD_ENV: JSON.stringify('local'),
      },
    }),
    new HtmlWebpackPlugin({
      favicon: './dist/favicon.png',
      filename: '../index.html',
    }),
    new StyleLintPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
};
