import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shoppingList: [],
    recipes: [],
  },
  getters: {
  },
  mutations: {
    addToShoppingList(state, payload) {
      state.shoppingList = state.shoppingList.concat(payload); // eslint-disable-line
    },
    clearShoppingList(state) {
      state.shoppingList.length = 0; // eslint-disable-line
    },
  },
  actions: {

  },
});
