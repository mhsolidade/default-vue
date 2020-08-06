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
  UPDATE_TEMPLATE_IN_LIST(state, template) {
    const index = state.templates.findIndex((item) => item.id === template.id)
    if (index !== -1) {
      state.templates[index] = template
    }
  },
}

export const actions = {
  fetchTemplates({ commit, rootState }) {
    const clientId = rootState.client.currentClientId
    return axios.get(`/api/sas/templates/${clientId}`).then((response) => {
      const templates = response.data[0]
      commit('SET_TEMPLATES', templates)
      return Promise.resolve(templates)
    })
  },
  clearTemplate({ commit }) {
    commit('CLEAR_TEMPLATE')
  },
  fetchTemplate({ commit, rootState }, id) {
    const clientId = rootState.client.currentClientId
    return axios.get(`/api/sas/template/${clientId}_${id}`).then((response) => {
      const template = response.data
      commit('SET_TEMPLATE', template)
      return Promise.resolve(template)
    })
  },
  deleteTemplate({ commit, rootState }, id) {
    const clientId = rootState.client.currentClientId

    return axios
      .delete(`/api/sas/template/${clientId}_${id}`)
      .then((response) => {
        const template = response.data
        commit('REMOVE_TEMPLATE_FROM_LIST', template.id)
        return Promise.resolve(template)
      })
  },
  updateTemplate({ commit, rootState }, template) {
    const clientId = rootState.client.currentClientId
    template.client_id = clientId
    return axios
      .put(`/api/sas/template/${clientId}_${template.id}`, template)
      .then((response) => {
        console.log({ resp: response })
        if (response.status === 200) {
          commit('UPDATE_TEMPLATE_IN_LIST', template)
          return Promise.resolve(template)
        }
      })
  },
  createTemplate({ rootState }, template) {
    const clientId = rootState.client.currentClientId
    template.client_id = clientId
    return axios.post(`/api/sas/template/`, template).then((response) => {
      if (response.status === 200) {
        return Promise.resolve(template)
      }
    })
  },
}
