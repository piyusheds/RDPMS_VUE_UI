import { createStore } from 'vuex';

const store = createStore({
  state: {
    token: localStorage.getItem('authToken') || null,  // Initialize token from localStorage
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    login({ commit }, token) {
      commit('setToken', token);
      localStorage.setItem('authToken', token);  // Save token in localStorage
    },
    logout({ commit }) {
      commit('setToken', null);
      localStorage.removeItem('authToken');
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
  },
});

export default store;
