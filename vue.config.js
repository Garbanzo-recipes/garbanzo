module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/garbanzo/' : '/',
  pwa: {
    appleMobileWebAppCapable: 'no', // explicitly disabled, as camera doesn't work on iOS in fullscreen mode
  },
};
