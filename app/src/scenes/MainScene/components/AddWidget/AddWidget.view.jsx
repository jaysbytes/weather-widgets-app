import React from 'react'
import { Button, Icon } from 'antd'

import Select from 'react-virtualized-select'
import "react-virtualized-select/styles.css";
import 'react-select/dist/react-select.css'
import './AddWidget.style.css'

const AddWidgetView = ({ citiesList, setSelectedCityID, cityID, addCityWidget }) => {
  return (
    <div className="addWidgetContainer">
      <Select
        options={citiesList}
        value={cityID}
        onChange={setSelectedCityID}
      >
      </Select>
      <Button className="addWidgetButton" onClick={addCityWidget}>
        <Icon type="plus-circle" />
      </Button>
    </div>
  )
}
export default AddWidgetView