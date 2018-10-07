import React from 'react'
import { Icon, Button } from 'antd'
import PropTypes from 'prop-types'

import './WeatherWidget.style.css'
import Sun from './assets/sun.svg'
import Clouds from './assets/cloud.svg'
import SemiClouds from './assets/cloud_sun.svg'

const CloudsIcon = ({cloudPercentage}) => {
  let iconAlt, iconLink
  if (cloudPercentage === undefined) {
    return null
  }
  if (cloudPercentage < 33) {
    iconLink = Sun
    iconAlt = 'sun'
  }
  else if (cloudPercentage < 66) {
    iconLink = SemiClouds
    iconAlt = 'semi-clouds'
  }
  else {
    iconLink = Clouds
    iconAlt = 'clouds'
  }
  return (
    <img className="widgetCloudsIcon" src={iconLink} alt={iconAlt}/>
  )
}

CloudsIcon.propTypes = {
  cloudPercentage : PropTypes.number
}

const WeatherWidgetView = ({
  city, 
  weather, 
  removeWidget, 
  getWeatherDataDebounced,
  widgetContainerRef,
  notifyRefreshed,
  willAppear,
  willDelete
}) => {
  let containerClassName = 'widgetCard'
  if (notifyRefreshed) {
    containerClassName += ' refreshedAnim'
  }
  if (willDelete) {
    containerClassName += ' deleteAnim'
  }
  if (willAppear) {
    containerClassName += ' appearAnim'
  }
  return (
    <div ref={widgetContainerRef} className={containerClassName}>
      {willDelete}
      <div className="widgetHeader">
        <CloudsIcon cloudPercentage={weather.cloudPercentage}/>
        <div>
          <Button className="button" onClick={getWeatherDataDebounced}><Icon type="sync" theme="outlined" /></Button>
          <Button className="button" onClick={removeWidget}><Icon type="delete" theme="outlined" /></Button>
        </div>
      </div>
      <div className="widgetContent">
        <p>Temp {weather.temperature}</p>
      </div>
      <div className="widgetFooter">
        {city.name}
      </div>
    </div>
  )
}

WeatherWidgetView.propTypes = {
  city : PropTypes.shape({
    name : PropTypes.string.isRequired,
  }).isRequired, 
  weather : PropTypes.oneOfType([
    PropTypes.shape({
      cloudPercentage : PropTypes.number.isRequired,
      temperature : PropTypes.number.isRequired,
      rainAmount : PropTypes.number.isRequired,
    }),
    PropTypes.object.isRequired
  ]), 
  removeWidget : PropTypes.func.isRequired, 
  getWeatherDataDebounced : PropTypes.func.isRequired,
  widgetContainerRef : PropTypes.object.isRequired,
  notifyRefreshed : PropTypes.bool.isRequired,
  willAppear : PropTypes.bool.isRequired,
  willDelete : PropTypes.bool.isRequired
}

export default WeatherWidgetView

