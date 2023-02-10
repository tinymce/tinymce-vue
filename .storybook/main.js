module.exports = {
  core: {
    builder: "webpack5"
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false
      }
    }
  ]
}