import axios from '@plugins/axios'

export const state = {
  banner: {
    id: 1,
    name: 'Padrão',
    periodStart: '01/02/2020',
    periodEnd: '01/12/2020',
    status: 'Ativo',
    html: '',
  },
  banners: [
    {
      id: 1,
      name: 'Padrão 02',
      periodStart: '01/02/2020',
      periodEnd: '01/12/2020',
      status: 'Ativo',
    },
    {
      id: 2,
      name: 'Padrão 02',
      periodStart: '01/02/2020',
      periodEnd: '01/12/2020',
      status: 'Ativo',
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
      periodStart: '',
      periodEnd: '',
      status: '',
      html: '',
    }
  },
  REMOVE_BANNER_FROM_LIST(state, id) {
    const index = state.banners.findIndex((item) => item.id === id)
    state.banners.splice(index, 1)
  },
}

export const actions = {
  fetchBanners({ commit }) {
    return axios.get(`banners`).then((response) => {
      const banners = response.data
      commit('SET_BANNERS', banners)
      return Promise.resolve(banners)
    })
  },
  clearBanner({ commit }) {
    commit('CLEAR_BANNER')
  },
  fetchBanner({ commit }, id) {
    commit('CLEAR_BANNER')
    return axios.get(`banners/${id}`).then((response) => {
      const banner = response.data
      commit('SET_BANNER', banner)
      return Promise.resolve(banner)
    })
  },
  deleteBanner({ commit }, id) {
    return axios.delete(`banners/${id}`).then((response) => {
      const banner = response.data
      commit('REMOVE_BANNER_FROM_LIST', banner.id)
      return Promise.resolve(banner)
    })
  },
}
