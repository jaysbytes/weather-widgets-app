import React from 'react'
import { AutoComplete, Button, Icon } from 'antd'

import './AddWidget.style.css'

const AddWidgetView = ({ citiesList, setSelectedCityID, addCityWidget }) => {
  return (
    <div className="addWidgetContainer">
      <AutoComplete 
       
        dataSource={citiesList}
        filterOption={(inputValue, option) => {
          return (option.props.children.toLowerCase().includes(inputValue.toLowerCase()))}
        }
        onSelect={setSelectedCityID}
        style={{width: '70%'}}
      />
      <Button className="addWidgetButton" onClick={addCityWidget}>
        <Icon type="plus-circle" />
      </Button>
    </div>
  )
}
export default AddWidgetView