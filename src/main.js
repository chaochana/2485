import Vue from 'vue'
import App from './App.vue'
import VueNumber from 'vue-number-animation'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@/assets/global.css'

Vue.config.productionTip = false

Vue.use(VueNumber)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
