import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'
import BlogNew from '../components/BlogNew.vue'
import BlogShow from '../components/BlogShow.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', component: Home, name: 'Home'},
    { path: '/signup', component: Signup, name: 'Signup' },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/blog_new', component: BlogNew, name: 'BlogNew' },
    { path: '/blog/:id', component: BlogShow, name: 'BlogShow' }
  ]
})

export default router
