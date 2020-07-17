import axios from '@plugins/axios'

export const state = {
  engines: [],
}

export const getters = {}

export const mutations = {
  SET_ENGINES(state, engines) {
    state.engines = engines
  },
  REMOVE__ENGINE_FROM_LIST(state, id) {
    const index = state.engines.findIndex((item) => item.id === id)
    state.engines.splice(index, 1)
  },
}

export const actions = {
  fetchEngines({ commit }) {
    return axios.get(`/api/smart/Channels/listEngine`).then((response) => {
      const data = response.data || {}
      const engines = []
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          engines.push(data[key])
        }
      }
      commit('SET_ENGINES', engines)
      return Promise.resolve(engines)
    })
  },
}
