import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import BootstrapVue from 'bootstrap-vue'


Vue.config.productionTip = false
Vue.use(BootstrapVue)

import '@/assets/base_styles.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
