import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'
import BlogNew from '../components/BlogNew.vue'
import BlogShow from '../components/BlogShow.vue'
import BlogEdit from '../components/BlogEdit.vue'
import UserShow from '../components/UserShow.vue'
import UserEdit from '../components/UserEdit.vue'
import store from '../store/store'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', component: Home, name: 'Home'},
    { path: '/signup', component: Signup, name: 'Signup' },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/user/:id', component: UserShow, name: 'UserShow' },
    { path: '/user/:id/edit', component: UserEdit, name: 'UserEdit' },
    { path: '/blog_new', component: BlogNew, name: 'BlogNew' },
    { path: '/blog/:id', component: BlogShow, name: 'BlogShow' },
    { path: '/blog/:id/edit', component: BlogEdit, name: 'BlogEdit' }
  ]
})

router.beforeEach((to, from, next) => {
  let documentCookies = document.cookie.split(';')
  let cookie_trim_box = []
  for(let i = 0; i < documentCookies.length; i++) {
    cookie_trim_box.push(documentCookies[i].trim())
  }

  if(to.name === 'Signup' && !cookie_trim_box.includes('signIn=true') ) {
    next()
  } else if (to.name !== 'Login' && !cookie_trim_box.includes('signIn=true')) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && cookie_trim_box.includes('signIn=true')) {
    next({ name: 'Home' })
  } else {
    next()
  }

})
export default router
