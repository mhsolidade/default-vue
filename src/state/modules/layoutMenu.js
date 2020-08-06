export const state = {
  activateMenu: true,
  itemActive: true,
  links: [
    {
      name: 'Dashboard',
      icon: 'mdi-view-dashboard',
      color: '',
      isActive: false,
      router: { name: 'dashboard' },
      children: [],
    },
    {
      name: 'Gatilhos',
      icon: 'mdi-email-send',
      color: '',
      isActive: false,
      router: { name: 'trigger' },
      children: [],
    },
    {
      name: 'Relatórios',
      icon: 'mdi-chart-timeline-variant',
      color: '',
      isActive: false,
      router: { name: 'reports' },
      children: [],
    },
    {
      name: 'Configurações',
      icon: 'mdi-cog',
      color: '',
      isActive: false,
      router: { name: 'configuration' },
      children: [],
    },
    {
      name: 'sair',
      icon: 'mdi-logout',
      color: '',
      isActive: false,
      router: { name: 'logout' },
      children: [],
    },
  ],
}

export const getters = {
  activateMenu: (state) => state.activateMenu,
  itemActive: (state) => state.itemActive,
}

export const mutations = {
  SET_ATIVATE_MENU(state, newValue) {
    state.activateMenu = newValue
  },
}

export const actions = {
  toggleActivateMenu({ commit, state }) {
    commit('SET_ATIVATE_MENU', !state.activateMenu)
  },
  setActivateMenu({ commit }, newValue) {
    commit('SET_ATIVATE_MENU', newValue)
  },
}
