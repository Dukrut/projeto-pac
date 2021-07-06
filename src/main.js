import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import AxiosPlugin from 'vue-axios-cors'
import router from './plugins/router'
import VueToast from 'vue-toast-notification';
import moment from 'moment'
import VueMoment from 'vue-moment';

import 'vue-toast-notification/dist/theme-default.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap/dist/js/bootstrap.js";

moment.locale('pt-br');

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(AxiosPlugin)
Vue.use(VueToast)
Vue.use(moment)
Vue.use(VueMoment, { moment })
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
