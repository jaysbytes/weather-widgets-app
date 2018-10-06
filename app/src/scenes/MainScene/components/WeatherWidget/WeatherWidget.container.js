import { connect } from 'react-redux'
import React, { Component } from 'react'
import debounce from 'debounce'

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
  constructor(props) {
    super(props)
    this.getWeatherDataDebounced = debounce(this.props.getWeatherData, 1000)
  }
  componentDidMount() {
    this.props.getWeatherData()
  }
  render() {
    return <WeatherWidgetView 
      {...this.props}
      getWeatherDataDebounced={this.getWeatherDataDebounced}
    />
  }
}

export default connect(undefined, mapDispatchToProps)(WeatherWidgetContainer)