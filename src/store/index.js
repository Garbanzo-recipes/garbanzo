import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import recipes from './modules/recipes';
import shoppingList from './modules/shoppingList';

Vue.use(Vuex);

const deepCopy = obj => JSON.parse(JSON.stringify(obj));

export default new Vuex.Store({
  modules: {
    recipes,
    shoppingList,
  },
  plugins: [createPersistedState()],
});
