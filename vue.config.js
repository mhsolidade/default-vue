const appConfig = require('./src/app.config')
// eslint-disable-next-line prefer-const
let cookie = null

/** @type import('@vue/cli-service').ProjectOptions */
module.exports = {
  // https://github.com/neutrinojs/webpack-chain/tree/v4#getting-started
  chainWebpack(config) {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', appConfig.title)
    // Set up all the aliases we use in our app.
    config.resolve.alias.clear().merge(require('./aliases.config').webpack)

    // Don't allow importing .vue files without the extension, as
    // it's necessary for some Vetur autocompletions.
    config.resolve.extensions.delete('.vue')

    // Only enable performance hints for production builds,
    // outside of tests.
    config.performance.hints(
      process.env.NODE_ENV === 'production' &&
        !process.env.VUE_APP_TEST &&
        'warning'
    )
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true,
  },
  transpileDependencies: ['vuetify'],
  // Configure Webpack's dev server.
  // https://cli.vuejs.org/guide/cli-service.html
  devServer: {
    proxy: {
      '/api': {
        target: 'http://painel.smartbmc.com.br',
        changeOrigin: true,
        cookieDomainRewrite: {
          '*': 'localhost',
        },
        onProxyRes: (proxyRes, req, res) => {
          const sc = proxyRes.headers['set-cookie']
          if (Array.isArray(sc)) {
            const cookie = sc.map((sc) => {
              return sc.split(';')
            })
            res.append('cookie', cookie)
            // console.log(cookie)
          }
        },

        pathRewrite: function(path, req) {
          return path.replace('/api', '/api')
        },
      },
    },
    // ...(process.env.API_BASE_URL
    //   ? // Proxy API endpoints to the production base URL.
    //     { proxy: { '/api': { target: process.env.API_BASE_URL } } }
    //   : // Proxy API endpoints a local mock API.
    //     {}),
  },
}

// Object.keys(proxyRes.headers).forEach(function(key) {
//   if (key === 'set-cookie') {
//     console.log(proxyRes.headers[key].map(item => ))
//     res.append('set-cookie', proxyRes.headers[key].split(','))
//   }
// })
// },
