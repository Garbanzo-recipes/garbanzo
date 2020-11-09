/*
 *  This is mostly copied from:
 *  https://github.com/chiubaca/vue-netlify-fauna-starter-kit/blob/master/src/store/modules/auth.js
 */

import GoTrue from 'gotrue-js'

const isDevEnv = (hostName) => {
  // https://stackoverflow.com/questions/5284147/validating-ipv4-addresses-with-regexp/57421931#57421931
  const IPv4Pattern = /\b((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\b/
  return hostName.match(IPv4Pattern) || hostName === 'localhost'
}

export default {
  namespaced: true,

  state() {
    return {
      currentUser: null,
      GoTrueAuth: null,
    }
  },

  getters: {
    loggedIn: (state) => !!state.currentUser,

    currentUser: (state) => state.currentUser,

    netlifyUserLoggedIn: (state) => !!state.GoTrueAuth.currentUser(),

    currentNetlifyUser: (state) => state.GoTrueAuth.currentUser(),
  },

  mutations: {
    SET_GOTRUE(state, value) {
      state.GoTrueAuth = value
    },

    SET_CURRENT_USER(state, value) {
      state.currentUser = value
    },
  },

  actions: {
    /**
     * Initialises a GoTrue instance. This method also checks if user is in a local environment  based on the URL.
     * @param {*} store - vuex store object
     */
    initAuth({ commit, rootGetters }) {
      const hostName = document.location.hostname
      const APIUrl = `https://${hostName}/.netlify/identity`

      // Detect if app is being run in a development environment
      if (isDevEnv(hostName)) {
        return
      }

      console.log('Initialising Go True client with ', APIUrl)
      commit(
        'SET_GOTRUE',
        new GoTrue({
          APIUrl,
          audience: '',
          setCookie: false,
        })
      )
    },

    /**
     *
     * @param {*} store - vuex store object
     * @param {object} credentials - object containing email and password
     * @property {string} credentials.email - email of the user eg hello@email.com
     * @property {string} credentials.password - password string
     */
    attemptSignup({ state }, credentials) {
      console.log(`Attempting signup for ${credentials.email}...`, credentials)

      return state.GoTrueAuth.signup(credentials.email, credentials.password, {
        full_name: credentials.name,
      })
    },

    /**
     * This confirms a new user from an email signup by parsing the token which has been extracted from the Netlify
     * confirmation email.
     * @param {*} store - vuex store object
     * @param {string} token - token from confimration email eg. "BFX7olHxIwThlfjLGGfaCA"
     */
    attemptConfirmation({ state }, token) {
      console.log('Attempting to verify token', token)

      return state.GoTrueAuth.confirm(token)
    },

    /**
     * Authorise and login users via email
     * @param {*} store - vuex store object
     * @param {object} credentials - object containing email and password
     * @property {string} credentials.email - email of the user eg hello@email.com
     * @property {string} credentials.password - password string
     */
    async attemptLogin({ commit, state }, credentials) {
      console.log(`Attempting login for ${credentials.email}`)

      const response = await state.GoTrueAuth.login(
        credentials.email,
        credentials.password,
        true
      )
      commit('SET_CURRENT_USER', response)
    },

    /**
     * Sign out the current user if they are logged in.
     * @param {*} store - vuex store object
     */
    async attemptLogout({ state, commit }) {
      try {
        await state.GoTrueAuth.currentUser().logout()
      } finally {
        commit('SET_CURRENT_USER', null)
      }
    },
  },
}
