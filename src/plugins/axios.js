import camelizeKeys from '@utils/camelize-keys'
import camelToSnake from '@utils/camel-to-snake'
import axios from 'axios'

// if (process.env.VUE_APP_BUILD_TARGET === 'production')
axios.defaults.baseURL = process.env.VUE_APP_API_URL

// axios.defaults.headers.common['Upgrade-Insecure-Requests'] = 1

axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    response.data = camelizeKeys(response.data)
    return response
  },
  function(error) {
    // Do something with response error
    if (error.response) error.response.data = camelizeKeys(error.response.data)
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
