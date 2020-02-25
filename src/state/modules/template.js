import axios from '@plugins/axios'

export const state = {
  template: {
    id: 1,
    name: 'Padrão',
    html: '',
  },
  templates: [
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
  template: (state) => state.template,
}

export const mutations = {
  SET_TEMPLATES(state, templates) {
    state.templates = templates
  },
  CLEAR_TEMPLATE(state) {
    state.template = {
      id: null,
      name: '',
      html: '',
    }
  },
}

export const actions = {
  fetchTemplates({ commit }) {
    return axios.get(`themes`).then((response) => {
      const templates = response.data
      commit('SET_TEMPLATES', templates)
      return Promise.resolve(templates)
    })
  },
  clearTemplate({ commit }) {
    commit('CLEAR_TEMPLATE')
  },
}
