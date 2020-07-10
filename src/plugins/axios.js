import camelizeKeys from '@utils/camelize-keys'
import camelToSnake from '@utils/camel-to-snake'
import axios from 'axios'

axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    response.data = camelizeKeys(response.data)
    return response
  },
  function(error) {
    // Do something with response error
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
