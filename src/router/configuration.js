import store from '@state/store'
import lazyLoadView from './helper'

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
      tmp: {},
      beforeResolve(routeTo, routeFrom, next) {
        store
          .dispatch('baseConfig/fetchConfig')
          .then((config) => {
            routeTo.meta.tmp.config = config
            next()
          })
          .catch(() => {
            next({ name: '404', params: { resource: 'templates' } })
          })
      },
    },
    props: (route) => ({ config: route.meta.tmp.config }),
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
        path: 'novo',
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
          tmp: {},
          beforeResolve(routeTo, routeFrom, next) {
            store.dispatch('banner/clearBanner')
            routeTo.meta.tmp.banner = store.getters['banner/banner']
            next()
          },
        },
        props: (route) => ({ banner: route.meta.tmp.banner }),
        component: () =>
          lazyLoadView(import(`@views/configuration/banner/banner.vue`)),
      },
      {
        path: ':bannerId',
        name: 'bannerEdit',
        meta: {
          bradcrumb: [],
          tmp: {},
          async beforeResolve(routeTo, routeFrom, next) {
            await store
              .dispatch('banner/fetchBanner', routeTo.params.bannerId)
              .then((banner) => {
                routeTo.meta.tmp.banner = banner
                routeTo.meta.bradcrumb = [
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
                    text: banner.name,
                    disabled: false,
                    routerName: 'bannerEdit',
                  },
                ]
              })
            next()
          },
        },
        props: (route) => ({ banner: route.meta.tmp.banner }),
        component: () =>
          lazyLoadView(import(`@views/configuration/banner/banner.vue`)),
      },
    ],
  },
  {
    path: '/temas',
    component: () =>
      lazyLoadView(import(`@views/configuration/theme/index.vue`)),
    children: [
      {
        path: '/',
        name: 'theme',
        meta: {
          bradcrumb: [
            {
              text: 'Configurações',
              disabled: false,
              routerName: 'configuration',
            },
            {
              text: 'Temas',
              disabled: false,
              routerName: 'theme',
            },
          ],
          tmp: {},
          beforeResolve(routeTo, routeFrom, next) {
            store
              // Try to fetch the user's information by their username
              .dispatch('theme/fetchThemes')
              .then((themes) => {
                routeTo.meta.tmp.themes = themes
                next()
              })
              .catch(() => {
                next({ name: '404', params: { resource: 'Themes' } })
              })
          },
        },
        component: () =>
          lazyLoadView(import(`@views/configuration/theme/list.vue`)),
        props: (route) => ({ themes: route.meta.tmp.themes }),
      },
      {
        path: 'novo',
        name: 'themeNew',
        meta: {
          bradcrumb: [
            {
              text: 'Configurações',
              disabled: false,
              routerName: 'configuration',
            },
            {
              text: 'Temas',
              disabled: false,
              routerName: 'theme',
            },
            {
              text: 'Novo',
              disabled: true,
              routerName: 'themeNew',
            },
          ],
          tmp: {},
          beforeResolve(routeTo, routeFrom, next) {
            store.dispatch('theme/clearTheme')
            routeTo.meta.tmp.theme = store.getters['theme/theme']
            next()
          },
        },
        props: (route) => ({ theme: route.meta.tmp.theme }),
        component: () =>
          lazyLoadView(import(`@views/configuration/theme/theme.vue`)),
      },
      {
        path: ':id',
        name: 'themeEdit',
        meta: {
          bradcrumb: [],
          tmp: {},
          async beforeResolve(routeTo, routeFrom, next) {
            await store
              .dispatch('theme/fetchTheme', routeTo.params.id)
              .then((theme) => {
                routeTo.meta.tmp.theme = theme
                routeTo.meta.bradcrumb = [
                  {
                    text: 'Configurações',
                    disabled: false,
                    routerName: 'configuration',
                  },
                  {
                    text: 'Temas',
                    disabled: false,
                    routerName: 'theme',
                  },
                  {
                    text: theme.name,
                    disabled: true,
                    routerName: 'themeEdit',
                  },
                ]
              })
            next()
          },
        },
        props: (route) => ({ theme: route.meta.tmp.theme }),
        component: () =>
          lazyLoadView(import(`@views/configuration/theme/theme.vue`)),
      },
    ],
  },
  {
    path: '/template',
    component: () =>
      lazyLoadView(import(`@views/configuration/template/index.vue`)),
    children: [
      {
        path: '/',
        name: 'template',
        meta: {
          bradcrumb: [
            {
              text: 'Configurações',
              disabled: false,
              routerName: 'configuration',
            },
            {
              text: 'Template',
              disabled: false,
              routerName: 'template',
            },
          ],
          tmp: {},
          beforeResolve(routeTo, routeFrom, next) {
            store
              // Try to fetch the user's information by their username
              .dispatch('template/fetchTemplates')
              .then((templates) => {
                routeTo.meta.tmp.templates = templates
                next()
              })
              .catch(() => {
                next({ name: '404', params: { resource: 'templates' } })
              })
          },
        },
        component: () =>
          lazyLoadView(import(`@views/configuration/template/list.vue`)),
        props: (route) => ({ templates: route.meta.tmp.templates }),
      },
      {
        path: 'novo',
        name: 'templateNew',
        meta: {
          bradcrumb: [
            {
              text: 'Configurações',
              disabled: false,
              routerName: 'configuration',
            },
            {
              text: 'Template',
              disabled: false,
              routerName: 'template',
            },
            {
              text: 'Novo',
              disabled: true,
              routerName: 'templateNew',
            },
          ],
          tmp: {},
          beforeResolve(routeTo, routeFrom, next) {
            store.dispatch('template/clearTemplate')
            routeTo.meta.tmp.template = store.getters['template/template']
            next()
          },
        },
        props: (route) => ({ template: route.meta.tmp.template }),
        component: () =>
          lazyLoadView(import(`@views/configuration/template/template.vue`)),
      },
      {
        path: ':id',
        name: 'templateEdit',
        meta: {
          bradcrumb: [],
          tmp: {},
          async beforeResolve(routeTo, routeFrom, next) {
            store.dispatch('template/clearTemplate')

            await store
              .dispatch('template/fetchTemplate', routeTo.params.id)
              .then((template) => {
                routeTo.meta.tmp.template = template
                routeTo.meta.bradcrumb = [
                  {
                    text: 'Configurações',
                    disabled: false,
                    routerName: 'configuration',
                  },
                  {
                    text: 'Templates',
                    disabled: false,
                    routerName: 'template',
                  },
                  {
                    text: template.name,
                    disabled: false,
                    routerName: 'templateEdit',
                  },
                ]
              })
            next()
          },
        },
        props: (route) => ({ template: route.meta.tmp.template }),
        component: () =>
          lazyLoadView(import(`@views/configuration/template/template.vue`)),
      },
    ],
  },
  {
    path: '/url',
    component: () => lazyLoadView(import(`@views/configuration/url/index.vue`)),
    children: [
      {
        path: '/',
        name: 'url',
        meta: {
          bradcrumb: [
            {
              text: 'Configurações',
              disabled: false,
              routerName: 'configuration',
            },
            {
              text: 'Urls',
              disabled: false,
              routerName: 'url',
            },
          ],
          tmp: {},
          beforeResolve(routeTo, routeFrom, next) {
            store
              // Try to fetch the user's information by their username
              .dispatch('url/fetchUrls')
              .then((urls) => {
                routeTo.meta.tmp.urls = urls
                next()
              })
              .catch(() => {
                next({ name: '404', params: { resource: 'urls' } })
              })
          },
        },
        component: () =>
          lazyLoadView(import(`@views/configuration/url/list.vue`)),
        props: (route) => ({ urls: route.meta.tmp.urls }),
      },
      {
        path: 'novo',
        name: 'urlNew',
        meta: {
          bradcrumb: [
            {
              text: 'Configurações',
              disabled: false,
              routerName: 'configuration',
            },
            {
              text: 'Urls',
              disabled: false,
              routerName: 'url',
            },
            {
              text: 'Novo',
              disabled: true,
              routerName: 'urlNew',
            },
          ],
          tmp: {},
          beforeResolve(routeTo, routeFrom, next) {
            store.dispatch('url/clearUrl')
            routeTo.meta.tmp.url = store.getters['url/url']
            next()
          },
        },
        props: (route) => ({ url: route.meta.tmp.url }),
        component: () =>
          lazyLoadView(import(`@views/configuration/url/url.vue`)),
      },
      {
        path: ':id',
        name: 'urlEdit',
        meta: {
          bradcrumb: [
            {
              text: 'Configurações',
              disabled: false,
              routerName: 'configuration',
            },
            {
              text: 'Urls',
              disabled: false,
              routerName: 'url',
            },
            {
              text: 'Novo',
              disabled: true,
              routerName: 'urlEdit',
            },
          ],
          tmp: {},
          async beforeResolve(routeTo, routeFrom, next) {
            await store
              .dispatch('url/fetchUrl', routeTo.params.id)
              .then((url) => {
                routeTo.meta.tmp.url = url
                routeTo.meta.bradcrumb = [
                  {
                    text: 'Configurações',
                    disabled: false,
                    routerName: 'configuration',
                  },
                  {
                    text: 'Urls',
                    disabled: false,
                    routerName: 'url',
                  },
                  {
                    text: url.name,
                    disabled: true,
                    routerName: 'urlEdit',
                  },
                ]
              })
            next()
          },
        },
        props: (route) => ({ url: route.meta.tmp.url }),
        component: () =>
          lazyLoadView(import(`@views/configuration/url/url.vue`)),
      },
    ],
  },
]
