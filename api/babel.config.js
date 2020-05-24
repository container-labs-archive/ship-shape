module.exports = function (api) {
  const presets = [
    "@babel/preset-flow",
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "10.15.3"
        },
        "loose": true
      }
    ]
  ];
  const plugins = [
    "add-module-exports",
    "transform-imports",
    "transform-inline-environment-variables",
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": false
      }
    ],
    "@babel/plugin-proposal-json-strings",
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    "@babel/transform-runtime",
    [
      "@babel/plugin-transform-destructuring",
      {
        "loose": true
      }
    ],
    [
      "@babel/plugin-transform-spread",
      {
        "loose": true
      }
    ]
   ];

   api.cache(true);

  return {
    presets,
    plugins,
  };
}
