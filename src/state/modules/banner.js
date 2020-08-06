import axios from '@plugins/axios'

export const state = {
  banner: {
    id: 1,
    name: 'Padrão',
    startDate: '01/02/2020',
    endDate: '01/12/2020',
    status: 'Ativo',
    html: '',
    description: 'description',
  },
  banners: [
    {
      id: 1,
      name: 'Exemplo',
      startDate: '01/02/1999',
      endDate: '01/12/1999',
      status: 'Ativo',
      description: 'description',
    },
  ],
}

export const getters = {
  banner: (state) => state.banner,
}

export const mutations = {
  SET_BANNERS(state, banners) {
    state.banners = banners
  },
  SET_BANNER(state, banner) {
    state.banner = banner
  },
  CLEAR_BANNER(state) {
    state.banner = {
      id: null,
      name: '',
      startDate: '',
      endDate: '',
      status: '',
      html: '',
      description: 'description',
    }
  },
  REMOVE_BANNER_FROM_LIST(state, id) {
    const index = state.banners.findIndex((item) => item.id === id)
    state.banners.splice(index, 1)
  },
}

export const actions = {
  fetchBanners({ commit, rootState }) {
    const clientId = rootState.client.currentClientId
    return axios
      .get(`/api/smart/banner?clientId=${clientId}`)
      .then((response) => {
        const banners = response.data.data
        commit('SET_BANNERS', banners)
        return Promise.resolve(banners)
      })
  },
  clearBanner({ commit }) {
    commit('CLEAR_BANNER')
  },
  fetchBanner({ commit, rootState }, id) {
    commit('CLEAR_BANNER')
    return axios.get(`/api/smart/banner/${id}?id=${id}`).then((response) => {
      const banner = response.data
      commit('SET_BANNER', banner)
      return Promise.resolve(banner)
    })
  },
  deleteBanner({ commit, rootState }, id) {
    const clientId = rootState.client.currentClientId
    return axios
      .delete(`/api/smart/banner/${id}?client_id=${clientId}`)
      .then((response) => {
        const banner = response.data
        commit('REMOVE_BANNER_FROM_LIST', banner.id)
        return Promise.resolve(banner)
      })
  },
  updateBanner({ commit, rootState }, bannerSend) {
    const clientId = rootState.client.currentClientId
    bannerSend.client_id = clientId
    return axios
      .put(
        `/api/smart/banner/${bannerSend.id}?client_id=${clientId}`,
        bannerSend
      )
      .then((response) => {
        const banner = bannerSend
        return Promise.resolve(banner)
      })
  },
  createBanner({ commit, rootState }, bannerSend) {
    const clientId = rootState.client.currentClientId
    bannerSend.client_id = clientId
    return axios
      .post(`/api/smart/banner?client_id=${clientId}`, bannerSend)
      .then((response) => {
        const banner = bannerSend
        return Promise.resolve(banner)
      })
  },
}
