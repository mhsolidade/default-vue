import axios from '@plugins/axios'

export const state = {
  currentUser: getSavedState('auth.currentUser'),
  token: getSavedState('auth.token'),
}

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue
    saveState('auth.currentUser', state.currentUser)
    setDefaultAuthHeaders(state)
  },
  SET_TOKEN(state, newValue) {
    state.token = newValue
    saveState('auth.token', state.token)
    setDefaultAuthHeaders(state)
  },
}

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser
  },
}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state, dispatch }) {
    setDefaultAuthHeaders(state)
    dispatch('validate')
  },

  // Logs in the current user.
  async logIn({ commit, dispatch, getters }, { username, password } = {}) {
    if (getters.loggedIn) return dispatch('validate')
    const cookie = await axios
      .post('/api/admin/Authenticate/login', {
        email: 'mhsolidade@gmail.com',
        password: 'S123456',
        remember: true,
      })
      .then((response) => {
        return response.headers.cookie
      })
    if (cookie.includes('laravel_session')) {
      commit('SET_TOKEN', cookie)
      return axios
        .post('/api/admin/System/getOptions?system=smart')
        .then((response) => {
          const user = response.data.user
          user.clientId = 'sast'
          commit('SET_CURRENT_USER', user)
          return user
        })
    } else {
      return Promise.resolve(null)
    }
  },

  // Logs out the current user.
  logOut({ commit }) {
    commit('SET_CURRENT_USER', null)
    commit('SET_TOKEN', null)
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  validate({ commit, state }) {
    if (!state.currentUser) return Promise.resolve(null)
    if (!state.token) return Promise.resolve(null)

    return axios
      .get('/api/admin/System/getOptions?system=smart')
      .then((response) => {
        const user = response.data.user
        user.clientId = 'sast'
        commit('SET_CURRENT_USER', user)
        return user
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          commit('SET_CURRENT_USER', null)
          commit('SET_TOKEN', null)
        } else {
          console.warn(error)
        }
        return null
      })
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

function setDefaultAuthHeaders(state) {
  axios.defaults.headers.common.Authorization = state.token
    ? `Cookie ${state.token}`
    : ''
}
