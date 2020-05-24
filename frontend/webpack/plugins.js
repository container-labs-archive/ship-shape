const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
// const BrotliPlugin = require('brotli-webpack-plugin');
// const HtmlWebpackBrotliPlugin = require('html-webpack-brotli-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

// console.log('plugins');
// console.log(path.resolve('./dist/index-template.html'),)

module.exports = [

  new HtmlWebpackPlugin({
    chunksSortMode: (chunk1, chunk2) => {
      const orders = ['common', 'polly', 'vendor', 'main'];
      const order1 = orders.indexOf(chunk1.names[0]);
      const order2 = orders.indexOf(chunk2.names[0]);
      if (order1 > order2) {
        return 1;
      } else if (order1 < order2) {
        return -1;
      }
      return 0;
    },
    filename: 'index.html',
    template: path.resolve('./dist/index-template.html'),
    // addBrotliExtension: true,
  }),
  // new BrotliPlugin({
  //   asset: '[path].br[query]',
  //   test: /\.(js|css|html|svg)$/,
  //   threshold: 10240,
  //   minRatio: 0.8,
  // }),
  // new HtmlWebpackBrotliPlugin(),
  new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  // new webpack.ContextReplacementPlugin(
  //   /moment[\/\\]locale$/,
  //   /en-gb/
  // ),
  new webpack.HashedModuleIdsPlugin(),
  new webpack.SourceMapDevToolPlugin({
    filename: '[name]-[hash:6].min.js.map',
    exclude: ['vendor-[hash:6].min.js'],
  }),

];
