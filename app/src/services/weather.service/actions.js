import * as actionTypes from './action-types'

import { default as fetchCityWeather } from '../api.service/weather'

const _addCityWidget = (city) => ({
  type : actionTypes.ADD_CITY,
  city
})

const _setCityWidgetWeather = () => ({
  type : actionTypes.SET_CITY_WEATHER
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

}
