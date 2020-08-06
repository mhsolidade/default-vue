// import store from '@state/store'
import login from './login'
import trigger from './trigger'
import configuration from './configuration'
import lazyLoadView from './helper'
import user from './user'

export default [
  {
    path: '/login',
    component: () => lazyLoadView(import('@views/login/index.vue')),
    children: [...login],
  },
  ...user,
  {
    path: '/cliente',
    name: 'client',
    meta: {
      authRequired: true,
    },
    component: () => lazyLoadView(import('@views/middlewareClient.vue')),
  },
  {
    path: '',
    redirect: 'dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      authRequired: true,
      clientIdRequired: true,
      bradcrumb: [
        {
          text: 'Dashboard',
          disabled: true,
          routerName: 'dashboard',
        },
      ],
    },
    component: () => lazyLoadView(import('@views/dashboard/index.vue')),
  },
  {
    path: '/relatorios',
    name: 'reports',
    meta: {
      authRequired: true,
      clientIdRequired: true,
      bradcrumb: [
        {
          text: 'Relatórios',
          disabled: true,
          routerName: 'reports',
        },
      ],
    },
    component: () => lazyLoadView(import('@views/report/report.vue')),
  },
  {
    path: '/gatilhos',
    meta: {
      authRequired: true,
      clientIdRequired: true,
    },
    component: () => lazyLoadView(import('@views/trigger/index.vue')),
    children: [...trigger],
  },
  {
    path: '/configuracao',
    meta: {
      authRequired: true,
    },
    children: [...configuration],
    component: () => lazyLoadView(import('@views/configuration/index.vue')),
  },
  {
    path: '/404',
    name: '404',
    component: require('@views/_404.vue').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
]
