import React from 'react'
import { Icon, Button } from 'antd'

import './WeatherWidget.style.css'
import Sun from './assets/sun.svg'
import Clouds from './assets/cloud.svg'
import SemiClouds from './assets/cloud_sun.svg'

const CloudsIcon = ({cloudPercentage}) => {
  let iconAlt, iconLink
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

const WeatherWidgetView = ({city, weather, removeWidget, getWeatherDataDebounced}) => (
  <div className="widgetCard">
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

export default WeatherWidgetView

