import reducer from './reducer';
import * as actionTypes from './action-types'

const createCity = (number) => ({
  name: `CityName${number}`,
  id: number
})

const createWidget = (number, weather = {}) => ({
  city: createCity(number),
  weather
})

const initialState = {
  weatherWidgetsList: []
}
const city1 = createCity(1)
const city2 = createCity(2)
const widget1 = createWidget(1)
const widget2 = createWidget(2)
const weather1 = {
  temperature: 20.0,
  cloudPercentage: 80,
  rainAmount: 2.0
}
const weather2 = {
  temperature: 10.0,
  cloudPercentage: 20,
  rainAmount: 0.0
}

describe('WeatherWidgets reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(initialState)
  })
  it('should add weather widget', () => {
    expect(reducer(initialState, {
        type: actionTypes.ADD_CITY,
        city: city1
      }))
      .toEqual({
        weatherWidgetsList: [
          widget1
        ]
      })

    expect(reducer({
        weatherWidgetsList: [
          widget1
        ]
      }, {
        type: actionTypes.ADD_CITY,
        city: city2
      }))
      .toEqual({
        weatherWidgetsList: [
          widget1,
          widget2
        ]
      })
  })
  it('should not add weather widget', () => {
    expect(reducer({
        weatherWidgetsList: [widget1]
      }, {
        type: actionTypes.ADD_CITY,
        city: city1
      }))
      .toEqual({
        weatherWidgetsList: [
          widget1
        ]
      })
  })

  it('should remove a weather widget', () => {
    expect(reducer({
        weatherWidgetsList: [
          widget1
        ]
      }, {
        type: actionTypes.REMOVE_CITY,
        cityID: 1
      }))
      .toEqual({
        weatherWidgetsList: []
      })

    expect(reducer({
        weatherWidgetsList: [
          widget1,
          widget2
        ]
      }, {
        type: actionTypes.REMOVE_CITY,
        cityID: 1
      }))
      .toEqual({
        weatherWidgetsList: [
          widget2
        ]
      })
  })
  it('shloud set widget\'s weather', () => {
    expect(reducer({
        weatherWidgetsList: [
          widget1
        ]
      }, {
        type: actionTypes.SET_CITY_WEATHER,
        cityID: 1,
        weatherData: weather1
      }))
      .toEqual({
        weatherWidgetsList: [{
          ...widget1,
          weather : weather1
        }]
      })

    expect(reducer({
        weatherWidgetsList: [
          {
            ...widget1,
            weather : weather1
          }
        ]
      }, {
        type: actionTypes.SET_CITY_WEATHER,
        cityID: 1,
        weatherData: weather2
      }))
      .toEqual({
        weatherWidgetsList: [{
          ...widget1,
          weather : weather2
        }]
      })
  })
  it('shloud not set widget\'s weather', () => {
    expect(reducer({
        weatherWidgetsList: [
          widget1
        ]
      }, {
        type: actionTypes.SET_CITY_WEATHER,
        cityID: 2,
        weatherData: weather1
      }))
      .toEqual({
        weatherWidgetsList: [
          widget1
        ]
      })
  })
})