import * as actionTypes from './action-types'

import { getCityWeather as fetchCityWeather } from '../api.service/weather'
import { subscribeCity, unsubscribeCity } from '../webhooksApi.service'

const _addCityWidget = (city) => ({
  type : actionTypes.ADD_CITY,
  city
})

const _removeCityWidget = (cityID) => ({
  type : actionTypes.REMOVE_CITY,
  cityID
})

export const setCityWidgetWeather = (cityID, weatherData) => ({
  type : actionTypes.SET_CITY_WEATHER,
  cityID,
  weatherData
})

export const addCityWidget = (cityID) => (dispatch, getState) => {
  const citiesList = getState().citiesState.citiesList
  const widgetsCount = getState().weatherWidgetsState.weatherWidgetsList.length
  cityID = parseInt(cityID)
  const city = citiesList.find((city) => (city.id === cityID))
  if (city !== undefined) {
    dispatch(_addCityWidget(city))
  }
  if (widgetsCount < getState().weatherWidgetsState.weatherWidgetsList.length) {
    subscribeCity(cityID)
    return true
  }
  return false
}

export const removeCityWidget = (cityID) => async (dispatch, getState) => {
  unsubscribeCity(cityID)
  dispatch(_removeCityWidget(cityID))
}

export const getCityWeather = (cityID) => async (dispatch, getState) => {
  try {
    const { data : weatherData } = await fetchCityWeather(cityID)
    dispatch(setCityWidgetWeather(cityID, weatherData))
  }
  catch(e) {
    console.error('An error occured', e)
  }
}
