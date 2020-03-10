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
}

export const actions = {
  fetchThemes({ commit }) {
    return axios.get(`themes`).then((response) => {
      const themes = response.data
      commit('SET_THEMES', themes)
      return Promise.resolve(themes)
    })
  },
  clearTheme({ commit }) {
    commit('CLEAR_THEME')
  },
  fetchTheme({ commit }, id) {
    return axios.get(`themes/${id}`).then((response) => {
      const theme = response.data
      commit('SET_THEME', theme)
      return Promise.resolve(theme)
    })
  },
  deleteTheme({ commit }, id) {
    return axios.delete(`themes/${id}`).then((response) => {
      const theme = response.data
      commit('REMOVE_THEME_FROM_LIST', theme.id)
      return Promise.resolve(theme)
    })
  },
}
