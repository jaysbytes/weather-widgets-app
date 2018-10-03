import axios from './_config'

export const getCityWeather = (cityID) => {
  return axios.get(`/weather/${cityID}`)
}
