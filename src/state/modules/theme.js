import axios from '@plugins/axios'

export const state = {
  theme: {
    id: 1,
    name: 'Padrão',
    html: '',
  },
  themes: [
    {
      id: 1,
      name: 'Padrão 02',
    },
    {
      id: 2,
      name: 'Padrão 02',
    },
  ],
}

export const getters = {
  theme: (state) => state.theme,
}

export const mutations = {
  SET_THEMES(state, themes) {
    state.themes = themes
  },
  SET_THEME(state, theme) {
    state.theme = theme
  },
  CLEAR_THEME(state) {
    state.theme = {
      id: null,
      name: '',
      html: '',
    }
  },
  REMOVE_THEME_FROM_LIST(state, id) {
    const index = state.themes.findIndex((item) => item.id === id)
    state.themes.splice(index, 1)
  },
  UPDATE_THEME_IN_LIST(state, theme) {
    const index = state.themes.findIndex((item) => item.id === theme.id)
    if (index !== -1) {
      state.themes[index] = theme
    }
  },
}

export const actions = {
  fetchThemes({ commit, rootState }) {
    const { clientId } = rootState.auth.currentUser
    return axios.get(`/api/sas/themes/${clientId}`).then((response) => {
      const themes = response.data[0]
      commit('SET_THEMES', themes)
      return Promise.resolve(themes)
    })
  },
  clearTheme({ commit }) {
    commit('CLEAR_THEME')
  },
  fetchTheme({ commit, rootState }, id) {
    const { clientId } = rootState.auth.currentUser

    return axios.get(`/api/sas/theme/${clientId}_${id}`).then((response) => {
      const theme = response.data
      commit('SET_THEME', theme)
      return Promise.resolve(theme)
    })
  },
  deleteTheme({ commit, rootState }, id) {
    const { clientId } = rootState.auth.currentUser

    return axios.delete(`/api/sas/theme/${clientId}_${id}`).then((response) => {
      const theme = response.data
      commit('REMOVE_THEME_FROM_LIST', theme.id)
      return Promise.resolve(theme)
    })
  },
  updateTheme({ commit, rootState }, theme) {
    const { clientId } = rootState.auth.currentUser
    theme.clientId = clientId
    return axios
      .put(`/api/sas/theme/${clientId}_${theme.id}`, theme)
      .then((response) => {
        if (response.status === 200) {
          commit('UPDATE_THEME_IN_LIST', theme)
          return Promise.resolve(theme)
        }
      })
  },
  createTheme({ rootState }, theme) {
    const { clientId } = rootState.auth.currentUser
    theme.clientId = clientId
    return axios.post(`/api/sas/theme`, theme).then((response) => {
      if (response.status === 200) {
        return Promise.resolve(theme)
      }
    })
  },
}
