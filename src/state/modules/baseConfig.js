import axios from '@plugins/axios'

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
    const sendConfig = { dailyEmailLimit: config.dailyEmailLimit }
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
