import Vue from 'vue'
import App from './App.vue'
import Router from '../router/router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    router: Router,
    render: h => h(App)
  }).$mount("#app")
})
