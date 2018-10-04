import * as actionTypes from './action-types'

import { getCityWeather as fetchCityWeather } from '../api.service/weather'

const _addCityWidget = (city) => ({
  type : actionTypes.ADD_CITY,
  city
})

const _setCityWidgetWeather = (cityID, weatherData) => ({
  type : actionTypes.SET_CITY_WEATHER,
  cityID,
  weatherData
})

export const removeCityWidget = (cityID) => ({
  type : actionTypes.REMOVE_CITY,
  cityID
})


export const addCityWidget = (cityID) => (dispatch, getState) => {
  const citiesList = getState().citiesState.citiesList
  cityID = parseInt(cityID)
  const city = citiesList.find((city) => (city.id === cityID))
  if (city !== undefined) {
    dispatch(_addCityWidget(city))
  }
}
export const getCityWeather = (cityID) => async (dispatch, getState) => {
  try {
    const { data : weatherData } = await fetchCityWeather(cityID)
    dispatch(_setCityWidgetWeather(cityID, weatherData))
  }
  catch(e) {
    console.error('An error occured', e)
  }
}
