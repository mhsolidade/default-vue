/* eslint-disable no-undef */
// @ts-nocheck
/* eslint-disable eqeqeq */
import axios from '@plugins/axios'

export const state = {
  trigger: {
    id: '',
    name: '',
    fromName: '',
    fromEmail: '',
    engine: '',
    config: {
      snippet: '',
      nextInteraction: '',
      sessionTimeout: '',
      interestTtl: '',
      firstInteraction: [''],
      removeGlobalTracking: false,
      intervalOfInterests: '',
      subject: '',
      reaction: {
        codes: [''],
        operator: '',
        interactionHashUser: '',
      },
      subjectArray: [{ type: '', subject: '' }],
      interestChannelDelete: [],
    },
    tpl: '',
    tplTest: '',
    status: '',
    sort: '',
    trash: '',
    hasValidityDate: '',
    validityDate: null,
    parentChannelId: '',
    engineName: '',
    repique: [],
  },
  triggers: [
    {
      id: 1,
      name: 'Carrinho abandonado',
      priority: 1,
      rule: 'Carrinho abandonado',
      status: 'Ativo',
      actions: null,
    },
  ],
  disabledEngines: [],
}

export const getters = {
  trigger: (state) => state.trigger,
  disabledEngines: (state) => state.disabledEngines,
}

export const mutations = {
  SET_TRIGGERS(state, triggers) {
    state.triggers = triggers
  },
  SET_TRIGGER(state, trigger) {
    state.trigger = trigger
  },
  CLEAR_TRIGGER(state) {
    state.trigger = {
      id: '',
      name: '',
      fromName: '',
      fromEmail: '',
      engine: '',
      config: {
        snippet: '',
        nextInteraction: '',
        sessionTimeout: '',
        interestTtl: '',
        firstInteraction: [''],
        removeGlobalTracking: false,
        intervalOfInterests: '',
        subject: '',
        reaction: {
          codes: [''],
          operator: '',
          interactionHashUser: '',
        },
        subjectArray: [{ type: '', subject: '' }],
        interestChannelDelete: [],
      },
      tpl: '',
      tplTest: '',
      status: '',
      sort: '',
      trash: '',
      hasValidityDate: '',
      validityDate: null,
      parentChannelId: '',
      engineName: '',
      repique: [],
    }
  },
  REMOVE_TRIGGER_FROM_LIST(state, id) {
    const index = state.urls.findIndex((item) => item.id === id)
    state.urls.splice(index, 1)
  },
  UPDATE_TRIGGER_IN_LIST(state, trigger) {
    const index = state.urls.findIndex((item) => item.id === trigger.id)
    if (index !== -1) {
      state.urls[index] = trigger
    }
  },
  SET_DISABLED_ENGINES(state, disabledEngines) {
    state.disabledEngines = disabledEngines
  },
}

export const actions = {
  fetchTriggers({ commit, rootState }) {
    const { clientId } = rootState.auth.currentUser
    return axios
      .get(`/api/smart/Channels/listChannel/${clientId}`)
      .then((response) => {
        const triggersWithRepique = []
        const triggers = response.data.channels
        triggers.forEach((trigger) => {
          if (trigger.id == 10) trigger.parentChannelId = 1
        })
        triggers.forEach((trigger) => {
          trigger.repique = triggers.filter(
            (item) => item.parentChannelId == trigger.id
          )
          if (trigger.parentChannelId != 0 || !trigger.parentChannelId)
            triggersWithRepique.push(trigger)
        })
        commit('SET_TRIGGERS', triggers)
        return Promise.resolve(triggers)
      })
  },
  clearTrigger({ commit }) {
    commit('CLEAR_TRIGGER')
  },
  fetchTrigger({ commit, rootState }, id) {
    const { clientId } = rootState.auth.currentUser
    return axios
      .get(`/api/smart/trigger/${clientId}_${id}`)
      .then((response) => {
        const trigger = response.data
        commit('SET_TRIGGER', trigger)
        return Promise.resolve(trigger)
      })
  },
  deleteTrigger({ commit, rootState }, id) {
    const { clientId } = rootState.auth.currentUser
    return axios
      .delete(`/api/smart/trigger/${clientId}_${id}`)
      .then((response) => {
        const trigger = response.data
        commit('REMOVE_TRIGGER_FROM_LIST', trigger.id)
        return Promise.resolve(trigger)
      })
  },
  updateTrigger({ commit, rootState }, trigger) {
    const { clientId } = rootState.auth.currentUser
    trigger.client_id = clientId
    return axios
      .put(`/api/smart/trigger/${clientId}_${trigger.id}`, trigger)
      .then((response) => {
        if (response.status === 200) {
          commit('UPDATE_TRIGGER_IN_LIST', trigger)
          return Promise.resolve(trigger)
        }
      })
  },
  createTrigger({ rootState }, trigger) {
    const { clientId } = rootState.auth.currentUser
    trigger.client_id = clientId
    return axios.post(`/api/smart/trigger`, trigger).then((response) => {
      if (response.status === 200) {
        return Promise.resolve(trigger)
      }
    })
  },
  async getDisabledEnabledTriggers({ commit, dispatch }) {
    // commit, rootState
    const triggers = await dispatch('fetchTriggers')
    const engines = await dispatch('engine/fetchEngines', null, { root: true })

    const idEngines = await triggers.map((item) => item.engine)
    const disabledEngines = engines.filter(
      (item) => !idEngines.includes(item.id)
    )
    commit('SET_DISABLED_ENGINES', disabledEngines)

    return Promise.resolve({ triggers, disabledEngines })
  },
}
