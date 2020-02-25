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
  CLEAR_THEME(state) {
    state.theme = {
      id: null,
      name: '',
      html: '',
    }
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
}
