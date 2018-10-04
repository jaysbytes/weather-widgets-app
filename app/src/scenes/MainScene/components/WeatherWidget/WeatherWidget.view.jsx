import React from 'react'
import { Card, Icon, Button } from 'antd'

import './WeatherWidget.style.css'
import Sun from './assets/sun.svg'
import Clouds from './assets/cloud.svg'
import SemiClouds from './assets/cloud_sun.svg'

const CloudsIcon = ({cloudPercentage}) => {
  let iconLink = Sun
  if (cloudPercentage > 30) {
    iconLink = SemiClouds
  }
  if (cloudPercentage > 70) {
    iconLink = Clouds
  }
  return (
    <img className="widgetCloudsIcon" src={iconLink}/>
  )
}

const WeatherWidgetView = ({city, weather, removeWidget, getWeatherData}) => (
  <div className="widgetCard">
    <div className="widgetHeader">
      <CloudsIcon cloudPercentage={weather.cloudPercentage}/>
      <div>
        <Button className="button" onClick={getWeatherData}><Icon type="sync" theme="outlined" /></Button>
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

