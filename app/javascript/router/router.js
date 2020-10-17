import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Signup from '../components/Signup.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', component: Home, name: 'Home'},
    { path: '/signup', component: Signup, name: 'Signup'}
  ]
})

export default router
