module.exports = {
  core: {
    builder: "webpack5"
  },
  framework: '@storybook/vue',
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false
      }
    }
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...(config.resolve?.alias || {}),
      vue$: 'vue/dist/vue.esm.js'
    };

    config.module.rules.push({
      test: /\.ts$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      ]
    });

    return config;
  }
}
