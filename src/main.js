import router from '@router'
import store from '@state/store'
import vuetify from '@plugins/vuetify'
import VueMoment from '@plugins/vueMoment'
import App from './app.vue'
import Vue from 'vue'

import _ from 'lodash';
// Globally register all `_base`-prefixed components
import '@components/_globals'

Vue.config.productionTip = process.env.NODE_ENV === 'production'
Vue.prototype.$_ = _;

new Vue({
  router,
  store,
  vuetify,
  VueMoment,
  render: (h) => h(App),
}).$mount('#app')
