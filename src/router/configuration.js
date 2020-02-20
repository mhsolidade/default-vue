import store from '@state/store'

export default [
  {
    path: '',
    name: 'configuration',
    meta: {
      bradcrumb: [
        {
          text: 'Configurações',
          disabled: false,
          routerName: 'configuration',
        },
      ],
    },
    component: () => lazyLoadView(import(`@views/configuration/options.vue`)),
  },
  {
    path: '/banner',
    component: () =>
      lazyLoadView(import(`@views/configuration/banner/index.vue`)),
    children: [
      {
        path: '/',
        name: 'banner',
        meta: {
          bradcrumb: [
            {
              text: 'Configurações',
              disabled: false,
              routerName: 'configuration',
            },
            {
              text: 'Banners',
              disabled: false,
              routerName: 'banner',
            },
          ],
          tmp: {},
          beforeResolve(routeTo, routeFrom, next) {
            store
              // Try to fetch the user's information by their username
              .dispatch('banner/fetchBanners')
              .then((banners) => {
                routeTo.meta.tmp.banners = banners
                next()
              })
              .catch(() => {
                next({ name: '404', params: { resource: 'Banners' } })
              })
          },
        },
        component: () =>
          lazyLoadView(import(`@views/configuration/banner/list.vue`)),
        props: (route) => ({ banners: route.meta.tmp.banners }),
      },
      {
        path: 'new',
        name: 'bannerNew',
        meta: {
          bradcrumb: [
            {
              text: 'Configurações',
              disabled: false,
              routerName: 'configuration',
            },
            {
              text: 'Banners',
              disabled: false,
              routerName: 'banner',
            },
            {
              text: 'Novo',
              disabled: true,
              routerName: 'bannerNew',
            },
          ],
        },
        component: () =>
          lazyLoadView(import(`@views/configuration/banner/banner.vue`)),
      },
      {
        path: ':id',
        name: 'bannerEdit',
        meta: {
          bradcrumb: [
            {
              text: 'Configurações',
              disabled: false,
              routerName: 'configuration',
            },
            {
              text: 'Banners',
              disabled: false,
              routerName: 'banner',
            },
          ],
        },
        component: () =>
          lazyLoadView(import(`@views/configuration/banner/banner.vue`)),
      },
    ],
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
