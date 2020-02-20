import Vue from 'vue'
import VueMoment from 'vue-moment'

import moment from 'moment'

moment.locale('pt-BR')

Vue.use(VueMoment, {
  moment,
})

export default VueMoment
