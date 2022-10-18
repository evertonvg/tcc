import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
      imageMessage:null
    },
    message:null,
    loading:true,
  },
  getters: {
    user(state){
      return state.user
    },
    message(state){
      return state.message
    },
    imageMessage(state){
      return state.imageMessage
    },
    loading(state){
      return state.loading
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_MESSAGE(state, data) {
      state.message = data;
    },
    SET_IMAGE_MESSAGE(state, data) {
      state.imageMessage = data;
    },
    SET_LOADING(state,data){
      state.loading = data
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    }
  }
});
