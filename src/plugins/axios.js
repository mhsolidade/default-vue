import camelizeKeys from '@utils/camelize-keys'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL
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

export default axios
