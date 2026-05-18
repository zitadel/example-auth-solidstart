module.exports = {
  ignoreDependencies: [
    '@commitlint/config-conventional',
    '@zitadel/solidstart-auth',
  ],
  entry: [
    'src/entry-*',
    'src/app.tsx',
    'app.config.*',
    'src/routes/**/*',
    'src/components/**/*',
    'src/lib/**/*',
  ],
  ignore: ['commitlint.config.js', 'app.config.timestamp_*.js'],
};
