import axios from '@plugins/axios'
import moment from 'moment'
const URL = `/api/sas/report`
// const URL = 'http://localhost:8000/api/report'

export const state = {
  total: {
    email: null,
    open: null,
    click: null,
  },
  triggers: {
    channelName: '',
    email: null,
    open: null,
    session: null,
    click: null,
    reopen: null,
    reclick: null,
    conversion1: null,
    value1: '',
    conversion7: null,
    value7: '',
  },
}

export const getters = {}

export const mutations = {
  SET_TOTAL_BY_TYPE(state, { type, value }) {
    state.total[type] = value
  },
  SET_TRIGGERS(state, newValue) {
    state.treigger = newValue
  },
}

export const actions = {
  fetchTotalByRengerOfDateAndType(
    { commit, rootState },
    { rangeStart, rangeEnd, typeTotal }
  ) {
    const clientId = rootState.client.currentClientId
    return axios
      .post(`${URL}-total`, { rangeStart, rangeEnd, typeTotal, clientId })
      .then((response) => {
        let data = 0

        if (
          !!response.data.data &&
          Object.prototype.hasOwnProperty.call(response.data.data, typeTotal)
        ) {
          data = response.data.data[typeTotal]
        }
        commit('SET_TOTAL_BY_TYPE', { data, typeTotal })
        return Promise.resolve(data)
      })
  },
  fetchTotalTriggerByRengerOfDate(
    { commit, rootState },
    { rangeStart, rangeEnd }
  ) {
    const clientId = rootState.client.currentClientId
    return axios
      .post(URL, { rangeStart, rangeEnd, clientId })
      .then((response) => {
        const data = response.data
        commit('SET_TRIGGERS', data)
        return Promise.resolve(data)
      })
  },
  async totalEmailLastThirtyDays({ dispatch }) {
    const rangeEnd = moment().format('Y-MM-DD')
    const rangeStart = moment()
      .subtract(30, 'days')
      .format('Y-MM-DD')
    const typeTotal = 'email'
    const resp = await dispatch('fetchTotalByRengerOfDateAndType', {
      rangeStart,
      rangeEnd,
      typeTotal,
    })
    return Promise.resolve(resp)
  },
  async totalEmailToday({ dispatch }) {
    const rangeEnd = moment().format('Y-MM-DD')
    const rangeStart = moment().format('Y-MM-DD')
    const typeTotal = 'email'
    const resp = await dispatch('fetchTotalByRengerOfDateAndType', {
      rangeStart,
      rangeEnd,
      typeTotal,
    })
    return Promise.resolve(resp)
  },
  async totalTriggersToday({ dispatch }) {
    const rangeEnd = moment().format('Y-MM-DD')
    const rangeStart = moment().format('Y-MM-DD')
    const resp = await dispatch('fetchTotalTriggerByRengerOfDate', {
      rangeStart,
      rangeEnd,
    })
    return Promise.resolve(resp)
  },
}
