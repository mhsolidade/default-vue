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
  SET_TEMPLATE(state, template) {
    state.template = template
  },
  CLEAR_TEMPLATE(state) {
    state.template = {
      id: null,
      name: '',
      html: '',
    }
  },
  REMOVE_TEMPLATE_FROM_LIST(state, id) {
    const index = state.templates.findIndex((item) => item.id === id)
    state.templates.splice(index, 1)
  },
}

export const actions = {
  fetchTemplates({ commit }) {
    return axios.get(`templates`).then((response) => {
      const templates = response.data
      commit('SET_TEMPLATES', templates)
      return Promise.resolve(templates)
    })
  },
  clearTemplate({ commit }) {
    commit('CLEAR_TEMPLATE')
  },
  fetchTemplate({ commit }, id) {
    return axios.get(`templates/${id}`).then((response) => {
      const template = response.data
      commit('SET_TEMPLATE', template)
      return Promise.resolve(template)
    })
  },
  deleteTemplate({ commit }, id) {
    return axios.delete(`templates/${id}`).then((response) => {
      const template = response.data
      commit('REMOVE_TEMPLATE_FROM_LIST', template.id)
      return Promise.resolve(template)
    })
  },
}
