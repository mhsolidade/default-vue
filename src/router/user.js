import store from '@state/store'
import lazyLoadView from './helper'
import { isEmpty } from 'lodash'

export default [
  {
    path: '/perfil',
    name: 'profile',
    meta: {
      bradcrumb: [
        {
          text: 'Perfil',
          disabled: true,
          routerName: 'profile',
        },
      ],
      tmp: {},
      async beforeResolve(routeTo, routeFrom, next) {
        console.log(store.state)
        const user = await store.state.auth.currentUser
        if (isEmpty(user)) next({ name: '404', params: { resource: 'Perfil' } })
        routeTo.meta.tmp.user = user
        next()
      },
    },
    component: () => lazyLoadView(import('@views/profile/profile.vue')),
    props: (route) => ({
      user: route.meta.tmp.user,
    }),
  },
]
