const deepCopy = obj => JSON.parse(JSON.stringify(obj));

export default {
  state: {
    shoppingList: [],
  },
  getters: {
    shoppingList: state => deepCopy(state.shoppingList),
  },
  mutations: {
    addToShoppingList(state, payload) {
      state.shoppingList = state.shoppingList.concat(payload); // eslint-disable-line
    },
    clearShoppingList(state) {
      state.shoppingList = []; // eslint-disable-line
    },
    updateShoppingList(state, payload) {
      state.shoppingList = deepCopy(payload); // eslint-disable-line
    },
  },
};
