import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import toast from './plugins/toast'

Vue.config.productionTip = false

new Vue({
  vuetify,
  toast,
  render: h => h(App)
}).$mount('#app')
