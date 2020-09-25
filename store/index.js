import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import recipes from './recipes'
import shoppingList from './shoppingList'
import weekly from './weekly'

Vue.use(Vuex)

export default () =>
  new Vuex.Store({
    modules: {
      recipes,
      shoppingList,
      weekly,
    },
    plugins: [
      createPersistedState(),
      // createGithubStoragePlugin(),
    ],
  })
