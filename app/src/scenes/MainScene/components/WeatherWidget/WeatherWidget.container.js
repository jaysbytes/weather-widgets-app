import { connect } from 'react-redux'
import React, { Component } from 'react'

import WeatherWidgetView from './WeatherWidget.view'

import { getCityWeather, removeCityWidget } from '../../../../services/weatherWidgets.service/actions'

const mapDispatchToProps = (dispatch, ownProps) => ({
  getWeatherData : () => {
    dispatch(getCityWeather(ownProps.city.id))
  },
  removeWidget : () => {
    dispatch(removeCityWidget(ownProps.city.id))
  }
})

class WeatherWidgetContainer extends Component {
  componentDidMount() {
    this.props.getWeatherData()
  }
  render() {
    return <WeatherWidgetView {...this.props}/>
  }
}

export default connect(undefined, mapDispatchToProps)(WeatherWidgetContainer)