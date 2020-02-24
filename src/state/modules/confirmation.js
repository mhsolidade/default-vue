export const state = {
  description: 'descrição',
  title: 'titulo',
  promise: null,
  active: false,
  response: null,
}

export const getters = {
  description: (state) => state.description,
  title: (state) => state.title,
  promise: (state) => state.promise,
  active: (state) => state.active,
  response: (state) => state.response,
}

export const mutations = {
  CLEAR_ALL(state) {
    state.description = 'descrição'
    state.title = 'titulo'
    state.promise = null
    state.response = null
    state.active = false
  },
  SET_TITLE(state, newValue) {
    state.title = newValue
  },
  SET_DESCRIPTION(state, newValue) {
    state.description = newValue
  },
  SET_PROMISE(state, newValue) {
    state.promise = newValue
  },
  SET_ACTIVE(state, newValue) {
    state.active = newValue
  },
  SET_RESPONSE(state, newValue) {
    state.response = newValue
  },
}

export const actions = {
  setConfirmation({ commit }, { description, title, promise }) {
    commit('CLEAR_ALL')
    commit('SET_TITLE', title)
    commit('SET_DESCRIPTION', description)
    commit('SET_PROMISE', promise)
    commit('SET_ACTIVE', true)
    return Promise.resolve(null)
  },
  cancel({ commit }) {
    commit('CLEAR_ALL')
  },
  setResponse({ commit }, resp) {
    commit('SET_RESPONSE', resp)
  },
}
