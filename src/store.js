import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const deepCopy = obj => JSON.parse(JSON.stringify(obj));

export default new Vuex.Store({
  state: {
    shoppingList: [],
    recipes: [
      {
        title: 'low knead pizza',
        ingredients: [
          {
            name: 'Mehl',
            quantity: 300,
            unit: 'g',
          },
        ],
        preparation: 'lorem ipsum dolor sit amit',
        peopleCount: 1,
        cookTimeInMinutes: 60,
      },
    ],
  },
  getters: {
    recipeList: state => () => state.recipes.map(recipe => ({
      title: recipe.title,
      cookTimeInMinutes: recipe.cookTimeInMinutes,
    })),
    recipeByTitle: state => title => deepCopy(state.recipes.find(recipe => recipe.title === title)),
  },
  mutations: {
    addToShoppingList(state, payload) {
      state.shoppingList = state.shoppingList.concat(payload); // eslint-disable-line
    },
    clearShoppingList(state) {
      state.shoppingList = []; // eslint-disable-line
    },
    updateRecipe(state, payload) {
      const index = state.recipes.findIndex(recipe => recipe.title === payload.originalTitle);
      state.recipes[index] = deepCopy(payload.recipe); // eslint-disable-line
      console.log('store', state.recipes);
    },
  },
  actions: {

  },
});
