import axios from '@plugins/axios'

export const state = {
  url: {
    id: 1,
    name: 'Padrão',
    html: '',
  },
  urls: [
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
  url: (state) => state.url,
}

export const mutations = {
  SET_URLS(state, urls) {
    state.urls = urls
  },
  SET_URL(state, url) {
    state.url = url
  },
  CLEAR_URL(state) {
    state.url = {
      id: null,
      name: '',
      html: '',
    }
  },
  REMOVE_URL_FROM_LIST(state, id) {
    const index = state.urls.findIndex((item) => item.id === id)
    state.urls.splice(index, 1)
  },
}

export const actions = {
  fetchUrls({ commit }) {
    return axios.get(`urls`).then((response) => {
      const urls = response.data
      commit('SET_URLS', urls)
      return Promise.resolve(urls)
    })
  },
  clearUrl({ commit }) {
    commit('CLEAR_URL')
  },
  fetchUrl({ commit }, id) {
    return axios.get(`urls/${id}`).then((response) => {
      const url = response.data
      commit('SET_URL', url)
      return Promise.resolve(url)
    })
  },
  deleteUrl({ commit }, id) {
    return axios.delete(`urls/${id}`).then((response) => {
      const url = response.data
      commit('REMOVE_URL_FROM_LIST', url.id)
      return Promise.resolve(url)
    })
  },
}
