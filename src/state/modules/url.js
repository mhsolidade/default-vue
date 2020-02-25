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
  CLEAR_URL(state) {
    state.url = {
      id: null,
      name: '',
      html: '',
    }
  },
}

export const actions = {
  fetchUrls({ commit }) {
    return axios.get(`url`).then((response) => {
      const urls = response.data
      commit('SET_URLS', urls)
      return Promise.resolve(urls)
    })
  },
  clearUrl({ commit }) {
    commit('CLEAR_URL')
  },
}
