import store from '@state/store'

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
        setTimeout(() => {
          const authRequiredOnPreviousRoute = routeFrom.matched.some(
            (route) => route.meta.authRequired
          )
          // Navigate back to previous page, or home as a fallback
          next(
            authRequiredOnPreviousRoute ? { name: 'login' } : { ...routeFrom }
          )
        }, 900)
      },
    },
  },
]

function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    //   loading: require('@views/_loading.vue').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    //   error: require('@views/_timeout.vue').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}
