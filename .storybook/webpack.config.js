const path = require('path');

module.exports = async ({ config, mode }) => {

  config.module.rules.push({
    test: /\.tsx?$/,
    loader: 'ts-loader',
    include: [
      path.join(__dirname, '../src'),
      path.join(__dirname, '../stories')
    ]
  });

  config.resolve =  {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    enforceExtension: false
  };

  return config;
};
