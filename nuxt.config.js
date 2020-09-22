export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    [
      'nuxt-i18n',
      {
        vueI18nLoader: true,
      },
    ],
    'nuxt-polyfill',
    'portal-vue/nuxt',
  ],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'en',
  },
  fontawesome: {
    icons: {
      solid: [
        'faEdit',
        'faPlus',
        'faPen',
        'faMinus',
        'faClock',
        'faUpload',
        'faUserFriends',
        'faAngleDown',
        'faDownload',
        'faShoppingCart',
        'faCheck',
        'faCheckDouble',
        'faHamburger',
      ],
    },
  },
  polyfill: {
    features: [
      {
        require: '@juggle/resize-observer',
        detect: () => 'ResizeObserver' in window,
        install: (ResizeObserver) => {
          window.ResizeObserver = ResizeObserver.ResizeObserver
        },
      },
    ],
  },
}
