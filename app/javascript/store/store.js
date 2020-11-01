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
    blogs: [],
    shits: []
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
      state.blogs.push(new_blog)
    },
    fetchEditBlogs(state, {id: id, title: title, content: content, user_id: user_id, created_at: created_at }) {
      let blog_edit_result = state.blogs.filter((result) => {
        return result.id === id
      })

      for(let i = 0; i < state.blogs.length; i++) {
        if( state.blogs[i].id === blog_edit_result[0].id) {
          state.blogs[i].id = id
          state.blogs[i].title = title
          state.blogs[i].content = content
          state.blogs[i].user_id = user_id
          state.blogs[i].created_at = created_at
        }
      }
    },
    fetchNumberDeleteBlogs(state, id) {
      let blog_delete = state.blogs.filter((result) => {
         return result.id === id
      })

      for (let i = 0; i < state.blogs.length; i++) {
        if(state.blogs[i].id === blog_delete[0].id ){
          state.blogs.splice(i, 1)
        }
      }
    },
    fetchDeleteBlogs(state) {
      for(let i = 0; i < state.blogs.length; i ++){
        state.blogs.splice(0, state.blogs.length)
      }
    },
    fetchShit(state, { id: id, shit_time: shit_time, blog_id: blog_id, created_at: created_at }) {
      const shit_value = { id: id, shit_time: shit_time, blog_id: blog_id, created_at: created_at }
  
      state.shits.push(shit_value)
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
      commit('fetchBlogs', { id: id, title: title, content: content, user_id: user_id, created_at: created_at})
    },
    doFetchEditBlogs( { commit }, { id: id, title: title, content: content, user_id: user_id, created_at: created_at }) {
      commit('fetchEditBlogs', { id: id, title: title, content: content, user_id: user_id, created_at: created_at })
    },
    doFetchDeleteBlogs( { commit }) {
      commit('fetchDeleteBlogs')
    },
    doFetchNumberDeleteBlogs( { commit }, id) {
      commit('fetchNumberDeleteBlogs', id)
    },
    doFetchShits( { commit }, { id: id, shit_time: shit_time, blog_id: blog_id, created_at: created_at }) {
      commit('fetchShit', { id: id, shit_time: shit_time, blog_id: blog_id, created_at: created_at })
    }
  },
  plugins: [
    createPersistedState(
      { key: "new-coco-diary-app" }
    )
  ]
})
