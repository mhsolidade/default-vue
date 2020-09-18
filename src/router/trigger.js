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
    },
    component: () => lazyLoadView(import('@views/trigger/list.vue')),
  },
  {
    path: '/:triggerId',
    name: 'triggerEdit',
    meta: {
      bradcrumb: [],
      tmp: {},
      async beforeResolve(routeTo, routeFrom, next) {
        console.log('aaaaa')
        try {
          store.dispatch('trigger/clearTrigger')
          const trigger = await store.dispatch(
            'trigger/fetchTrigger',
            routeTo.params.triggerId
          )
          const templates = await store.dispatch('template/fetchTemplates')
          const themes = await store.dispatch('theme/fetchThemes')
          const engines = await store.dispatch('engine/fetchEngines')
          const engine = engines.find((item) => {
            // eslint-disable-next-line eqeqeq
            return item.id == trigger.engine
          })
          routeTo.meta.bradcrumb = [
            {
              text: 'Gatilhos',
              disabled: false,
              routerName: 'trigger',
            },
            {
              text: trigger.name,
              disabled: true,
              routerName: 'triggerEdit',
            },
          ]
          trigger.engine = engine.id
          routeTo.meta.tmp.trigger = trigger
          routeTo.meta.tmp.engine = engine
          routeTo.meta.tmp.themes = themes
          routeTo.meta.tmp.templates = templates
          next()
        } catch (error) {
          console.log(error)
          // next({ name: '404', params: { resource: 'Gatilho' } })
        }
      },
    },
    component: () => lazyLoadView(import('@views/trigger/trigger.vue')),
    props: (route) => ({
      engine: route.meta.tmp.engine,
      trigger: route.meta.tmp.trigger,
      themes: route.meta.tmp.themes,
      templates: route.meta.tmp.templates,
    }),
  },
  {
    path: '/novo/:engineName/:engineId',
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
      async beforeResolve(routeTo, routeFrom, next) {
        try {
          store.dispatch('trigger/clearTrigger')
          routeTo.meta.tmp.trigger = await store.getters['trigger/trigger']
          routeTo.meta.tmp.templates = await store.dispatch(
            'template/fetchTemplates'
          )
          routeTo.meta.tmp.themes = await store.dispatch('theme/fetchThemes')
          const engines = await store.dispatch('engine/fetchEngines')
          routeTo.meta.tmp.engine = engines.find((item) => {
            // eslint-disable-next-line eqeqeq
            return item.id == routeTo.params.engineId
          })
          routeTo.meta.tmp.trigger.engine = routeTo.meta.tmp.engine.id
          routeTo.meta.tmp.trigger.name = routeTo.meta.tmp.engine.name
          next()
        } catch (error) {
          console.log(error)
          next({ name: '404', params: { resource: 'Gatilho' } })
        }
      },
    },
    component: () => lazyLoadView(import('@views/trigger/trigger.vue')),
    props: (route) => ({
      engine: route.meta.tmp.engine,
      trigger: route.meta.tmp.trigger,
      themes: route.meta.tmp.themes,
      templates: route.meta.tmp.templates,
    }),
  },
]
