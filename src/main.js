import router from '@router'
import store from '@state/store'
import vuetify from '@plugins/vuetify'
import App from './app.vue'
import Vue from 'vue'

Vue.config.productionTip = process.env.NODE_ENV === 'production'

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
