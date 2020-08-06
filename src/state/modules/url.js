import axios from '@plugins/axios'

export const state = {
  url: {
    id: 1,
    name: 'Padrão',
    link: '',
    description: 'Padrão',
    category: 'Padrão',
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
      link: '',
      description: 'Padrão',
      category: 'Padrão',
    }
  },
  REMOVE_URL_FROM_LIST(state, id) {
    const index = state.urls.findIndex((item) => item.id === id)
    state.urls.splice(index, 1)
  },
  UPDATE_URL_IN_LIST(state, url) {
    const index = state.urls.findIndex((item) => item.id === url.id)
    if (index !== -1) {
      state.urls[index] = url
    }
  },
}

export const actions = {
  fetchUrls({ commit, rootState }) {
    const clientId = rootState.client.currentClientId
    return axios.get(`/api/smart/Urls/listUrl/${clientId}`).then((response) => {
      console.log(response)
      const urls = response.data.urls
      commit('SET_URLS', urls)
      return Promise.resolve(urls)
    })
  },
  clearUrl({ commit }) {
    commit('CLEAR_URL')
  },
  fetchUrl({ commit, rootState }, id) {
    const clientId = rootState.client.currentClientId
    return axios.get(`/api/smart/url/${clientId}_${id}`).then((response) => {
      const url = response.data
      commit('SET_URL', url)
      return Promise.resolve(url)
    })
  },
  deleteUrl({ commit, rootState }, id) {
    const clientId = rootState.client.currentClientId
    return axios.delete(`/api/smart/url/${clientId}_${id}`).then((response) => {
      const url = response.data
      commit('REMOVE_URL_FROM_LIST', url.id)
      return Promise.resolve(url)
    })
  },
  updateUrl({ commit, rootState }, url) {
    const clientId = rootState.client.currentClientId
    url.client_id = clientId
    return axios
      .put(`/api/smart/url/${clientId}_${url.id}`, url)
      .then((response) => {
        if (response.status === 200) {
          commit('UPDATE_URL_IN_LIST', url)
          return Promise.resolve(url)
        }
      })
  },
  createUrl({ rootState }, url) {
    const clientId = rootState.client.currentClientId
    url.client_id = clientId
    return axios.post(`/api/smart/url`, url).then((response) => {
      if (response.status === 200) {
        return Promise.resolve(url)
      }
    })
  },
}
