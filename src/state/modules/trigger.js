import axios from '@plugins/axios'

export const state = {
  trigger: {
    id: 1,
    name: 'Padrão',
    link: '',
    description: 'Padrão',
    category: 'Padrão',
  },
  triggers: [
    {
      id: 1,
      name: 'Carrinho abandonado',
      priority: 1,
      rule: 'Carrinho abandonado',
      status: 'Ativo',
      actions: null,
    },
  ],
}

export const getters = {
  trigger: (state) => state.trigger,
}

export const mutations = {
  SET_TRIGGERS(state, triggers) {
    state.triggers = triggers
  },
  SET_TRIGGER(state, trigger) {
    state.trigger = trigger
  },
  CLEAR_TRIGGER(state) {
    state.trigger = {
      id: null,
      name: '',
      link: '',
      description: 'Padrão',
      category: 'Padrão',
    }
  },
  REMOVE_TRIGGER_FROM_LIST(state, id) {
    const index = state.urls.findIndex((item) => item.id === id)
    state.urls.splice(index, 1)
  },
  UPDATE_TRIGGER_IN_LIST(state, trigger) {
    const index = state.urls.findIndex((item) => item.id === trigger.id)
    if (index !== -1) {
      state.urls[index] = trigger
    }
  },
}

export const actions = {
  fetchTriggers({ commit, rootState }) {
    const { clientId } = rootState.auth.currentUser
    return axios.get(`/api/smart/channels/${clientId}`).then((response) => {
      console.log(response)
      const urls = response.data.urls
      commit('SET_TRIGGERS', urls)
      return Promise.resolve(urls)
    })
  },
  clearTrigger({ commit }) {
    commit('CLEAR_TRIGGER')
  },
  fetchTrigger({ commit, rootState }, id) {
    const { clientId } = rootState.auth.currentUser
    return axios
      .get(`/api/smart/trigger/${clientId}_${id}`)
      .then((response) => {
        const trigger = response.data
        commit('SET_TRIGGER', trigger)
        return Promise.resolve(trigger)
      })
  },
  deleteTrigger({ commit, rootState }, id) {
    const { clientId } = rootState.auth.currentUser
    return axios
      .delete(`/api/smart/trigger/${clientId}_${id}`)
      .then((response) => {
        const trigger = response.data
        commit('REMOVE_TRIGGER_FROM_LIST', trigger.id)
        return Promise.resolve(trigger)
      })
  },
  updateTrigger({ commit, rootState }, trigger) {
    const { clientId } = rootState.auth.currentUser
    trigger.client_id = clientId
    return axios
      .put(`/api/smart/trigger/${clientId}_${trigger.id}`, trigger)
      .then((response) => {
        if (response.status === 200) {
          commit('UPDATE_TRIGGER_IN_LIST', trigger)
          return Promise.resolve(trigger)
        }
      })
  },
  createTrigger({ rootState }, trigger) {
    const { clientId } = rootState.auth.currentUser
    trigger.client_id = clientId
    return axios.post(`/api/smart/trigger`, trigger).then((response) => {
      if (response.status === 200) {
        return Promise.resolve(trigger)
      }
    })
  },
}
