import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// import createGithubStoragePlugin from './plugins/githubStorage';
import recipes from './modules/recipes';
import shoppingList from './modules/shoppingList';
import weekly from './modules/weekly';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    recipes,
    shoppingList,
    weekly,
  },
  plugins: [
    createPersistedState(),
    // createGithubStoragePlugin(),
  ],
});
