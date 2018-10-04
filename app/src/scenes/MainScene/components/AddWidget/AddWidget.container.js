import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'

import AddWidgetView from './AddWidget.view.jsx'

import { getCitiesList } from '../../../../services/cities.service/actions'
import { addCityWidget } from '../../../../services/weatherWidgets.service/actions'

const mapStateToProps = (state, ownProps) => ({
  citiesList : state.citiesState.citiesList
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getCitiesList : () => {
    dispatch(getCitiesList())
  },
  addCityWidget : (cityID) => {
    return dispatch(addCityWidget(cityID))
  }
})

class AddWidgetContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cityID : undefined
    }
  }
  componentDidMount() {
    this.props.getCitiesList()
  }
  setSelectedCityID(selectedCity) {
    this.setState({
      cityID : selectedCity ? selectedCity.value : undefined
    })
  }
  addCityWidget() {
    if (this.state.cityID !== undefined) {
      const widgetAdded = this.props.addCityWidget(this.state.cityID)
      if (!widgetAdded) {
        message.warn('Weather widget for this city has been already added.')
      }
    }
    else {
      message.warn('Please select a city from list.')
    }
  }
  render() {
    const autoCompleteDataSource = this.props.citiesList.map((city) => ({
      label : city.name,
      value : city.id
    }))
    return (<AddWidgetView 
      citiesList={autoCompleteDataSource} 
      setSelectedCityID={this.setSelectedCityID.bind(this)}
      cityID={this.state.cityID}
      addCityWidget={this.addCityWidget.bind(this)}
    />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWidgetContainer)