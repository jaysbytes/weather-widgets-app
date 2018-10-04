import React from 'react'
import { Col } from 'antd'

import './WidgetsList.style.css'

import WeatherWidget from '../WeatherWidget'

const WidgetListView = ({ widgetsList }) => {
  return (
    <div className="widgetsList">
      {widgetsList.map((widgetData) => (
        <WeatherWidget key={widgetData.city.id} {...widgetData}/>
      ))}
    </div>
  )
}
export default WidgetListView