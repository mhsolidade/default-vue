export const state = {
  activateMenu: false,
}

export const getters = {
  activateMenu: (state) => state.activateMenu,
}

export const mutations = {
  SET_ATIVATE_MENU(state, newValue) {
    state.activateMenu = newValue
  },
}

export const actions = {
  toggleActivateMenu({ commit, state }) {
    commit('SET_ATIVATE_MENU', !state.activateMenu)
  },
  setActivateMenu({ commit }, newValue) {
    commit('SET_ATIVATE_MENU', newValue)
  },
}
