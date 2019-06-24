module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/garbanzo/' : '/',
  pwa: {
    appleMobileWebAppCapable: 'yes',
  },
};
