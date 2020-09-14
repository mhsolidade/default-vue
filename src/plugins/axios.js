import camelizeKeys from '@utils/camelize-keys'
import camelToSnake from '@utils/camel-to-snake'
import axios from 'axios'

console.log('process.env.VUE_APP_API_URL', process.env.VUE_APP_API_URL)
console.log(
  'process.env.VUE_APP_BUILD_TARGET',
  process.env.VUE_APP_BUILD_TARGET
)
// if (process.env.VUE_APP_BUILD_TARGET === 'production')
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true

// axios.defaults.headers.common['Upgrade-Insecure-Requests'] = 1

axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    response.data = camelizeKeys(response.data)
    return response
  },
  function(error) {
    // Do something with response error
    error.response.data = camelizeKeys(error.response.data)
    return Promise.reject(error)
  }
)
axios.interceptors.request.use(
  function(config) {
    if (config.data) {
      config.data = camelToSnake(config.data)
    }
    return config
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

export default axios
