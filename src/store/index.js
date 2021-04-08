import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '../services/AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    apiUrl: 'http://localhost:3000',
    username: null,
    role: null,
    userId: null
  },
  mutations: {
    async authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn()
      if (state.isLoggedIn) {
        state.username = auth.getUsername()
        state.userId = auth.getUserId()
        state.isAdmin = (auth.isAdmin() === 'admin')
        state.name = auth.getName()
        console.log(state)
      } else {
        state.username = null
        state.userId = null
      }
    }
  },
  actions: {
    authenticate(context) {
      context.commit('authenticate')
    }
  }
})
