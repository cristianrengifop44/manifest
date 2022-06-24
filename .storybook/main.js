module.exports = {
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  core: {
    builder: 'webpack5',
  },
  staticDirs: ['public'],
  stories: ['../packages/**/*.stories.mdx', '../packages/**/*.stories.@(js|jsx|ts|tsx)'],
};
