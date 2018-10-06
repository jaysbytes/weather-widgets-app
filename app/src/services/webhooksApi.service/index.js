import axios from './_config'

export const subscribeCity = (cityID) => {
  return axios.post(`/subscribtion/${cityID}`)
}

export const unsubscribeCity = (cityID) => {
  return axios.delete(`/subscribtion/${cityID}`)
}