const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
  // publicPath: process.env.NODE_ENV === 'production' ? '/garbanzo/' : '/',
  pwa: {
    appleMobileWebAppCapable: 'yes',
  },
  configureWebpack: {
    // Merged into the final Webpack config
    //plugins: [
    //  new PurgecssPlugin({
    //    paths: glob.sync([
    //      path.join(__dirname, './src/index.html'),
    //      path.join(__dirname, './**/*.vue'),
    //      path.join(__dirname, './src/**/*.js'),
    //    ]),
    //    whitelist: ['has-navbar-fixed-top'],
    //  }),
    //],
  },
};
