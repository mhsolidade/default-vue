export const state = {
  active: false,
  text: 'teste alert',
  _time: null,
}

export const getters = {
  active: (state) => state.active,
  text: (state) => state.text,
}

export const mutations = {
  SET_ATIVATE_ALERT(state, text) {
    state.text = text
    state.active = true
  },
  SET_TEXT(state, newValue) {
    state.text = newValue
  },
  CLEAR(state) {
    state.active = false
    state._time = null
  },
}

export const actions = {
  newAlert({ commit }, text) {
    commit('CLEAR')
    commit('SET_ATIVATE_ALERT', text)
    setTimeout(() => {
      commit('CLEAR')
    }, 2000)
  },
}
