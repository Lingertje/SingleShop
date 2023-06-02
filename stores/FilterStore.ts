import { createStore } from 'vuex'

export const FilterStore = createStore({
  state () {
    return {
      filters: {}
    }
  },
  mutations: {
    add (state, payload) {
      state.filters = { ...state.filters, ...payload }
    },
	remove (state, payload) {
		// @ts-ignore
		delete state.filters[payload];
	},
	clear (state) {
		state.filters = {};
	}
  }
})
