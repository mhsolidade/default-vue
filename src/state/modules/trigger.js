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
      tracking: { teste: 'boa time' },
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
  triggerTestMessage: '',
  triggerTest: [],
  triggerTestHtml: [],
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
        tracking: { teste: 'boa time' },
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
    const index = state.triggers.findIndex((item) => item.id === trigger.id)
    if (index !== -1) {
      state.triggers[index] = trigger
    }
  },
  SET_DISABLED_ENGINES(state, disabledEngines) {
    state.disabledEngines = disabledEngines
  },
  SET_TEST_MESSAGE(state, newValue) {
    state.triggerTestMessage = newValue
  },
  SET_TEST(state, newValue) {
    state.triggerTest = newValue
  },
}

export const actions = {
  fetchTriggers({ commit, rootState }) {
    const clientId = rootState.client.currentClientId
    return axios
      .get(`/api/smart/Channels/listChannel/${clientId}`)
      .then((response) => {
        const triggers = response.data.channels

        commit('SET_TRIGGERS', triggers)
        return Promise.resolve(triggers)
      })
  },
  clearTrigger({ commit }) {
    commit('CLEAR_TRIGGER')
  },
  fetchTrigger({ commit, rootState }, id) {
    const clientId = rootState.client.currentClientId
    return axios
      .get(`/api/smart/channel/${clientId}_${id}`)
      .then((response) => {
        const trigger = response.data
        commit('SET_TRIGGER', trigger)
        return Promise.resolve(trigger)
      })
  },
  deleteTrigger({ commit, rootState }, id) {
    const clientId = rootState.client.currentClientId
    return axios
      .delete(`/api/smart/channel/${clientId}_${id}`)
      .then((response) => {
        const trigger = response.data
        commit('REMOVE_TRIGGER_FROM_LIST', trigger.id)
        return Promise.resolve(trigger)
      })
  },
  updateTrigger({ commit, rootState }, trigger) {
    const clientId = rootState.client.currentClientId
    trigger.client_id = clientId
    return axios
      .put(`/api/smart/channel/${clientId}_${trigger.id}`, trigger)
      .then((response) => {
        commit('UPDATE_TRIGGER_IN_LIST', trigger)
        return Promise.resolve(trigger)
      })
  },
  createTrigger({ rootState }, trigger) {
    const clientId = rootState.client.currentClientId
    trigger.client_id = clientId
    return axios.post(`/api/smart/channel/`, trigger).then((response) => {
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

  fetchTriggerTest({ commit, rootState }, id) {
    const clientId = rootState.client.currentClientId
    return axios
      .get(`/api/smart/Channels/listEmailTests/${clientId}_${id}`)
      .then((response) => {
        const trigger = response.data
        commit('SET_TEST', trigger)
        return Promise.resolve(trigger)
      })
  },
  triggerGenerateEmailTest({ commit, rootState }, id) {
    const clientId = rootState.client.currentClientId
    return axios
      .get(`/api/smart/Channels/generateEmailTests/${clientId}_${id}`)
      .then((response) => {
        const message = response.data.message
        commit('SET_TEST_MESSAGE', message)
        return Promise.resolve(message)
      })
  },
  fetchTest({ commit, rootState }, id) {
    const clientId = rootState.client.currentClientId
    return axios.get(`/api/smart/email/${clientId}_${id}`).then((response) => {
      const trigger = response.data
      commit('SET_TEST', trigger)
      return Promise.resolve(trigger)
    })
  },
  sendEmailTest({ commit, rootState }, { id, emailAddress }) {
    const data = {
      clientId: rootState.client.currentClientId,
      emailId: id,
      emailAddress: emailAddress,
    }
    const instance = axios.create({})
    return instance
      .post(`/api/smart/Emails/sendTest`, data)
      .then((response) => {
        const trigger = response.data
        commit('SET_TEST', trigger)
        return Promise.resolve(trigger)
      })
  },
  async generateHtmlTest({ commit, dispatch }, triggerId) {
    try {
      const triggerTestMessage = await dispatch(
        'triggerGenerateEmailTest',
        triggerId
      )
      const triggerTest = await dispatch('fetchTriggerTest', triggerId)
      if (!!triggerTestMessage && !!triggerTest[0]) {
        return await dispatch('fetchTest', triggerTest[0].id)
      }
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async sendTestToEmails({ commit, dispatch }, { triggerId, listEmails }) {
    try {
      const triggerTestMessage = await dispatch(
        'triggerGenerateEmailTest',
        triggerId
      )
      const triggerTest = await dispatch('fetchTriggerTest', triggerId)
      if (!!triggerTestMessage && !!triggerTest[0]) {
        return await dispatch('sendEmailTest', {
          id: triggerTest[0].id,
          emailAddress: listEmails,
        })
      }
    } catch (error) {
      console.log(error)
      return null
    }
  },
}
