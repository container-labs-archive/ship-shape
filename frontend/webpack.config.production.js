require('@babel/register');

const webpack = require('webpack');
// const SentryCliPlugin = require('@sentry/webpack-plugin');
// const GitRevisionPlugin = require('git-revision-webpack-plugin');
const baseConfig = require('./webpack/base-config');

// const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        NODE_BUILD_ENV: JSON.stringify('production'),
        // GIT_SHA: JSON.stringify(gitRevisionPlugin.commithash()),
        // RELEASE: JSON.stringify(`frontend-${gitRevisionPlugin.commithash()}`),
      },
    }),
    // new SentryCliPlugin({
    //   configFile: '.sentryclirc',
    //   include: '.',
    //   ignore: ['node_modules', 'webpack.config.staging.js'],
    //   release: `frontend-production-${gitRevisionPlugin.commithash()}`,
    // }),
  ],
};
