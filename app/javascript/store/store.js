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
    fetchBlogs(state, {id: id, title: title, content: content, user_id: user_id, created_at: created_at, break_first: break_first, dinner: dinner }) {
      let new_blog = {id: id, title: title, content: content, user_id: user_id, created_at: created_at, break_first: break_first, dinner: dinner}
      state.blogs.push(new_blog)
    },
    fetchEditBlogs(state, {id: id, title: title, content: content, user_id: user_id, created_at: created_at, break_first: break_first, dinner: dinner }) {
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
          state.blogs[i].break_first = break_first
          state.blogs[i].dinner = dinner
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
      state.blogs.splice(0, state.blogs.length)
    },
    fetchShit(state, { id: id, shit_time: shit_time, blog_id: blog_id, created_at: created_at }) {

      const shit_value = { id: id, shit_time: shit_time, blog_id: blog_id, created_at: created_at }

      state.shits.push(shit_value)
    },
    fetchDeleteShit(state, id) {
      const delete_shit = state.shits.filter((result) => {
        return result.id === id
      })
      for(let i = 0; i < state.shits.length; i++) {
        if(state.shits[i].id === delete_shit[0].id) {
          state.shits.splice(i, 1)
        }
      }
    },
    fetchAllDeleteShit(state) {
      state.shits.splice(0, state.shits.length)
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
    doFetchBlogs( { commit }, { id: id, title: title, content: content, user_id: user_id, created_at: created_at, break_first: break_first, dinner: dinner }) {
      commit('fetchBlogs', { id: id, title: title, content: content, user_id: user_id, created_at: created_at, break_first: break_first, dinner: dinner})
    },
    doFetchEditBlogs( { commit }, { id: id, title: title, content: content, user_id: user_id, created_at: created_at, break_first: break_first, dinner: dinner }) {
      commit('fetchEditBlogs', { id: id, title: title, content: content, user_id: user_id, created_at: created_at, break_first: break_first, dinner: dinner })
    },
    doFetchDeleteBlogs( { commit }) {
      commit('fetchDeleteBlogs')
    },
    doFetchNumberDeleteBlogs( { commit }, id) {
      commit('fetchNumberDeleteBlogs', id)
    },
    doFetchShits( { commit }, { id: id, shit_time: shit_time, blog_id: blog_id, created_at: created_at }) {
      commit('fetchShit', { id: id, shit_time: shit_time, blog_id: blog_id, created_at: created_at })
    },
    doFetchDeleteShit( { commit }, id) {
      commit('fetchDeleteShit', id)
    },
    doFetchAllDeleteShit( { commit }) {
      commit('fetchAllDeleteShit')
    }
  },
  plugins: [
    createPersistedState(
      { key: "new-coco-diary-app" }
    )
  ]
})
