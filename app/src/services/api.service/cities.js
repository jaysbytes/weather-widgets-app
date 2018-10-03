import axios from './_config'

export const getCityList = () => {
  return axios.get('/city-list')
}
