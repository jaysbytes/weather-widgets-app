import axios from 'axios'

const host = 'http://localhost:5263'

const postWithToken = async (url, bearerToken, data = {} ) => {
  try {
    await axios.post(url, data, {
      headers : {
        Authorization : `Bearer ${bearerToken}`
      }
    })
    return true
  }
  catch(e) {
    return false
  }
}

export const subscribe = async (bearerToken, cityId, url) => {
  cityId = parseInt(cityId)
  return postWithToken(`${host}/api/hooks/weather/subscribe`, bearerToken, { cityId , url })
}

export const unsubscribe = async (bearerToken, cityId) => {
  return postWithToken(`${host}/api/hooks/weather/unsubscribe/${cityId}`, bearerToken, {})
}