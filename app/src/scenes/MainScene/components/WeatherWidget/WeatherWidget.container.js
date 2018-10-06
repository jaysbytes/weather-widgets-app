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
    this.state = {
      willAppear : true,
      willDelete : false,
      notifyRefreshed : false,
      initialDataFetchDone : false
    }
    this.getWeatherDataDebounced = debounce(this.props.getWeatherData, 1000)
    this.widgetContainerRef = React.createRef()
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this)
    this.removeWidget = this.removeWidget.bind(this)
  }
  componentDidMount() {
    this.props.getWeatherData()
    this.widgetContainerRef.current.addEventListener('animationend', this.handleAnimationEnd)
  }
  componentDidUpdate(prevProps) {
    if (this.props.weather !== prevProps.weather) {
      this.setState({
        notifyRefreshed : this.state.initialDataFetchDone,
        initialDataFetchDone : true
      })
    }
  }
  componentWillUnmount() {
    this.widgetContainerRef.current.removeEventListener('animationend', this.handleAnimationEnd)
  }
  handleAnimationEnd(ev) {
    if (ev.target === this.widgetContainerRef.current) {
      if (this.state.willAppear) {
        this.setState({
          willAppear : false
        })
      }
      if (this.state.notifyRefreshed) {
        this.setState({
          notifyRefreshed : false
        })
      }
      if (this.state.willDelete) {
        this.props.removeWidget()
      }
    }
  }
  removeWidget() {
    this.setState({
      willDelete : true
    })
  }
  render() {
    return <WeatherWidgetView 
      {...this.props}
      {...this.state}
      getWeatherDataDebounced={this.getWeatherDataDebounced}
      notifyRefreshed={this.state.notifyRefreshed}
      widgetContainerRef={this.widgetContainerRef}
      removeWidget={this.removeWidget}
    />
  }
}

export default connect(undefined, mapDispatchToProps)(WeatherWidgetContainer)