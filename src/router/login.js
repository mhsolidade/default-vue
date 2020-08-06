import store from '@state/store'
import lazyLoadView from './helper'

export default [
  {
    path: '',
    name: 'login',
    component: () => lazyLoadView(import('@views/login/login.vue')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'dashboard' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/recover',
    name: 'recover',
    component: () => lazyLoadView(import('@views/login/recover.vue')),
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => lazyLoadView(import('@views/login/reset.vue')),
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch('auth/logOut')
        console.log('aaa')
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.meta.authRequired
        )
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? { name: 'login' } : { ...routeFrom })
      },
    },
  },
]
