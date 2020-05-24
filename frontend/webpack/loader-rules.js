var path = require('path');

module.exports = [
  {
    test: /\.js/,
    exclude: /(node_modules|bower_components|dist|test|webpack|flow-typed)/,
    use: [{
      loader: 'babel-loader',
      options: {
        // configFile: false,
        // rootMode: "upward",
      },
    }],
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
    type: 'javascript/auto',
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'postcss-loader'],
  },
  {
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: 'graphql-tag/loader',
  },
  {
    test: /\.(jpg|png)$/,
    loader: 'url-loader',
    options: {
      limit: 25000,
    },
  },
  { test: /\.svg$/, use: { loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]' } },
  { test: /\.woff$/, use: { loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]' } },
  { test: /\.woff2$/, use: { loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]' } },
  { test: /\.[ot]tf$/, use: { loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]' } },
  { test: /\.eot$/, use: { loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]' } },
];
