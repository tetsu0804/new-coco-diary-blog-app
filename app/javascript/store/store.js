import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
    last_name: '',
    first_name: '',
    email: '',
    signIn: ''
  },
  mutations: {
    fetchUserId(state, id) {
      state.id = id
    },
    fetchUserLastName(state, last_name) {
      state.last_name = last_name
    },
    fetchUserFirstName(state, first_name) {
      state.first_name = first_name
    },
    fetchUserEmail(state, email) {
      state.email = email
    },
    fetchUserSignIn(state, signin) {
      state.signIn = signin
    }
  },
  actions: {
    doFetchUserId( { commit }, id) {
      commit('fetchUserId', id)
    },
    doFetchUserLastName( { commit }, last_name) {
      commit('fetchUserLastName', last_name)
    },
    doFetchUserFirstName( { commit }, first_name) {
      commit('fetchUserFirstName', first_name)
    },
    doFetchUserEmail( { commit }, email) {
      commit('fetchUserEmail', email)
    },
    doFetchUserSignIn( { commit }, signin) {
      commit('fetchUserSignIn', signin)
    }
  },
  plugins: [
    createPersistedState(
      { key: "new-coco-diary-app" }
    )
  ]
})
