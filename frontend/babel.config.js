module.exports = function (api) {
  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
      },
    ],
    '@babel/preset-flow',
    '@babel/preset-react',
  ];
  const plugins = [
    ['babel-plugin-webpack-aliases', { config: './webpack.config.js' }],
    // "react-hot-loader/babel",
    [
      '@babel/proposal-decorators',
      {
        legacy: true,
      },
    ],
    // todo, use hooks and functions, then rip out
    [
      '@babel/proposal-class-properties',
      {
        loose: false,
      },
    ],
    [
      '@babel/transform-destructuring',
      {
        loose: true,
      },
    ],
    'react-html-attrs',
    '@babel/transform-arrow-functions',
  ];

  api.cache(false);

  return {
    presets,
    plugins,
  };
};
