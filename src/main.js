import Vue from 'vue'
import App from './App.vue'
import toast from './plugins/toast'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import AxiosPlugin from 'vue-axios-cors'
import VueRouter from 'vue-router'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap/dist/js/bootstrap.js";

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(AxiosPlugin)
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  toast,
  render: h => h(App)
}).$mount('#app')
