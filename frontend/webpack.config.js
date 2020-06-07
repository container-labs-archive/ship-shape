require('@babel/register');

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const alias = require('./webpack/alias');
const loaderRules = require('./webpack/loader-rules');
// const StyleLintPlugin = require('stylelint-webpack-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // context: path.join(__dirname, './src'),
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    // 'core-js/stable',
    // 'regenerator-runtime/runtime',
    './src/js/main.js',
  ],
  resolve: {
    alias: {
      ...alias,
      'react-dom': '@hot-loader/react-dom',
    },
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
    splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
    },
    runtimeChunk: {
			name: 'manifest',
		},
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('local'),
        NODE_BUILD_ENV: JSON.stringify('local'),
      },
    }),
    new HtmlWebpackPlugin({
      favicon: './dist/favicon-ship.png',
      filename: '../index.html',
    }),
    // new StyleLintPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
};
