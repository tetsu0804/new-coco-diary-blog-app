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
    signIn: '',
    blogs: []
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
    },
    fetchBlogs(state, {id: id, title: title, content: content, user_id: user_id, created_at: created_at }) {
      let new_blog = {id: id, title: title, content: content, user_id: user_id, created_at: created_at}
debugger
      state.blogs.push(new_blog)
    },
    fetchDeleteBlogs(state) {
      state.blogs = [];
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
    },
    doFetchBlogs( { commit }, { id: id, title: title, content: content, user_id: user_id, created_at: created_at }) {
      commit('fetchBlogs', { id: id, title: title, content: content, user_id: user_id, created_at: created_at })
    },
    doFetchDeleteBlogs( { commit }) {
      commit('fetchDeleteBlogs')
    }
  },
  plugins: [
    createPersistedState(
      { key: "new-coco-diary-app" }
    )
  ]
})
