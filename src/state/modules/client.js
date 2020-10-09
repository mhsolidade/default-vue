import axios from '@plugins/axios'

export const state = {
  clients: [],
  currentClientId: getSavedState('auth.currentClientId'),
}

export const getters = {
  isSetClientId: (state) => !!state.currentClientId,
}

export const mutations = {
  SET_CLIENTS(state, newValue) {
    state.clients = newValue
  },
  SET_CLIENT_ID(state, newValue) {
    state.currentClientId = newValue
    saveState('auth.currentClientId', state.currentClientId)
  },
}

export const actions = {
  fetchClient({ commit, rootState }) {
    // return axios.get(`/api/smart/client`).then((response) => {
    //   const clients = response.data.data
    //   commit('SET_CLIENTS', clients)
    //   // if (clients.length === 1) commit('SET_CLIENT_ID', clients[0].id)
    //   return Promise.resolve(clients)
    // })
    console.log('aaa')
    return (
      axios
        .get('/api/sas/user')

        // .get('http://localhost/admin/profile')
        .then((response) => {
          const clients = response.data.user.clients
            .replace(/"/g, "'")
            .replace(/\]/g, '')
            .replace(/\[/g, '')
            .replace(/'/g, '')
            .split(',')
          clients.push('smp')
          commit('SET_CLIENTS', clients)
          if (clients.length === 1) commit('SET_CLIENT_ID', clients[0])
          return Promise.resolve(clients)
        })
    )
  },
  clearCurrentClientId({ commit }) {
    commit('SET_CLIENT_ID', null)
  },
  setCurrentClientId({ commit }, id) {
    commit('SET_CLIENT_ID', id)
  },
}

// ===
// Private helpers
// ===
function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}
