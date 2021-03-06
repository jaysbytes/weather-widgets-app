import * as actionTypes from './action-types'

const initialState = {
  weatherWidgetsList: []
}
const addCity = (state, city) => {
  const alreadyExists = undefined !== state.weatherWidgetsList.find((widget) => (widget.city.id === city.id)) 
  if (!alreadyExists) {
    const newWidget = {
      city,
      weather: {}
    }
    return {
      ...state,
      weatherWidgetsList : [...state.weatherWidgetsList, newWidget]
    }
  }
  else {
    return state
  }
}
const removeCity = (state, cityID) => {
  return {
    ...state,
    weatherWidgetsList : state.weatherWidgetsList.filter(({city}) => (city.id !== cityID))
  }
}
const setCityWeather = (state, cityID, weather) => {
  return {
    ...state,
    weatherWidgetsList : state.weatherWidgetsList.map((widgetData) => {
      if (widgetData.city.id === cityID) {
        return {
          ...widgetData,
          weather
        }
      }
      else {
        return widgetData
      }
    })
  }
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CITY: return addCity(state, action.city)
    case actionTypes.REMOVE_CITY: return removeCity(state, action.cityID)
    case actionTypes.SET_CITY_WEATHER : return setCityWeather(state, action.cityID, action.weatherData)
    default: return state
  }
}

export default reducer