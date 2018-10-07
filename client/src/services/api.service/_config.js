import _axios from 'axios'
import store from '../../store'

const apiUrl = 'http://localhost:5263/api'
const axios = _axios.create({
  baseURL: apiUrl,
  timeout: 10000
})

axios.interceptors.request.use(function (config) {
  const token = store.getState().userState.bearerToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
});

export default axios