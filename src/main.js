import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import '@/assets/base_styles.css'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
