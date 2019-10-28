import Vue from 'vue';

const deepCopy = obj => JSON.parse(JSON.stringify(obj));

export default {
  namespaced: true,
  state: [],
  getters: {
    entries: (state) => {
      console.log('entries');
      return deepCopy(state);
    },
  },
  mutations: {
    addItem(state, payload) {
      console.log('addItem', state, payload);
      Vue.set(state, [...state, ...((Array.isArray(payload) ? payload : [payload]))]);
      state = [...state, ...((Array.isArray(payload) ? payload : [payload]))]; // eslint-disable-line
      console.log('addItem', state);
    },
    clear(state) { // eslint-disable-line no-unused-vars
      state = []; // eslint-disable-line no-param-reassign
    },
    update(state, payload) {
      state = deepCopy(payload); // eslint-disable-line
    },
  },
};
