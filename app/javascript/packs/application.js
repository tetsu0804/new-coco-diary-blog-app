import Vue from 'vue'
import App from './App.vue'
import Router from '../router/router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueAxios from 'vue-axios'
import { planAxiosInstance } from '../axios/axios'
import Store from '../store/store'
import Paginate from 'vuejs-paginate'

Vue.component('paginate', Paginate)
// Vue.use(VueAxios,
// { plan: planAxiosInstance})
Vue.use(VueAxios,{plan: planAxiosInstance})
Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    store: Store,
    router: Router,
    render: h => h(App)
  }).$mount("#app")
})
