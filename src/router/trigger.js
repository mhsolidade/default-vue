import store from '@state/store'
import lazyLoadView from './helper'

export default [
  {
    path: '',
    name: 'trigger',
    meta: {
      bradcrumb: [
        {
          text: 'Gatilhos',
          disabled: true,
          routerName: 'trigger',
        },
      ],
      tmp: {},
      beforeResolve(routeTo, routeFrom, next) {
        store
          .dispatch('trigger/getDisabledEnabledTriggers')
          .then((resp) => {
            console.log(resp)
            const { triggers, disabledEngines } = resp
            routeTo.meta.tmp.deactivatedEngines = disabledEngines
            routeTo.meta.tmp.triggers = triggers
            next()
          })
          .catch(() => {
            next({ name: '404', params: { resource: 'Gatilho' } })
          })
      },
    },
    component: () => lazyLoadView(import('@views/trigger/list.vue')),
    props: (route) => ({
      deactivatedEngines: route.meta.tmp.deactivatedEngines,
      triggers: route.meta.tmp.triggers,
    }),
  },
  {
    path: 'novo/:engineName/:engineId',
    name: 'triggerNew',
    meta: {
      bradcrumb: [
        {
          text: 'Gatilhos',
          disabled: false,
          routerName: 'trigger',
        },
        {
          text: 'Novo',
          disabled: true,
          routerName: 'triggerNew',
        },
      ],
      tmp: {},
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch('trigger/clearTrigger')
        routeTo.meta.tmp.trigger = store.getters['trigger/trigger']
        store
          .dispatch('engine/fetchEngines')
          .then((engine) => {
            routeTo.meta.tmp.engine = engine.find((item) => {
              // eslint-disable-next-line eqeqeq
              return item.id == routeTo.params.engineId
            })
            next()
          })
          .catch((err) => {
            console.log(err)
            next({ name: '404', params: { resource: 'Gatilho' } })
          })
      },
    },
    component: () => lazyLoadView(import('@views/trigger/trigger.vue')),
    props: (route) => ({
      engine: route.meta.tmp.engine,
      trigger: route.meta.tmp.trigger,
    }),
  },
]
