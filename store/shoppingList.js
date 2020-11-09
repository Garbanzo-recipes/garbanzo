const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))

export default {
  namespaced: true,

  state: {
    entries: [],
  },

  getters: {
    entries: (state) => deepCopy(state.entries),
  },

  mutations: {
    addItems(state, payload) {
      state.entries = [...state.entries, ...payload]
    },

    addItem(state, payload) {
      state.entries = [...state.entries, payload]
    },

    clear(state) {
      state.entries = []
    },

    update(state, payload) {
      state.entries = deepCopy(payload)
    },
  },
}
