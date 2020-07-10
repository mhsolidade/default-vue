import axios from '@plugins/axios'
import camelToSnake from '@utils/camel-to-snake'

export const state = {
  baseConfig: {
    dailyEmailLimit: null,
  },
}

export const getters = {
  baseConfig: (state) => state.baseConfig,
}

export const mutations = {
  SET_BASE_CONFIG(state, urls) {
    state.urls = urls
  },

  CLEAR_URL(state) {
    state.url = {
      dailyEmailLimit: null,
    }
  },
}

export const actions = {
  fetchConfig({ commit, rootState }) {
    const { clientId } = rootState.auth.currentUser
    return axios.get(`/api/smart/client/${clientId}`).then((response) => {
      const baseConfig = response.data
      commit('SET_BASE_CONFIG', baseConfig)
      return Promise.resolve(baseConfig)
    })
  },
  clearUrl({ commit }) {
    commit('CLEAR_URL')
  },
  updateConfig({ commit, rootState }, config) {
    const { clientId } = rootState.auth.currentUser
    const sendConfig = Object.assign({}, config)
    sendConfig.config = camelToSnake(sendConfig.config)
    sendConfig.config = JSON.stringify(sendConfig.config)
    console.log(sendConfig)
    sendConfig.last_click_number = 30
    sendConfig.last_click_time = 'day'
    return axios
      .put(`/api/smart/client/${clientId}`, sendConfig)
      .then((response) => {
        if (response.status === 200) {
          commit('SET_BASE_CONFIG', config)
          return Promise.resolve(config)
        }
      })
  },
}
